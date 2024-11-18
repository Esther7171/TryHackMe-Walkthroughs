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
* ```gobuster dir -u <IP> -w /usr/share/wordlists/dirb/common.tx```
* ```curl -s <IP> | grep ".thm"```
```
mafialive.thm
```
Find flag 1
thm{f0und_th3_r1ght_h0st_n4m3}
Correct Answer
Look for a page under development

test.php
Correct Answer
Hint
Find flag 2

thm{explo1t1ng_lf1}
Correct Answer
Hint
Get a shell and find the user flag

thm{lf1_t0_rc3_1s_tr1cky}
Correct Answer
Hint
Task 3
Root the machine
