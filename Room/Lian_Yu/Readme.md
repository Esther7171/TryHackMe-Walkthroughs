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
```

### what is the file name you found?
```
```

### what is the FTP Password?
```
```

### what is the file name with SSH password?
```
```
### user.txt
```
```
### root.txt
```
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

## Gaining Access Of FTP
Let use above found phase and this as ftp pass
```
death@esther:~$ ftp 10.49.161.195
Connected to 10.49.161.195.
220 (vsFTPd 3.0.2)
Name (10.49.161.195:death): vigilante
331 Please specify the password: !#th3h00d
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> 
```

as i list storge there are 2 type of pnd and 1 jpg image are there i use get command to download them all 
```
death@esther:~$ ftp 10.49.161.195
Connected to 10.49.161.195.
220 (vsFTPd 3.0.2)
Name (10.49.161.195:death): vigilante
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||50900|).
150 Here comes the directory listing.
-rw-r--r--    1 0        0          511720 May 01  2020 Leave_me_alone.png
-rw-r--r--    1 0        0          549924 May 05  2020 Queen's_Gambit.png
-rw-r--r--    1 0        0          191026 May 01  2020 aa.jpg
226 Directory send OK.
ftp> get Leave_me_alone.png
local: Leave_me_alone.png remote: Leave_me_alone.png
229 Entering Extended Passive Mode (|||27498|).
150 Opening BINARY mode data connection for Leave_me_alone.png (511720 bytes).
100% |*******************************************************************************************|   499 KiB    2.74 MiB/s    00:00 ETA
226 Transfer complete.
511720 bytes received in 00:00 (2.30 MiB/s)
ftp> get  Queen's_Gambit.png
local: Queen's_Gambit.png remote: Queen's_Gambit.png
229 Entering Extended Passive Mode (|||10739|).
150 Opening BINARY mode data connection for Queen's_Gambit.png (549924 bytes).
100% |*******************************************************************************************|   537 KiB    2.84 MiB/s    00:00 ETA
226 Transfer complete.
549924 bytes received in 00:00 (2.47 MiB/s)
ftp> get aa.jpg
local: aa.jpg remote: aa.jpg
229 Entering Extended Passive Mode (|||6707|).
150 Opening BINARY mode data connection for aa.jpg (191026 bytes).
100% |*******************************************************************************************|   186 KiB    1.04 MiB/s    00:00 ETA
226 Transfer complete.
191026 bytes received in 00:00 (846.51 KiB/s)
ftp> 
```
as i came to home directory i got to know there are 2 user 
```
ftp> cd /home
250 Directory successfully changed.
ftp> ls
229 Entering Extended Passive Mode (|||27153|).
150 Here comes the directory listing.
drwx------    2 1000     1000         4096 May 01  2020 slade
drwxr-xr-x    2 1001     1001         4096 May 05  2020 vigilante
226 Directory send OK.
ftp> 
```

Now view the image files and we see that 'Leave.me.alone.png' is not opening.
Also the exiftool shows 'File Format error'

<img width="753" height="730" alt="image" src="https://github.com/user-attachments/assets/af6e431d-04d9-4014-ba41-723aba303fca" />

Let open this in hexeditor 

<img width="1362" height="420" alt="image" src="https://github.com/user-attachments/assets/8edcf30b-d49e-4a43-871e-310cf8fcb42c" />

At first i dont no whats wrong after doing gpt i got to know this is not 

<img width="824" height="512" alt="image" src="https://github.com/user-attachments/assets/d9f7fb6e-f828-4e06-a221-4905e20ecb56" />

Now lets change it 

<img width="1367" height="342" alt="image" src="https://github.com/user-attachments/assets/cb72c22f-9e4c-494c-88e9-f92ee2ae9663" />

After making chnage we can see the image 

<img width="845" height="475" alt="Leave_me_alone" src="https://github.com/user-attachments/assets/a50b068c-0b6f-4b5a-a3e0-5742a1219a66" />

Now you can open the image file Here you got a password : 'password' 

Now lets use steghide to extract any hidden files within the other image files.
```
death@esther:~/Downloads$ steghide extract -sf aa.jpg
Enter passphrase: 
wrote extracted data to "ss.zip".
```
We got a zip after extracting the Zip We got 2 file 
```
death@esther:~/Downloads$ cat passwd.txt 
This is your visa to Land on Lian_Yu # Just for Fun ***


a small Note about it


Having spent years on the island, Oliver learned how to be resourceful and 
set booby traps all over the island in the common event he ran into dangerous
people. The island is also home to many animals, including pheasants,
wild pigs and wolves.





death@esther:~/Downloads$ cat shado 
M3tahuman
death@esther:~/Downloads$ 
```

## User Flag

Now as we have got the ssh password we can now login -- 
User - slade 
password - M3tahuman
```
death@esther:~$ ssh slade@10.49.161.195
slade@10.49.161.195's password: 
			      Way To SSH...
			  Loading.........Done.. 
		   Connecting To Lian_Yu  Happy Hacking

██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗██████╗ 
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝╚════██╗
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗   █████╔╝
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝  ██╔═══╝ 
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚══════╝


	██╗     ██╗ █████╗ ███╗   ██╗     ██╗   ██╗██╗   ██╗
	██║     ██║██╔══██╗████╗  ██║     ╚██╗ ██╔╝██║   ██║
	██║     ██║███████║██╔██╗ ██║      ╚████╔╝ ██║   ██║
	██║     ██║██╔══██║██║╚██╗██║       ╚██╔╝  ██║   ██║
	███████╗██║██║  ██║██║ ╚████║███████╗██║   ╚██████╔╝
	╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝    ╚═════╝  #

slade@LianYu:~$ ls
user.txt
slade@LianYu:~$ cat user.txt 
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
			--Felicity Smoak

slade@LianYu:~$ 
```
```
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
```

---

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

## Exploring FTP Storage

Once inside, I listed the available files on the server.

```
ls
```

The directory contained three image files:

* `Leave_me_alone.png`
* `Queen's_Gambit.png`
* `aa.jpg`

I downloaded all of them locally for further analysis.

```
get Leave_me_alone.png
get Queen's_Gambit.png
get aa.jpg
```

---

## Enumerating User Directories

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

## Analyzing Downloaded Files

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

## Extracting Hidden Data

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
...
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

Once inside, I listed the directory contents.

```
ls
```

The user flag was present in the home directory.

```
cat user.txt
```

```
THM{P30P7E_K33P_53CRET5__C0MPUT3R5_D0N'T}
```

That marked successful user-level access on the machine.
