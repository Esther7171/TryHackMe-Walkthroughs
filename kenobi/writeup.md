# <div align="center">[kenobi](https://tryhackme.com/r/room/kenobi)</div>
<div align="center">
<img src="https://github.com/user-attachments/assets/87cc5aeb-1a06-43b3-93fe-9533cd3f9402" height="200"></img>
</div>




## Task 1. Deploy the vulnerable machine
<div align="center">
<img src="https://i.imgur.com/OcA2KrK.gif" height="200"></img>
</div>

This room will cover accessing a Samba share, manipulating a vulnerable version of proftpd to gain initial access and escalate your privileges to root via an SUID binary.
Answer the questions below

### Scan the machine with nmap, how many ports are open?
```
7
```
## Task 2.Enumerating

<div align="center">
<img src="https://i.imgur.com/O8S93Kr.png" height="200"></img>
</div>

Samba is the standard Windows interoperability suite of programs for Linux and Unix. It allows end users to access and use files, printers and other commonly shared resources on a companies intranet or internet. Its often referred to as a network file system.

Samba is based on the common client/server protocol of Server Message Block (SMB). SMB is developed only for Windows, without Samba, other computer platforms would be isolated from Windows machines, even if they were part of the same network.







# Let start Scanning The Network

```
└─$ nmap 10.10.100.244 -sV -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-26 11:48 IST
Nmap scan report for 10.10.100.244
Host is up (0.21s latency).
Not shown: 993 closed tcp ports (reset)
PORT     STATE SERVICE     VERSION
21/tcp   open  ftp         ProFTPD 1.3.5
22/tcp   open  ssh         OpenSSH 7.2p2 Ubuntu 4ubuntu2.7 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http        Apache httpd 2.4.18 ((Ubuntu))
111/tcp  open  rpcbind     2-4 (RPC #100000)
139/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
2049/tcp open  nfs         2-4 (RPC #100003)
Service Info: Host: KENOBI; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 136.33 seconds
```
#### * Total 7 ports are open. 



<!--
<div align="center">
<img src="" height=""></img>
</div>
