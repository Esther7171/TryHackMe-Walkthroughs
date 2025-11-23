# <div align="center">[The Phishing Pond - TryHackMe Walkthrough Identifying Real-World Phishing Emails](https://tryhackme.com/room/phishingpond)</div>
<div align="center">Catch the phish before the phish catches you.</div>
<div align="center">
  <img width="200" height="200" alt="the-phishing-pond" src="https://github.com/user-attachments/assets/750cf163-ea4e-4ab3-a5c6-968c7c2be9aa" />
</div>

# Room Introduction
The Phishing Pond is designed to build practical phishing-detection skills through a set of real-world email examples. The room teaches how attackers craft deceptive messages and which red flags to look for when reviewing suspicious emails. It focuses on the most common phishing tactics, including urgency in subject lines, look-alike domains, display-name impersonation, malicious attachments, compromised sender accounts, and offers that attempt to gather personal or financial information.

The goal of the lab is simple. Review each email, decide whether it is legitimate or a phishing attempt, and identify the indicators that reveal the attacker’s intent. At the end of the challenge, the final flag is provided once all emails are correctly classified.

# Starting the Phishing Analysis

<img width="987" height="958" alt="begin challange" src="https://github.com/user-attachments/assets/efdddb7d-f62e-4fe8-acd4-2a745ae2a56c" />

I reached the main interface of the room and began working through the emails. Let’s dive into Level 1.

## Level 1

<img width="958" height="495" alt="image" src="https://github.com/user-attachments/assets/5775665f-cb55-4375-98de-acf08f305c1c" />

> ### This is a phishing email.
>
> ### Reason: It impersonates an executive and requests an urgent wire transfer.

## Level 2

<img width="962" height="430" alt="image" src="https://github.com/user-attachments/assets/6796b2bc-4e63-45d8-bbd3-eccdd3d2770c" />

> ### This is not a phishing email.

## Level 3

<img width="956" height="420" alt="image" src="https://github.com/user-attachments/assets/2b077b86-4741-4542-8ea3-84a34d412947" />

> ### This is not a phishing email.

## Level 4

<img width="954" height="428" alt="image" src="https://github.com/user-attachments/assets/eb9dad08-4538-49cf-bce1-4efa1d6f746a" />

> ### This is not a phishing email.

## Level 5

<img width="956" height="493" alt="image" src="https://github.com/user-attachments/assets/96e1d662-2e74-4ebf-83bc-7e94e828c98a" />

> ### This is a phishing email.
>
> ### Reason: Contains an attachment and asks to enable macros.

## Level 6

<img width="956" height="494" alt="image" src="https://github.com/user-attachments/assets/a25b7855-20dd-41dc-b560-4bd4d35c1f48" />

> ### This is a phishing email.
>
> ### Reason: Contains a suspicious third-party survey link.

## Level 7

<img width="943" height="497" alt="image" src="https://github.com/user-attachments/assets/01407274-5a9c-461a-9977-7a8c194ed8b4" />

> ### This is a phishing email.
>
> ### Reason: Offers require sensitive personal or banking details.

## Level 8

<img width="965" height="492" alt="image" src="https://github.com/user-attachments/assets/6a5760b9-7289-4c98-9c5b-148406a41e79" />

> ### This is a phishing email.
>
> ### Reason: Redirects to a malicious password rest page.

## Level 9

<img width="967" height="494" alt="image" src="https://github.com/user-attachments/assets/56789249-b746-4a23-9d63-2e566452e4f3" />

> ### This is a phishing email.
>
> ### Reason: Link uses a deceptive to mimic a payment portal.

## Level 10

<img width="962" height="446" alt="image" src="https://github.com/user-attachments/assets/190f1b8d-5ec0-4f8d-b7cc-4dbc66b5df86" />

> ### This is a phishing email.
>
> ### Reason: Asks to enable macros in an attachment.


<img width="957" height="485" alt="image" src="https://github.com/user-attachments/assets/c5db35c3-4654-408e-9db2-19ca504e34f9" />

## Flag
```
THM{i_phish_you_not}
```

<img width="941" height="628" alt="image" src="https://github.com/user-attachments/assets/17cae383-f4c8-4f2b-a995-c6e07c105811" />

Thanks for reading. I hope this walkthrough helps sharpen your phishing analysis skills and gives you a clearer view of how real-world email threats operate.
