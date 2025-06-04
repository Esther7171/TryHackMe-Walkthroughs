# <div align='center'>[Alfred](https://tryhackme.com/room/alfred)</div>
<div align='center'>Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/335a1059-b792-4edc-a5e2-ea767b35e798' height='200'></img>
</div>

# Step 1: Recconance 
```
:~$ nmap -sV 10.10.219.84
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-06-04 20:35 IST
Nmap scan report for 10.10.219.84
Host is up (0.19s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE            VERSION
80/tcp   open  http               Microsoft IIS httpd 7.5
3389/tcp open  ssl/ms-wbt-server?
8080/tcp open  http               Jetty 9.4.z-SNAPSHOT
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```
1. The scan shows there are 3 ports open
* `80` with web service.
* `3389` useless
* `8080` jenkins running

The port number 80 as default let take a look

![image](https://github.com/user-attachments/assets/7483aad4-dbc8-4c4c-b387-ae7b2848ea25)

find nothing usefull here 

2. As the Jenkins version is outdated let take a look at it

![image](https://github.com/user-attachments/assets/84cdf8d0-1e7e-4d29-9853-e5010f586658)

Okay let try default credentials `admin:admin`
![image](https://github.com/user-attachments/assets/4b73e5b1-7cf4-4264-a729-729d139a0216)

bingo ! im genious
