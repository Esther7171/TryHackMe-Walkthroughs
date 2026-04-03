<div align="center">[Lian_Yu - TryhackMe walkthrough](https://tryhackme.com/room/lianyu)</div>
<div align="center">A beginner level security challenge</div>
<div align="center">
  
</div>
## Task 1. Find the Flags
Welcome to Lian_YU, this Arrowverse themed beginner CTF box! Capture the flags and have fun.

### Deploy the VM and Start the Enumeration.
```bash
No answer needed
```
### What is the Web Directory you found?
```
```

### what is the file name you found?
```
```

### what is the FTP Password?
```
```

### what is the file name with SSH password?
```
```
### user.txt
```
```
### root.txt
```
```

Initial Recconnace 

Starting with Nmap scan 
```
nmap -sV -sC 10.49.161.195
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-04-03 20:01 IST
Nmap scan report for 10.49.161.195
Host is up (0.030s latency).
Not shown: 996 closed tcp ports (conn-refused)
PORT    STATE SERVICE VERSION
21/tcp  open  ftp     vsftpd 3.0.2
22/tcp  open  ssh     OpenSSH 6.7p1 Debian 5+deb8u8 (protocol 2.0)
| ssh-hostkey: 
|   1024 56:50:bd:11:ef:d4:ac:56:32:c3:ee:73:3e:de:87:f4 (DSA)
|   2048 39:6f:3a:9c:b6:2d:ad:0c:d8:6d:be:77:13:07:25:d6 (RSA)
|   256 a6:69:96:d7:6d:61:27:96:7e:bb:9f:83:60:1b:52:12 (ECDSA)
|_  256 3f:43:76:75:a8:5a:a6:cd:33:b0:66:42:04:91:fe:a0 (ED25519)
80/tcp  open  http    Apache httpd
|_http-server-header: Apache
|_http-title: Purgatory
111/tcp open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100024  1          33119/udp   status
|   100024  1          36560/tcp   status
|   100024  1          42244/tcp6  status
|_  100024  1          54098/udp6  status
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```

Web Enemuration
