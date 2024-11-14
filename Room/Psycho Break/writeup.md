# <div align="center">[Psycho Break](https://tryhackme.com/r/room/psychobreak)</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/edcce401-b1e6-4578-9a81-19031b31945f" height="200"></img>
</div>

## Task 1. Recon

This room is based on a video game called evil within. I am a huge fan of this game. So I decided to make a CTF on it. With my storyline :). Your job is to help Sebastian and his team of investigators to withstand the dangers that come ahead.

## How many ports are open?
```
3
```
## What is the operating system that runs on the target machine?
```
ubuntu
```
## Task 2. Web
Here comes the web.

## Key to the looker room
```
532219a04ab7a02b56faafbec1a4c1ea
```
## Key to access the map
```
Grant_me_access_to_the_map_please
```
## The Keeper Key
```
48ee41458eb0b43bf82b986cecf3af01
```

## What is the filename of the text file (without the file extension)
```
you_made_it
```
## Task 3. Help Mee
Get that poor soul out of the cell.
## Who is locked up in the cell?
```
```
## There is something weird with the .wav file. What does it say?
```
```
## What is the FTP Username
```
joseph
```

## What is the FTP User Password
```
intotheterror445
```

## Let Start With Scanning The Network
```
nmap <Ip> -sV
```
```
death@esther:~$ nmap 10.10.184.161 -sV 
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-10-05 12:26 IST
Nmap scan report for 10.10.184.161
Host is up (0.15s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT   STATE SERVICE VERSION
21/tcp open  ftp     ProFTPD 1.3.5a
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 19.97 seconds
```
### According to scan 3 ports are open:
* ### FTP on port 21.
* ### SSH on port 22.
* ### HTTP on port 80.

### Rather Than Wasting Time on FTP Let view Hosted website.
## In hosted page source code i found this loction.
<div align="center">
  <img src="https://github.com/user-attachments/assets/5bba2c64-b57a-46f8-9afe-8c71a2909aa0" height=""></img>
</div>


```
/sadistRoom
```
## Here is the link,

<div align="center">
  <img src="https://github.com/user-attachments/assets/ce9194ed-3949-44fb-931e-4f222cdd72d8" height=""></img>
</div>

## As i click on the link i got this alert and here is the Key to locker Room.
```
532219a04ab7a02b56faafbec1a4c1ea
```  
<div align="center">
  <img src="https://github.com/user-attachments/assets/285db738-ff18-48b3-ba40-3480a1951097" height=""></img>
</div>

## And New page appear to enter this key As we enter the key, Now we are in locker room.

<div align="center">
  <img src="https://github.com/user-attachments/assets/62dd7ceb-1d62-42f4-9e49-cacce7442654
" height=""></img>
</div>

## Here is new task to Decode this piece of text "```Tizmg_nv_zxxvhh_gl_gsv_nzk_kovzhv```" and get the key to access the map.
### As i Identify this, Atbash cipher is used let decode this using [cyberchef](https://gchq.github.io/CyberChef/) 

<div align="center">
  <img src="https://github.com/user-attachments/assets/bc85fc46-6f60-42eb-9952-9c6235a38ab5" height=""></img>
</div>

```
Grant_me_access_to_the_map_please
```
## Let enter the the key to get access.

<div align="center">
  <img src="https://github.com/user-attachments/assets/bff821ad-6026-4647-a3b7-a7ee4e33cfed" height=""></img>
</div>


## Let view safe heaven

<div align="center">
  <img src="https://github.com/user-attachments/assets/25ed3fb6-fd88-4f5b-83c8-7a52f4f6a00a" height=""></img>
</div>

## So There is a clue in source code ```search``` that mean we need to Enumerate directories.
```
dirsearch -u http://ip/SafeHeaven/ -w ~/wordlists/directory-list-2.3-medium.txt 
``` 
```
death@esther:~$ dirsearch -u http://10.10.184.161/SafeHeaven/ -w ~/wordlists/directory-list-2.3-medium.txt 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 220544

Output File: /home/death/reports/http_10.10.184.161/_SafeHeaven__24-10-05_12-47-35.txt

Target: http://10.10.184.161/

[12:47:35] Starting: SafeHeaven/
[12:47:43] 301 -  324B  - /SafeHeaven/imgs  ->  http://10.10.184.161/SafeHeaven/imgs/
[13:13:22] 301 -  326B  - /SafeHeaven/keeper  ->  http://10.10.184.161/SafeHeaven/keeper/
```
## Let visit this

