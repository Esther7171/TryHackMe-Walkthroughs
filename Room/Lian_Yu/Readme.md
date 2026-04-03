# <div align="center">[Lian_Yu - TryhackMe walkthrough](https://tryhackme.com/room/lianyu)</div>
<div align="center">A beginner level security challenge</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/af788293-2527-4656-8dc2-2db94d4e01b7" height="200" width="200"></img>
</div>

## Task 1. Find the Flags
Welcome to Lian_YU, this Arrowverse themed beginner CTF box! Capture the flags and have fun.

### Deploy the VM and Start the Enumeration.
```bash
No answer needed
```
### What is the Web Directory you found?
```
```

### what is the file name you found?
```
```

### what is the FTP Password?
```
```

### what is the file name with SSH password?
```
```
### user.txt
```
```
### root.txt
```
```

Initial Recconnace 

Starting with Nmap scan 
```
nmap -sV -sC 10.49.161.195
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-04-03 20:01 IST
Nmap scan report for 10.49.161.195
Host is up (0.030s latency).
Not shown: 996 closed tcp ports (conn-refused)
PORT    STATE SERVICE VERSION
21/tcp  open  ftp     vsftpd 3.0.2
22/tcp  open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
| ssh-hostkey: 
|   1024 56:50:bd:11:ef:d4:ac:56:32:c3:ee:73:3e:de:87:f4 (DSA)
|   2048 39:6f:3a:9c:b6:2d:ad:0c:d8:6d:be:77:13:07:25:d6 (RSA)
|   256 a6:69:96:d7:6d:61:27:96:7e:bb:9f:83:60:1b:52:12 (ECDSA)
|_  256 3f:43:76:75:a8:5a:a6:cd:33:b0:66:42:04:91:fe:a0 (ED25519)
80/tcp  open  http    Apache httpd
|_http-server-header: Apache
|_http-title: Purgatory
111/tcp open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          33119/udp   status
|   100024  1          36560/tcp   status
|   100024  1          42244/tcp6  status
|_  100024  1          54098/udp6  status
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

Web Enemuration

Let Nevigate to web 

<img width="1891" height="957" alt="image" src="https://github.com/user-attachments/assets/a483707b-ac54-47f3-a7f9-8b6c578a6ead" />

Didnt find anything suspecis let dig deeper

```
death@esther:~$ dirsearch -u http://10.49.161.195 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt 

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 220544

Output File: /home/death/reports/http_10.49.161.195/_26-04-03_20-13-50.txt

Target: http://10.49.161.195/

[20:13:50] Starting: 
[20:14:30] 301 -  236B  - /island  ->  http://10.49.161.195/island/
[20:18:22] 403 -  199B  - /server-status

Task Completed
```

We got a new page called `/island`
Afert looking source code i got this hiddden keyword

<img width="1920" height="406" alt="image" src="https://github.com/user-attachments/assets/ea6d9390-00e4-4cda-838c-a195bfe9d486" />

Maybe this is somthing

Its maybe a pass or username of any service like ftp,ssh  

```
vigilante
```

The issue is we dont not pass even thi is username  
let dig more deeper

```
death@esther:~$ dirsearch -u http://10.49.161.195/island/ -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 220544

Output File: /home/death/reports/http_10.49.161.195/_island__26-04-03_20-25-42.txt

Target: http://10.49.161.195/

[20:25:42] Starting: island/
[20:26:01] 301 -  241B  - /island/2100  ->  http://10.49.161.195/island/2100/

Task Completed
death@esther:~$ 
```

we got another hidden directory `/2100`

<img width="740" height="638" alt="image" src="https://github.com/user-attachments/assets/95b044e6-857e-4a21-a034-8114b53cc070" />

sO THERE IS NOTHING COOLER SO LET DIG MORE 

```
death@esther:~$ dirsearch -u http://10.49.161.195/island/2100 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 220544

Output File: /home/death/reports/http_10.49.161.195/_island__26-04-03_20-25-42.txt

Target: http://10.49.161.195/

