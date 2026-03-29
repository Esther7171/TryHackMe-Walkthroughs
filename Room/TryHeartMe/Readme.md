# <div align="center">[TryHeartMe - TryHackMe Write-up](https://tryhackme.com/room/lafb2026e5)</div>
<div align="center">Access the hidden item in this Valentine's gift shop.</div>
<br>
<div align="center">
<img width="200" height="200" alt="TryHeartMe" src="https://github.com/user-attachments/assets/e4df01da-c403-4a89-bdbb-d9d5bf6b9c4e" />
</div>

## Task 1. TryHeartMe
### What is the flag?
```
```

## Accessing the Website

The objective of this room is straightforward. I need to purchase the hidden *valenflag* item from the TryHeartMe shop.

As soon as I started the lab, most of the initial enumeration was already handled.
<div align="center">
  <img width="1139" height="768" alt="image" src="https://github.com/user-attachments/assets/06606c5a-80ad-4ad5-80b1-1f4ac9f86463" />
</div>

The target application is running on port **5000**, so I navigated directly to the web interface.

<div align="center">
  <img width="1871" height="801" alt="image" src="https://github.com/user-attachments/assets/43a74daf-a5c4-4ad5-8206-a2e09e0155a4" />
</div>

The application presents a login and signup page. I created a new account using random credentials and logged in.

<div align="center">
  <img width="514" height="392" alt="image" src="https://github.com/user-attachments/assets/863217fd-d1c7-4e71-a6af-22c80f7173b0" />
</div>

Once inside, nothing immediately stood out. No hidden items were visible, so I decided to interact with the shop and attempt to purchase a product.

<div align="center">
  <img width="1858" height="822" alt="image" src="https://github.com/user-attachments/assets/a001767e-a876-4089-8caf-bd29720ee5a8" />
</div>

When I opened a product, I noticed two important things. First, I had zero credits, so purchasing anything was not possible. Second, the response clearly reflected my role as a **user**. That became the pivot point. If the application enforces role-based access, elevating privileges could expose additional functionality.
<div align="center">
  <img width="1865" height="547" alt="image" src="https://github.com/user-attachments/assets/369ba1c2-5f86-41c5-a476-4b79926a568e" />
</div>

## Intercepting the Request

To analyze how the application handles roles, I opened **Burp Suite**, refreshed the page, and intercepted the request.

<div align="center">
  <img width="1920" height="756" alt="image" src="https://github.com/user-attachments/assets/036440dc-866f-4b09-9a68-22f86dc0b8a4" />
</div>

Captured request:

```
GET /product/rose-bouquet HTTP/1.1
Host: 10.48.159.52:5000
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:149.0) Gecko/20100101 Firefox/149.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Referer: http://10.48.159.52:5000/
Connection: keep-alive
Cookie: tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0Nzk3OTY3LCJ0aGVtZSI6InZhbGVudGluZSJ9.Rf5Bwu79yDV7KfqxHihTUIqio2Ty4hcH4cjCQeaf-L8
Upgrade-Insecure-Requests: 1
Priority: u=0, i
```

The key observation here is the `tryheartme_jwt` cookie. This token appears to store user-related data such as role and credits.

## Decoding the JWT

