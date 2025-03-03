# <div align="center">Lo-Fi</div>
<div align="center">Want to hear some lo-fi beats, to relax or study to? We've got you covered!</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/2913182e-1239-4f21-acb7-6a44e9b510e6" height="200"></img>
</div>

## Task 1. Lo-Fi
### Climb the filesystem to find the flag!
```
flag{e4478e0eab69bd642b8238765dcb7d18}
```
## 1. Reconnaissance

### Nmap Scan
To begin, perform an initial reconnaissance scan using `nmap` to identify open ports and running services:

```bash
nmap -sV -sC <ip>
```

#### Nmap Scan Results
```
death@esther:~$ nmap -sV -sC 10.10.63.207
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-03-03 22:43 IST
Nmap scan report for 10.10.63.207
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   3072 01:71:46:d9:02:03:cc:99:34:ef:a5:76:2f:0a:14:26 (RSA)
|   256 1d:17:a1:93:4f:ef:49:0e:3f:e3:01:23:0b:1a:45:d5 (ECDSA)
|_  256 60:b3:b1:1b:f0:f5:81:61:01:3f:ed:ab:37:5e:2c:ad (ED25519)
80/tcp open  http    Apache httpd 2.2.22 ((Ubuntu))
|_http-title: Lo-Fi Music
|_http-server-header: Apache/2.2.22 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

Since HTTP (port 80) is open, we navigate to the website.
<div align="center">
  <img src="https://github.com/user-attachments/assets/be839fbc-c6ef-419c-90c4-aeec9c193782" height=""></img>
</div>

---

## 2. Website Analysis
Upon exploring the website, it appears to host five song videos. When clicking on a video, the URL structure includes a query and path parameter, suggesting a potential Local File Inclusion (LFI) vulnerability.

<div align="center">
  <img src="https://github.com/user-attachments/assets/c2a5ac72-c0b2-40f8-b3a9-8e8c34cdc285" height=""></img>
</div>

---

## 3. Exploitation: LFI Attack
To confirm the LFI vulnerability, we attempt to access the `/etc/passwd` file by modifying the URL:

```bash
../../../../etc/passwd
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/33eacf4d-c519-4d37-8258-5241568a1334" height=""></img>
</div>

The inclusion of `/etc/passwd` confirms the vulnerability. Now, let's attempt to locate the flag.

---

## 4. Capturing the Flag

Since this worked, I attempted to retrieve the flag. After a few failed attempts, I finally found it. Initially, I thought it would be `User flag.txt`, but surprisingly, it was much simpler than I expected!

```bash
../../../../flag.txt
```
<div align="center">
  <img src="https://github.com/user-attachments/assets/5f0681cd-3432-4400-a772-4234e673e9ca" height=""></img>
</div>

---

