# <div align='center'>[Directory](https://tryhackme.com/room/directorydfirroom)</div>
<div align='center'>Do you have what it takes to crack this case?</div>
<div align='center'>
  <img width="200" height="200" alt="directory" src="https://github.com/user-attachments/assets/cf02dfbe-85b5-4315-a0f6-63d77356afa6" />
</div>


## Task 1. The Case

### Lab Scenario

A small music company was recently hit by a threat actor.
The company's Art Directory, Larry, claims to have discovered a random note on his Desktop.

Given that they are just starting, they did not have time to properly set up the appropriate tools for capturing artifacts. Their IT contact only set up Wireshark, which captured the events in question.

You are tasked with finding out how this attack unfolded and what the threat actor executed on the system.

Click on the Download Task Files button at the top of this task. You will be provided with an traffic.pcap file. Once downloaded, you can begin your analysis in order to answer the questions.

Note: For free users using the AttackBox, the challenge is best done using your own environment. Some browsers may detect the file as malicious. The PCAP file is safe to download with md5 of 23393189b3cb22f7ac01ce10427886de. In general, as a security practice, download the PCAP and analyze it on a dedicated virtual machine, and not on your host OS.

## Answer the questions below

### What ports did the threat actor initially find open? Format: from lowest to highest, separated by a comma.
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

## Initial Reconnaissance: Finding Open Ports

The attacker’s first step was to scan the target system to find open ports—these are the gateways that could allow further access. In TCP communication, a port is considered open when the target responds to a connection request (a SYN packet) with a SYN and ACK, which means it’s ready to connect.

To see which ports the attacker found open, I analyzed the network capture file (`traffic.pcap`) using TShark, which is the command-line version of Wireshark. I ran this command to filter packets where the target sent SYN and ACK responses, limiting the analysis to the first 3000 packets to keep it quick:

```bash
tshark -r traffic-1725627206938.pcap -c 3000 -T fields -e tcp.srcport -Y "tcp.flags.syn == 1 && tcp.flags.ack == 1" | sort -n | uniq | paste -sd ','
```

This gave me a sorted list of unique open ports, showing exactly which services were accessible to the attacker:

<img width="639" height="136" alt="Open Ports Discovered" src="https://github.com/user-attachments/assets/d5373bb4-1fc4-4404-848a-c337b8ec3fc8" />

Finding the Valid Username That Gave the Attacker a Foothold
As I dug through the packets in Wireshark, I noticed Kerberos traffic starting around packet 4667. At packet 4679, there was a PREAUTH_REQUIRED error, which tells me the username exists but needs pre-authentication.

<img width="1608" height="726" alt="image" src="https://github.com/user-attachments/assets/596dc7ab-025a-4585-ae28-195c8baadb35" />

Shortly after, I saw several unknown principal errors, meaning invalid usernames were being tried. These stopped by packet 4785.

<img width="1232" height="103" alt="image" src="https://github.com/user-attachments/assets/72d1a3f8-cbdf-43ff-8013-5d25717c8182" />

By packet 4817, there was an AS-REQ without any error - this looked like a successful login attempt.

<img width="1704" height="377" alt="image" src="https://github.com/user-attachments/assets/9a38a33f-a3d7-4ac3-b3c4-1bde7f816a65" />

At this point, I realized the Kerberos traffic in the capture must contain the username that successfully authenticated. In these packets:
* `kerberos.CNameString` holds the username
* `kerberos.crealm` contains the domain name

So, by extracting these two fields, I could reconstruct the username in the format DOMAIN\usernameexactly what the challenge asked for.

Rather than combing through every packet manually, I used TShark to automate this:

```bash
tshark -r traffic-1725627206938.pcap -Y "kerberos" \
  -T fields -e kerberos.CNameString -e kerberos.crealm \
  | awk 'NF==2 {print $2 "\\" $1}'
```

This command filtered for Kerberos packets, extracted the username and domain, and combined them in the proper format.

<img width="687" height="135" alt="image" src="https://github.com/user-attachments/assets/01d77048-5ec1-48ad-b98c-378514fcc837" />

The username appears multiple times, but it's all the same account - the one that gave the attacker their foothold on the server.


## Extracting the Last 30 Characters of the Captured Hash

After confirming the username from the previous step, I wanted to find the encrypted data the attacker captured during authentication. Technically, this isn’t a typical “hash” — it’s part of an **AS-REP** packet, which is an encrypted response from the Key Distribution Center. Depending on the environment, this could be encrypted using RC4, AES, or PKINIT.

Knowing the username was `larry.doe`, I filtered the Kerberos packets for that user to find the relevant encrypted cipher data.

First, I listed key fields from all Kerberos packets involving `larry.doe`, including the frame number, to identify where the encrypted blob appeared:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.checksum -e kerberos.cipher -e kerberos.CNameString -e frame.number
```
<img width="1918" height="813" alt="image" src="https://github.com/user-attachments/assets/e620c46d-5731-400a-81be-e9df7a06d6ca" />

From this output, I found the frame just before **4817** contained the encrypted data I needed.

Then, I narrowed down to just the cipher field and grabbed the last occurrence in the capture:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.cipher | tail -n 1
```

<img width="1912" height="431" alt="image" src="https://github.com/user-attachments/assets/593ae8e4-4769-45d7-bbb0-651bcae80b56" />

Finally, I extracted only the last 30 characters from that cipher string using `awk`:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "larry.doe"' \
  -T fields -e kerberos.cipher | tail -n 1 | \
  awk '{print substr($0, length($0)-29)}'
