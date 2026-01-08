# <div align="center">[CyberHeros TryHackMe writeup](https://tryhackme.com/room/cyberheroes)</div>
<div align="center">Want to be a part of the elite club of CyberHeroes? Prove your merit by finding a way to log in!</div>
<div align="center"></div>
<div align="center"></div>

## Initial Reconnaissance

I started with a basic Nmap scan to understand what services were exposed on the target.

```
~$ nmap -sV 10.48.153.105

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.4 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.48 ((Ubuntu))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

There are two services running:

• SSH on port 22
• HTTP on port 80


## Web Exploitation
as port 80 is open let nevvigate to it on browser

<img width="1904" height="603" alt="image" src="https://github.com/user-attachments/assets/4fef4abe-00bf-43a8-8873-0eda664108a3" />

okay the 1st page is index page with 3 differnt tab include about and login page
<img width="699" height="525" alt="image" src="https://github.com/user-attachments/assets/63b72438-1b6b-4fec-983d-590738fd50c7" />

at login page its says Show your hacking skills and login to became a CyberHero ! :D

as i have no hope and idea of i take a look at source code using curl and find out thsi block at code
```
  <script>
    function authenticate() {
      a = document.getElementById('uname')
      b = document.getElementById('pass')
      const RevereString = str => [...str].reverse().join('');
      if (a.value=="h3ck3rBoi" & b.value==RevereString("54321@terceSrepuS")) { 
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("flag").innerHTML = this.responseText ;
            document.getElementById("todel").innerHTML = "";
            document.getElementById("rm").remove() ;
          }
        };
        xhttp.open("GET", "RandomLo0o0o0o0o0o0o0o0o0o0gpath12345_Flag_"+a.value+"_"+b.value+".txt", true);
        xhttp.send();
      }
      else {
        alert("Incorrect Password, try again.. you got this hacker !")
      }
    }
  </script>
```
This is where the whole thing comes into play.

In this section, the username and password we entered in the form are taken.
```
if (a.value=="h3ck3rBoi" & b.value==RevereString("54321@terceSrepuS"))
```
Here, it is checked whether the uname (i.e. username) is equal to “h3ck3rBoi” and the pass (i.e. password) is equal to the opposite of “54321@terceSrepuS”, i.e. “SuperSecret@12345”.

So, the username we need to log in is `h3ck3rBoi` and the password is `SuperSecret@12345`. Now let’s try logging in with this credential:
username
```
h3ck3rBoi`
```
password
```
SuperSecret@12345
```
## Capting flag

<img width="709" height="264" alt="image" src="https://github.com/user-attachments/assets/d5739441-4428-465b-ae58-b16492b16fa6" />

```
flag{edb0be532c540b1a150c3a7e85d2466e}
```
---
## Web Exploitation

Since port 80 was open, I navigated to it directly in the browser.

<img width="1904" height="603" alt="image" src="https://github.com/user-attachments/assets/4fef4abe-00bf-43a8-8873-0eda664108a3" />

The landing page turned out to be a simple index page with three tabs, including an About section and a Login page.

<img width="699" height="525" alt="image" src="https://github.com/user-attachments/assets/63b72438-1b6b-4fec-983d-590738fd50c7" />

The login page displayed a familiar challenge message inviting me to prove my hacking skills. With no credentials available upfront, I checked the page source using curl and came across the following JavaScript block:

```
<script>
  function authenticate() {
    a = document.getElementById('uname')
    b = document.getElementById('pass')
    const RevereString = str => [...str].reverse().join('');
    if (a.value=="h3ck3rBoi" & b.value==RevereString("54321@terceSrepuS")) { 
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("flag").innerHTML = this.responseText ;
          document.getElementById("todel").innerHTML = "";
          document.getElementById("rm").remove() ;
        }
      };
      xhttp.open("GET", "RandomLo0o0o0o0o0o0o0o0o0o0gpath12345_Flag_"+a.value+"_"+b.value+".txt", true);
      xhttp.send();
    }
    else {
      alert("Incorrect Password, try again.. you got this hacker !")
    }
  }
</script>
```

This is where everything clicked. The script validates the input by checking a hardcoded username and a reversed password string.

```
if (a.value=="h3ck3rBoi" & b.value==RevereString("54321@terceSrepuS"))
```

Reversing the string reveals the password as `SuperSecret@12345`. With that, the required credentials became clear.

**Username**

```
h3ck3rBoi
```

**Password**

```
SuperSecret@12345
```

## Capturing the Flag

After logging in with the above credentials, the page returned the flag.

<div align="center">
  <img width="709" height="264" alt="image" src="https://github.com/user-attachments/assets/d5739441-4428-465b-ae58-b16492b16fa6" />
</div>

```
flag{edb0be532c540b1a150c3a7e85d2466e}
```