[20:25:42] Starting: island/2100
[20:26:01] 301 -  241B  - /green_arrow.ticket  ->  http://10.49.161.195/island/2100/green_arrow.ticket

Task Completed
death@esther:~$
```

We got a hiddent page again `/green_arrow.ticket` after opig we got this msg 

<img width="455" height="124" alt="image" src="https://github.com/user-attachments/assets/30091d5a-ec70-4d66-a0f1-d4f16ff20d3d" />

this is some kind of a pass let try to decode this `RTy8yhBQdscX`
After analysing the patter i got to know this is base58 let decode the phase

<img width="1920" height="935" alt="image" src="https://github.com/user-attachments/assets/ac068391-589a-4e90-b50b-5517b49adad7" />

And maybe this is ftp password `!#th3h00d`

## Gaining Access Of FTP
Let use above found phase and this as ftp pass
```
death@esther:~$ ftp 10.49.161.195
Connected to 10.49.161.195.
220 (vsFTPd 3.0.2)
Name (10.49.161.195:death): vigilante
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```

---

## Initial Reconnaissance

I kicked things off with a full service and version scan to map the exposed attack surface. Instead of running a basic scan, I enabled default scripts along with version detection to get maximum visibility in one go.

```
nmap -sV -sC 10.49.161.195
```

The scan quickly revealed a small but interesting set of open services:

* FTP running on port 21
* SSH exposed on port 22
* A web server on port 80
* RPC service on port 111

The presence of FTP alongside a web service immediately stood out. In many cases, misconfigured FTP services become an easy entry point, so I kept that in mind as I moved forward.

---

## Web Enumeration

With the web server exposed, I shifted focus to port 80 and opened the target in the browser.

<img width="1891" height="957" alt="image" src="https://github.com/user-attachments/assets/a483707b-ac54-47f3-a7f9-8b6c578a6ead" />

At first glance, nothing useful was visible on the surface. No obvious inputs, no leaks, nothing actionable. That usually means one thing. Time to dig deeper.

---

## Directory Bruteforcing

I started enumerating hidden paths using `dirsearch` with a well-known wordlist.

```
dirsearch -u http://10.49.161.195 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
```

The scan returned an interesting directory:

```
/island
```

That gave me a new attack vector to explore.

---

## Hidden Clues in Source Code

After navigating to `/island`, I checked the page source instead of just relying on what was rendered.

<img width="1920" height="406" alt="image" src="https://github.com/user-attachments/assets/ea6d9390-00e4-4cda-838c-a195bfe9d486" />

Inside the source, I found a hidden keyword:

```
vigilante
```

At this stage, it looked like a potential username. It could be tied to FTP or SSH, but without a password, it was not immediately usable. Still, it was a valuable piece of intel, so I noted it down and continued enumerating.

---

## Deeper Enumeration

I pushed further into the `/island` directory with another round of directory brute forcing.

```
dirsearch -u http://10.49.161.195/island/ -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
```

This revealed another hidden path:

```
/island/2100
```

Opening it in the browser did not immediately reveal anything useful.

<img width="740" height="638" alt="image" src="https://github.com/user-attachments/assets/95b044e6-857e-4a21-a034-8114b53cc070" />

So I continued the same process and enumerated further.

```
dirsearch -u http://10.49.161.195/island/2100 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
```

This time, I discovered a file:

```
/island/2100/green_arrow.ticket
```

---

## Extracting Credentials

Opening the file revealed an encoded string.

<img width="455" height="124" alt="image" src="https://github.com/user-attachments/assets/30091d5a-ec70-4d66-a0f1-d4f16ff20d3d" />

```
RTy8yhBQdscX
```

The format suggested it was not random. After analyzing the pattern, I identified it as Base58 encoding. I decoded it to retrieve the original value.

<img width="1920" height="935" alt="image" src="https://github.com/user-attachments/assets/ac068391-589a-4e90-b50b-5517b49adad7" />

The decoded output gave me a potential password:

```
!#th3h00d
```

At this point, I had a likely username and password combination gathered through enumeration. The next step was to validate where these credentials could be used.
