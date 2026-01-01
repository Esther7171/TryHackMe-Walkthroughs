# <div align="center">[MD2PDF TryHackMe writeup](https://tryhackme.com/room/md2pdf)</div>
<div align="center">TopTierConversions LTD is proud to present its latest product launch.</div>
<div align="center">
  <img width="200" height="200" alt="c53da808dba7b45a03b79dacf587ebb6" src="https://github.com/user-attachments/assets/c1561e24-0daa-469d-b966-18530240f47b" />
</div>

## Initial Reconnaissance

I started where it always makes sense to start: identifying the exposed services. A basic `nmap` scan was enough to get a clear picture of what the machine was offering.

```
nmap -sV -sC -Pn <IP>
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
