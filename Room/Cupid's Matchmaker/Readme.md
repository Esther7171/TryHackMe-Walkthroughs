<div align="center">[Cupid's Matchmaker
](https://tryhackme.com/room/lafb2026e3)</div>
<div align="center">Use your web exploitation skills against this matchmaking service.</div>
<div align="center">
  
</div>



<img width="941" height="750" alt="image" src="https://github.com/user-attachments/assets/0838db61-589e-45fb-a04a-ccbe470a9739" />

## Nevigating to web 
This is the website there is an survy page 
<img width="1225" height="1015" alt="image" src="https://github.com/user-attachments/assets/7d8fcb33-e6a6-4a59-86cf-4d94f250b161" />

after filling up servy we got this

<img width="1779" height="916" alt="image" src="https://github.com/user-attachments/assets/6a71c519-88d2-469a-98a0-920be4e3e365" />

## Web enemuration

<img width="967" height="486" alt="image" src="https://github.com/user-attachments/assets/47803bd2-ee67-4597-a8bb-abd27e22d289" />

There is admin page let take a look
<img width="1206" height="886" alt="image" src="https://github.com/user-attachments/assets/311660f4-603f-4430-b553-99a951691e7e" />

After some attempt i dont understand whats going on here taking some help from other and reviwing there walkthrough i got to know we need to steal admin cookie using xxs 

<img width="1226" height="972" alt="image" src="https://github.com/user-attachments/assets/e7a157ce-9058-4d33-8397-59e88eaeb70c" />

Let upload this make sure u open nc in another terminak

```
nc -lnvp 8000
```

<img width="1219" height="323" alt="image" src="https://github.com/user-attachments/assets/9f08f830-f37f-48a7-8a20-7c488176561e" />


We got our cookie let decode this 

<img width="811" height="81" alt="image" src="https://github.com/user-attachments/assets/fba839fe-4dd5-4d29-a409-5ae808d017d9" />

## Flag
```
THM{XSS_CuP1d_Str1k3s_Ag41n}
```

![Uploading image.png…]()
