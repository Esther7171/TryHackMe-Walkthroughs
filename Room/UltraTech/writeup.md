# <div align="center">[UltraTech](https://tryhackme.com/r/room/ultratech1)</div>
<div align="center">The basics of Penetration Testing, Enumeration, Privilege Escalation and WebApp testing</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/1a97d356-6e8b-43f4-b081-aa85419c75d5da" height="200"></img>
</div>

## Task 1. Deploy the machine
```
No need
```
## Task 2. It's enumeration time!
After enumerating the services and resources available on this machine, what did you discover?

### Which software is using the port 8081?
```
Node.js
```
### Which other non-standard port is used?
```
31331
```
### Which software using this port?
```
Apache
```
### Which GNU/Linux distribution seems to be used?
```
Ubuntu
```
### The software using the port 8081 is a REST api, how many of its routes are used by the web application?
```
2
```
## Task 3. Let the fun begin

Now that you know which services are available, it's time to exploit them!

Did you find somewhere you could try to login? Great!

Quick and dirty login implementations usually goes with poor data management.

There must be something you can do to explore this machine more thoroughly..

### There is a database lying around, what is its filename?
```
utech.db.sqlite
```
### What is the first user's password hash?
```
f357a0c52799563c7c7b76c1e7543a32
```
### What is the password associated with this hash?
```
n100906
```
## Task 4. The root of all evil

Congrats if you've made it this far, you should be able to comfortably run commands on the server by now!

Now's the time for the final step!

You'll be on your own for this one, there is only one question and there might be more than a single way to reach your goal.

Mistakes were made, take advantage of it.

### What are the first 9 characters of the root user's private SSH key?
```
MIIEogIBA
```
