# <div align="center">Silver Platter</div>
<div align="center">Can you breach the server?</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/5d49e885-e0d8-4058-a8ea-eb23b7bf8b2a" height="200"></img>
</div>


Recone
Let start with the Network Scan
```
death@esther:~$ nmap 10.10.12.168 -sV -sC
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-03-02 18:30 IST
Nmap scan report for 10.10.12.168
Host is up (0.16s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.9p1 Ubuntu 3ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 1b:1c:87:8a:fe:34:16:c9:f7:82:37:2b:10:8f:8b:f1 (ECDSA)
|_  256 26:6d:17:ed:83:9e:4f:2d:f6:cd:53:17:c8:80:3d:09 (ED25519)
80/tcp   open  http       nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Hack Smarter Security
8080/tcp open  http-proxy
|_http-title: Error
| fingerprint-strings: 
|   FourOhFourRequest, HTTPOptions: 
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Sun, 02 Mar 2025 13:01:19 GMT
|     <html><head><title>Error</title></head><body>404 - Not Found</body></html>
|   GenericLines, Help, Kerberos, LDAPSearchReq, LPDString, RTSPRequest, SMBProgNeg, SSLSessionReq, Socks5, TLSSessionReq, TerminalServerCookie: 
|     HTTP/1.1 400 Bad Request
|     Content-Length: 0
|     Connection: close
|   GetRequest: 
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Sun, 02 Mar 2025 13:01:18 GMT
|_    <html><head><title>Error</title></head><body>404 - Not Found</body></html>
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 115.03 seconds
```
As We can See there are 3 services that are runnig 
* `SSH` on port `22`.
* `Http` on port `80`.
* `Http-proxy` on port `8080`.

First Let take a look at web,

![image](https://github.com/user-attachments/assets/c4748ed9-d6ae-43e9-a79a-db1dd7698d48)

After navigating a little through it, I came accros something interesting. In /contact, there some content that leaks the username: scr1ptkiddy. Maybe it will be useful for brute-forcing a form or something, at least that’s what I though initially, but this wasn’t the case. Some other crucial info is mentioned, but I’ll come to it later.

![image](https://github.com/user-attachments/assets/ff2b6fc3-8f54-4fda-99d8-f0c5da2bf76c)

I didn't find anything good let Enemurate the directory.
```
death@esther:~$ dirsearch -u 10.10.12.168 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.12.168/_25-03-02_18-45-59.txt

Target: http://10.10.12.168/

[18:45:59] Starting: 
[18:46:31] 301 -  178B  - /assets  ->  http://10.10.12.168/assets/
[18:46:31] 403 -  564B  - /assets/
[18:46:50] 301 -  178B  - /images  ->  http://10.10.12.168/images/
[18:46:50] 403 -  564B  - /images/
[18:46:54] 200 -   17KB - /LICENSE.txt
[18:47:08] 200 -  771B  - /README.txt

Task Completed
death@esther:~$ 
```
