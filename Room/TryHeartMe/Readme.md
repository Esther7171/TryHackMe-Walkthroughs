# <div align="center">[TryHeartMe - TryHackMe Write-up](https://tryhackme.com/room/lafb2026e5)</div>
<div align="center">Access the hidden item in this Valentine's gift shop.</div>
<br>
<div align="center">
<img width="200" height="200" alt="TryHeartMe" src="https://github.com/user-attachments/assets/e4df01da-c403-4a89-bdbb-d9d5bf6b9c4e" />
</div>

## Task 1. TryHeartMe
### What is the flag?
```
THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}
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
Host: 10.48.179.122:5000
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:149.0) Gecko/20100101 Firefox/149.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.9
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Referer: http://10.48.179.122:5000/
Cookie: tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0ODAxOTgwLCJ0aGVtZSI6InZhbGVudGluZSJ9.pahhY7p5LRw9cUVE-0vAZYCVdqIMR89rYMrvbkxTZ6k
Upgrade-Insecure-Requests: 1
Priority: u=0, i
```

The key observation here is the `tryheartme_jwt` cookie. This token appears to store user-related data such as role and credits.

## Decoding the JWT

I took the JWT token and decoded it using [jwt.io](https://www.jwt.io/).

```
tryheartme_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdCIsInJvbGUiOiJ1c2VyIiwiY3JlZGl0cyI6MCwiaWF0IjoxNzc0ODAxOTgwLCJ0aGVtZSI6InZhbGVudGluZSJ9.pahhY7p5LRw9cUVE-0vAZYCVdqIMR89rYMrvbkxTZ6k
```
<div align="center">
  <img width="1215" height="830" alt="image" src="https://github.com/user-attachments/assets/38697c48-8978-469a-aad3-180bd62a13a2" />
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
  <img width="1228" height="839" alt="image" src="https://github.com/user-attachments/assets/a3529b2c-6d2c-4cb6-a67a-f76e2146a449" />
</div>

Once updated, I copied the newly encoded token and replaced the original cookie inside the request.

<div align="center">
  <img width="1536" height="866" alt="image" src="https://github.com/user-attachments/assets/7418a417-0918-4324-a9f2-9c042332cedb" />
</div>
After forwarding the request with the modified token, the changes were reflected immediately. My role was now elevated, and credits were no longer zero.

<div align="center">
  <img width="1156" height="473" alt="image" src="https://github.com/user-attachments/assets/5aa84543-254d-4858-9bd1-6bb0ad9bf6f2" />
</div>

## Accessing the Hidden Item

With the updated privileges, I navigated back to the shop.

<div align="center">
  <img width="1533" height="863" alt="image" src="https://github.com/user-attachments/assets/99aea44f-f3e4-42e8-ba63-469a603056d6" />
</div>

A new hidden item appeared in the store that was not visible earlier. I proceeded to purchase it.

<div align="center">
  <img width="1876" height="837" alt="image" src="https://github.com/user-attachments/assets/705ee392-c872-4bce-a45e-652b3ed0a830" />
</div>

The purchase was successful, and the application returned the flag.

<div align="center">
  <img width="1175" height="458" alt="image" src="https://github.com/user-attachments/assets/7203d979-900d-4af4-a09c-1a8c34456428" />
</div>

## Flag

<div align="center">
  <img width="1132" height="314" alt="image" src="https://github.com/user-attachments/assets/e5d7b0cc-a515-4286-95a4-102d0ce0212b" />
</div>

```bash
THM{v4l3nt1n3_jwt_c00k13_t4mp3r_4dm1n_sh0p}
```
<div align="center">
  <img width="1211" height="520" alt="image" src="https://github.com/user-attachments/assets/3564d153-7358-414e-b79a-a547479ab2f9" />
</div>

> NOTE:
> Make sure to replace the cookie in every request, as the modified token needs to be used consistently throughout the session.

Thanks for reading. I hope this walkthrough helped you along the way.
