# <div align="center">[Dig Dug TryHackMe Walkthrough](https://tryhackme.com/room/digdug)</div>
<div align="center">Turns out this machine is a DNS server - it's time to get your shovels out!</div>
<div align="center">
  <img width="200" height="200" alt="dig dug" src="https://github.com/user-attachments/assets/9130515a-5dda-4c77-8c65-708446625d27" />
</div>


## Initial Reconnaissance

I started with a basic service scan to understand what was exposed on the target.

```
kali@kali:~$ nmap -sV 10.49.173.146
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-01-08 20:12 IST
Nmap scan report for 10.49.173.146
Host is up (0.027s latency).
Not shown: 999 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.13 (Ubuntu Linux; protocol 2.0)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

From the scan alone, nothing stood out apart from SSH. Port 53 didn’t show up here, but the room description made it clear this machine was behaving like a DNS server. That mismatch was the first real signal that DNS interaction mattered more than traditional enumeration.

The description also mentioned something specific: the server only responds to a particular request for the `givemetheflag.com` domain. That narrowed the scope immediately.

I queried the DNS service directly using `dig`, pointing it at the target IP.

```
kali@kali:~$ dig givemetheflag.com @10.49.173.146

; <<>> DiG 9.18.39-0ubuntu0.24.04.2-Ubuntu <<>> givemetheflag.com @10.49.173.146
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 61510
;; flags: qr aa; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;givemetheflag.com.		IN	A

;; ANSWER SECTION:
givemetheflag.com.	0	IN	TXT	"flag{0767ccd06e79853318f25aeb08ff83e2}"

;; Query time: 30 msec
;; SERVER: 10.49.173.146#53(10.49.173.146) (UDP)
;; WHEN: Thu Jan 08 20:16:42 IST 2026
;; MSG SIZE  rcvd: 86
```

The response came back clean and authoritative. Instead of an A record, the server returned a TXT record containing the flag.

```
flag{0767ccd06e79853318f25aeb08ff83e2}
```

For confirmation, I repeated the same lookup using `nslookup`.

```
kali@kali:~$ nslookup givemetheflag.com 10.49.173.146
Server:		10.49.173.146
Address:	10.49.173.146#53

givemetheflag.com	text = "flag{0767ccd06e79853318f25aeb08ff83e2}"
givemetheflag.com	text = "flag{0767ccd06e79853318f25aeb08ff83e2}"
```

Both tools returned the same result, confirming the flag was stored directly in the DNS TXT record exposed by the server.

## Conclusion

Dig Dug is a compact room that revolves entirely around understanding DNS behavior rather than traditional service exploitation. The challenge highlights how data can be exposed through DNS records and how a single, well-crafted query can reveal everything when the context is read correctly.


Thanks for reading this walkthrough.
