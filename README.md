# TryHackMe-Walkthroughs

This repository contains walkthroughs for various rooms on TryHackMe, a platform for learning and practicing cybersecurity skills through hands-on virtual environments. Each directory corresponds to a specific room and includes a detailed walkthrough guide, along with any necessary files or resources. Purpose of creating this for self learning and helping others.

## Walkthroughs
- [0x41haz](./0x41haz/writeup.md)
- [AgentSudoCTF](./Agent%20Sudo/walkthrough.md)
- [Basic Pentesting](./Basic-Pentesting/walkthrough.md)
- [Bounty Hacker](./Bounty-Hacker/Walkthrough.md)
- [Brooklyn-Nine-Nine](./Brooklyn-Nine-Nine/walkthrough.md)
- [Cheese CTF](./Cheese%20CTF/walkthrough.md)
- [Chocolate Factory](./Chocolate_Factory/Walkthrough.md)
- [Corridor](./Corridor/writeup.md)
- [Hydra](./Hydra/writeup.md)
- [Ice](./Ice/WriteUp.md)
- [Ignite](./ignite%20walkthrough.pdf)
- [kenobi](./Kenobi/writeup.md)
- [Madness](./Madness/writeup.md) ---------------------------------> complete this
- [MR Robot](./MR%20Robot/walkthrought.md) ==============> 
- [picklerick](./picklerick/walkthrought.md) =============>
- [Publisher](./Publisher/writeup.md)
- [rootme](./rootme/walkthrought.md) ==============>
- [Simple CTF](./Simple%20CTF/walkthrought.md) ==================>
- [Startup](./Startup/writeup.md)
- [source](./source/walkthrought.md) ===============>
- [Welcome](./Welcome/Flag.md)
- [Wgel CTF](./Wgel%20CTF/wgel%20CTF.pdf)
- [Wonderland](./Wonderland-CTF/walkthroughs.md)
- <!-- https://github.com/BEPb/tryhackme/blob/master/01.easy/Anthem.md -------->>    complete this -------->


Feel free to explore the walkthroughs and learn more about the different challenges and techniques covered in each room.

## Additional Information

In addition to the walkthroughs, this repository may also include other relevant files or resources associated with each room, such as exploit scripts, log files, or nmap scans. These files can be found within the respective directories.

Please note that the walkthroughs provided here are for educational purposes only and should not be used for any malicious activities. Always adhere to ethical hacking practices and respect the terms and conditions of the TryHackMe platform.

## Contributing

If you would like to contribute to this repository by adding your own walkthroughs or improving existing ones, please follow the standard GitHub workflow: Fork the repository, make your changes, and submit a pull request. Your contributions are greatly appreciated!
Happy hacking!

<!--

# TryHackMe Writeups

![alt text](TryHackMe-logo.png "Writeup Image")

This repository contains a few of my writeups I made for the famous and addictive TryHackMe CTF (Capture The Flag) challenges.

Check out the TryHackMe website for your subscription!

Find more information on the TryHackMe website: <https://tryhackme.com>

Here's a link to my profile on TryHackMe:

