# <div align="center">[MD2PDF TryHackMe Writeup](https://tryhackme.com/room/md2pdf)</div>
<div align="center">TopTierConversions LTD is proud to present its latest product launch.</div>
<div align="center">
  <img width="200" height="200" alt="c53da808dba7b45a03b79dacf587ebb6" src="https://github.com/user-attachments/assets/c1561e24-0daa-469d-b966-18530240f47b" />
</div>

## **Introduction**

MD2PDF is a TryHackMe web challenge that demonstrates how a seemingly harmless Markdown-to-PDF feature can introduce serious security flaws when server-side rendering and access controls are improperly enforced.

**Room Link:** [https://tryhackme.com/room/md2pdf](https://tryhackme.com/room/md2pdf)


## Initial Reconnaissance

I started where it always makes sense to start: identifying the exposed services. A basic `nmap` scan was enough to get a clear picture of what the machine was offering.

```
nmap -sV -sC -Pn <IP>
```
```
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.5 (Ubuntu Linux; protocol 2.0)
80/tcp   open  rtsp
5000/tcp open  rtsp
```

The scan returned three open ports:

* Port **22** running SSH
* Port **80** serving HTTP
* Port **5000** running an unidentified service

Nothing exotic at this stage, but enough surface area to begin exploring.

### Web Enumeration

With HTTP exposed, I moved straight to the browser and opened `http://<IP>`. The application was extremely minimal. It presented a simple Markdown input field with a submit button, designed to convert Markdown content into a downloadable PDF.

<img width="1372" height="538" alt="image" src="https://github.com/user-attachments/assets/dc66b8bd-a397-4c7a-8869-db367d036c73" />

I spent some time interacting with the functionality, testing different inputs and basic injections, but nothing meaningful surfaced from this interface directly. With no immediate feedback or errors to pivot on, the next logical step was directory enumeration.

I ran `dirsearch` against the web root to look for hidden or restricted paths.

```
dirsearch -u http://<IP>

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/http_10.48.156.225/__26-01-01_20-02-27.txt

Target: http://10.48.156.225/

[20:02:27] Starting:
[20:02:35] 403 - 166B - /admin

Task Completed
```

The scan revealed a restricted endpoint: **`/admin`**.

## Exploitation via Localhost Restriction Bypass

I navigated to the `/admin` directory directly from the browser to see what it exposed.

<img width="718" height="127" alt="image" src="https://github.com/user-attachments/assets/9972197c-b971-4de5-8d61-f0880ceb94be" />

The response was immediate and explicit:

> **Forbidden**
> This page can only be seen internally (localhost:5000)

That single line said a lot. The endpoint clearly existed, but access was restricted based on request origin. Anything not coming from `127.0.0.1:5000` was blocked outright. This wasn’t a dead end, just a locked door.

Given the application’s purpose, the next thought was natural. User-supplied Markdown is being processed server-side and converted into a PDF. That processing context mattered.

### Markdown Meets HTML

On the surface, the Markdown parser appeared constrained. Plain text rendered as expected, and typical Markdown features behaved normally. The interesting part emerged when I tested raw HTML support.

I submitted the following payload into the Markdown input field:

```
<iframe src="http://localhost:5000/admin"></iframe>
```

<img width="1349" height="545" alt="image" src="https://github.com/user-attachments/assets/36c289ee-d2dc-4fe6-95cc-2ba12a5280e4" />

The request completed without errors, and the application generated the PDF as usual. When I opened the downloaded file, the result was immediate.

The contents of the internally restricted `/admin` page were embedded directly inside the PDF, including the flag.

<img width="754" height="295" alt="image" src="https://github.com/user-attachments/assets/5fe85713-2cf7-4812-8745-2e2c9c7b9d3a" />

The restriction wasn’t enforced at the rendering layer. The server itself fetched the internal resource and embedded it into the output, effectively bypassing the access control by trusting its own request context.

### Flag.txt
```
flag{1f4a2b6ffeaf4707c43885d704eaee4b}
```

### Conclusion

This room was a clean reminder that “internal only” is not a security boundary when user-controlled content is rendered server-side. Markdown processors, especially those that allow raw HTML, can quietly become a bridge into places that were never meant to be exposed.

Thanks for reading this WriteUp.