<div align="center">
  <img src="https://github.com/user-attachments/assets/1ca1c52b-4345-4ae8-8d18-df17490a545d" height=""></img>
</div>

##  When i click on Escape Keeper, I got this screen

<div align="center">
  <img src="https://github.com/user-attachments/assets/046e1dec-05ad-41ec-a7b2-c45b4d8c8bde" height=""></img>
</div>

## In source code a hint is mention to reverse google it 
<div align="center">
  <img src="https://github.com/user-attachments/assets/6e8e2a8d-e828-4ee9-9334-104c29b036be" height=""></img>
</div>

## When i use google lens to identify this 

<div align="center">
  <img src="https://github.com/user-attachments/assets/385b7696-a7b9-4739-9380-31f148c6a652" height=""></img>
</div>

##  I found this is A light house and name is 
```
St. Augustine Lighthouse
```
## Here is the Keeper Key.
```
48ee41458eb0b43bf82b986cecf3af01
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/be4130d1-6ee7-4b2e-b2ba-7406bf5d7849" height=""></img>
</div>

## We have the key now let view our last room the The Abandoned Room.

<div align="center">
  <img src="https://github.com/user-attachments/assets/89183845-0294-4cf9-ae84-e34b819cf4aa" height=""></img>
</div>

## Here we need to enter the key we got

<div align="center">
  <img src="https://github.com/user-attachments/assets/28e62945-a528-4cc3-b34f-5c07d9b282ae" height=""></img>
</div>

## Let go Further

<div align="center">
  <img src="https://github.com/user-attachments/assets/c162faa7-aadb-488d-84e1-ec202b8fb45e" height=""></img>
</div>

## SO As according to clue ```shell``` we can try lfi here
```
/?shell=ls
```


<div align="center">
  <img src="https://github.com/user-attachments/assets/21380874-aceb-42a0-98d8-63aab1c6e6ad" height=""></img>
</div>

##  As i try rather than ls none other command were permited, Let use ```ls ..``` it will list previous dir


<div align="center">
  <img src="https://github.com/user-attachments/assets/da2263c3-69db-4067-9c09-3f6ff0bcb3e2" height=""></img>
</div>

```
680e89809965ec41e64dc7e447f175ab
```

## Maybe its an loction let change url with this
```
http://10.10.184.161/abandonedRoom/680e89809965ec41e64dc7e447f175ab/
```

<div align="center">
  <img src="https://github.com/user-attachments/assets/3107bbd4-336b-4fb4-b3f5-34e3bc8b2f49" height=""></img>
</div>

## I download the zip and here is the txt name ```you_made_it```
```
You made it. Escaping from Laura is not easy, good job ....
```
## Here is the content of zip file
```
death@esther:~$ unzip helpme.zip 
Archive:  helpme.zip
  inflating: helpme.txt              
  inflating: Table.jpg               
death@esther:~$ cat helpme.txt 

From Joseph,

Who ever sees this message "HELP Me". Ruvik locked me up in this cell. Get the key on the table and unlock this cell. I'll tell you what happened when I am out of 
this cell.
```

## As i check file type it not an image its and zip with extention of jpg
```
death@esther:~$ file Table.jpg 
Table.jpg: Zip archive data, at least v2.0 to extract, compression method=deflate
death@esther:~$ 
```

## Let Rename and unzip it
```
death@esther:~$ mv Table.jpg table.zip
death@esther:~$ unzip table.zip 
Archive:  table.zip
  inflating: Joseph_Oda.jpg          
  inflating: key.wav                 
