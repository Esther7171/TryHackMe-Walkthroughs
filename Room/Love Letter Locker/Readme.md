# <div align='center'>[Love Letter Locker - TryHackMe Writeup]()</div>
<div align="center">Use your skills to access other users' letters.</div>
<div align="center">
  <img width="200" height="200" alt="Love Letter Locker" src="https://github.com/user-attachments/assets/550ad1d5-6f14-4182-a308-9d468f8c64ef" />
</div>

Initial Recconnace 
As the lab already given us info 'You can access the web app here: http://10.49.186.203:5000'

<img width="941" height="702" alt="image" src="https://github.com/user-attachments/assets/4d1599df-ee02-4739-ab3f-32810da6a04e" />

Nevigating to web

<img width="1904" height="584" alt="image" src="https://github.com/user-attachments/assets/edf5c527-d789-4b51-a1f2-336332dd3511" />

So there is an option to create account and login let create a new account 

<img width="1907" height="580" alt="image" src="https://github.com/user-attachments/assets/4d1c1463-506e-46c2-9169-c3270831c3a2" />

Now we create our account let logedin

<img width="1897" height="536" alt="image" src="https://github.com/user-attachments/assets/4523930a-ee8f-40b1-87f8-9191ddefd315" />

This page is now open here saying my letters Total letters in Cupid’s archive: 2
and a tip Tip from Cupid 😇
Every love letter gets a unique number in the archive. Numbers make everything easier to find.

<img width="1919" height="578" alt="image" src="https://github.com/user-attachments/assets/b3a9f62c-bd42-48cd-b36a-a979f03a20b6" />

So let create our new letter 

<img width="1913" height="597" alt="image" src="https://github.com/user-attachments/assets/c4ceced5-99fa-4540-91dd-166ed0a6d7af" />

our letter is created successfully 
<img width="966" height="557" alt="image" src="https://github.com/user-attachments/assets/e03cf441-f09a-4d2e-80af-1f560630db82" />

let open in another tab maybe its an idor lab

<img width="1915" height="479" alt="image" src="https://github.com/user-attachments/assets/1b8c988c-93aa-408e-b3a8-6682078983ee" />

if i notice the url its letter number 3 okay then let take a look at other 2 letter by acces them through url let switch to 2 

<img width="1262" height="471" alt="image" src="https://github.com/user-attachments/assets/144d5057-ebce-4aab-9f51-fc4121f28ce9" />

Let take a look at 1 

<img width="1254" height="510" alt="image" src="https://github.com/user-attachments/assets/a4e70487-8b2b-42e4-bfbb-70f993434ee0" />

We we got our flag 

```
THM{1_c4n_r3ad_4ll_l3tters_w1th_th1s_1d0r}
```

Thanks for reading this walkthrough