[![TryHackMe Profile](itchy.png)](https://tryhackme.com/p/itchy)

Note: you can also look at these documents here through the `GitHub Pages`, <https://dvanmosselbeen.github.io/TryHackMe_writeups/>. Which looks slightly better. But no navigation bar.

## TryHackMe writeups

| Room Name | OS | Description | Tools Used |
|:---:|:---:|---|---|
| [Empline](empline/README.md) | Linux (Ubuntu) | Are you good enough to apply for this job? | `nmap`, `gobuster` |
| [Inclusion](inclusion/README.md) | Linux (Ubuntu) | A beginner level LFI challenge. | `nmap`, `gobuster` |
| [Relevant](relevant/README.md) | Windows Server 2008 R2 | Penetration Testing Challenge. | `nmap`, `gobuster`, `smbclient`, `enum4linux`, `msfvenon` |
| [Daily Bugle](dailybugle/README.md) | Linux (CentOS) | Compromise a Joomla CMS account via SQLi, practise cracking hashes and escalate your privileges by taking advantage of yum. | `nmap`, `gobuster`, `Joomla`, `joomscan`, `joomblah`, `hashcat`, `john`, `php-reverse-shell.php`, `nc` |
| [NAX](nax/README.md) | Linux (Ubuntu) | Identify the critical security flaw in the most powerful and trusted network monitoring software on the market, that allows an user authenticated execute remote code execution. [CVE-2019-15949](https://nvd.nist.gov/vuln/detail/CVE-2019-15949) | `nmap`, `exiftool`, `gobuster`,  `msfconsole` |
| [Blog](blog/README.md) | Linux (Ubuntu) | Billy Joel made a Wordpress blog! | `nmap`, `wpscan`, `msfconsole`, `strings`,`ltrace` |
| [ColddBox: Easy](colddboxeasy/README.md) | Linux (Ubuntu) | An easy level machine with multiple ways to escalate privileges. | `nmap`, `gobuster`, `wpscan`, `Burp Suite`, `hydra` |
| [Mr Robot](mrrobot/README.md) | Linux | Based on the Mr. Robot show, can you root this box? | `nmap`, `gobuster`, `nikto`, `Burp Suite`, `hydra` |
| [Chocolate Factory](chocolatefactory/README.md) | Linux (Ubuntu) | A Charlie And The Chocolate Factory themed room, revisit Willy Wonka's chocolate factory! | `nmap`, `exif`, `exiftool`, `strings`, `steghide` |
| [Lazy Admin](laszy-admin/README.md) | Linux (Ubuntu) | Easy linux machine to practice your skills. | `nmap`, `gobuster`, `webshell`, `nc` |
| [Bounty Hunter (Cowboy Hacker)](bounty-hunter/README.md) | Linux (Ubuntu) | You talked a big game about being the most elite hacker in the solar system. Prove it and claim your right to the status of Elite Bounty Hacker! | `nmap`, `hydra` |
| [Startup](startup/README.md) | Linux (Ubuntu) | Abuse traditional vulnerabilities via untraditional means. | `nmap`, `gobuster`, `ftp`, `nc`, `curl`, `python`, `wireshark`, `strings`, `pspy`, `linpeas` |
| [Blue](blue/README.md) | Windows 10| Hacking: Enumerating the Eternal blue vulnerability [CVE-2017-0143](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143) with `nmap` and making (bad) use of it with `metasploit`. Finally, dumping and cracking the password hash of a user. | `nmap`, `metasploit`, `john` |
| [Agent Sudo](agent-sudo/README.md) | Linux (Ubuntu) | Hacking: Enumerating a webserver, faking user-agent of web browser, steganography, brute-forcing ftp server, privilege escalation. | `nmap`, `gobuster`, `Burp Suite`, `FoxyProxy`, `User-Agent Switcher and Manager`, `hydra`, `steghide`, `binwalk`, `john`, `zip2john` |
| [Wireshark 101](wireshark-101/README.md) | N/A | The Wireshark 101 Writeup. | `wireshark` |
| [Basic Pentesting](basic_pentesting/README.md) | Linux (Ubuntu) | Various penetration / cracking. Like brute forcing, hash cracking, service enumeration, Linux enumeration.  | `nmap`, `gobuster`, `enum4linux`, `hydra`, `linpeas`, `john` |
| [Hydra](hydra/README.md) | N/A | Hydra is the ultimate tool for online password attacks. | `hydra` |
| [Brooklyn Nine Nine](brooklyn-nine-nine/README.md) | Linux (Ubuntu) | Hack that box! | `nmap`, `ftp`, `hydra`, `linpeas` |

## Extra Notes

### My Security Cheat Sheet Wikeypaydia 

I have a few notes, not yet very well organised, but you can take a look at it if you want. Could be helpful.

- <https://github.com/dvanmosselbeen/security-cheat-sheet/wiki>

### Internet access not working with the TryHackMe VPN?

Information difficult to find without a link on the website :-P

Source: <https://docs.tryhackme.com/docs/openvpn/troubleshooting/openvpn-troubleshooting/#external-access-not-working>

```commandline                             
$ nmcli connection   # Note the name of the VPN connection here
$ nmcli connection edit <CONNECTION_NNAME>
> set ipv4.never-default true
> set ipv6.never-default true
> save
> quit
```

These changes are persistent.

### Make gobuster go even slower

By merging the 2 most common and most used `wordlists`. You have better enumeration results. However, by merging these wordlist as show here, we create duplicated entries. and thus we need to make use of the uniq command. But to make use of the uniq command we need to sort the final output file. These wordlist are made so that the most common used words come on top

Found this very interesting to do, for room https://tryhackme.com/room/wgelctf for example. As i mainly use the `dirbuster` wordlist, did not find the required files in first instance.

- `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`
- `/usr/share/wordlists/dirb/common.txt`

As for example the `common.txt` would find out a folder `.ssh` which is extreme important. However, common.txt is also too common and does not find a lot of things.

Quick and dirty fix for this:

````commandline
$ mkdir -p ~/tools
$ cat /usr/share/wordlists/dirb/common.txt >> /tmp/gobusted_tmp.txt
$ cat  /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt >> /tmp/gobusted_tmp.txt
$ sort /tmp/gobusted_tmp.txt -o /tmp/gobusted_sorted.txt && uniq /tmp/gobusted_sorted.txt > ~/tools/gobusted.txt
````

You can make the scan fast by specifying the numbers of threats you want to use. By default, it is 10 threats and safe. But note that some servers / services (depending on their config) does not like at all many threats. And thus you could get timeouts. But it is always worth trying. 

````commandline
$ gobuster help dir | grep -e "-t"
...

<!--
https://github.com/BEPb/tryhackme/tree/master/02.Medium
>
  -t, --threads int       Number of concurrent threads (default 10)
````

-->








