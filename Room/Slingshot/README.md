# <div align='center'>[Slingshot](https://github.com/user-attachments/assets/9a05c698-e2b9-4746-8370-7794d65ced77)</div>
<div align='center'>Can you retrace an attacker's steps after they enumerate and compromise a web server?</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/9a05c698-e2b9-4746-8370-7794d65ced77' height='200'></img>
</div>

## Task 1. Scenario

Slingway Inc., a leading toy company, has recently noticed suspicious activity on its e-commerce web server and potential modifications to its database. To investigate the suspicious activity, they've hired you as a SOC Analyst to look into the web server logs and uncover any instances of malicious activity.

To aid in your investigation, you've received an Elastic Stack instance containing logs from the suspected attack. Below, you'll find credentials to access the Kibana dashboard. Slingway's IT staff mentioned that the suspicious activity started on July 26, 2023.

By investigating and answering the questions below, we can create a timeline of events to lead the incident response activity. This will also allow us to present concise and confident findings that answer questions such as:

What vulnerabilities did the attacker exploit on the web server?
What user accounts were compromised?
What data was exfiltrated from the server?
Instructions

First, click Start Machine to start the VM attached to this task. You may access the VM using the AttackBox or your VPN connection. You can start the AttackBox by pressing the Start AttackBox button on the top-right of this room. Note: The Elastic Stack may take up to 5 minutes to fully start up. If you receive any errors, give it a few minutes and refresh the page.

### What was the first scanner that the attacker ran against the web server?
```
Nmap Scripting Engine
```
### What was the User Agent of the directory enumeration tool that the attacker used on the web server?
```
Mozilla/5.0 (Gobuster)
```
### In total, how many requested resources on the web server did the attacker fail to find?
```
1867
```
### What is the flag under the interesting directory the attacker found?
```
a76637b62ea99acda12f5859313f539a
```
### What login page did the attacker discover using the directory enumeration tool?
```
/admin-login.php
```
### What was the user agent of the brute-force tool that the attacker used on the admin panel?
```
Mozilla/4.0 (Hydra)
```
### What username:password combination did the attacker use to gain access to the admin page?
```
admin:thx1138
```
### What flag was included in the file that the attacker uploaded from the admin directory?
```
THM{ecb012e53a58818cbd17a924769ec447}
```
### What was the first command the attacker ran on the web shell?
```
whoami
```
### What file location on the web server did the attacker extract database credentials from using Local File Inclusion?
```
/etc/phpmyadmin/config-db.php
```
### What directory did the attacker use to access the database manager?
```
/phpmyadmin
```
### What was the name of the database that the attacker exported?
```
customer_credit_cards
```
### What flag does the attacker insert into the database?
```
c6aa3215a7d519eeb40a660f3b76e64c
```
