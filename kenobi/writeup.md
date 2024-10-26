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

### Using the nmap command above, how many shares have been found?
```
3
```
### Once you're connected, list the files on the share. What is the file can you see?
```
```



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
* #### Total 7 ports are open. 

#### As Smb is open let enumerate it using nmap,```nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.100.244```
```
└─$ nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.100.244
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-26 11:58 IST
Nmap scan report for 10.10.100.244
Host is up (0.21s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-enum-shares: 
|   account_used: guest
|   \\10.10.100.244\IPC$: 
|     Type: STYPE_IPC_HIDDEN
|     Comment: IPC Service (kenobi server (Samba, Ubuntu))
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\tmp
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.100.244\anonymous: 
|     Type: STYPE_DISKTREE
|     Comment: 
|     Users: 0
|     Max Users: <unlimited>
|     Path: C:\home\kenobi\share
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.100.244\print$: 
|     Type: STYPE_DISKTREE
|     Comment: Printer Drivers
|     Users: 0
|     Max Users: <unlimited>
|     Path: C:\var\lib\samba\printers
|     Anonymous access: <none>
|_    Current user access: <none>

Nmap done: 1 IP address (1 host up) scanned in 30.33 seconds
```
* #### We have 3 share r listed here , let try to connect with anonymous share.
```
└─$ smbclient //10.10.100.244/anonymous
Password for [WORKGROUP\death]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Wed Sep  4 16:19:09 2019
  ..                                  D        0  Wed Sep  4 16:26:07 2019
  log.txt                             N    12237  Wed Sep  4 16:19:09 2019

		9204224 blocks of size 1024. 6874796 blocks available
```
* #### Here is a log.tx , let download this to our system.
```
smb: \> get log.txt 
getting file \log.txt of size 12237 as log.txt (15.0 KiloBytes/sec) (average 15.0 KiloBytes/sec)
smb: \> 
```
* #### I attached a copy of log.txt in this repo.
* 





























































<!--
<div align="center">
<img src="" height=""></img>
</div>
