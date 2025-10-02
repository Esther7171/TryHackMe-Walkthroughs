# <div align='center'>[IDOR](https://tryhackme.com/room/idor)</div>
<div align='center'>Learn how to find and exploit IDOR vulnerabilities in a web application giving you access to data that you shouldn't have.</div>
<div align='center'>
  
</div>


## Task 1. What is an IDOR?
In this room, you're going to learn what an IDOR vulnerability is, what they look like, how to find them and a practical task exploiting a real case scenario.

What is an IDOR?
IDOR stands for Insecure Direct Object Reference and is a type of access control vulnerability.

This type of vulnerability can occur when a web server receives user-supplied input to retrieve objects (files, data, documents), too much trust has been placed on the input data, and it is not validated on the server-side to confirm the requested object belongs to the user requesting it.

### What does IDOR stand for?
```
Insecure Direct Object Reference
```
## Task 2. An IDOR Example
Imagine you've just signed up for an online service, and you want to change your profile information. The link you click on goes to http://online-service.thm/profile?user_id=1305, and you can see your information.

Curiosity gets the better of you, and you try changing the user_id value to 1000 instead (http://online-service.thm/profile?user_id=1000), and to your surprise, you can now see another user's information. You've now discovered an IDOR vulnerability! Ideally, there should be a check on the website to confirm that the user information belongs to the user logged requesting it.

Using what you've learnt above, click on the View Site button and try and receive a flag by discovering and exploiting an IDOR vulnerability.

View the website
<img width="1051" height="498" alt="image" src="https://github.com/user-attachments/assets/843cfc41-654d-44ad-bffe-c718e5204280" />
click on 2nd mail of Order Confirmation

<img width="697" height="407" alt="image" src="https://github.com/user-attachments/assets/c93aaac4-2ba9-480b-ba27-e72201180512" />
Click on url and change it to 1234 to 1000
<img width="714" height="544" alt="image" src="https://github.com/user-attachments/assets/46cc3bd0-d7ec-4d5e-8d5a-30bccea39ed8" />
boom we got the flag

### What is the Flag from the IDOR example website?
```
```
