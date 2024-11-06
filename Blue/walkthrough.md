# <div align="center">[Blue](https://tryhackme.com/r/room/blue)</div>
<div align="center">Windows Exploitation Basics - Easy</div>
<br><div align="center">
<img src="https://github.com/user-attachments/assets/ae3803c5-7fa3-4d5a-89a1-6c5dc1d87233" height="200px"></img> 
</div>

## Task 1. Recone
### How many ports are open with a port number under 1000?
```
3
```
### What is this machine vulnerable to? (Answer in the form of: ms??-???, ex: ms08-067)
```
ms17-010
```
## Task 2. Gain Access
### Find the exploitation code we will run against the machine. What is the full path of the code? (Ex: exploit/........)
```
exploit/windows/smb/ms17_010_eternalblue
```
### Show options and set the one required value. What is the name of this value? (All caps for submission)
```
RHOSTS
```
##  Task 3. Escalate
### If you haven't already, background the previously gained shell (CTRL + Z). Research online how to convert a shell to meterpreter shell in metasploit. What is the name of the post module we will use? (Exact path, similar to the exploit we previously selected) 
```
post/multi/manage/shell_to_meterpreter
```
### Select this (use MODULE_PATH). Show options, what option are we required to change?
```
SESSION
```
##  Task 4. Cracking
### Within our elevated meterpreter shell, run the command 'hashdump'. This will dump all of the passwords on the machine as long as we have the correct privileges to do so. What is the name of the non-default user? 
```
Jon
```
### Copy this password hash to a file and research how to crack it. What is the cracked password?
```
alqfna22
```
##  Task 5. Find flags!
### Flag1? This flag can be found at the system root. 
```
flag{access_the_machine}
```
### *Errata: Windows really doesn't like the location of this flag and can occasionally delete it. It may be necessary in some cases to terminate/restart the machine and rerun the exploit to find this flag. This relatively rare, however, it can happen. 
```
flag{sam_database_elevated_access}
```
### flag3? This flag can be found in an excellent location to loot. After all, Administrators usually have pretty interesting things saved. 
```
flag{admin_documents_can_be_valuable}
```
