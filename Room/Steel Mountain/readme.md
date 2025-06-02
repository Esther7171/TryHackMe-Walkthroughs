# <div align='center'>[Steel Mountain](https://tryhackme.com/room/steelmountain)</div>
<div align='center'>Hack into a Mr. Robot themed Windows machine. Use metasploit for initial access, utilise powershell for Windows privilege escalation enumeration and learn a new technique to get Administrator access.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/771d82ac-78ff-4d34-b7ba-b4498f3b75ed' height='200'></img>
</div>

## Task 1. Introduction


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

```
### What is the CVE number to exploit this file server?
```
```
### Use Metasploit to get an initial shell. What is the user flag?

```
```

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



