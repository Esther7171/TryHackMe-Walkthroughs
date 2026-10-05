Room Name: Overheard at Breakfast
Description: Two strangers. One conversation. One profile they never meant to reveal.
Lab Link: https://tryhackme.com/room/hh-overheardatbreakfast-6f01793c
level easy

### Task 1. OSINT Hacker Holidays: Day 6
#### What is the flag?
```
THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}
```


The room gave us a downloaded link of zip file as i download it and extract it 
We got the screen shot of this conversation 

<img width="1175" height="781" alt="conversation" src="https://github.com/user-attachments/assets/b16fbd5f-a9be-4129-a589-dbc836b829a9" />

Most of the conversation is casual, but Lambo reveals two important clues:

the email address lambobytelotushotel@gmail.com;
a free platform that let users upload a profile and link other media accounts, whose name started with G.
Those were the identifying details needed to begin the search.

Analyzing the Conversation
Rather than reading the conversation casually, inspect every detail carefully.

The following indicators immediately stand out.

People Mentioned
Ponzi
Lambo
Organization / Location
Byte Lotus Hotel
Resort
Social Media References
The conversation mentions:

Social media profiles
Tagged accounts
Previous profile linking service
Deleted online presence
Email Address
The biggest clue is the exposed email:

lambobytelotushotel@gmail.com
copy
Additional Hint
Another person remembers that the profile service:

Started with the letter G
Was free
Allowed linking multiple social media accounts together
This is the key hint required to solve the challenge.

Identifying the Platform
Searching for profile aggregation services that:

start with G
are free
link multiple social media accounts
quickly points to Gravatar.

Gravatar associates an email address with a globally recognized avatar and public profile used across many websites.


as i search for detail 

<img width="1549" height="699" alt="image" src="https://github.com/user-attachments/assets/d5dc8ea9-a9e0-4f03-8447-5560bf09585b" />


the googel ai suggest me these 2 platform 

linktree hve no g in it so it obivous it gravatar.com

on gravatar as i add his gmail over here 

<img width="1366" height="928" alt="image" src="https://github.com/user-attachments/assets/41fef586-60ef-48da-a4e9-2804f830808a" />


I got hsi profile https://gravatar.com/cheerfullysongf28e3c3716

<img width="1287" height="785" alt="image" src="https://github.com/user-attachments/assets/63c63865-82a8-4d9f-899a-0cbce1b2e730" />

in his bio a base64 string is mention 
Funny thing about email hashes, they follow you places you didn't expect. Glad you found the right corner of the internet! Here is your prize: VEhNe1MzY3JlVF9QcjBmaWwzX0g0c19iMzNuX0lkZW50MWZpM2R9


<img width="1531" height="872" alt="image" src="https://github.com/user-attachments/assets/da05d4d7-b7bd-415e-b0c8-782336b54500" />


cracking on cyberchef we got our flag
```
THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}
```

<img width="888" height="414" alt="image" src="https://github.com/user-attachments/assets/0f954297-d64c-444b-9814-856ebcd07e24" />

room solved thanks 
