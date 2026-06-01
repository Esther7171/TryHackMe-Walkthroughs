# <div align="center">[Corridor](https://tryhackme.com/r/room/corridor)</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/5fb3bb83-2944-499f-a4bc-8ac50298b6db" height="200"></img>
</div>

## Task 1. Escape the Corridor

You have found yourself in a strange corridor. Can you find your way back to where you came?

In this challenge, you will explore potential IDOR vulnerabilities. Examine the URL endpoints you access as you navigate the website and note the hexadecimal values you find (they look an awful lot like a hash, don't they?). This could help you uncover website locations you were not expected to access.

## What is the flag?
```
flag{2477ef02448ad9156661ac40a6b8862e}
```

# This Challange is about IDOR vulnerabilities.

## When we Visit the hosted site and view the source code 

![image](https://github.com/user-attachments/assets/f43781d8-a53c-4a39-a91a-0c62f1b91574)

## In Hyperlink there are hashes and each room is empty.
```

c4ca4238a0b923820dcc509a6f75849b
c4ca4238a0b923820dcc509a6f75849b
c81e728d9d4c2f636f067f89cc14862c
c81e728d9d4c2f636f067f89cc14862c
eccbc87e4b5ce2fe28308fd9f2a7baf3
eccbc87e4b5ce2fe28308fd9f2a7baf3
a87ff679a2f3e71d9181a67b7542122c
a87ff679a2f3e71d9181a67b7542122c
e4da3b7fbbce2345d7772b0674a318d5
e4da3b7fbbce2345d7772b0674a318d5
8f14e45fceea167a5a36dedd4bea2543
c9f0f895fb98ab9159f51fd0297e236d
c9f0f895fb98ab9159f51fd0297e236d
c20ad4d76fe97759aa27a0c99bff6710
c20ad4d76fe97759aa27a0c99bff6710
c51ce410c124a10e0db5e4b97fc2af39
c51ce410c124a10e0db5e4b97fc2af39
```
## If we crack this hashes 

![image](https://github.com/user-attachments/assets/84211203-7041-4550-bfb0-ecc6febe6d63)


## All hashes are md5 and it 1-13 missing one is 0 

![image](https://github.com/user-attachments/assets/54cad635-12d9-4e51-a11e-3a990f2ab453)

## Let create a hash of 0
```
cfcd208495d565ef66e7dff9f98764da
```

## Let visite Ip/cfcd208495d565ef66e7dff9f98764da

![image](https://github.com/user-attachments/assets/95910c03-66f8-493c-80f2-42c77ae81a17)

# Here is Our flag
```
flag{2477ef02448ad9156661ac40a6b8862e}
```
🙂
