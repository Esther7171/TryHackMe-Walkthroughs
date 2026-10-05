# <div align="center">[Web Application Security - TryHackMe writeup](https://tryhackme.com/r/room/introwebapplicationsecurity)</div>

<div align="center">Learn about web applications and explore some of their common security issues.</div>

<div align="center"> <img width="200" height="200" alt="Web Application Security" src="https://github.com/user-attachments/assets/a4bb194c-cfa0-4cc7-aa24-abd0d3a8354e"/> </div>

<div align="center"> <img alt="Difficulty: Easy" src="https://img.shields.io/badge/Difficulty-Easy-brightgreen" /> <img alt="OS: Web" src="https://img.shields.io/badge/OS-Web-blue" /> </div>

# Task 1. Introduction

### What do you need to access a web application?
```
Browser
```

# Task 2. Web Application Security Risks

You discovered that the login page allows an unlimited number of login attempts without trying to slow down the user or lock the account. What is the category of this security risk?
Identification and Authentication Failure.You noticed that the username and password are sent in cleartext without encryption. What is the category of this security risk?
```
Cryptographic Failures
```
# Task 3
Practical Example of Web Application Security Check the other users to discover which user account was used to make the malicious changes and revert them. After reverting the changes, what is the flag that you have received?
```
THM{IDOR_EXPLORED}
```
