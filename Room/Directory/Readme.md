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
Answer format: ******************************
```

### What is the user's password?
```
Answer format: **********
```

### What were the second and third commands that the threat actor executed on the system? Format: command1,command2
```
Answer format: *** **** ****\****** *:\******,*** **** ****\*** *:\***
```
### What is the flag?
```
Answer format: ***{**_***_********}
```

## HII

#### Finding Open Ports
The first step is to identify which ports the attacker found open. In network forensics, an open port is confirmed when a target responds to a TCP SYN with a SYN+ACK, completing part of the three-way handshake. Since we have a .pcap file, we can use TShark (Wireshark's command-line tool) to pull this info."
```bash
tshark -r traffic-1725627206938.pcap -c 3000 -T fields -e tcp.srcport -Y "tcp.flags.syn == 1 && tcp.flags.ack == 1" | sort -n | uniq | paste -sd ','
```
Explanation:
* `-r` traffic.pcap → Read from the PCAP file.
* `-c 3000` → Limit reading to the first 3000 packets for faster processing (enough to cover the scan).
* `-Y` → Apply a display filter for SYN+ACK responses.
* `-T` fields → Output in field format instead of full packet details.
* `-e` tcp.srcport → Extract the source port field.
* `sort -n | uniq` → Remove duplicates and sort.
* `paste -sd ','` → Join results into a single comma-separated line.

<img width="639" height="136" alt="image" src="https://github.com/user-attachments/assets/d5373bb4-1fc4-4404-848a-c337b8ec3fc8" />


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




