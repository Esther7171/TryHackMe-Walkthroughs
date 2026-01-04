# <div align="center">[Neighbour TryHackMe Walkthrough](https://tryhackme.com/room/neighbour)</div>
<div align="center"></div>
<div align="center">
  
</div>


## Initial Reconnaissance

Even though this is an IDOR-focused room, I started with a quick Nmap scan to check exposed services.

```
~$ nmap -sV 10.49.151.21
```

The scan completed cleanly and confirmed that the host was reachable. Only two TCP ports were open.

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5
80/tcp open  http    Apache httpd 2.4.53
```
SSH was open, but the web service on port 80 was clearly the main attack surface.

## Web Exploitation

I navigated to the web application running on port 80 and was presented with a simple login interface.

<img width="377" height="361" alt="login" src="https://github.com/user-attachments/assets/affe067f-8ddc-4bc3-9211-933ed7911b62" />

At first glance, the page looked intentionally minimal. One detail stood out immediately: a message below the login form referencing a **guest account**, along with a hint to inspect the page source (`Ctrl+U`) .

Opening the source code revealed a commented line that hadn’t been removed during development:

<img width="973" height="594" alt="source code" src="https://github.com/user-attachments/assets/97097ad6-c282-4e67-a922-1615f102e1d7" />

```
<!-- use guest:guest credentials until registration is fixed. "admin" user account is off limits!!!!! -->
```

That single comment explained the next step without needing any guesswork. I logged in using the provided guest credentials.

<img width="1297" height="274" alt="logend" src="https://github.com/user-attachments/assets/16cfd85a-bdf7-4442-aea8-633cdf56df17" />

Once authenticated, I was redirected to a profile page associated with the guest user.

## Capturing the Flag

While reviewing the page, I noticed the structure of the URL in the address bar:

```
http://10.49.151.21/profile.php?user=guest
```

The application was directly referencing the username as a request parameter. I modified the value of the `user` parameter in the URL and loaded the page again.

The response changed immediately, and the protected content became visible. The flag was displayed directly on the page.

<img width="1623" height="239" alt="flag" src="https://github.com/user-attachments/assets/8240c264-6fb0-41ab-9644-3457632824be" />


```
flag{66be95c478473d91a5358f2440c7af1f}
```

<img width="1029" height="518" alt="image" src="https://github.com/user-attachments/assets/31774749-e736-4262-9f04-92ed6a21a2ef" />

