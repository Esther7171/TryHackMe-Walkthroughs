# <div align="center">[Analysing Volatile Memory](https://tryhackme.com/room/analysingvolatilememory)</div>
<div align="center">Learn how the Windows OS manages volatile data in different files on disk. Explore how to extract and analyse volatile data from those artefacts.</div>
<br>
<div align="center">
<img width="200" height="200" alt="b15bdb33f152e2b3eb85f3218c6ae6e8" src="https://github.com/user-attachments/assets/bb446823-04a5-42f5-8b13-15ae8ab7c646" />
</div>

Answers:
### Connect to the Lab. How many tools are present in the EZ tools folder on the Desktop?
```
12
```
### What is the default page size (in KB) in most Operating systems?
```
4
```
### What is the name of the hibernation file?
```
hiberfil.sys
```
###v Which file is considered as the extension of the RAM?
```
pagefile.sys
```

### Which Registry Hive contains the information about the pagefile?
```
SYSTEM
```

### Examine the domain-histrogram. Which domain associated with distributing Malware has occurred 192 times? Defang the domain.
```
3z[.]nu
```
### Check the domain on VirusTotal; What is the verdict about this suspicious-looking domain?
```
malware
```

### At the time of hibernation, which network scanning tool was running?
```
wireshark
```
### What is the process ID associated with the network scanning tool?
```
5604
```

###  Examine the command lines executed on this host; which data wiping tool was executed on the host?
```
diskwipe.exe
```
### What is the full path, from which the data wiping tool was executed?
```
C:\Users\Administrator\Downloads\Tools\DiskWipe.exe
```
### What is the value of CrashDumpEnabled field in the Registry?
```
1
```

### Examine the Reliability Monitor chart. What is the report ID of the last crash dump?
```
cf3767cb-2cdf-4b9a-b6e1-c222d4fd192d
```

### How many times the system has reported critical events in the past?
```
7
```

### What is the default path set for placing the crash dump in the settings?
```
%SystemRoot%\MEMORY.DMP
```

### Which application was responsible for the first crash?
```
myfault
```
### What is the process ID associated with a suspicious-looking process called evil.exe?
```
1970
```
### Which command can be used to find the exact time of the crash?
```
!time
```

### One of the variables in PEB contains a secret flag; what is the value of the flag?
```
THM{__ITS_FUN_T0_Learn_at_THM__}
```