```
##  An another image and key.wav 
### .wav is an audio file, As i hear this, it looks like Morse code let decode this.
* [Morse code decoder](https://morsecode.world/international/decoder/audio-decoder-adaptive.html?source=post_page-----522187308f06--------------------------------)


<div align="center">
  <img src="https://github.com/user-attachments/assets/8e75f1d1-80ce-42ac-bcf4-7bbe2f664969" height=""></img>
</div>

## The msg is ```SHOWME```, Let use steghide on image so maybe we can retrive some info as we have the key
```
death@esther:~$ steghide extract -sf Joseph_Oda.jpg
Enter passphrase: 
wrote extracted data to "thankyou.txt".
death@esther:~$ 
```
## Here is another txt file
```
death@esther:~$ cat thankyou.txt 

From joseph,

Thank you so much for freeing me out of this cell. Ruvik is nor good, he told me that his going to kill sebastian and next would be me. You got to help 
Sebastian ... I think you might find Sebastian at the Victoriano Estate. This note I managed to grab from Ruvik might help you get inn to the Victoriano Estate. 
But for some reason there is my name listed on the note which I don't have a clue.

	   --------------------------------------------
        //						\\
	||	(NOTE) FTP Details			||
	||      ==================			||
	||						||
	||	USER : joseph				||
	||	PASSWORD : intotheterror445		||
	||						||
	\\						//
	   --------------------------------------------
	

Good luck, Be carefull !!!
```
* ### Username: ```joseph```
* ### Password: ```intotheterror445``` 
## Now we have ftp password Let login
```
death@esther:~$ ftp 10.10.184.161
Connected to 10.10.184.161.
220 ProFTPD 1.3.5a Server (Debian) [::ffff:10.10.184.161]
Name (10.10.184.161:death): joseph
331 Password required for joseph
Password: 
230 User joseph logged in
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> ls -la
229 Entering Extended Passive Mode (|||47534|)
150 Opening ASCII mode data connection for file list
drwxr-xr-x   2 0        0            4096 Aug 13  2020 .
drwxr-xr-x   2 0        0            4096 Aug 13  2020 ..
-rwxr-xr-x   1 joseph   joseph   11641688 Aug 13  2020 program
-rw-r--r--   1 joseph   joseph        974 Aug 13  2020 random.dic
226 Transfer complete
ftp>
```
### Download both files
```
ftp> get random.dic
local: random.dic remote: random.dic
229 Entering Extended Passive Mode (|||47896|)
150 Opening BINARY mode data connection for random.dic (974 bytes)
100% |*************************************************************************************************************************************************|   974        2.88 MiB/s    00:00 ETA
226 Transfer complete
974 bytes received in 00:00 (6.23 KiB/s)
ftp> cd program
550 program: No such file or directory
ftp> get program
local: program remote: program
229 Entering Extended Passive Mode (|||46094|)
150 Opening BINARY mode data connection for program (11641688 bytes)
100% |*************************************************************************************************************************************************| 11368 KiB  636.40 KiB/s    00:00 ETA
226 Transfer complete
11641688 bytes received in 00:18 (630.60 KiB/s)
ftp
```
## SO random.dic is a wordlist
```
death@esther:~$  cat random.dic 
000000
111111
123123
123321
1234
12345
123456
1234567
12345678
123456789
1234567890
123abc
654321
666666
696969
aaaaaa
abc123
alberto
alejandra
alejandro
amanda
andrea
angel
angels
anthony
asdf
asdfasdf
ashley
babygirl
baseball
basketball
beatriz
blahblah
bubbles
buster
butterfly
carlos
charlie
cheese
chocolate
computer
daniel
diablo
dragon
elite
estrella
flower
football
forum
freedom
friends
fuckyou
hello
hunter
iloveu
iloveyou
internet
jennifer
jessica
jesus
jordan
joshua
justin
killer
kidman
letmein
liverpool
lovely
loveme
loveyou
master
matrix
merlin
monkey
mustang
nicole
nothing
number1
pass
passport
password
password1
playboy
pokemon
pretty
princess
purple
pussy
qazwsx
qwerty
roberto
sebastian
secret
shadow
shit
soccer
starwars
sunshine
superman
tequiero
test
testing
trustno1
tweety
welcome
westside
whatever
windows
writer
zxcvbnm
zxczxc
james
```
<!--
<div align="center">
  <img src="" height=""></img>
</div>
