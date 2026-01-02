# <div align="center">[Opacity TryHackMe walkthrough](https://tryhackme.com/room/opacity)</div>
<div align="center">Opacity is a Boot2Root made for pentesters and cybersecurity enthusiasts.</div>
<div align="center">
  <img width="200" height="200" alt="Opacity-thm" src="https://github.com/user-attachments/assets/afa6e290-e01f-4b51-b358-461a1e94ee0c" />  
</div>


### Initial Reconnaissance

I kicked things off with a quick version scan using Nmap to identify exposed services on the target host.

```
$ nmap -sV 10.49.143.123

PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http        Apache httpd 2.4.41 ((Ubuntu))
139/tcp open  netbios-ssn Samba smbd 4.6.2
445/tcp open  netbios-ssn Samba smbd 4.6.2
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

The scan confirmed the host was reachable and exposed a small but interesting attack surface:

• SSH running on port `22`
• Apache web server exposed on port `80`
• SMB services available on ports `139` and `445`

With HTTP in play, the browser became the next obvious stop.
---

### Web Enumeration

Visiting the web service on port 80 landed me on a login page.

<img width="830" height="246" alt="login page on port 80" src="https://github.com/user-attachments/assets/b19c4ff2-2e69-4ed3-aa0d-0e93331ca515" />

I tested a couple of default credentials just to rule out the obvious, but nothing clicked. Instead of burning cycles there, I shifted focus to directory enumeration to see what else the web server was willing to expose.

```
~$ dirsearch -u 10.49.143.123

Target: http://10.49.143.123/

[22:26:42] Starting: 
[22:26:46] 403 -  278B  - /.ht_wsr.txt
[22:26:46] 403 -  278B  - /.htaccess.sample
[22:26:46] 403 -  278B  - /.htaccess_extra
[22:26:46] 403 -  278B  - /.htaccess_orig
[22:26:46] 403 -  278B  - /.htaccess.bak1
[22:26:46] 403 -  278B  - /.htaccess_sc
[22:26:46] 403 -  278B  - /.htaccess.save
[22:26:46] 403 -  278B  - /.htaccess.orig
[22:26:46] 403 -  278B  - /.htaccessOLD2
[22:26:46] 403 -  278B  - /.html
[22:26:46] 403 -  278B  - /.htm
[22:26:46] 403 -  278B  - /.htaccessOLD
[22:26:46] 403 -  278B  - /.htaccessBAK
[22:26:46] 403 -  278B  - /.httr-oauth
[22:26:46] 403 -  278B  - /.htpasswd_test
[22:26:46] 403 -  278B  - /.htpasswds
[22:26:47] 403 -  278B  - /.php
[22:26:57] 301 -  314B  - /cloud  ->  http://10.49.143.123/cloud/
[22:26:57] 200 -  393B  - /cloud/
[22:26:59] 301 -  312B  - /css  ->  http://10.49.143.123/css/
[22:27:05] 200 -  381B  - /login.php
[22:27:13] 403 -  278B  - /server-status
[22:27:13] 403 -  278B  - /server-status/

Task Completed
```

The scan returned multiple forbidden paths and a handful of valid responses. One directory stood out immediately: `/cloud`. That was worth a closer look.

```
~$ dirsearch -u 10.49.143.123/cloud

Target: http://10.49.143.123/

[22:30:31] Starting: cloud/
[22:30:33] 403 -  278B  - /cloud/.ht_wsr.txt
[22:30:33] 403 -  278B  - /cloud/.htaccess.orig
[22:30:33] 403 -  278B  - /cloud/.htaccess.save
[22:30:33] 403 -  278B  - /cloud/.htaccess.bak1
[22:30:33] 403 -  278B  - /cloud/.htaccess_extra
[22:30:33] 403 -  278B  - /cloud/.htaccess_sc
[22:30:33] 403 -  278B  - /cloud/.htaccessBAK
[22:30:33] 403 -  278B  - /cloud/.htaccess_orig
[22:30:33] 403 -  278B  - /cloud/.htaccess.sample
[22:30:33] 403 -  278B  - /cloud/.htaccessOLD
[22:30:33] 403 -  278B  - /cloud/.htm
[22:30:33] 403 -  278B  - /cloud/.htpasswd_test
[22:30:33] 403 -  278B  - /cloud/.html
[22:30:33] 403 -  278B  - /cloud/.htaccessOLD2
[22:30:33] 403 -  278B  - /cloud/.htpasswds
[22:30:33] 403 -  278B  - /cloud/.httr-oauth
[22:30:33] 403 -  278B  - /cloud/.php
[22:30:51] 301 -  321B  - /cloud/images  ->  http://10.49.143.123/cloud/images/
[22:30:52] 200 -  400B  - /cloud/index.php
[22:30:52] 200 -  404B  - /cloud/index.php/login/

Task Completed
```

This second pass revealed additional endpoints, including `/cloud/index.php` and a nested login path. Navigating to the cloud endpoint in the browser brought up a new interface.

<img width="1162" height="551" alt="image" src="https://github.com/user-attachments/assets/1103fb51-ab2c-43bb-a604-3c188b58ef27" />


The page introduced itself as a personal cloud storage service with a time-limited file upload feature, which clearly marked it as a component worth paying close attention to moving forward.