```
<img width="580" height="141" alt="image" src="https://github.com/user-attachments/assets/ecad1a95-4688-41f3-a997-32054a3ee266" />

This gave me exactly the last 30 characters of the encrypted hash the attacker captured.


## Extracting and Cracking the User’s Password

Now that I had the valid Kerberos username my next goal was to find the user’s password.

Looking deeper into the packet capture, I found an AS-REP response for Kerberos 5 using encryption type 23. This was great news because AS-REP data can be extracted and cracked offline, so I didn’t need live access to the server to get the password.

#### Step 1: Locating the AS-REP Packet

I filtered the Kerberos traffic to only show packets related to `Username`, which helped me zero in on the right packet quickly:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y 'kerberos and kerberos.CNameString == "Username"' \
  -T fields -e kerberos.CNameString -e kerberos.crealm \
            -e kerberos.sname_string -e kerberos.checksum \
            -e kerberos.cipher -e kerberos.info_salt \
  | tail -n 1
```

<img width="1908" height="502" alt="image" src="https://github.com/user-attachments/assets/86b89881-5ad4-48aa-9651-f4dc911482e6" />


This revealed the AS-REP cipher data, the encrypted blob needed for cracking.


#### Step 2: Extracting Just the Cipher

Since **Hashcat** only needs the cipher part of the AS-REP packet, I extracted it by filtering the exact frame number where it appeared:

```bash
tshark -r traffic-1725627206938.pcap \
  -Y "frame.number==4817" \
  -T fields -e kerberos.cipher
```

<img width="1903" height="415" alt="image" src="https://github.com/user-attachments/assets/afe6d18c-4fe9-4667-ae90-6b899e9d00ec" />

#### Step 3: Formatting the Hash for Hashcat

**Hashcat** requires the hash in a specific format:

```
$krb5asrep$23$user@DOMAIN:<cipher>
```

To automate this, I combined the cipher with the username and domain using `awk`:

```bash
tshark -r traffic-1725627206938.pcap -Y "frame.number==4817" -T fields -e kerberos.cipher -e kerberos.CNameString -e kerberos.crealm | \
awk -F'\t' '{split($1,a,","); print "$krb5asrep$23$"$2"@"$3":"a[2]}' | \
awk -F':' '{prefix_len=length($1) + 33; print substr($0, 1, prefix_len) "$" substr($0, prefix_len+1)}' | tee -a directory.hash
```

<img width="1908" height="162" alt="image" src="https://github.com/user-attachments/assets/af9030d6-de5f-45b1-84a3-b958b0ea18bf" />

#### Step 4: Cracking the Password

Finally, I saved the hash to a file named `directory.hash` and used Hashcat with mode `18200` for Kerberos AS-REP etype 23. I ran it against the popular `rockyou.txt` wordlist:

```bash
hashcat -a 0 -m 18200 directory.hash /usr/share/wordlists/rockyou.txt
```

Within seconds, Hashcat cracked the password, revealing it in plain text. Mission accomplished.


<img width="1910" height="131" alt="image" src="https://github.com/user-attachments/assets/dc5c6378-c4c9-4239-af52-37327ef30de7" />

## Finding the Second and Third Commands the Attacker Executed

Once I had `Username` credentials, I noticed some interesting traffic headed to port 5985. That's the port used by WinRM, Windows Remote Management, which typically means remote commands are being executed after the attacker logs in. The catch was, all this traffic was encrypted.


Since I already had the password, I decided to try decrypting the traffic. I found a helpful [GitHub Gist](http://gist.github.com/jborean93/d6ff5e87f8a9f5cb215cd49826523045) with Python code for decrypting WinRM data. Instead of cloning the repo, I copied the code into a file:
```bash
nano decrypt.py
```

Then I ran the script using the password I found:
```bash
python3 decrypt.py -p 'Password-U-found' ./traffic-1725627206938.pcap > decrypted_traffic.txt
```

Going through the decrypted output, I spotted a pattern - commands were hidden inside <rsp:Arguments> tags and base64 encoded. So, I extracted those parts into a separate file:
```bash
grep -oP '(?<=<rsp:Arguments>).*?(?=</rsp:Arguments>)' decrypted_traffic.txt > en_args.txt
```

Next, I decoded each encoded chunk and saved the results:
```bash
while read line; do
  echo "$line" | base64 --decode >> arguments.txt
  echo "" >> arguments.txt
done < en_args.txt
```

Opening `arguments.txt`, the first command jumped out - `whoami`. To see the full sequence cleanly, I filtered and formatted it with:
```bash
grep -a '<S N="V">' arguments.txt | awk -F'[<>]' '{print $3}' | awk '
  {print}
  $0 == "$p = $ExecutionContext.SessionState.Path" {count++}
  count == 2 {exit}
'
```

That revealed all the commands run after the attacker logged in, letting me clearly identify the second and third commands:

## FLAG
```bash
grep -a '<S N="V">' arguments.txt | awk -F'[<>]' '{print $3}'
```

### Wrapping Up the Investigation
This lab took me through a realistic attack chain - from initial reconnaissance and port scanning, to uncovering valid credentials, extracting encrypted hashes, cracking the password offline, and finally decrypting the attacker's commands on the system.


Analyzing the network capture taught me how attackers move step-by-step, leaving clues that can be pieced together to reconstruct the full story. It also highlighted the power of tools like Wireshark, TShark, and Hashcat in incident response and forensic investigations.


I hope this walkthrough helps you sharpen your skills in network forensics and threat hunting. Every packet has a story to tell - you just need to know how to listen.
