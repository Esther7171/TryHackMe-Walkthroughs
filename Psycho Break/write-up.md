# <div align="center">[Psycho Break]()</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/ca628bef-9aed-4bc0-8771-845248048b64" height="200"></img>
</div>

# Task 1. Recon
This room is based on a video game called evil within. I am a huge fan of this game. So I decided to make a CTF on it. With my storyline :). Your job is to help Sebastian and his team of investigators to withstand the dangers that come ahead.

## How many ports are open?
```
3
```
## What is the operating system that runs on the target machine?
```
ubuntu
```

# Task 2. Web
Here comes the web.

## Key to the looker room
```
532219a04ab7a02b56faafbec1a4c1ea
```
## Key to access the map
```
Grant_me_access_to_the_map_please
```
## The Keeper Key
```
```
## What is the filename of the text file (without the file extension)
```
```





# Scanning Network

```
death@esther:~$ nmap 10.10.189.12 -sV 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-03 06:52 IST
Nmap scan report for 10.10.189.12
Host is up (0.16s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     ProFTPD 1.3.5a
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 24.37 seconds
```
## There are 3 services running:
* ### FTP on port 21.
* ### SSH on port 22.
* ### HTTP on port 80. 

## In FTP anonymous is not allowed rather than wasting time let take a look hosted website,


<div align="center">
  <img src="https://github.com/user-attachments/assets/307ef34a-22ab-446b-9351-2099c3a3a4a6" height="400"></img>
</div>

## As i view the source code i found this

<div align="center">
  <img src="https://github.com/user-attachments/assets/ba689057-ee6c-405f-9245-102a189d15b2" height="400"></img>
</div>

## A loction to new page ```/sadistRoom```

<div align="center">
  <img src="https://github.com/user-attachments/assets/8050e716-75b6-40c1-ae8f-8255196d922c" height="400"></img>
</div>

## So here is a key as we tap on the link a alert prompt appers

<div align="center">
  <img src="https://github.com/user-attachments/assets/0ed3c029-7175-4428-985d-d2fa06ec1f6c" height=""></img>
</div>

## We need to enter key fast or this page will appear

<div align="center">
  <img src="https://github.com/user-attachments/assets/e035b639-de8e-4912-a588-898007f58b5d" height=""></img>
</div>

## Here is the key to locker room.
```
532219a04ab7a02b56faafbec1a4c1ea
```
## After entering the key Here is the new page

<div align="center">
  <img src="https://github.com/user-attachments/assets/9f0f9806-a5c5-4070-9e8e-196b7ae57471" height=""></img>
</div>

## We need to decode this message to get access key of map
```
Tizmg_nv_zxxvhh_gl_gsv_nzk_kovzhv
```
## As i identify this is Atbash cipher

<div align="center">
  <img src="https://github.com/user-attachments/assets/8604b702-a33f-4bc1-81ee-12960b42c036" height=""></img>
</div>

## Here is the access key
```
Grant_me_access_to_the_map_please
```
## Let enter the key 

<div align="center">
  <img src="https://github.com/user-attachments/assets/70220870-bca5-4c20-9af9-3ead9b090372" height=""></img>
</div>

## SO here are some page listed

<div align="center">
  <img src="https://github.com/user-attachments/assets/54fdf8e9-aacd-45c5-9cd4-6f3ffce22f3d" height=""></img>
</div>

## Let Visite the safe heaven

<div align="center">
  <img src="https://github.com/user-attachments/assets/312bd0d0-d505-489e-b8dc-76f1bf57138b" height=""></img>
</div>

### This is how this page looks like nothing much let take a look at source code.


<div align="center">
  <img src="https://github.com/user-attachments/assets/cd7b1d59-5c45-4ce7-b619-5c5f60cb2ae8" height=""></img>
</div>

* ### The term ‘search’ meam is clue to find more like enumerate directory.

## Before doing that let look at The Abandoned Room.

<div align="center">
  <img src="https://github.com/user-attachments/assets/5b8c7f89-af06-4225-95f8-6e8bc7581807" height=""></img>
</div>

## It asking key so let Enumerate first.

https://systemweakness.com/tryhackme-psycho-break-writeup-b508bbad0243



<!--
<div align="center">
  <img src="" height=""></img>
</div>
