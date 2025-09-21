# <div align="center">[Abusing Windows Internals](https://tryhackme.com/room/abusingwindowsinternals)</div>
<div align="center">Leverage windows internals components to evade common detection solutions, using modern tool-agnostic approaches.</div>
<br>
<div align="center">
<img width="256" height="256" alt="76910e7adb4cef3da9496c148b4c96c2" src="https://github.com/user-attachments/assets/8d0d6db2-d185-455b-aeda-aa8f1ae9d504" />
</div>

## Task 2. Abusing Processes
### What flag is obtained after injecting the shellcode?
```
THM{1nj3c710n_15_fun!}
```

### Task 3. Expanding Process Abuse
### What flag is obtained after hollowing and injecting the shellcode?
```
THM{7h3r35_n07h1n6_h3r3}
```

## Task 4. Abusing Process Components
### What flag is obtained after hijacking the thread?
```
THM{w34p0n1z3d_53w1n6}
```

## Task 5. Abusing DLLs
### What flag is obtained after injecting the DLL?
```
THM{n07_4_m4l1c10u5_dll}
```

## Task 6. Memory Execution Alternatives
### What protocol is used to execute asynchronously in the context of a thread?
```
Asynchronous Procedure Call
```

###  What is the Windows API call used to queue an APC function?
```
QueueUserAPC
```

### Can the void function pointer be used on a remote process? (y/n)
```
n
```

## Task 7. Case Study in Browser Injection and Hooking
### What alternative Windows API call was used by TrickBot to create a new user thread?
```
RtlCreateUserThread
```
### Was the injection techniques employed by TrickBot reflective? (y/n)
```
y
```

### What function name was used to manually write hooks?
```
write_hook_iter
```
