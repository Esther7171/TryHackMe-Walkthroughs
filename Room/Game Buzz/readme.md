# <div align='center'>[GameBuzz](https://tryhackme.com/room/gamebuzz)</div>
<div align='center'>Part of Incognito CTF</div>
<div align='center'>
  <img alt="gamebuzz" src="https://github.com/user-attachments/assets/b82d2e36-8800-4cd3-98a7-388c3ff47c7b" height='200'></img>
</div>

St1p 1: Recconance

Let scan the Network:
```bash
~$ nmap 10.10.205.198 -sV -sC -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-06-08 11:55 IST
Nmap scan report for 10.10.205.198
Host is up (0.17s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Incognito
|_http-server-header: Apache/2.4.29 (Ubuntu)
```
