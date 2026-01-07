# <div align="center">[Clocky TryHackMe walkthrough](https://tryhackme.com/room/clocky)</div>
<div align="center">Time is an illusion.</div>
<div align="center">
  <img width="200" height="200" alt="clocky" src="https://github.com/user-attachments/assets/6de5dbc0-add7-45c2-ab71-9bbccab2459d" />
</div>
<div align="center"></div>

## Introduction

## Initial Reconnaissance

I started with a basic nmap scan to understand what services were exposed on the target.

```
~$ nmap -sV 10.49.166.98
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-01-07 19:03 IST
Nmap scan report for 10.49.166.98
Host is up (0.084s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.41
8000/tcp open  http    nginx 1.18.0 (Ubuntu)
Service Info: Host: ip-10-49-166-98.ap-south-1.compute.internal; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

There are 3 ports open.

* ssh on port `22`
* http on port `80` with apache 2.4.41
* that shocking another nginx is also running on port `8000` with 1.18.0

## Web Enumeration

I also checked both web services directly in the browser since ports 80 and 8000 were open.

I started with port 80.

<img width="445" height="139" alt="image" src="https://github.com/user-attachments/assets/ed3b6efd-1f1d-4842-9606-3ddf90239d16" />

The Apache service responded with a forbidden page. Nothing useful surfaced there.

Next, I peeked into port 8000.

<img width="247" height="99" alt="image" src="https://github.com/user-attachments/assets/642b06e0-14ea-424d-9dd3-17d391c1e80e" />

Sadly, this one also returned a forbidden response. Both services were accessible but clearly locked down at the surface level.

Since both port 80 and 8000 were serving HTTP, I began with the Apache service on port 80.

```
~$ dirsearch -u 10.49.166.98

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460


Target: http://10.49.166.98/

[19:06:40] Starting: 

Task Completed
```

Nothing interesting showed up on port 80, so I shifted focus to the nginx service running on port 8000.

```
~$ dirsearch -u 10.49.166.98:8000

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460


Target: http://10.49.166.98:8000/

[19:07:06] Starting: 
[19:07:35] 200 -    2KB - /index.zip
[19:07:47] 200 -  115B  - /robots.txt

Task Completed
```

Two endpoints immediately stood out: `/index.zip` and `/robots.txt`.

I checked the robots file first.

```
curl -s http://10.49.166.98:8000/robots.txt
```

### We got our first flag here

```
~$ curl -s http://10.49.166.98:8000/robots.txt
User-agent: *
Disallow: /*.sql$
Disallow: /*.zip$
Disallow: /*.bak$

Flag 1: THM{14b45bb9eefdb584b79063eca6a31b7a}
~$ 
```

Next, I moved on to the zip file exposed on the same port.

```bash
~$ wget http://10.49.166.98:8000/index.zip
~$ unzip index.zip 
Archive:  index.zip
  inflating: app.py                  
 extracting: flag2.txt               
```
## After unzipping, we got our second flag

```
~$ cat flag2.txt
THM{1d3d62de34a3692518d03ec474159eaf}
```

That confirmed the second flag.

