# <div align="center">[CherryBlossom - TryhackMe walthrough]()</div>
<div align="center">Boot-to-root with emphasis on crypto and password cracking.</div>
<div align="center">
  
</div>

Initial Recconnace

starting with nmap scan
```
death@esther:~$ nmap -sV -sC 10.48.176.208 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-04-04 17:43 IST
Stats: 0:00:24 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 66.67% done; ETC: 17:44 (0:00:06 remaining)
Nmap scan report for 10.48.176.208
Host is up (0.026s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 21:ee:30:4f:f8:f7:9f:32:6e:42:95:f2:1a:1a:04:d3 (RSA)
|   256 dc:fc:de:d6:ec:43:61:00:54:9b:7c:40:1e:8f:52:c4 (ECDSA)
|_  256 12:81:25:6e:08:64:f6:ef:f5:0c:58:71:18:38:a5:c6 (ED25519)
139/tcp open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp open  netbios-ssn Samba smbd 4.7.6-Ubuntu (workgroup: WORKGROUP)
Service Info: Host: UBUNTU; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.7.6-Ubuntu)
|   Computer name: cherryblossom
|   NetBIOS computer name: UBUNTU\x00
|   Domain name: \x00
|   FQDN: cherryblossom
|_  System time: 2026-04-04T13:13:58+01:00
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-time: 
|   date: 2026-04-04T12:13:58
|_  start_date: N/A
|_nbstat: NetBIOS name: UBUNTU, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled but not required
|_clock-skew: mean: -20m00s, deviation: 34m38s, median: 0s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 25.83 seconds
death@esther:~$ 
```

We found number of running services

## Smb Enemuration

Let map smb
```
death@esther:~$ smbclient -L 10.48.176.208
Password for [WORKGROUP\death]:
Anonymous login successful

	Sharename       Type      Comment
	---------       ----      -------
	Anonymous       Disk      Anonymous File Server Share
	IPC$            IPC       IPC Service (Samba 4.7.6-Ubuntu)
SMB1 disabled -- no workgroup available
```
We have a sharename Anonymous, lets try to access this share
When it prompts you for a password, just hit the enter key and you’ll be logged in.

cool, we are logged in. We can go ahead and look for files that are available on this server


```
death@esther:~$ smbclient //10.48.176.208/anonymous
Password for [WORKGROUP\death]:
Anonymous login successful
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Mon Feb 10 05:52:51 2020
  ..                                  D        0  Sun Feb  9 23:18:18 2020
  journal.txt                         N  3470998  Mon Feb 10 05:50:53 2020

		10253588 blocks of size 1024. 4680260 blocks available
smb: \> get journal.txt 
getting file \journal.txt of size 3470998 as journal.txt (4195.1 KiloBytes/sec) (average 4195.1 KiloBytes/sec)
smb: \>
```
There’s a journal.txt file on the server. Lets download this to our machine using the get command.

command:get journal.txt

We have successfully downloaded the file to our machine. 

The next step now is analyzing the journal.txt file we got from the smb server.i copy the content and past this at cyberchef and got to know this is na pnd converted into base64 format
<img width="1913" height="964" alt="image" src="https://github.com/user-attachments/assets/9c5be878-c7f3-4793-ae45-a1be668e7428" />

So what we can do is decode the base64 encoding into an image.
```
cat journal.txt | base64 -d > output.png
```

<img width="649" height="500" alt="image" src="https://github.com/user-attachments/assets/eddad51d-d14f-48d9-b9f8-05def3ef3ae5" />

we got our output file and its a cherryblosm tree image

the wired part is the image is not even hd still consuming 2.5m of space
let use stegpy 
```
pip3 install --user stegpy --break-system-packages
```
this util not working so i left  in frustruation
