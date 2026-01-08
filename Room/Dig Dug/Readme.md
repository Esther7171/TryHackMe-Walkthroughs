<div align="center">[Dig Dug TryHackMe Walkthrough](https://tryhackme.com/room/digdug)</div>
<div align="center">Turns out this machine is a DNS server - it's time to get your shovels out!</div>
<div align="center">
  <img width="200" height="200" alt="dig dug" src="https://github.com/user-attachments/assets/9130515a-5dda-4c77-8c65-708446625d27" />
</div>

## Initial recconance
starting with nmap scan to find running services
```

```

The room gave us hint in discription and we know its dns enemuration room

Oooh, turns out, this <ip> machine is also a DNS server! If we could dig into it, I am sure we could find some interesting records! But... it seems weird, this only responds to a special type of request for a givemetheflag.com domain?

We can simple share a request to dns by dig "explain process gpt"
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
we got the flag This command returned the TXT record with the flag.
```
flag{0767ccd06e79853318f25aeb08ff83e2}
```

we can do this with nslookup as well
```
kali@kali:~$ nslookup givemetheflag.com 10.49.173.146
Server:		10.49.173.146
Address:	10.49.173.146#53

givemetheflag.com	text = "flag{0767ccd06e79853318f25aeb08ff83e2}"
givemetheflag.com	text = "flag{0767ccd06e79853318f25aeb08ff83e2}"
```
