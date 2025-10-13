# <div align="center">[Hack Park - TryHackMe Walkthrough](https://tryhackme.com/room/hackpark)</div>
<div align="center">Bruteforce a websites login with Hydra, identify and use a public exploit then escalate your privileges on this Windows machine!</div>
<div align="center">
  <img width="200" height="200" alt="8c8b2105d74035ca43531681439b457e" src="https://github.com/user-attachments/assets/b307a45b-8d16-4693-9fdf-22170a90a85b" />
</div>

## Initial Reconnaissance
Starting with an Nmap scan to check for services:

```bash
nmap -sV -sC -Pn 10.201.19.188
```

Output (trimmed to relevant parts):

```bash
PORT     STATE SERVICE       VERSION
80/tcp   open  http          Microsoft IIS httpd 8.5
|_http-server-header: Microsoft-IIS/8.5
| http-robots.txt: 6 disallowed entries 
| /Account/*.* /search /search.aspx /error404.aspx 
|_/archive /archive.aspx
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: hackpark | hackpark amusements
3389/tcp open  ms-wbt-server Microsoft Terminal Services
|_ssl-date: 2025-10-13T13:55:56+00:00; +1s from scanner time.
| rdp-ntlm-info: 
|   Target_Name: HACKPARK
|   NetBIOS_Domain_Name: HACKPARK
|   NetBIOS_Computer_Name: HACKPARK
|   DNS_Domain_Name: hackpark
|   DNS_Computer_Name: hackpark
|   Product_Version: 6.3.9600
|_  System_Time: 2025-10-13T13:55:52+00:00
| ssl-cert: Subject: commonName=hackpark
| Not valid before: 2025-10-12T13:54:35
|_Not valid after:  2026-04-13T13:54:35
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
Host script results:
|_clock-skew: mean: 1s, deviation: 0s, median: 0s
```

There are **2 ports open**:

* **80/tcp** — HTTP (Microsoft IIS 8.5) — a web application to explore.
* **3389/tcp** — Microsoft RDP (Remote Desktop) — note for later, not my primary target.

Observations:

* `robots.txt` lists multiple disallowed entries — always check it; hidden paths often show up there.
* `http-methods` flagged `TRACE` as potentially risky.
* RDP returned NTLM info (Target/NetBIOS name **HACKPARK**) and an SSL cert for `hackpark` — useful for credential/domain recon.

---

Web enumeration
I opened the site on port 80. The homepage asked:

**Question:** *What's the name of the clown displayed on the homepage?*
**Answer:** `pennywise`

If you’ve seen the movie *IT* or done a quick reverse-image search, the clown is Pennywise.

<img width="708" height="740" alt="image" src="https://github.com/user-attachments/assets/ec6ea4a5-24dc-441a-9720-bb1811690fb8" />

---
