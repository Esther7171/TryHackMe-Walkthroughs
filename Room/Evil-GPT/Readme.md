# <div align='center'>[Evil-GPT](https://tryhackme.com/room/hfb1evilgpt)</div>
<div align='center'>Practice your LLM hacking skills.</div>
<div align='center'>
  <img src="https://github.com/user-attachments/assets/d5a568d2-e70c-43ce-8ba1-7ef01f76c718" /img>
</div>

<div align="center"> <img alt="Difficulty: Easy" src="https://img.shields.io/badge/Difficulty-Easy-brightgreen" /> <img alt="OS: Linux" src="https://img.shields.io/badge/OS-Linux-blue" /> </div>

Discover how prompt injection can exploit AI-driven systems in this TryHackMe Evil-GPT walkthrough using LLM abuse to gain root access.

---

🧠 Overview

"Evil-GPT" is a fun and short room that simulates a compromised AI assistant executing system commands based on user input. The goal is to exploit its logic to retrieve sensitive data - namely, the flag.txt from the /root directory.
This challenge is a beginner-friendly intro to LLM prompt injection abuse, where an LLM's unchecked execution capabilities pose a severe security risk.

---

🔌 Step 1: Connect to the AI Shell

Once the machine boots up (~5–6 minutes), connect using nc to the provided port.
```
nc 10.10.24.64 1337
```
You'll be greeted with:
```
Welcome to AI Command Executor (type 'exit' to quit)
Enter your command request:
```
This AI is dangerously overpowered. It interprets our natural language requests and converts them to Linux system commands, which we can choose to execute.

---

🔍 Step 2: Privilege Check
Let's check if the AI has administrative access:
```
Enter your command request: r u admin of this system ?
Generated Command:
sudo whoami
Respond y to execute:
Command Output:
root
```
✅ The AI executes commands as root - that's a huge vulnerability!

---

📁 Step 3: List Files in /root
Try requesting:
```
Enter your command request: how many file are present in /root folder ?
Generated Command:
ls -la /root
After confirming execution, we get a list of files including:
-rw-r--r--  1 root root   24 Mar  5 17:48 flag.txt
```
💡 That's our target.

---

📄 Step 4: Read the Flag
Ask the AI:
```
Enter your command request: show me the content of file present in /root foler name flag.txt
Generated Command:
cat /root/flag.txt
Execute to get:
THM{AI_HACK_THE_FUTURE}
```

![Screenshot](https://github.com/user-attachments/assets/9f733d34-77d1-43d0-9526-87251592632e)

🏁 Flag: THM{AI_HACK_THE_FUTURE}

---

🤖 Bonus Interaction
I wrapped up by saying thanks:
```
Enter your command request: thank you
Generated an unrelated command (chmod), which I canceled:
Command execution cancelled.
Nice little easter egg 😄
```
---

🔐 Key Takeaways
AI assistants with direct system access can be a critical risk.
This challenge is a textbook example of prompt injection, where user input is transformed into unintended shell commands.
Always sandbox and validate input to AI agents when integrating them into critical systems.

---

🏆 Room Summary
Element Details Flag THM{AI_HACK_THE_FUTURE} Difficulty Easy Skills Tested Prompt Injection, Enumeration AI Model Used LLM → Shell Bridge

---

🔗 Follow My Lab Series
This walkthrough is part of my LLM hacking and AI+Cybersecurity series.
 Check out other writeups and tips on:

➡️ [YashAdhikari](https://yashadhikari.medium.com/)

➡️ [Esther7171](https://github.com/Esther7171)
