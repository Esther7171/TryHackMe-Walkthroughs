# <div align="center">0x41haz — TryHackMe Walkthrough</div>
<div align="center">Simple Reversing Challenge</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/d1a28066-5e54-4f86-ba21-2353d5ecb097" height="200"></img>
</div>

# Task 1. Find the password!
In this challenge, you are asked to solve a simple reversing solution. Download and analyze the binary to discover the password.

There may be anti-reversing measures in place!

## What is the password?
```
THM{2@@25$gfsT&@L}
```

---

## Introduction

**0x41haz** is a simple reversing challenge on TryHackMe that focuses on analyzing a Linux ELF binary to recover a hardcoded password. The task is minimal by design, with a small anti-analysis trick that forces you to slow down and inspect the binary properly.

* **Room link**: [https://tryhackme.com/room/0x41haz](https://tryhackme.com/room/0x41haz)


## Downloading the Binary

To get started with **0x41haz**, I first downloaded the task file directly from the room. This can be done by clicking the blue download button provided in Task 1.

<img width="1303" height="187" alt="image" src="https://github.com/user-attachments/assets/4ad265b0-e5d3-449d-9dfc-e2009e7dcf2d" />

Once the file was on my system, the first thing I did was identify what kind of binary I was dealing with. For that, I used the `file` command, which gives a quick overview of the executable format.

```
~$ file 0x41haz-1640335532346.0x41haz 
0x41haz-1640335532346.0x41haz: ELF 64-bit MSB *unknown arch 0x3e00* (SYSV)
```

At this point, it was clear that the file was an ELF 64-bit binary. However, the output also showed something unusual: `MSB *unknown arch 0x3e00*`. That immediately stood out and explained why the binary wouldn’t execute in its current state.

## Fixing the Binary Header

The issue turned out to be related to the ELF header. With some quick research and reference material, I found that the problem could be resolved by patching the sixth byte in the file header. Specifically, changing its value from `0x02` to `0x01`.

To do this, I opened the binary using a hex editor.

```
hexedit 0x41haz-1640335532346.0x41haz
```

<img width="1920" height="1005" alt="before-chnage" src="https://github.com/user-attachments/assets/8d5e3d22-2f46-46e3-94f9-f2066e244b68" />

I navigated to the sixth byte and modified it accordingly.

<img width="1824" height="299" alt="after-chnage" src="https://github.com/user-attachments/assets/48a0e7c8-e1b2-4078-95b2-0bd990d5c128" />


After making the change, I ran the `file` command again to verify whether the binary was now recognized correctly.

```
~$ file 0x41haz-1640335532346.0x41haz 
0x41haz-1640335532346.0x41haz: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=6c9f2e85b64d4f12b91136ffb8e4c038f1dc6dcd, for GNU/Linux 3.2.0, stripped

```

The output now looked clean. The binary was properly identified as a 64-bit x86-64 ELF executable.

## Executing the Program

With the header fixed, I copied the binary to a simpler name, granted execution permissions, and ran it.

```
~$ cp 0x41haz-1640335532346.0x41haz testbinary
~$ chmod +x testbinary
~$ ./testbinary
```

At runtime, the program prompted me for a password.

<div align="center">
  <img width="298" height="167" alt="exe fail" src="https://github.com/user-attachments/assets/438c2e83-60cb-49b8-a94b-8371ddcc8f30" />
</div>

That confirmed this was a straightforward reversing challenge, so the next step was to analyze the binary to understand how the password check was implemented.

## Reversing with Radare2

For analysis, I used **radare2**, a command-line reverse engineering framework that I personally find efficient for quick static analysis.

Installation was done as follows:

```
git clone https://github.com/radareorg/radare2
radare2/sys/install.sh
```

Once installed, I loaded the binary into radare2.

<div align="center">
  <img width="1067" height="89" alt="r2" src="https://github.com/user-attachments/assets/e8b9cb3c-2ffb-4bb1-9de5-a7cae9629b75" />
</div>

The first command I ran was a full analysis pass.

```
aaa
```

<div align="center">
  <img width="725" height="393" alt="aaa" src="https://github.com/user-attachments/assets/b7d4644d-6436-48a8-b903-773a8a5d4f35" />
</div>

After analysis completed, I navigated to the `main` function.

```
s main
```

From there, I disassembled the function to inspect its logic.

```
pdf
```

<div align="center">
  <img width="809" height="791" alt="s main and pdf" src="https://github.com/user-attachments/assets/c6bf33ba-bb1f-47d7-91b2-bb9ad8ce2fe1" />
</div>

While reviewing the disassembly, a string pattern stood out during the password comparison logic.

```
2@@25$gfsT&@L
```

## Retrieving the Flag

With that value identified, I executed the binary again and supplied it as the password.

<div align="center">
  <img width="308" height="202" alt="flag" src="https://github.com/user-attachments/assets/b2ad00dc-47e0-4894-b09e-4363e6470535" />
</div>

The program accepted the input and returned the flag.

### What is the password?

```
THM{2@@25$gfsT&@L}
```
## Conclusion

This was a straightforward reversing challenge with a small twist at the start. Fixing the binary header and analyzing the password check was enough to reach the flag without overcomplicating things.

**Thank you for reading.**

<div align="center">
  <img width="702" height="590" alt="image" src="https://github.com/user-attachments/assets/ed6d0581-db72-4e4d-bd0e-404010467680" />
</div>

Send the next part whenever you’re ready. We’ll keep this clean, consistent, and sharp all the way to the end.