I took the JWT token and decoded it using [jwt.io](https://www.jwt.io/).

```
tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0Nzk3OTY3LCJ0aGVtZSI6InZhbGVudGluZSJ9.Rf5Bwu79yDV7KfqxHihTUIqio2Ty4hcH4cjCQeaf-L8
```
<div align="center">
  <img width="1258" height="865" alt="image" src="https://github.com/user-attachments/assets/6f218e56-d4cf-4205-8e3d-22aa1b07cb94" />
</div>

After decoding, the payload revealed multiple fields including:

* email
* role
* credits
* theme

The role was set to `user`, and credits were set to `0`.

## Modifying the Token

At this point, I modified the payload directly. I changed the role to **admin** and increased the credits value.

<div align="center">
  <img width="1244" height="878" alt="image" src="https://github.com/user-attachments/assets/1e04cf0b-ee1c-4a0a-9308-ad0ca8e76c77" />
</div>

Once updated, I copied the newly encoded token and replaced the original cookie inside the request.

<img>

After forwarding the request with the modified token, the changes were reflected immediately. My role was now elevated, and credits were no longer zero.

## Accessing the Hidden Item

With the updated privileges, I navigated back to the shop.

<img>

A new hidden item appeared in the store that was not visible earlier. I proceeded to purchase it.

<img>

The purchase was successful, and the application returned the flag.

<img>

## Flag

```
THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}
```


---

# <div align="center">[TryHeartMe - TryHackMe write-ups](https://tryhackme.com/room/lafb2026e5)</div>
<div align="center">Access the hidden item in this Valentine's gift shop.</div>
<br>
<div align="center">
<img width="200" height="200" alt="TryHeartMe" src="https://github.com/user-attachments/assets/e4df01da-c403-4a89-bdbb-d9d5bf6b9c4e" />
</div>


# Accessing The webiste 
so our gaol is to purchase a valenflag iteam form the tryheartme shop

As i Started the lab 

<img width="1139" height="768" alt="image" src="https://github.com/user-attachments/assets/06606c5a-80ad-4ad5-80b1-1f4ac9f86463" />
Tryhackme reduce my work of finding service and osint 

so the website is running on port 5000 
Let Nevigate to web 

<img width="1871" height="801" alt="image" src="https://github.com/user-attachments/assets/43a74daf-a5c4-4ad5-8206-a2e09e0155a4" />

So we can see there is login and signup page let signup with any credential
<img width="514" height="392" alt="image" src="https://github.com/user-attachments/assets/863217fd-d1c7-4e71-a6af-22c80f7173b0" />

After creating an account i loged in 
<img width="1858" height="822" alt="image" src="https://github.com/user-attachments/assets/a001767e-a876-4089-8caf-bd29720ee5a8" />

so i dont see any hidden item let try to purchase any product 

<img width="1865" height="547" alt="image" src="https://github.com/user-attachments/assets/369ba1c2-5f86-41c5-a476-4b79926a568e" />
As i click on an item i just notice we are broke we dont have any creds + the main thing we can notice here is we can see mention of role as our current rol is user we can have to elevate our privillage to user to admin so let start analsying it 

to analys this page i open my burpsuite and refresh the page and capture the request
<img width="1920" height="756" alt="image" src="https://github.com/user-attachments/assets/036440dc-866f-4b09-9a68-22f86dc0b8a4" />

We can see the request 
```
GET /product/rose-bouquet HTTP/1.1
Host: 10.48.159.52:5000
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:149.0) Gecko/20100101 Firefox/149.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Referer: http://10.48.159.52:5000/
Connection: keep-alive
Cookie: tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0Nzk3OTY3LCJ0aGVtZSI6InZhbGVudGluZSJ9.Rf5Bwu79yDV7KfqxHihTUIqio2Ty4hcH4cjCQeaf-L8
Upgrade-Insecure-Requests: 1
Priority: u=0, i
```
We can try to decode the jwt cookie
```
Cookie: tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0Nzk3OTY3LCJ0aGVtZSI6InZhbGVudGluZSJ9.Rf5Bwu79yDV7KfqxHihTUIqio2Ty4hcH4cjCQeaf-L8
```

So to decode this i went to https://www.jwt.io/
and pasted the cookie 

<img width="1258" height="865" alt="image" src="https://github.com/user-attachments/assets/6f218e56-d4cf-4205-8e3d-22aa1b07cb94" />

This is decoded perfectly now we can edit the cookie and add privilage and creds

<img width="1244" height="878" alt="image" src="https://github.com/user-attachments/assets/1e04cf0b-ee1c-4a0a-9308-ad0ca8e76c77" />

now copy the encoded cookie and replace the cookie with new encoded cookie

<img width="1190" height="481" alt="image" src="https://github.com/user-attachments/assets/bb38bc63-9678-47ff-b0e1-b36c1bc21aab" />

we can see our creds are added and we are admin now let get back to shop to buy the hidden iteam

Make sure u replace cookie of each request
as i click on shop tab We can see the hidden iteam appeard here 
<img width="1920" height="803" alt="image" src="https://github.com/user-attachments/assets/29c271fa-0d4e-4522-9781-2599a5106c96" />
let try to buy this 
<img width="1200" height="456" alt="image" src="https://github.com/user-attachments/assets/0b1b2b4a-1ca6-41e8-a9a9-28664fcaa96f" />

We brough the iteam and got the flag

<img width="1202" height="340" alt="image" src="https://github.com/user-attachments/assets/7cbc80c0-2b12-4874-8c43-0dca20ce7d50" />

## Flag
```
THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}
```


