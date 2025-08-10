# <div align='center'>[Directory](https://tryhackme.com/room/directorydfirroom)</div>
<div align='center'>Do you have what it takes to crack this case?</div>
<div align='center'>
  <img width="200" height="200" alt="directory" src="https://github.com/user-attachments/assets/cf02dfbe-85b5-4315-a0f6-63d77356afa6" />
</div>


### Task 1.The Case

#### Lab Scenario

A small music company was recently hit by a threat actor.
The company's Art Directory, Larry, claims to have discovered a random note on his Desktop.

Given that they are just starting, they did not have time to properly set up the appropriate tools for capturing artifacts. Their IT contact only set up Wireshark, which captured the events in question.

You are tasked with finding out how this attack unfolded and what the threat actor executed on the system.

Click on the Download Task Files button at the top of this task. You will be provided with an traffic.pcap file. Once downloaded, you can begin your analysis in order to answer the questions.

Note: For free users using the AttackBox, the challenge is best done using your own environment. Some browsers may detect the file as malicious. The PCAP file is safe to download with md5 of 23393189b3cb22f7ac01ce10427886de. In general, as a security practice, download the PCAP and analyze it on a dedicated virtual machine, and not on your host OS.

## Answer the questions below
What ports did the threat actor initially find open? Format: from lowest to highest, separated by a comma.
```
53,80,88,135,139,389,445,464,593,636,3268,3269,5357
```

### The threat actor found four valid usernames, but only one username allowed the attacker to achieve a foothold on the server. What was the username? Format: Domain.TLD\username
```
DIRECTORY.THM\larry.doe
```

### The threat actor captured a hash from the user in question 2. What are the last 30 characters of that hash?
```
55616532b664cd0b50cda8d4ba469f
```

### What is the user's password?
```
Password1!
```

### What were the second and third commands that the threat actor executed on the system? Format: command1,command2
```
reg save HKLM\SYSTEM C:\SYSTEM,reg save HKLM\SAM C:\SAM
```
### What is the flag?
```
THM{Ya_G0t_R0aSt3d!}
```

### Initial Reconnaissance: Finding Open Ports

The attacker’s first step was to scan the target system to find open ports—these are the gateways that could allow further access. In TCP communication, a port is considered open when the target responds to a connection request (a SYN packet) with a SYN and ACK, which means it’s ready to connect.

To see which ports the attacker found open, I analyzed the network capture file (`traffic.pcap`) using TShark, which is the command-line version of Wireshark. I ran this command to filter packets where the target sent SYN and ACK responses, limiting the analysis to the first 3000 packets to keep it quick:

```bash
tshark -r traffic-1725627206938.pcap -c 3000 -T fields -e tcp.srcport -Y "tcp.flags.syn == 1 && tcp.flags.ack == 1" | sort -n | uniq | paste -sd ','
```

This gave me a sorted list of unique open ports, showing exactly which services were accessible to the attacker:

<img width="639" height="136" alt="Open Ports Discovered" src="https://github.com/user-attachments/assets/d5373bb4-1fc4-4404-848a-c337b8ec3fc8" />

While going through the packets in Wireshark, I noticed Kerberos traffic starting around packet **4667**.

At packet **4679**, there’s a `PREAUTH_REQUIRED` error — meaning the username exists but requires pre-authentication.

<img width="1608" height="726" alt="image" src="https://github.com/user-attachments/assets/596dc7ab-025a-4585-ae28-195c8baadb35" />

Following that, I saw a series of `unknown principal` errors, which means invalid usernames were being tested. These stopped after packet **4785**.

<img width="1232" height="103" alt="image" src="https://github.com/user-attachments/assets/72d1a3f8-cbdf-43ff-8013-5d25717c8182" />

By the time I reached packet **4817**, there was an AS-REQ with no error message. That looked like the successful login.

<img width="1704" height="377" alt="image" src="https://github.com/user-attachments/assets/9a38a33f-a3d7-4ac3-b3c4-1bde7f816a65" />


At this stage of the investigation, I suspected that Kerberos traffic inside the `pcap` file contained the username that successfully authenticated to the server.

In Kerberos packets:

* **`kerberos.CNameString`** → contains the username
* **`kerberos.crealm`** → contains the domain name

By extracting both fields, I could reconstruct the format `DOMAIN\username`, which is exactly the information the challenge is asking for.

Instead of manually checking every Kerberos packet in Wireshark, I used **TShark** to automate the extraction.


1. **`tshark -r traffic-1725627206938.pcap`**
   Reads the pcap file.

2. **`-Y "kerberos"`**
   Filters the capture to only show Kerberos packets.

3. **`-T fields`**
   Outputs only specific fields instead of the full packet.

4. **`-e kerberos.CNameString -e kerberos.crealm`**
   Extracts both the username and the Kerberos realm (domain).

5. **`| awk 'NF==2 {print $2 "\\" $1}'`**

   * `NF==2` → only process lines where both fields are present.
   * `print $2 "\\" $1` → prints the domain first, then a backslash, then the username, forming `DOMAIN\username`.

```bash
tshark -r traffic-1725627206938.pcap -Y "kerberos" \
  -T fields -e kerberos.CNameString -e kerberos.crealm \
  | awk 'NF==2 {print $2 "\\" $1}'
```
<img width="692" height="134" alt="image" src="https://github.com/user-attachments/assets/979b672f-7689-4f9e-9ab9-9bb65838c004" />

The username appears more than once, but it's the same account - this is the one used for the successful foothold.


#### Getting the Last 30 Characters of the Cipher

