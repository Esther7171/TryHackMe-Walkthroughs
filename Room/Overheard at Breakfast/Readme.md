# <div align="center">[Overheard at Breakfast - TryHackMe writeup](https://tryhackme.com/room/hh-overheardatbreakfast-6f01793c)</div>

<div align="center">Two strangers. One conversation. One profile they never meant to reveal.</div> <br> <div align="center"> <img width="200" height="200" alt="Overheard at Breakfast" src="https://github.com/user-attachments/assets/b4133583-8dc8-4bb0-96c2-826a779f63f2"/> </div>

### Task 1 OSINT. Hacker Holidays: Day 6
#### What is the flag?
```
THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}
```

## INTRO TO LAB

Overheard at Breakfast is an easy TryHackMe OSINT challenge where the objective is to identify a hidden online profile from a conversation between two strangers.

The room provided a downloadable ZIP file. I downloaded and extracted it, which gave me a screenshot containing the conversation.

<div align="center"> <img alt="any" src="https://github.com/user-attachments/assets/b16fbd5f-a9be-4129-a589-dbc836b829a9" /> </div>

## Analyzing the Conversation

Most of the conversation was casual, but Lambo revealed two important clues that stood out to me.

The first was the email address:

```text
lambobytelotushotel@gmail.com
```

The second clue was a free platform that allowed users to create a profile and link multiple social media accounts. The name of the platform started with the letter **G**.

The conversation also mentioned Ponzi, Lambo, Byte Lotus Hotel, social media profiles, tagged accounts, and a previously linked profile that had been deleted.

At this point, the email address combined with the description of the profile service gave me enough information to start the OSINT investigation.

## Identifying the Platform

I searched for profile aggregation services matching the clues: a free service that starts with **G** and can associate an online profile with an email address.

<div align="center"> <img alt="any" src="https://github.com/user-attachments/assets/d5dc8ea9-a9e0-4f03-8447-5560bf09585b" /> </div>

The search results suggested two possible platforms. Linktree was one of them, but it does not start with G, so that immediately ruled it out.

The other result was **Gravatar**, which matched the clue.

Gravatar associates an email address with a public profile and avatar that can be used across different websites.

I then checked the email address on Gravatar.

<div align="center"> <img alt="any" src="https://github.com/user-attachments/assets/41fef586-60ef-48da-a4e9-2804f830808a" /> </div>

This led me to the following Gravatar profile:

```text
https://gravatar.com/cheerfullysongf28e3c3716
```

<div align="center"> <img alt="any" src="https://github.com/user-attachments/assets/63c63865-82a8-4d9f-899a-0cbce1b2e730" /> </div>

## Finding the Flag

The profile bio contained a Base64-encoded string:

```text
Funny thing about email hashes, they follow you places you didn't expect. Glad you found the right corner of the internet! Here is your prize: VEhNe1MzY3JlVF9QcjBmaWwzX0g0c19iMzNuX0lkZW50MWZpM2R9
```

I decoded the Base64 string using CyberChef.

<div align="center"> <img alt="any" src="https://github.com/user-attachments/assets/da05d4d7-b7bd-415e-b0c8-782336b54500" /> </div>

The decoded value gave me the flag:

```text
THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}
```

> The flag was successfully obtained, completing the Overheard at Breakfast room.
