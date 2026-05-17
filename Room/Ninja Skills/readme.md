# <div align="center">[Ninja Skills - TryHackMe Walkthrough](https://tryhackme.com/room/ninjaskills)</div>
<div align="center">Ninja Skills completed!</div>
<div align="center">
  <img width="200" height="200" alt="ninja-skills" src="https://github.com/user-attachments/assets/d50039a0-64a9-4ef3-82ac-0bbfa410f93c" />
</div>

## Introduction

Some people skip rooms like this because they feel repetitive or time consuming, but this is actually the kind of work real SOC analysts, Linux administrators, forensic investigators, and CTF players deal with daily. Knowing how to quickly search, filter, and investigate files inside a Linux system is one of the most useful skills in cybersecurity.

[Ninja Skills](https://tryhackme.com/room/ninjaskills?utm_source=chatgpt.com) is a Linux focused room based on file enumeration and investigation using common Linux commands.

The room provides the following files to investigate:

```text id="g4v8p1"
8V2L
bny0
c4ZX
D8B3
FHl1
oiMO
PFbD
rmfX
SRSq
uqyw
v2Vb
X1Uy
```

I connected through SSH instead of using the AttackBox since the terminal felt more stable and responsive.

```bash
ssh new-user@<ip>
```

Credentials:

```bash
Username: new-user
Password: new-user
```

## Question 1

The first question asks which of the provided files are owned by the `best-group` group.

To solve this, I used the `find` command to search the Linux filesystem and filter files that belong to the `best-group` group.

```bash id="j6v2p4"
find / -type f \( -name "8V2L" -o -name "bny0" -o -name "c4ZX" -o -name "D8B3" -o -name "FHl1" -o -name "oiMO" -o -name "PFbD" -o -name "rmfX" -o -name "SRSq" -o -name "uqyw" -o -name "v2Vb" -o -name "X1Uy" \) -group best-group 2>/dev/null
```

### Command Breakdown

| Part                | Meaning                                      |
| ------------------- | -------------------------------------------- |
| `find /`            | Search from the root directory               |
| `-type f`           | Search only for files                        |
| `-name`             | Match the filenames provided in the room     |
| `-o`                | Means OR                                     |
| `-group best-group` | Filter files owned by the `best-group` group |
| `2>/dev/null`       | Hide permission denied errors                |

The output returned:

```text id="v4n8m1"
/mnt/D8B3
/home/v2Vb
```

This confirmed that the files `D8B3` and `v2Vb` are owned by the `best-group` group.

Final Answer:

```text id="k3w7q2"
D8B3 v2Vb
```
<div align="center"
  <img width="803" height="332" alt="image" src="https://github.com/user-attachments/assets/4705da49-9ff4-4042-bac9-0fde65e3a269" />
</div>

## Question 2

The second question asks which file contains an IP address.

Instead of manually opening every file, I used the `find` command together with `grep` to search inside all the provided files automatically.

```bash id="c7m2v9"
find / -type f \( -name "8V2L" -o -name "bny0" -o -name "c4ZX" -o -name "D8B3" -o -name "FHl1" -o -name "oiMO" -o -name "PFbD" -o -name "rmfX" -o -name "SRSq" -o -name "uqyw" -o -name "v2Vb" -o -name "X1Uy" \) -exec grep -lE '([0-9]{1,3}\.){3}[0-9]{1,3}' {} \; 2>/dev/null
```

### Command Breakdown

| Part                          | Meaning                                     |
| ----------------------------- | ------------------------------------------- |
| `find /`                      | Search the entire filesystem                |
| `-type f`                     | Search only files                           |
| `-name`                       | Match the provided filenames                |
| `-exec`                       | Execute a command on each file found        |
| `grep`                        | Search for patterns inside files            |
| `-l`                          | Display only the filename                   |
| `-E`                          | Enable extended regular expressions         |
| `([0-9]{1,3}\.){3}[0-9]{1,3}` | Regex pattern used to detect IPv4 addresses |
| `2>/dev/null`                 | Hide permission denied errors               |

The command returned:

```text id="q8w4k1"
/opt/oiMO
```

This confirmed that the file `oiMO` contains an IP address.

Final Answer:

```text id="f2n7x5"
oiMO
```
<div align="center">
  <img width="813" height="138" alt="image" src="https://github.com/user-attachments/assets/7105efda-ae44-4260-a28f-64a67c94ad57" />
</div>

## Question 3

The third question asks which file matches the given SHA1 hash.

To solve this, I generated the SHA1 hash for each target file and compared the results with the hash provided in the question.

```bash id="x5n2k8"
find / -type f \( -name "8V2L" -o -name "bny0" -o -name "c4ZX" -o -name "D8B3" -o -name "FHl1" -o -name "oiMO" -o -name "PFbD" -o -name "rmfX" -o -name "SRSq" -o -name "uqyw" -o -name "v2Vb" -o -name "X1Uy" \) -exec sha1sum {} \; 2>/dev/null
```

### Command Breakdown

| Part            | Meaning                            |
| --------------- | ---------------------------------- |
| `find /`        | Search the entire filesystem       |
| `-type f`       | Search only files                  |
| `-name`         | Match the provided filenames       |
| `-exec sha1sum` | Generate SHA1 hashes for each file |
| `{}`            | Represents the current file        |
| `\;`            | Ends the execute command           |
| `2>/dev/null`   | Hide permission denied errors      |

The output returned:

```text id="w3p7m1"
9d54da7584015647ba052173b84d45e8007eba94  /mnt/c4ZX
```

This confirmed that the file `c4ZX` matches the given SHA1 hash.

Final Answer:

```text id="r8v4k2"
c4ZX
```

<div align='center'>
  <img width="811" height="353" alt="image" src="https://github.com/user-attachments/assets/d7eb583e-58a7-4bd6-988b-ed334a76cd27" />
</div>

# Question 4 — Which file contains 230 lines?

For this question, the goal was to identify which file contained exactly `230` lines.
Instead of opening every file manually, I used the `wc -l` command together with `find` to count the number of lines in each target file automatically.

```bash id="hyb3k7"
find / \( -name "8V2L" -o -name "bny0" -o -name "c4ZX" -o -name "D8B3" -o -name "FHl1" -o -name "oiMO" -o -name "PFbD" -o -name "rmfX" -o -name "SRSq" -o -name "uqyw" -o -name "v2Vb" -o -name "X1Uy" \) -exec wc -l {} \; 2>/dev/null
```

### Command Breakdown

| Part          | Meaning                                 |
| ------------- | --------------------------------------- |
| `find /`      | Search the entire filesystem            |
| `-name`       | Match the provided filenames            |
| `-exec wc -l` | Run the line count command on each file |
| `wc -l`       | Count the number of lines inside a file |
| `2>/dev/null` | Hide permission denied errors           |

The output displayed the total line count for each file.
After reviewing the results, the file `bny0` was identified as the one containing `230` lines.

Final Answer:

```text id="0e95ew"
bny0
```
# Question 5 — Which file's owner has an ID of 502?

For this task, the goal was to identify which file was owned by a user with the UID `502`.
In Linux, every user has a numeric User ID (UID), and files store ownership information using these IDs.

To view the numeric owner and group IDs of each target file, I used the following command:

```bash id="m92m7m"
find / -type f \( -name 8V2L -o -name bny0 -o -name c4ZX -o -name D8B3 -o -name FHl1 -o -name oiMO -o -name PFbD -o -name rmfX -o -name SRSq -o -name uqyw -o -name v2Vb -o -name X1Uy \) -exec ls -ln {} \; 2>>/dev/null
```

### Command Breakdown

| Part           | Meaning                                           |
| -------------- | ------------------------------------------------- |
| `find /`       | Search the entire filesystem                      |
| `-type f`      | Search only files                                 |
| `-name`        | Match the provided filenames                      |
| `-exec ls -ln` | Display file permissions with numeric UID and GID |
| `ls -l`        | Show detailed file information                    |
| `-n`           | Show numeric user and group IDs instead of names  |
| `2>>/dev/null` | Hide permission denied errors                     |

The output showed:

```text id="rbn44t"
-rw-rw-r-- 1 502 501 13545 Oct 23  2019 /X1Uy
```

Here:

* `502` → Owner UID
* `501` → Group ID

This means the file `X1Uy` is owned by a user with the ID `502`.

Final Answer:

```text id="s4ppd7"
X1Uy
```

<img width="810" height="360" alt="image" src="https://github.com/user-attachments/assets/29209e0a-dc2b-42a7-92ea-f72f7d06e1da" />


# Question 6 — Which file is executable by everyone?

For this question, the goal was to identify which file had execute permissions enabled for all users.
In Linux, file permissions are displayed using symbols such as:

```text id="9m8p0x"
rwxrwxr-x
```

Where:

| Symbol | Meaning |
| ------ | ------- |
| `r`    | Read    |
| `w`    | Write   |
| `x`    | Execute |

To check the permissions of all target files, I used the following command:

```bash id="0c7x7r"
find / -type f \( -name 8V2L -o -name bny0 -o -name c4ZX -o -name D8B3 -o -name FHl1 -o -name oiMO -o -name PFbD -o -name rmfX -o -name SRSq -o -name uqyw -o -name v2Vb -o -name X1Uy \) -exec ls -ln {} \; 2>>/dev/null
```

### Command Breakdown

| Part           | Meaning                            |
| -------------- | ---------------------------------- |
| `find /`       | Search the entire filesystem       |
| `-type f`      | Search only files                  |
| `-name`        | Match the provided filenames       |
| `-exec ls -ln` | Display detailed file permissions  |
| `ls -l`        | Show file permissions and metadata |
| `-n`           | Show numeric user and group IDs    |
| `2>>/dev/null` | Hide permission denied errors      |

The output showed:

```text id="w4r5r2"
-rwxrwxr-x 1 501 501 13545 Oct 23  2019 /etc/8V2L
```

The permission string `-rwxrwxr-x` indicates that the file is executable.

This means the file `8V2L` is executable by everyone.

Final Answer:

```text id="mjlwmz"
8V2L
```
<img width="813" height="359" alt="image" src="https://github.com/user-attachments/assets/36924ab9-8189-4d03-ad56-bcd1df9af983" />

Thanks

<img width="848" height="402" alt="image" src="https://github.com/user-attachments/assets/d0c4035f-f775-41d9-9258-fce2de917ee6" />