Now that I had confirmed the username from earlier, I wanted to grab part of the encrypted blob that Kerberos sent during authentication.
Technically, this isn’t a “hash” in the usual sense — it’s part of an **AS-REP** packet, which is an encrypted response from the Key Distribution Center. It can be encrypted with RC4, AES, or sometimes PKINIT, depending on the setup.

Since I already knew the username (`larry.doe`), my plan was to filter for only the Kerberos packets involving them and then pull the cipher field.

First, I checked all Kerberos packets for `larry.doe` and listed a few useful fields, including the frame number:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.checksum -e kerberos.cipher -e kerberos.CNameString -e frame.number
```

From that output, I could see the frame right before `4817` contained the blob I was after.

Next, I focused only on the cipher itself and grabbed the last one in the capture:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.cipher | tail -n 1
```

Finally, I used `awk` to print just the **last 30 characters**:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.cipher | tail -n 1 | \
  awk '{print substr($0, length($0)-29)}'
```
<img width="584" height="147" alt="image" src="https://github.com/user-attachments/assets/0df58e80-af0e-46fc-8df9-b4854123b246" />

That gave me exactly what the question was asking for.


### Extracting & Cracking the User’s Password

At this stage, I already know the valid Kerberos username from the earlier traffic analysis — `larry.doe`. My goal now is to figure out the password.
When I looked closer at the packet capture, I spotted an AS-REP response for Kerberos 5 using etype 23. This is perfect, because AS-REP data can be extracted and cracked offline, meaning I don’t need live access to the system to get the password.

#### Step 1: Finding the AS-REP Packet

Since I already knew the username, I filtered the Kerberos traffic to show only packets where the client principal name matched `larry.doe`. This let me quickly zero in on the right packet.

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.CNameString -e kerberos.crealm \
            -e kerberos.sname_string -e kerberos.checksum \
            -e kerberos.cipher -e kerberos.info_salt \
  | tail -n 1
```

<img width="1907" height="487" alt="image" src="https://github.com/user-attachments/assets/447ccae6-7682-4603-9cf3-69869857a41e" />

This revealed the AS-REP cipher data — exactly what I need for offline cracking.

#### Step 2: Pulling Out Only the Cipher

The AS-REP packet contains a lot of extra information, but Hashcat doesn’t need all of it. It only cares about the second part of the `kerberos.cipher` field, so I extracted that directly.

```bash
tshark -r traffic-1725627206938.pcap \
  -Y "frame.number==4817" \
  -T fields -e kerberos.cipher
```

<img width="1909" height="419" alt="image" src="https://github.com/user-attachments/assets/39023775-9e1b-4b0b-8dc9-36186b04c289" />

#### Step 3: Formatting the Hash for Hashcat

Hashcat expects AS-REP hashes to look like this:

```
$krb5asrep$23$user@DOMAIN:<cipher>
```

To get it in that format without typing everything manually, I used `awk` to combine the cipher with the username and realm from the packet.

```bash
tshark -r traffic-1725627206938.pcap -Y "frame.number==4817" -T fields -e kerberos.cipher -e kerberos.CNameString -e kerberos.crealm | \
awk -F'\t' '{split($1,a,","); print "$krb5asrep$23$"$2"@"$3":"a[2]}' | \
awk -F':' '{prefix_len=length($1) + 33; print substr($0, 1, prefix_len) "$" substr($0, prefix_len+1)}' | tee -a directory.hash
```

<img width="1905" height="163" alt="image" src="https://github.com/user-attachments/assets/e510cdf3-f810-41fd-ba6b-36a8b631aa44" />

Now I had a clean `$krb5asrep$` hash ready to crack.

#### Step 4: Cracking the Password

I saved the hash to a file called `directory.hash` and used Hashcat with mode `18200` (Kerberos 5 AS-REP, etype 23). I pointed it at the `rockyou.txt` wordlist to try common passwords.

```bash
  hashcat -a 0 -m 18200 directory.hash /usr/share/wordlists/rockyou.txt
```

Within seconds, the password popped out in plain text.
Mission accomplished.

<img width="1891" height="127" alt="image" src="https://github.com/user-attachments/assets/8ddd7c42-6e07-4f3e-99f5-a4732ec62963" />

### Finding the Second and Third Commands

After I had larry.doe's credentials, I noticed some interesting traffic headed to port 5985. That port is used for WinRM (Windows Remote Management), which usually means remote administrative commands are being executed after authentication. The only problem was that all of this traffic was encrypted.

Since I had the password, I decided to try decrypting it. I found a Github Gist containing code for Decrypting Traffic.
Gist-link

You can either clone the repo or copy & past the code. I simply copied and pasted in into
```
nano decrypt.py
```
Now, run this: 
```
python3 decrypt.py -p 'Password-U-found' ./traffic-1725627206938.pcap > decrypted_traffic.txt
```
Scrolling through the file, I started to notice a pattern - the commands being run were hidden inside <rsp:Arguments> tags and base64 encoded. I decided to extract just those chunks into a separate file:
```
grep -oP '(?<=<rsp:Arguments>).*?(?=</rsp:Arguments>)' decrypted_traffic.txt > en_args.txt
```
From there, I decoded each one and saved the results:
```
while read line; do
  echo "$line" | base64 --decode >> arguments.txt
  echo "" >> arguments.txt
done < en_args.txt
```
Looking through arguments.txt, I spotted the first command right away - whoami. I wanted to see everything in order, so I cleaned it up with:
```
grep -a '<S N="V">' arguments.txt | awk -F'[<>]' '{print $3}'
```
<img width="766" height="866" alt="image" src="https://github.com/user-attachments/assets/49c92c97-a47a-4289-88fb-aede8651c1eb" />

That gave me the full sequence of commands run after the initial login, and from there I could clearly identify the second and third ones the attacker used.



