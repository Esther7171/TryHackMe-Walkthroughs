# <div align="center">[Hidden Deep Into my Heart - TryHackMe Walkthrough](https://tryhackme.com/room/lafb2026e9)</div>
<div align="center">Find what's hidden deep inside this website.</div>
<div align="center">
  <img width="200" height="200" alt="ctf" src="https://github.com/user-attachments/assets/4e581af9-ce2b-455d-aa17-d55879e753e4" />
</div>

## Introduction

In this room, I performed basic web enumeration against a web application. A quick look at `robots.txt` revealed a hidden directory and a useful clue that ultimately led to the administrator panel and the flag.

## Initial Access

I started the room by opening the provided web application URL.

<div align="center">
  <img width="942" height="757" alt="image" src="https://github.com/user-attachments/assets/9157c9d9-8a37-43b6-817d-14b83b3c21de" />
</div>

Since the target web address was already provided, I navigated to the website and began my enumeration.

<div align="center">
  <img width="548" height="389" alt="image" src="https://github.com/user-attachments/assets/bf5f2367-5e02-4b97-a08d-000931d0c272" />
</div>

The page loaded successfully, but nothing immediately stood out. I also reviewed the page source and did not find anything useful there.

## Web Enumeration

With no obvious clues on the homepage, I moved on to directory enumeration.

<div align="center">
  <img width="801" height="409" alt="image" src="https://github.com/user-attachments/assets/702ce9d8-4590-4302-8b76-5fd1d18a5845" />
</div>

During the enumeration process, I discovered a `robots.txt` file and decided to inspect it.

Visiting:

`https://<ip>:5000/robots.txt`

<div align="center">
  <img width="750" height="149" alt="image" src="https://github.com/user-attachments/assets/464151ba-8321-4eac-a852-dd3b2b9c7adf" />
</div>

The file revealed two interesting findings.

The first was a disallowed path:

`/cupids_secret_vault/*`

The wildcard suggested that additional directories or files might exist under that location.

The second finding was the string:

`cupid_arrow_2026!!!`

At this stage, it looked like it could potentially be a password or some other useful credential.

I then visited the discovered directory:

`https://<ip>:5000/cupids_secret_vault/`

<div align="center">
  <img width="560" height="292" alt="image" src="https://github.com/user-attachments/assets/9b7ff196-44a2-4981-9acc-1485e17293aa" />
</div>

The page itself did not reveal much information, so I continued enumerating directories within the discovered path.

<div align="center">
  <img width="991" height="438" alt="image" src="https://github.com/user-attachments/assets/83539243-ce45-4788-8eb9-3ea67afe9d7f" />
</div>

This led me to an administrator login page.

<div align="center">
  <img width="571" height="447" alt="image" src="https://github.com/user-attachments/assets/8559ba9b-af59-4e96-bf5a-5785d05f02e1" />
</div>

Based on the value found in `robots.txt`, I decided to test the following credentials:

* Username: `admin`
* Password: `cupid_arrow_2026!!!`

The login was successful, and I was immediately presented with the room flag.
<div align="center">
  <img width="1161" height="461" alt="image" src="https://github.com/user-attachments/assets/c923a10d-fcec-46ed-aca7-f5b20ed2f34b" />
</div>

## Flags

```text
THM{l0v3_is_in_th3_r0b0ts_txt}
```
<img width="1195" height="489" alt="image" src="https://github.com/user-attachments/assets/d0211077-cba2-416d-b5b8-529663214d5b" />

## Conclusion

This was a short but interesting challenge that reinforced the value of checking files like `robots.txt` during web reconnaissance.

Thanks for reading. If you enjoyed this walkthrough, feel free to check out my other TryHackMe writeups and cybersecurity content:
