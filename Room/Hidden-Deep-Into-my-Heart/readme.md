# Hidden Deep Into my Heart
https://tryhackme.com/room/lafb2026e9

As i started the room they

<img width="942" height="757" alt="image" src="https://github.com/user-attachments/assets/9157c9d9-8a37-43b6-817d-14b83b3c21de" />
the already provided the web address so without wasting time let nevigate to web 

<img width="548" height="389" alt="image" src="https://github.com/user-attachments/assets/bf5f2367-5e02-4b97-a08d-000931d0c272" />

we got this page where nothing seems to abnormal and source code i also clear 

## Web enumeration 

so i started directore enumeration 

<img width="801" height="409" alt="image" src="https://github.com/user-attachments/assets/702ce9d8-4590-4302-8b76-5fd1d18a5845" />


We got `robots.txt` let take a look
visiting https://<ip>:5000/robots.txt
<img width="750" height="149" alt="image" src="https://github.com/user-attachments/assets/464151ba-8321-4eac-a852-dd3b2b9c7adf" />

We got 2 things here 

We got a disalowed path `/cupids_secret_vault/*` and the * represent there are more directory  

This seem suspicious: `cupid_arrow_2026!!!` maybe a pass or something


visiting https://<ip>:5000/cupids_secret_vault/

<img width="560" height="292" alt="image" src="https://github.com/user-attachments/assets/9b7ff196-44a2-4981-9acc-1485e17293aa" />

Okay so let directiry search more 


https://<ip>:5000/cupids_secret_vault/

<img width="991" height="438" alt="image" src="https://github.com/user-attachments/assets/83539243-ce45-4788-8eb9-3ea67afe9d7f" />

We got an administrator page 

<img width="571" height="447" alt="image" src="https://github.com/user-attachments/assets/8559ba9b-af59-4e96-bf5a-5785d05f02e1" />
as i can guess this can be used here `cupid_arrow_2026!!!`
Okay so let try admin:cupid_arrow_2026!!!

Boom we got the flag

<img width="1161" height="461" alt="image" src="https://github.com/user-attachments/assets/c923a10d-fcec-46ed-aca7-f5b20ed2f34b" />

flag
```
THM{l0v3_is_in_th3_r0b0ts_txt}
```
