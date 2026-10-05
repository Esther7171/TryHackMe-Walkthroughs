# <div align="center">[The Greenholt Phish - TryHackMe writeup](https://tryhackme.com/room/phishingemails5fgjlzxc)</div>

<div align="center">Use the knowledge attained to analyze a malicious email.</div>

<div align="center"> <img width="200" height="200" alt="The Greenholt Phish" src="https://github.com/user-attachments/assets/537e2573-d54a-4e70-a879-0e3aa288aa5b"/> </div>

<div align="center"> <img alt="Difficulty: Easy" src="https://img.shields.io/badge/Difficulty-Easy-brightgreen" /> <img alt="OS: Windows" src="https://img.shields.io/badge/OS-Windows-blue" /> </div>

## Task 1. Just another day as a SOC Analyst

### What is the Transfer Reference Number listed in the email's Subject?
```
09674321
```

### Who is the email from?
```
Mr. James Jackson
```

### What is his email address?
```
info@mutawamarine.com
```

### What email address will receive a reply to this email? 
```
info.mutawamarine@mail.com
```

### What is the Originating IP?
```
192.119.71.157
```
### Who is the owner of the Originating IP? (Do not include the "." in your answer.)
```
Hostwinds LLC
```
### What is the SPF record for the Return-Path domain?
```
v=spf1 include:spf.protection.outlook.com -all
```
### What is the DMARC record for the Return-Path domain?
```
v=DMARC1; p=quarantine; fo=1
```

### What is the name of the attachment?
```
SWT_#09674321____PDF__.CAB
```
### What is the SHA256 hash of the file attachment?
```
2e91c533615a9bb8929ac4bb76707b2444597ce063d84a4b33525e25074fff3f
```
### What is the attachments file size? (Don't forget to add "KB" to your answer, NUM KB)
```
400.26 KB
```

### What is the actual file extension of the attachment?
```
RAR
```
