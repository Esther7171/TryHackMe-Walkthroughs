# <div align="center">[Cipher's Secret Message – TryHackMe Writeup](https://tryhackme.com/room/hfb1cipherssecretmessage)</div>

<div align="center">Sharpen your cryptography skills by analyzing code to get the flag.</div>

<div align='center'>
  <img src='https://github.com/user-attachments/assets/2a493956-07e0-40df-9179-fd9f77a0a263' height='200'></img>
</div>

## Task 1. Crypto  Cipher's Secret Message

<img src='https://github.com/user-attachments/assets/2c164f29-51ed-4907-97c6-ef8238a82b8c' />

Answer the questions below

### What is the flag?

```
THM{a_sm4ll_crypt0_message_to_st4rt_with_THM_cracks}
```

# Writeup

Decrypt a custom Caesar cipher with Python and uncover the flag**  
Reverse a Caesar-style encryption by analyzing Python code in this beginner-friendly TryHackMe challenge.

## 🧩 Overview

In this TryHackMe room, **Cipher's Secret Message**, you’re handed a jumbled string and the encryption function that produced it. Your mission? **Figure out how the cipher works**, reverse it, and grab the flag.

Here’s what you’re given:

- 🔐 An encrypted message  
- 🧠 The encryption logic (written in Python)  
- 🏁 A hint that the result should be wrapped in `THM{}`  

If you’re just getting into **cryptography CTFs**, this is a perfect warm-up.

---

## 📜 The Encrypted Message

Here’s the message you need to decode:

```

a\_up4qr\_kaiaf0\_bujktaz\_qm\_su4ux\_cpbq\_ETZ\_rhrudm

````

Looks messy, right? But there’s a pattern hiding in there — let’s break it down.

---

## 🔍 The Encryption Logic

You’re given the Python function that was used to scramble the original flag. Here's what it looks like:

```python
def enc(plaintext):
    return "".join(
        chr((ord(c) - (base := ord('A') if c.isupper() else ord('a')) + i) % 26 + base)
        if c.isalpha() else c
        for i, c in enumerate(plaintext)
    )
````

### 🧠 How it Works:

* The code loops through each character in the plaintext along with its **index `i`**.
* If the character is a **letter**, it gets **shifted forward by `i` positions** in the alphabet.
* Uppercase and lowercase are handled separately.
* Non-alphabetic characters (`_`, `4`, `0`, etc.) stay the same.

In short: it’s a **position-based Caesar cipher** — the further into the string, the more the letter shifts.

---

## 🔓 The Decryption Script

To crack this, we just need to reverse the logic: instead of shifting letters forward by their index, we’ll **shift them backward**.

Here’s the Python code to do exactly that:

```python
cipher = "a_up4qr_kaiaf0_bujktaz_qm_su4ux_cpbq_ETZ_rhrudm"

def dec(ciphertext):
    result = ""
    for i, c in enumerate(ciphertext):
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result += chr((ord(c) - base - i) % 26 + base)
        else:
            result += c
    return result

print(dec(cipher))
```


## 🧾 Output

When you run the script, you’ll get this decoded message:

```
a_sm4ll_crypt0_message_to_st4rt_with_THM_cracks
```

Nice! That’s the original string before encryption.

## 🏁 Final Flag

To complete the challenge, wrap the decrypted message in `THM{}`:

```
THM{a_sm4ll_crypt0_message_to_st4rt_with_THM_cracks}
```

Submit this on TryHackMe, and you’re done ✅


## ✅ Summary

This was a simple but fun challenge that walked through:

* 🔍 Understanding a **custom Caesar cipher**
* 🐍 Using Python to reverse-engineer the encryption
* 🏁 Extracting a clean flag for submission

Great for practicing **basic cryptanalysis**, string manipulation, and Python logic.

## 💡 Pro Tips for CTFs

* Caesar-style ciphers with **variable shifts** show up often in beginner CTFs.
* Use Python’s `ord()` and `chr()` to convert between letters and numbers.
* `enumerate()` is perfect for handling **index-based transformations**.

The more you see these patterns, the faster you'll crack future challenges.


## 💬 Let’s Connect!

If you found this helpful, feel free to follow me for more hands-on walkthroughs in:

* 🔐 Cryptography and CTFs
* 🐍 Python scripting for security
* 🛠️ Practical reverse engineering

**Stay curious and keep hacking! 🚀**
