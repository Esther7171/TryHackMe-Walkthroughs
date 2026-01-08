# <div align="center">[CyberHeros TryHackMe writeup](https://tryhackme.com/room/cyberheroes)</div>
<div align="center">Want to be a part of the elite club of CyberHeroes? Prove your merit by finding a way to log in!</div>
<div align="center">
  <img width="200" height="200" alt="cyberheros" src="https://github.com/user-attachments/assets/48fab9e4-d9be-4326-971c-e92dcd0dd880" />
</div>

## Introduction

CyberHeroes is a beginner-level TryHackMe room focused on breaking weak client-side authentication by inspecting exposed web logic. The goal is to find a way to log in using what the application itself reveals.

**Room link:** [https://tryhackme.com/room/cyberheroes](https://tryhackme.com/room/cyberheroes)

## Initial Reconnaissance

I started with a basic Nmap scan to understand what services were exposed on the target.

```
~$ nmap -sV 10.48.153.105

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.48 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

There are two services running:

• SSH on port 22
• HTTP on port 80

## Web Exploitation

Since port 80 was open, I navigated to it directly in the browser.

<div align="center">
  <img width="1904" height="603" alt="image" src="https://github.com/user-attachments/assets/4fef4abe-00bf-43a8-8873-0eda664108a3" />
</div>

The landing page turned out to be a simple index page with three tabs, including an About section and a Login page.

<div align="center"> 
  <img width="699" height="525" alt="image" src="https://github.com/user-attachments/assets/63b72438-1b6b-4fec-983d-590738fd50c7" />
</div>

The login page displayed a familiar challenge message inviting me to prove my hacking skills. With no credentials available upfront, I checked the page source and came across the following JavaScript block:

<div align="center">
  <img width="875" height="336" alt="image" src="https://github.com/user-attachments/assets/2ccb4f61-6df9-474a-9108-02c92b277f47" />
</div>

This is where everything clicked. The script validates the input by checking a hardcoded username and a reversed password string.

```
if (a.value=="h3ck3rBoi" & b.value==RevereString("54321@terceSrepuS"))
```

Reversing the string reveals the password as `SuperSecret@12345`. With that, the required credentials became clear.

**Username**

```
h3ck3rBoi
```

**Password**

```
SuperSecret@12345
```

## Capturing the Flag

After logging in with the above credentials, the page returned the flag.

<div align="center">
  <img width="709" height="264" alt="image" src="https://github.com/user-attachments/assets/d5739441-4428-465b-ae58-b16492b16fa6" />
</div>

```
flag{edb0be532c540b1a150c3a7e85d2466e}
```

## Conclusion

CyberHeroes was a short but clean room that reinforced a core lesson I keep coming back to: never ignore what the client side is doing. A simple look at exposed JavaScript was enough to break the authentication logic and reach the goal. No noise, no detours, just paying attention to what was already in plain sight.

Thanks for taking the time to read this walkthrough.

<div align="center">
  <img width="658" height="590" alt="image" src="https://github.com/user-attachments/assets/2e614a5f-ff37-4aed-97ca-3c5ebfd4036f" />
</div>
