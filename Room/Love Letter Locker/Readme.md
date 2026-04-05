# <div align='center'>[Love Letter Locker - TryHackMe Writeup]()</div>
<div align="center">Use your skills to access other users' letters.</div>
<div align="center">
  <img width="200" height="200" alt="Love Letter Locker" src="https://github.com/user-attachments/assets/550ad1d5-6f14-4182-a308-9d468f8c64ef" />
</div>

## Initial Reconnaissance

The room provides a direct entry point to the web application:

<img width="941" height="702" alt="image" src="https://github.com/user-attachments/assets/4d1599df-ee02-4739-ab3f-32810da6a04e" />

I started by navigating to the target in the browser to understand how the application behaves.

<img width="1904" height="584" alt="image" src="https://github.com/user-attachments/assets/edf5c527-d789-4b51-a1f2-336332dd3511" />

The landing page presents two basic options: account creation and login. Since no credentials were provided, I proceeded by creating a new account.

<img width="1907" height="580" alt="image" src="https://github.com/user-attachments/assets/4d1c1463-506e-46c2-9169-c3270831c3a2" />

After registering successfully, I logged into the application.

<img width="1897" height="536" alt="image" src="https://github.com/user-attachments/assets/4523930a-ee8f-40b1-87f8-9191ddefd315" />

Once inside, I landed on a dashboard that showed my letters along with a small hint:

“Every love letter gets a unique number in the archive. Numbers make everything easier to find.”

It also displayed the total number of letters currently in the system.

<img width="1919" height="578" alt="image" src="https://github.com/user-attachments/assets/b3a9f62c-bd42-48cd-b36a-a979f03a20b6" />

## Exploring Functionality

To understand how the application handles user data, I created a new letter.

<img width="1913" height="597" alt="image" src="https://github.com/user-attachments/assets/c4ceced5-99fa-4540-91dd-166ed0a6d7af" />

The letter was created successfully, and I was able to open it.

<img width="966" height="557" alt="image" src="https://github.com/user-attachments/assets/e03cf441-f09a-4d2e-80af-1f560630db82" />

To inspect things more closely, I opened the letter in a new tab and focused on the URL structure.

<img width="1915" height="479" alt="image" src="https://github.com/user-attachments/assets/1b8c988c-93aa-408e-b3a8-6682078983ee" />

The URL contained a numeric identifier for the letter. Mine was assigned the number 3. That immediately stood out, especially considering the earlier hint about unique numbers.

<img width="1262" height="471" alt="image" src="https://github.com/user-attachments/assets/144d5057-ebce-4aab-9f51-fc4121f28ce9" />

## Accessing Other Letters
At this point, I tested whether the application properly restricts access to other users’ data. I modified the letter ID directly in the URL.

First, I switched from `3` to `2`.

<img width="1254" height="510" alt="image" src="https://github.com/user-attachments/assets/a4e70487-8b2b-42e4-bfbb-70f993434ee0" />

The application returned another letter without any restriction.

Next, I changed the ID to `1`.

This time, I was able to access a different letter, which revealed the flag.

Flag
```
THM{1_c4n_r3ad_4ll_l3tters_w1th_th1s_1d0r}
```
Conclusion

This room demonstrates how predictable identifiers in web applications can expose sensitive data when proper access controls are missing.

Thanks for reading.
