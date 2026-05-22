## Eavesdropper --Tryhackme walkthrough


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
chmod 600
```
