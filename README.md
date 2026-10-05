<div align="center">
<img src="https://github.com/user-attachments/assets/801f8cc4-8527-48bc-a875-8e5f8804d2ff" height="150"></img>
</div>

<div align="center">

![Platform](https://img.shields.io/badge/Platform-TryHackMe-red)
![Focus](https://img.shields.io/badge/Focus-Penetration%20Testing-blue)
![Level](https://img.shields.io/badge/Level-Beginner%20to%20Intermediate-brightgreen)
![Labs](https://img.shields.io/badge/Labs-143-blueviolet)
![License](https://img.shields.io/github/license/Esther7171/TryHackMe-Walkthroughs)

</div>

---

# TryHackMe Walkthroughs & Writeups

Writeups from every TryHackMe room I've completed. Steps I took, commands that worked and what I learned along the way.

Covers web exploitation, CVE research, privilege escalation, container escapes, binary exploitation, DFIR and AI/LLM security on Linux, Windows and Web. CVEs from 2004 to 2025.

---

## Statistics

| Metric | Count |
|:---|:---:|
| Easy rooms | 83 |
| Medium rooms | 36 |
| Hard rooms | 8 |
| Info rooms | 3 |
| Not yet rated | 13 |
| Total walkthroughs | 143 |
| CVEs referenced | 125 |
| Platforms | Linux, Windows, Web |
| Active since | 2024 |

---

## What You Will Learn

**Exploitation**
- Web attacks: SQL injection, XSS, LFI/RFI, SSRF, IDOR, RCE, SSTI, authentication bypass
- CVE-based exploitation using public proof-of-concepts and Metasploit modules
- Password cracking and hash identification with Hashcat and John the Ripper
- Network service exploitation: Samba, ProFtpd, SSH, Icecast, OpenClinic, FreeSWITCH

**Privilege Escalation**
- Linux: SUID binaries, PATH hijacking, cronjob abuse, kernel exploits, sudo misconfiguration
- Windows: token impersonation, WinPEAS, unquoted service paths, registry escalation

**Enumeration**
- Network scanning with nmap, subdomain and vhost enumeration
- Directory brute-forcing with ffuf and Gobuster, DNS enumeration, OSINT

**Specialised Topics**
- Container and Docker exploitation and escape
- Active Directory enumeration and attacks
- Digital forensics and volatile memory analysis
- Binary exploitation and reverse engineering
- Cryptography, steganography, and encoding challenges
- AI and LLM security: prompt injection and jailbreaking

---

## Featured Rooms

| Room | Difficulty | Platform | Technique |
|---|:---:|:---:|---|
| [Blue](./Room/Blue/readme.md) | Easy | Windows | EternalBlue (MS17-010) → Metasploit shell → hash cracking |
| [Dogcat](./Room/Dogcat/readme.md) | Medium | Linux | LFI → log poisoning → RCE → Docker container escape |
| [The Marketplace](./Room/The-Marketplace/readme.md) | Medium | Linux | Stored XSS → cookie theft → SQL injection → Docker socket escalation |
| [ContainMe](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/ContainMe/Readme.md#containme---tryhackme-walkthrough) | Medium | Linux | SSH pivot → multi-hop container escape across internal network |
| [Erlang/OTP SSH CVE-2025-32433](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Erlang-OTP%20SSH_CVE-2025-32433#erlangotp-ssh-cve-2025-32433) | Easy | Linux | Pre-auth RCE in Erlang SSH: 2025 CVE in a lab environment |
| [Year of the Dog](./Room/Year-of-the-Dog/readme.md) | Hard | Linux | Blind SQL injection → Gitea code execution → root |

---

## Learning Focus Areas

### Web Exploitation
SQL injection, XSS, LFI/RFI, SSRF, IDOR, SSTI, RCE, and authentication bypass.

[The Marketplace](./Room/The-Marketplace/readme.md) · [Dogcat](./Room/Dogcat/readme.md) · [The London Bridge](./Room/The-London-Bridge/readme.md) · [Battery](./Room/Battery/readme.md) · [CTF Collection Vol.2](./Room/CTF-collection-Vol.2/readme.md) · [The Sticker Shop](./Room/The-Sticker-Shop/readme.md) · [Capture!](./Room/Capture!/readme.md) · [Wekor](./Room/Wekor/readme.md) · [MD2PDF](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/MD2PDF#md2pdf-tryhackme-writeup)

### Privilege Escalation: Linux
SUID abuse, PATH hijacking, cronjob exploitation, sudo misconfiguration.

[Kenobi](./Room/Kenobi/readme.md) · [Madness](./Room/Madness/readme.md) · [Eavesdropper](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Eavesdropper/Readme.md#eavesdropper-tryhackme-walkthrough) · [Cheese CTF](./Room/Cheese-CTF/readme.md) · [Watcher](./Room/Watcher/readme.md) · [Oh My WebServer](./Room/Oh-My-WebServer/readme.md) · [Startup](./Room/Startup/readme.md)

### Privilege Escalation: Windows
Token impersonation, WinPEAS, unquoted service paths, Metasploit post-exploitation.

[Alfred](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Alfred/readme.md#alfred) · [Blue](./Room/Blue/readme.md) · [HackPark](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/HackPark#hack-park---tryhackme-walkthrough) · [Steel Mountain](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Steel%20Mountain#steel-mountain) · [Ice](./Room/Ice/readme.md) · [Blueprint](./Room/Blueprint/readme.md) · [Flatline](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Flatline#flatline-tryhackme-walkthrough--complete-step-by-step-guide-to-root)

### CVE Exploitation
Real-world CVEs in lab environments, 2004 to 2025.

[Erlang/OTP CVE-2025-32433](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Erlang-OTP%20SSH_CVE-2025-32433#erlangotp-ssh-cve-2025-32433) · [Roundcube CVE-2025-49113](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Roundcube%E2%80%94%20CVE-2025-49113/Readme.md#roundcube-cve-2025-49113) · [Silver Platter CVE-2024-36042](./Room/Silver-Platter/readme.md) · [Annie CVE-2020-13160](./Room/Annie/readme.md) · [Kiba CVE-2019-7609](./Room/Kiba/readme.md) · [Blue MS17-010](./Room/Blue/readme.md) · [Ice CVE-2004-1561](./Room/Ice/readme.md)

### Cryptography & Steganography
Hash cracking, cipher analysis, encoding challenges, steganographic extraction.

[Crack the Hash Level-1](./Room/Crack-The-Hash-Level-1/readme.md) · [Crack The Hash Level-2](./Room/Crack-The-Hash-Level-2/readme.md) · [Cicada-3301 Vol:1](./Room/Cicada-3301-Vol_1/readme.md) · [C4ptur3-th3-fl4g](./Room/C4ptur3-th3-fl4g/readme.md) · [W1seGuy](./Room/W1seGuy/readme.md) · [Cipher's Secret Message](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Cipher's%20Secret%20Message/readme.md#ciphers-secret-message--tryhackme-writeup)

### Container & Cloud Security
Docker socket exploitation, container escape, multi-hop pivoting, cloud misconfiguration.

[ContainMe](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/ContainMe/Readme.md#containme---tryhackme-walkthrough) · [Dogcat](./Room/Dogcat/readme.md) · [The Great Escape](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/The-Great-Escape/readme.md#the-great-escape) · [The Marketplace](./Room/The-Marketplace/readme.md) · [A Bucket of Phish](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/A%20Bucket%20of%20Phish/readme.md#a-bucket-of-phish---tryhackme-writeup)

### Binary Exploitation & Reverse Engineering
Buffer overflows, binary analysis, shellcode execution, reverse engineering.

[Precision](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Precision#precision--tryhackme-writeup) · [Void Execution](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Void%20Execution#void-execution--tryhackme-writeup) · [0x41haz](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/0x41haz/readme.md#0x41haz--tryhackme-walkthrough) · [Compiled](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Compiled#compiled---tryhackme-writeup) · [Mindgames](./Room/Mindgames/readme.md)

### Forensics & DFIR
Volatile memory analysis, log investigation, digital forensics.

[Analysing Volatile Memory](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Analysing%20Volatile%20Memory#analysing-volatile-memory) · [Slingshot](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Slingshot/README.md#slingshot) · [Event Horizon](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Event%20Horizon/readme.md#event-horizon) · [Directory](https://github.com/Esther7171/TryHackMe-Walkthroughs/tree/main/Room/Directory#directory) · [Dumping Router Firmware](./Room/Dumping-Router-Firmware/readme.md)

### AI & LLM Security
Prompt injection and LLM jailbreaking in a sandboxed lab.

[Evil-GPT](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Evil-GPT/Readme.md#evil-gpt) · [Evil-GPT v2](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/Evil-GPT%20v2/Readme.md#evil-gpt-v2) · [BankGPT](https://github.com/Esther7171/TryHackMe-Walkthroughs/blob/main/Room/BankGPT/readme.md)

---

## Walkthroughs

All 143 TryHackMe walkthroughs in this repository, A to Z. Each one is also on [deathesther.tech/writeups](https://deathesther.tech/writeups/) with search and filters.

| Room | Difficulty | OS | Description | Topics |
|:---|:---:|:---:|---|---|
| [0day](./Room/0day/readme.md) | Medium | Linux | Exploit Ubuntu, like a Turtle in a Hurricane | `CTF` `only flag` |
| [0x41haz](./Room/0x41haz/readme.md) | Easy | Linux | Simple Reversing Challenge | `Reverse Engineering` |
| [25 Days of Cyber Security](./Room/25%20Days%20of%20Cyber%20Security/Readme.md) | Easy | Linux | Get started with Cyber Security in 25 Days - Learn the basics by doing a new, beginner friendly security challenge every day. | `Learning` |
| [A Bucket of Phish](./Room/A%20Bucket%20of%20Phish/readme.md) | Easy | Linux | From the Hackfinity Battle CTF event. | `cloud` `only flag` |
| [Abusing Windows Internals](./Room/Abusing%20Windows%20Internals/Readme.md) | Hard | Windows | Leverage windows internals components to evade common detection solutions, using modern tool-agnostic approaches. | `Learning` |
| [Agent Sudo](./Room/Agent-Sudo/readme.md) | Easy | Linux | You found a secret server located under the deep sea. Your task is to hack inside the server and reveal the truth | CTF `CVE-2019-14287` |
| [Alfred](./Room/Alfred/readme.md) | Easy | Windows | Exploit Jenkins to gain an initial shell, then escalate your privileges by exploiting Windows authentication tokens. | `privileges escalation via token impersonation` |
| [Analysing Volatile Memory](./Room/Analysing%20Volatile%20Memory/Readme.md) | Medium | Windows | Learn how the Windows OS manages volatile data in different files on disk. Explore how to extract and analyse volatile data from those artefacts. | `Forensics` |
| [Annie](./Room/Annie/readme.md) | Medium | Linux | Remote access comes in different flavors | AnyDesk 5.5.2 – Remote Code Execution `CVE-2020-13160` |
| [Anonforce](./Room/Anonforce/readme.md) | Easy | Linux | boot2root machine for FIT and bsides guatemala CTF | CTF |
| [Archangel](./Room/Archangel/readme.md) | Easy | Linux | Boot2root, Web exploitation, Privilege escalation, LFI | CTF |
| [Backtrack](./Room/Backtrack/readme.md) |  |  |  |  |
| [BankGPT](./Room/BankGPT/readme.md) |  |  | A customer service assistant used by a banking system. | `only flag` |
| [Basic-Pentesting](./Room/Basic-Pentesting/readme.md) | Easy | Linux | This is a machine that allows you to practise web app hacking and privilege escalation | `CTF` |
| [Battery](./Room/Battery/readme.md) | Medium | Linux | CTF designed by CTF lover for CTF lovers | `Re-Registration Attack` `XML External Entity` `Sudo Abuse` |
| [Biblioteca](./Room/Biblioteca/readme.md) |  |  | Shhh. Be very very quiet, no shouting inside the biblioteca. | `only flag` |
| [Biteme](./Room/Biteme/readme.md) | Medium | Linux | Stay out of my server! | CTF `only flag` |
| [Blue](./Room/Blue/readme.md) | Easy | Windows | Windows Exploitation Basics - Easy | `MS17-010` EternalBlue SMB Remote Windows Kernel Pool Corruption |
| [Blueprint](./Room/Blueprint/readme.md) | Easy | Windows | Hack into this Windows machine and escalate your privileges to Administrator. | `osCommerce 2.3.4.1 - Remote Code Execution` `only flag` |
| [Bounty Hacker](./Room/Bounty-Hacker/readme.md) | Easy | Linux | You talked a big game about being the most elite hacker in the solar system. Prove it and claim your right to the status of Elite Bounty Hacker! | `CTF` |
| [Break Out The Cage](./Room/Break-Out-The-Cage/readme.md) | Easy | Linux | Help Cage bring back his acting career and investigate the nefarious goings on of his agent! | CTF |
| [Brooklyn-Nine-Nine](./Room/Brooklyn-Nine-Nine/readme.md) | Easy | Linux | This room is aimed for beginner level hackers but anyone can try to hack this box. There are two main intended ways to root the box | `CTF` |
| [Bugged](./Room/Bugged/readme.md) | Easy | Linux | John likes to live in a very Internet connected world. Maybe too connected... | `IoT Device hacking` |
| [C4ptur3-th3-fl4g](./Room/C4ptur3-th3-fl4g/readme.md) | Easy | Linux | A beginner level CTF challenge | Decoding Messages `Spectrograms` `Steganography` `Security through obscurity` |
| [Capture!](./Room/Capture!/readme.md) | Easy | Web | Can you bypass the login form? | `Authentication Bypass` |
| [Careers in Cyber](./Room/Careers-in-Cyber/readme.md) | Info |  | Learn about the different careers in cyber security | `Guide` |
| [Cheese CTF](./Room/Cheese-CTF/readme.md) | Easy | Linux | Inspired by the great cheese talk of THM! | CTF `LFI` `RCE` `SUID` |
| [CherryBlossom](./Room/CherryBlossom/Readme.md) |  |  | Boot-to-root with emphasis on crypto and password cracking. |  |
| [Chocolate_Factory](./Room/Chocolate_Factory/readme.md) | Easy | Linux | A Charlie And The Chocolate Factory themed room, revisit Willy Wonka's chocolate factory! | `CTF` |
| [Cicada-3301 Vol:1](./Room/Cicada-3301-Vol_1/readme.md) | Medium | Linux | A basic steganography and cryptography challenge room based on the Cicada 3301 challenges | `Cryptography` |
| [Cipher's Secret Message](./Room/Cipher's%20Secret%20Message/readme.md) | Easy | Any | Sharpen your cryptography skills by analyzing code to get the flag. | `Caesar Decryption` `Crypto Challenge` |
| [Clocky](./Room/Clocky/Readme.md) |  |  | Time is an illusion. |  |
| [CMesS](./Room/CMesS/readme.md) | Medium | Linux | Can you root this Gila CMS box? | `Gila CMS 1.10.9` |
| [Compiled](./Room/Compiled/Readme.md) | Easy | Any | Strings can only help you so far. | `binary` `only flag` |
| [ContainMe](./Room/ContainMe/Readme.md) | Medium | Linux | Where am I ? Catch me | `Container Escape` |
| [Corridor](./Room/Corridor/readme.md) | Easy | Web | Can you escape the Corridor? | `IDOR` |
| [Crack the Hash Level-1](./Room/Crack-The-Hash-Level-1/readme.md) | Easy | Any | Cracking hashes challenges | `Cryptography` |
| [Crack The Hash Level-2](./Room/Crack-The-Hash-Level-2/readme.md) | Medium | Any | Advanced cracking hashes challenges and wordlist generation | `Cryptography` |
| [CTF collection Vol.2](./Room/CTF-collection-Vol.2/readme.md) | Medium | Linux | Sharpening up your CTF skill with the collection. The second volume is about web-based CTF. | CTF `Cryptography` |
| [Cupid's Matchmaker](./Room/Cupid's%20Matchmaker/Readme.md) | Easy | Web | Use your web exploitation skills against this matchmaking service. | `XSS` |
| [CyberHeroes](./Room/CyberHeroes/Readme.md) | Easy | Web | Want to be a part of the elite club of CyberHeroes? Prove your merit by finding a way to log in! | `Broken Authentication` |
| [Dev Diaries](./Room/Dev%20Diaries/Readme.md) | Easy | Web | Hunt through online development traces to uncover what was left behind. | `OSINT` |
| [Dig Dug](./Room/Dig%20Dug/Readme.md) | Easy | Any | Turns out this machine is a DNS server - it's time to get your shovels out! | `DNS Enumeration` |
| [Directory](./Room/Directory/Readme.md) | Hard | Any | Do you have what it takes to crack this case? | `DFIR` |
| [Dogcat](./Room/Dogcat/readme.md) | Medium | Linux | I made a website where you can look at pictures of dogs and/or cats! Exploit a PHP application via LFI and break out of a docker container. | CTF `Web` `only flag` |
| [Dumping Router Firmware](./Room/Dumping-Router-Firmware/readme.md) | Medium | Linux | Have you ever been curious about how your router works? What OS it runs? What makes it tick? | `Firmware Analysis` `only flag` |
| [Eavesdropper](./Room/Eavesdropper/Readme.md) | Easy | Linux | Listen closely, you might hear a password! | `CTF` , `PATH hijacking` |
| [Erlang/OTP SSH_CVE-2025-32433](./Room/Erlang-OTP%20SSH_CVE-2025-32433/readme.md) | Easy | Linux | Learn about and exploit Erlang/OTP SSH CVE-2025-32433 in a lab setup. | `CVE-2025-32433` |
| [Event Horizon](./Room/Event%20Horizon/readme.md) | Hard | Linux | Unearth the secrets beyond the Event Horizon. | `DFIR` |
| [Evil-GPT](./Room/Evil-GPT/Readme.md) | Easy | Linux | Practice your LLM hacking skills. | `LLM hacking` `Prompt Injection` |
| [Evil-GPT v2](./Room/Evil-GPT%20v2/Readme.md) | Easy | Web | Put your LLM hacking skills to the test one more time. | `Advanced LLM hacking` `Prompt Injection` |
| [FFuF](./Room/Ffuf/readme.md) | Easy | Linux | Enumeration, fuzzing, and directory brute forcing using ffuf | `Tool Guide` |
| [Flatline](./Room/Flatline/Readme.md) | Easy | Windows | How low are your morals? | `FreeSWITCH` `openclinic` |
| [Game Buzz](./Room/Game%20Buzz/readme.md) | Hard | Linux | Part of Incognito CTF | `CTF` |
| [Hacker v/s Hacker](./Room/Hacker-vs-Hacker/readme.md) | Easy | Linux | Someone has compromised this server already! Can you get in and evade their countermeasures? | `LFI` |
| [Hackfinity Battle](./Room/Hackfinity%20Battle/Readme.md) | Medium | Any | Welcome to the Hackfinity Battle CTF! | `Challenge` `only flag` |
| [HackPark](./Room/HackPark/Readme.md) | Medium | Windows | Bruteforce a websites login with Hydra, identify and use a public exploit then escalate your privileges on this Windows machine! | `Hydra`, `RCE` & `WinPEAS` `CTF` `only flag` |
| [HaskHell](./Room/HaskHell/readme.md) | Medium | Linux | Teach your CS professor that his PhD isn't in security. | `Python` |
| [hc0n Christmas CTF](./Room/hc0n%20Christmas%20CTF/readme.md) | Hard | Linux | Hack the planet | `CTF` |
| [Hidden Deep Into my Heart](./Room/Hidden-Deep-Into-my-Heart/readme.md) | Easy | Web | Find what's hidden deep inside this website. | `Web Enumeration` |
| [Hijack](./Room/Hijack/Readme.md) | Easy | Linux | Misconfigs conquered, identities claimed. | `Misconfiguration` |
| [Hydra](./Room/Hydra/readme.md) | Easy | Linux | Learn about and use Hydra, a fast network logon cracker, to bruteforce and obtain a website's credentials | `Tool Guide` |
| [Ice](./Room/Ice/readme.md) | Easy | Windows | Deploy & hack into a Windows machine, exploiting a very poorly secured media server | Buffer overflow in Icecast 2.0.1 allows remote attackers to execute arbitrary code via an HTTP request `CVE-2004-1561` |
| [Idor](./Room/IDOR/Readme.md) | Easy | Web | Learn how to find and exploit IDOR vulnerabilities in a web application giving you access to data that you shouldn't have. | `Learn idor` |
| [Ignite](./Room/Ignite/readme.md) | Easy | Linux | A new start-up has a few issues with their web server | `CMS` `RCE` `only flag` |
| [Inside a Computer System](./Room/Inside%20a%20Computer%20System/Readme.md) | Info | Web | This room covers the basic components of a computer system. | `Info` |
| [Introductory Networking](./Room/Introductory%20Networking/Readme.md) |  |  | An introduction to networking theory and basic networking tools |  |
| [Jacob the Boss](./Room/Jacob%20the%20Boss/Readme.md) | Easy | Linux | Find a way in and learn a little more. | `CVE-2010-0738` |
| [Kenobi](./Room/Kenobi/readme.md) | Easy | Linux | Walkthrough on exploiting a Linux machine. Enumerate Samba for shares, manipulate a vulnerable version of proftpd and escalate your privileges with path variable manipulation. | `ProFtpd` `SUID` |
| [Kiba](./Room/Kiba/readme.md) | Easy | Linux | Identify the critical security flaw in the data visualization dashboard, that allows execute remote code execution. | `CVE-2019-7609` |
| [Lian Yu](./Room/Lian_Yu/Readme.md) |  |  | A beginner level security challenge |  |
| [Linux Shell](./Room/Linux%20Shells/readme.md) | Easy | Linux | Learn about scripting and the different types of Linux shells. | `Shell` |
| [Lo-Fi](./Room/Lo-Fi/readme.md) | Easy | Linux | Want to hear some lo-fi beats, to relax or study to? We've got you covered! | CTF `LFI` |
| [Looking Glass](./Room/Looking-Glass/readme.md) | Medium | Linux | Step through the looking glass. A sequel to the Wonderland challenge room. | CTF |
| [Lookup](./Room/Lookup/readme.md) | Easy | Linux | Test your enumeration skills on this boot-to-root machine. | CTF `elFinder PHP Connector exiftran Command Injection vulnerability` `Path manipulation exploitation` |
| [Love Letter Locker](./Room/Love%20Letter%20Locker/Readme.md) | Easy | Web | Use your skills to access other users' letters. | `IDOR` |
| [Madness](./Room/Madness/readme.md) | Easy | Linux | Will you be consumed by Madness? | CTF `Steganography` `setuid` |
| [MD2PDF](./Room/MD2PDF/readme.md) | Easy | Web | TopTierConversions LTD is proud to present its latest product launch. | CTF |
| [Metamorphosis](./Room/Metamorphosis/readme.md) | Medium | Linux | Part of Incognito CTF | CTF `rsync` `SQL` `only flag` |
| [Metasploit: Exploitation](./Room/Metasploit%E2%80%94%20Exploitation/Readme.md) | Easy | Linux | Using Metasploit for scanning, vulnerability assessment and exploitation. | `Metasploit` |
| [Metasploit: Meterpreter](./Room/Metasploit%E2%80%94%20Meterpreter/Readme.md) | Easy | Linux | Take a deep dive into Meterpreter, and see how in-memory payloads can be used for post-exploitation. | `Metasploit` |
| [Mindgames](./Room/Mindgames/readme.md) | Medium | Linux | Just a terrible idea... | `Python` `C` |
| [mKingdom](./Room/mKingdom/readme.md) |  |  |  |  |
| [Mr Robot CTF](./Room/Mr-Robot-CTF/readme.md) | Medium | Linux | Based on the Mr. Robot show, can you root this box? | CTF |
| [Nax](./Room/Nax/readme.md) | Medium | Linux | Identify the critical security flaw in the most powerful and trusted network monitoring software on the market, that allows an authenticated user to execute remote code execution. | `CVE-2019-15949` `Metasploit` |
| [Neighbour](./Room/Neighbour/Readme.md) | Easy | Web | Check out our new cloud service, Authentication Anywhere. Can you find other user's secrets? | `IDOR` |
| [Net Sec Challenge](./Room/Net%20Sec%20Challenge/Readme.md) | Medium | Linux | Practice the skills you have learned in the Network Security module. | `nmap` `Hydra` `FTP` |
| [Ninja Skills](./Room/Ninja%20Skills/readme.md) | Easy | Linux | Practise your Linux skills and complete the challenges. | `investigation` |
| [Oh My WebServer](./Room/Oh-My-WebServer/readme.md) | Medium | Linux | Can you root me? | `CVE-2021-41773` |
| [Opacity](./Room/Opacity/readme.md) |  |  | Opacity is a Boot2Root made for pentesters and cybersecurity enthusiasts. |  |
| [Overheard at Breakfast](./Room/Overheard%20at%20Breakfast/Readme.md) | Easy |  | Two strangers. One conversation. One profile they never meant to reveal. |  |
| [Pentesting Fundamentals](./Room/Pentesting%20Fundamentals/readme.md) | Easy | Any | Learn the important ethics and methodologies behind every pentest. | `info` |
| [Pickle Rick](./Room/Pickle-Rick/readme.md) | Easy | Linux | A Rick and Morty CTF. Help turn Rick back into a human! | CTF `Web Cmd` |
| [Poster](./Room/Poster/Readme.md) | Easy | Linux | The sys admin set up a rdbms in a safe way. | `RDBMS Exploitation` |
| [Precision](./Room/Precision/readme.md) | Hard | Linux | Practice your advanced Linux Exploit Development skills. | `Binary Exploitation` `only flag` |
| [Principles of Security](./Room/Principles%20of%20Security/readme.md) | Easy | Any | Learn the principles of information security that secures data and protects systems from abuse | `info` |
| [Psyco Break](./Room/Psycho-Break/readme.md) | Easy | Linux | Help Sebastian and his team of investigators to withstand the dangers that come ahead. | CTF |
| [Publisher](./Room/Publisher/readme.md) | Easy | Linux | Test your enumeration skills on this boot-to-root machine | CTF `CVE-2023-27372` |
| [Putting it all together](./Room/Putting%20it%20all%20together/Readme.md) |  |  | Learn how all the individual components of the web work together to bring you access to your favourite web sites. |  |
| [Red Stone One Carat](./Room/Red%20Stone%20One%20Carat/Readme.md) | Medium | Linux | First room of the Red Stone series. Hack ruby using ruby. | restricted `rzsh` shell |
| [Red Team Fundamentals](./Room/Red%20Team%20Fundamentals/readme.md) | Easy | Any | Learn about the basics of a red engagement, the main components and stakeholders involved, and how red teaming differs from other cyber security engagements. |  |
| [RootMe](./Room/Rootme/readme.md) | Easy | Linux | A ctf for beginners, can you root me? | `File Upload` |
| [Roundcube: CVE-2025-49113](./Room/Roundcube%E2%80%94%20CVE-2025-49113/Readme.md) | Easy | Linux | Exploit CVE-2025-49113 in a lab environment. | `CVE-2025-49113` `only flag` |
| [Search Skills](./Room/Search%20Skills/Readme.md) | Easy | Any | Learn to efficiently search the Internet and use specialized search engines and technical docs. | `OSINT` |
| [Silver Platter](./Room/Silver-Platter/readme.md) | Easy | Linux | Can you breach the server? | `CVE-2024-36042` |
| [Simple CTF](./Room/Simple-CTF/readme.md) | Easy | Linux | Beginner level ctf | `CVE-2019-9053` `Vim` |
| [Slingshot](./Room/Slingshot/README.md) | Easy | Linux | Can you retrace an attacker's steps after they enumerate and compromise a web server? | `Logs` |
| [smol](./Room/Smol/readme.md) | Medium | Linux | Test your enumeration skills on this boot-to-root machine. | CTF |
| [Soupedecode 01](./Room/Soupedecode%2001/readme.md) | Easy | Windows | Test your enumeration skills on this boot-to-root machine. | `AD` |
| [Speed Chatting](./Room/Speed%20Chatting/Readme.md) | Easy | Web | Can you hack as fast as you can chat? | `RCE` |
| [Startup](./Room/Startup/readme.md) | Easy | Linux | Abuse traditional vulnerabilities via untraditional means. | CTF |
| [Steel Mountain](./Room/Steel%20Mountain/readme.md) | Easy | Linux | Hack into a Mr. Robot themed Windows machine. Use metasploit for initial access, utilise powershell for Windows privilege escalation enumeration and learn a new technique to get Administrator access. | `CVE-2014-6287` |
| [The CIA Triad](./Room/The%20CIA%20Triad/readme.md) |  |  | Understand the CIA Triad and how it shapes cyber security mindset. |  |
| [The Greenholt Phish](./Room/The%20Greenholt%20Phish/readme.md) | Easy | Windows | VERA reads every guestbook entry as an instruction. You write something she really shouldn't act on. | `SOC` |
| [The Guestbook](./Room/The%20Guestbook/Readme.md) | Medium | Web / AI |  | `AI` |
| [The Phishing Pond](./Room/The%20Phishing%20Pond/readme.md) | Easy | Web | Catch the phish before the phish catches you. | `Identifying Phishing Emails` |
| [The Great Escape](./Room/The-Great-Escape/readme.md) | Medium | Linux | Our devs have created an awesome new site. Can you break out of the sandbox? | `API` `Docker` |
| [The London Bridge](./Room/The-London-Bridge/readme.md) | Medium | Linux | The London Bridge is falling down | `SSRF` `CVE-2018-18955` `only flag` |
| [The Marketplace](./Room/The-Marketplace/readme.md) | Medium | Linux | Can you take over The Marketplace's infrastructure? | `XSS` `SQL` `Docker` |
| [The Server From Hell](./Room/The-Server-From-Hell/readme.md) | Medium | Linux | Face a server that feels as if it was configured and deployed by Satan himself. Can you escalate to root? | CTF |
| [The Sticker Shop](./Room/The-Sticker-Shop/readme.md) | Easy | Linux | Can you exploit the sticker shop in order to capture the flag? | `XSS` |
| [Tomghost](./Room/Tomghost/readme.md) | Easy | Linux | Identify recent vulnerabilities to try exploit the system or read files that you should not have access to. | `CVE-2020–1938` |
| [Toolbox: Vim](./Room/Toolbox%E2%80%94%20Vim/Readme.md) | Easy | Linux / Windows | Learn vim, a universal text editor that can be incredibly powerful when used properly. From basic text editing to editing of binary files, Vim can be an important arsenal in a security toolkit. | `Tool Guide` |
| [TryHeartMe](./Room/TryHeartMe/Readme.md) | Easy | Web | Access the hidden item in this Valentine's gift shop. | `CTF`,`Web Exploitation`, `JWT Manipulation` |
| [UltraTech](./Room/UltraTech/readme.md) | Medium | Linux | The basics of Penetration Testing, Enumeration, Privilege Escalation and WebApp testing | CTF |
| [Valenfind](./Room/Valenfind/readme.md) | Medium | Web | Can you find vulnerabilities in this new dating app? | `LFI` |
| [Void Execution](./Room/Void%20Execution/readme.md) | Medium | Linux | Learn how to bypass restrictions in Linux exploit development. | `Binary Exploitation` `only flag` |
| [Vulnerabilities 101](./Room/Vulnerabilities%20101/readme.md) | Easy | Any | Understand the flaws of an application and apply your researching skills on some vulnerability databases. | Info |
| [VulnNet Active](./Room/VulnNet-Active/Readme.md) |  |  |  |  |
| [VulnNet Endgame](./Room/VulnNet-Endgame%E2%80%8A/Readme.md) |  |  |  | `only flag` |
| [W1seGuy](./Room/W1seGuy/readme.md) | Easy | Linux | A w1se guy 0nce said, the answer is usually as plain as day. | `Cryptography` |
| [Watcher](./Room/Watcher/readme.md) | Medium | Linux | A boot2root Linux machine utilising web exploits along with some common privilege escalation techniques | `LFI` `Cronjob` |
| [Web Application Basics](./Room/Web_Application_Basics/readme.md) | Easy | Web | Learn the basics of web applications: HTTP, URLs, request methods, response codes, and headers. | Info |
| [Web Application Security](./Room/Web-Application-Security/readme.md) | Easy | Web | Learn about web applications and explore some of their common security issues. | Info |
| [Wekor](./Room/Wekor/readme.md) | Medium | Linux | CTF challenge involving SQLi, WordPress, vhost enumeration and recognizing internal services. | `SQL` `WordPress` `Reverse Engineering` |
| [Welcome](./Room/Welcome/readme.md) | Easy | Linux | Learn how to use a TryHackMe room to start your upskilling in cyber security. | Info `only flag` |
| [Wgel CTF](./Room/Wgel/readme.md) | Easy | Linux | Can you exfiltrate the root flag? | CTF `only flag` |
| [Whiterose](./Room/Whiterose/readme.md) | Easy | Linux | Yet another Mr. Robot themed challenge. | EJS `SSTI` |
| [Windows Fundamentals 1](./Room/Windows%20Fundamentals%201/readme.md) | Info | Windows | In part 1 of the Windows Fundamentals module, we'll start our journey learning about the Windows desktop, the NTFS file system, UAC, the Control Panel, and more.. | `Windows` |
| [Wonderland](./Room/Wonderland-CTF/readme.md) | Medium | Linux | Fall down the rabbit hole and enter wonderland | `Python` |
| [Year of the Dog](./Room/Year-of-the-Dog/readme.md) | Hard | Linux | Always so polite... | `Sqli` `Gitea` `only flag` |
| [Year-of-the-Owl](./Room/Year-of-the-Owl/readme.md) | Hard | Windows | The foolish owl sits on his throne... | `CTF` `only flag` |
| [Zeno](./Room/Zeno/readme.md) | Medium | Linux | Do you have the same patience as the great stoic philosopher Zeno? Try it out! | `Restaurant Management System 1.0 - Remote Code Execution` |

---

## Additional Information

This repository may also include relevant supporting files for each room, such as exploit scripts, log samples, and scan output. These can be found within the respective room directories.

All walkthroughs are for educational purposes only. Always adhere to ethical hacking principles and the terms and conditions of the TryHackMe platform.

---

## Contributing

Contributions are welcome. To add a walkthrough or improve an existing one, follow the standard GitHub workflow: fork the repository, make your changes, and submit a pull request.

---

*This collection is maintained by [Esther7171](https://github.com/Esther7171).*
