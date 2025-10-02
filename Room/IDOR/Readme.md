# <div align='center'>[IDOR - TryhackMe writeup](https://tryhackme.com/room/idor)</div>
<div align='center'>Learn how to find and exploit IDOR vulnerabilities in a web application giving you access to data that you shouldn't have.</div>
<div align='center'>
  <img width="200" height="200" alt="92b349206a2901c187e32ad074eae45c" src="https://github.com/user-attachments/assets/c62d8886-13ab-4648-bd5f-be629e36cc61" />
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
<img width="921" height="391" alt="1" src="https://github.com/user-attachments/assets/71ee6827-40f9-418a-9042-c8596f693c3a" />

click on 2nd mail of Order Confirmation

<img width="697" height="407" alt="image" src="https://github.com/user-attachments/assets/c93aaac4-2ba9-480b-ba27-e72201180512" />

Click on url and change it to 1234 to 1000

<img width="684" height="415" alt="image" src="https://github.com/user-attachments/assets/5ad1d30d-e837-4476-9fb7-fd7d498871a8" />

<img width="660" height="457" alt="image" src="https://github.com/user-attachments/assets/c1b5d84f-d823-484d-b289-8941d86d06df" />

boom we got the flag


### What is the Flag from the IDOR example website?
```
THM{IDOR-VULN-FOUND}
```
## Task 3. Finding IDORs in Encoded IDs
### Encoded IDs
When passing data from page to page either by post data, query strings, or cookies, web developers will often first take the raw data and encode it. Encoding ensures that the receiving web server will be able to understand the contents. Encoding changes binary data into an ASCII string commonly using the a-z, A-Z, 0-9 and = character for padding. The most common encoding technique on the web is base64 encoding and can usually be pretty easy to spot. You can use websites like https://www.base64decode.org/ to decode the string, then edit the data and re-encode it again using https://www.base64encode.org/ and then resubmit the web request to see if there is a change in the response.

### What is a common type of encoding used by websites?
```
base64
```

## Task 4. Finding IDORs in Hashed IDs
### Hashed IDs
Hashed IDs are a little bit more complicated to deal with than encoded ones, but they may follow a predictable pattern, such as being the hashed version of the integer value. For example, the Id number 123 would become 202cb962ac59075b964b07152d234b70 if md5 hashing were in use.

It's worthwhile putting any discovered hashes through a web service such as https://crackstation.net/ (which has a database of billions of hash to value results) to see if we can find any matches.
### What is a common algorithm used for hashing IDs?
```
md5
```
## Task 5. Finding IDORs in Unpredictable IDs
### Unpredictable IDs
If the Id cannot be detected using the above methods, an excellent method of IDOR detection is to create two accounts and swap the Id numbers between them. If you can view the other users' content using their Id number while still being logged in with a different account (or not logged in at all), you've found a valid IDOR vulnerability.

### What is the minimum number of accounts you need to create to check for IDORs between accounts?
```
2
```
## Task 6. Where are IDORs located
### Where are they located?
The vulnerable endpoint you're targeting may not always be something you see in the address bar. It could be content your browser loads in via an AJAX request or something that you find referenced in a JavaScript file. 

Sometimes endpoints could have an unreferenced parameter that may have been of some use during development and got pushed to production. For example, you may notice a call to /user/details displaying your user information (authenticated through your session). But through an attack known as parameter mining, you discover a parameter called user_id that you can use to display other users' information, for example, /user/details?user_id=123.
```
no need
```
## Task 7. A Practical IDOR Example

Begin by pressing the Start Machine button; once started, click the below link and open it in a new browser tab:

Firstly you'll need to log in. To do this, click on the customer's section and create an account. Once logged in, click on the Your Account tab. 

The Your Account section gives you the ability to change your information such as username, email address and password. You'll notice the username and email fields pre-filled in with your information.  

We'll start by investigating how this information gets pre-filled. If you open your browser developer tools, select the network tab and then refresh the page, you'll see a call to an endpoint with the path `/api/v1/customer?id={user_id}`.

This page returns in JSON format your user id, username and email address. We can see from the path that the user information shown is taken from the query string's id parameter.

You can try testing this id parameter for an IDOR vulnerability by changing the id to another user's id. Try selecting users with IDs 1 and 3 and then answer the questions below.

This is the website:
<img width="1305" height="735" alt="image" src="https://github.com/user-attachments/assets/8481b9d4-306f-44b7-ab08-d575f12c944a" />

Go to the Customers section:

<img width="542" height="630" alt="image" src="https://github.com/user-attachments/assets/2a3c11f5-ee82-496b-b30e-87d0dc5f980c" />

Register yourself:

<img width="496" height="708" alt="image" src="https://github.com/user-attachments/assets/eefbee72-5797-4f11-97b6-2208a9da619e" />

After logging in, go to Your Account:

<img width="956" height="727" alt="image" src="https://github.com/user-attachments/assets/b138d362-546d-4ba1-9dd7-4798ca949615" />

Open Developer Tools (Ctrl+Shift+I or F12) and switch to the Network tab:

<img width="1681" height="760" alt="image" src="https://github.com/user-attachments/assets/66e44f49-6152-418a-8d95-1821474bc3ae" />

Refresh the page. You should see a request to an endpoint like `/api/v1/customer?id={user_id}`:

<img width="1778" height="713" alt="image" src="https://github.com/user-attachments/assets/550721bd-020c-4a05-be0f-272d755730bf" />

Right-click the request and open it in a new tab — you’ll see `customer?id=50`:

<img width="1080" height="157" alt="image" src="https://github.com/user-attachments/assets/b33d5b8a-a791-4699-a420-76e934f2dfbd" />

Change the id parameter to 1:

<img width="1042" height="135" alt="image" src="https://github.com/user-attachments/assets/286c24d7-d5b0-453a-82db-20bd2d3ac7ad" />

### What is the username for user id 1?
```
adam84
```
Now change the id to 3:

<img width="996" height="167" alt="image" src="https://github.com/user-attachments/assets/b5700acc-a77a-4c76-a76d-0ee02be25182" />

### What is the email address for user id 3?
```
j@fakemail.thm
```

<img width="1118" height="612" alt="image" src="https://github.com/user-attachments/assets/5dca3d80-52fa-43b5-b2de-b146602b68e4" />

