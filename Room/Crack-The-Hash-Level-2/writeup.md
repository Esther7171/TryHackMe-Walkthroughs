# <div align="center">Crack The Hash Level 2</div>
<div align="center">Advanced cracking hashes challenges and wordlist generation</div><br>
<div align="center">
<img src="https://github.com/user-attachments/assets/9e810060-24db-4072-96bb-ab25f9484040" height="200"></img>
</div>


## Task 1. Info Introduction
Password cracking is part of the penetration tester job but is rarely taught on challenges platforms. In this room you will learn to how to crack hashes, identify hash types, create custom wordlists, find specific wordlists, create mutations rules, etc.

This room is a spiritual successor to Crack the Hash.

I recommend you to have done the room Crack the hash before attempting this one, which is harder and will use more advanced techniques.

However this room include a course about hash cracking before you have to face the cracking challenges, it may be a good idea to read the course part before doing Crack the hash if you are a new comer.

Answer the questions below
```
No answer needed
```
## Task 2. Walkthrough Hash identification

Often the first thing you will need when you encounter a hash, is trying to identify which kind of hash it is.
There are a lot of hash types, some are very famous like MD5 or SHA1 but other are less and there are several hash types possible for a given character set and length.

Answer the questions below

### Haiti is a CLI tool to identify the hash type of a given hash. Install it.
```
No answer needed
```
Launch Haiti on this hash:

```741ebf5166b9ece4cca88a3868c44871e8370707cf19af3ceaa4a6fba006f224ae03f39153492853```

### What kind of hash it is?
```
RIPEMD-320
```
Launch Haiti on this hash:

```1aec7a56aa08b25b596057e1ccbcb6d768b770eaa0f355ccbd56aee5040e02ee```
```
No answer needed
```
### What is Keccak-256 Hashcat code?
```
17800
```
### What is Keccak-256 John the Ripper code?
```
raw-keccak-256
```

## For hash cracking you will often need some custom or specialized dictionaries called wordlists.

SecLists is a collection of multiple types of lists used during security assessments, collected in one place. List types include usernames, passwords, URLs, sensitive data patterns, fuzzing payloads, web shells, and many more.

wordlistctl is a script to fetch, install, update and search wordlist archives from websites offering wordlists with more than 6300 wordlists available.

Rawsec's CyberSecurity Inventory is an inventory of tools and resources about CyberSecurity. The Cracking category will be especially useful to find wordlist generator tools.

Note: On the exercise below we will see how to use how to use wordlistctl to download a list, for the example I took rockyou which is a famous wordlist but if you use TryHackMe AttackBox or Kali Linux you should already have it under /usr/share/wordlists/, so you don't need to download it again, this is just an example to show you how wordlistctl works.

RockYou is a famous wordlist contains a large set of commonly used password sorted by frequency.
To search for this wordlist with wordlistclt run:

```wordlistctl search rockyou```
```
No answer needed
```
### Which option do you need to add to the previous command to search into local archives instead of remote ones?
```
-l
```
Download and install rockyou wordlist by running this command: ```wordlistctl fetch -l rockyou```
```
No answer needed
```
Now search again for rockyou on your local archive with ```wordlistctl search -l rockyou```

You should see that the wordlist is deployed at ```/usr/share/wordlists/passwords/rockyou.txt.tar.gz```

But the wordlist is compressed in a tar.gz archive, to decompress it run ```wordlistctl fetch -l rockyou -d```.
If you run ```wordlistctl search -l rockyou``` one more time, what is the path where is stored the wordlist?

```/usr/share/wordlists/passwords/rockyou.txt```

You can search for a wordlist about a specific subject (eg. facebook) ```wordlistctl search faceboo```k or list all wordlists from a category (eg. fuzzing) ```wordlistctl list -g fuzzing```.

What is the name of the first wordlist in the usernames category?

```
CommonAdminBase64
```
## Task 4. Walkthrough Cracking tools, modes & rules
﻿Finally you'll need a cracking tool, the 2 very common ones are:

* Hashcat
* John the Ripper (jumbo version)
There are several modes of cracking you can use:

* Wordlist mode, which consist in trying all words contained in a dictionary. For example, a list of common passwords, a list of usernames, etc.
* Incremental mode, which consist in trying all possible character combinations as passwords. This is powerful but much more longer especially if the password is long.
* Rule mode, which consist in using the wordlist mode by adding it some pattern or mangle the string. For example adding the current year, or appending a common special character.
There are 2 ways of performing a rule based bruteforce:

1.Generating a custom wordlist and using the classic wordlist mode with it.
2.Using a common wordlist and tell the cracking tool to apply some custom mangling rules on it.
The second option is much more powerful as you wont waste gigabytes by storing tons of wordlists and waste time generating ones you will use only one time. Rather having a few interesting lists and apply various mangling rules that you can re-use over different wordlist.

John the Ripper already include various mangling rules but you can create your owns and apply them the wordlist when cracking:

```$ john hash.txt --wordlist=/usr/share/wordlists/passwords/rockyou.txt rules=norajCommon02```
﻿You can consult John the Ripper Wordlist rules syntax for creating your own rules.
I'll give you the main ideas of mutation rules, of course several can be combined together.
* Border mutation - commonly used combinations of digits and special symbols can be added at the end or at the beginning, or both
* Freak mutation - letters are replaced with similarly looking special symbols
* Case mutation - the program checks all variations of uppercase/lowercase letters for any character
* Order mutation - character order is reversed
* Repetition mutation - the same group of characters are repeated several times
* Vowels mutation - vowels are omitted or capitalized
* Strip mutation - one or several characters are removed
* Swap mutation - some characters are swapped and change places
* Duplicate mutation - some characters are duplicated
* Delimiter mutation - delimiters are added between characters

Depending of your distribution, the John configuration may be located at ```/etc/john/john.conf``` and/or ```/usr/share/john/john.conf```. To locate the JtR install directory run locate ```john.conf```, then create ```john-local.conf``` in the same directory (in my case ```/usr/share/john/john-local.conf```) and create our rules in here.
```
No answer needed
```
Let's use the top 10 000 most used password list from SecLists ```(/usr/share/seclists/Passwords/Common-Credentials/10k-most-common.txt)``` and generate a simple border mutation by appending all 2 digits combinations at the end of each password.
Let's edit ```/usr/share/john/john-local.conf``` and add a new rule:
[List.Rules:THM01]
$[0-9]$[0-9]
```
No answer needed
```
Now let's crack the SHA1 hash ```2d5c517a4f7a14dcb38329d228a7d18a3b78ce83```, we just have to write the hash in a text file and to specify the hash type, the wordlist and our rule name. ```john hash.txt --format=raw-sha1 --wordlist=/usr/share/seclists/Passwords/Common-Credentials/10k-most-common.txt --rules=THM01```

### What was the password?
```
moonligh56
```

## Task 5. Walkthrough Custom wordlist generation
As I said in the previous task mangling rules avoid to waste storage space and time but there are some cases where generating a custom wordlist could be a better idea:

* You will often re-use the wordlist, generating one will save computation power rather than using a mangling rule
* You want to use the wordlist with several tools
* You want to use a tool that support wordlists but not mangling rules
* You find the custom rule syntax of John too complex

### Let's say we know the password we want to crack is about dogs. We can download a list of dog races wordlistctl fetch -l dogs -d (/usr/share/wordlists/misc/dogs.txt). Then we can use Mentalist to generate some mutations.
```
No answer needed
```
### We can load our dog wordlist in Mentalist, add some Case, Substitution, Append/Prepend rules.
Here we will toggle the case of one char of two and replace all s with a dollar sign.

Then we can process and save the newly generated wordlist.
It's also possible to export John/Hashcat rules.
```
No answer needed
```
### Crack the following md5 hash with the wordlist generated in the previous steps.

```ed91365105bba79fdab20c376d83d752```
```
mOlo$$u$
```
Now let's use CeWL to generate a wordlist from a website. It could be useful to retrieve a lot of words related to the password's topic.
```
No answer needed
```
### For example to download all words from example.org with a depth of 2, run:
```cewl -d 2 -w $(pwd)/example.txt https://example.org```
The depth is the number of link level the spider will follow.
What is the last word of the list?
```
information
```
With TTPassGen we can craft wordlists from scratch. Create a first wordlist containing all 4 digits PIN code value.

```ttpassgen --rule '[?d]{4:4:*}' pin.txt```
```
No answer needed
```
### Generate a list of all lowercase chars combinations of length 1 to 3.

```ttpassgen --rule '[?l]{1:3:*}' abc.txt```
```
No answer needed
```
### Then we can create a new wordlist that is a combination of several wordlists. Eg. combine the PIN wordlist and the letter wordlist separated by a dash.

```ttpassgen --dictlist 'pin.txt,abc.txt' --rule '$0[-]{1}$1' combination.txt```

Be warned combining wordlists quickly generated huge files, here combination.txt is 1.64 GB.
$ wc pin.txt 
10000 10000 50000 pin.txt

$ wc abc.txt 
18278 18278 72384 abc.txt

$ wc combination.txt 
 182780000  182780000 1637740000 combination.txt
```
No answer needed
```
Crack this md5 hash with combination.txt.

```e5b47b7e8df2597077e703c76ee86aee```
```
1551-li
```

## Task 6. Challenge It's time to crack hashes
Start Machine
You will have to crack several hashes. For each hash you will be given a short scenario that will help you to create a mangling rules, build a wordlist or finding some specialized data you'll need to crack the hash.

The scenarios are located on the website: Password advisor (http://MACHINE_IP), each piece of advice matches one of the following hashes (in the same order).

### Advice n°1 ```b16f211a8ad7f97778e5006c7cecdf31```
```
Zachariah1234*
```
### Advice n°2 ```7463fcb720de92803d179e7f83070f97```
```
Angelita35!
```
### Advice n°3 ```f4476669333651be5b37ec6d81ef526f```
```
Tl@xc@l@ncing0
```
### Advice n°4 ```a3a321e1c246c773177363200a6c0466a5030afc```
```
DavIDgUEtTApAn
```
### Advice n°5 ```d5e085772469d544a447bc8250890949```
```
uoy ot miws ot em rof peed oot ro ediw oot si revir oN
```
### Advice n°6 ```377081d69d23759c5946a95d1b757adc```
```
+17215440375
```
### Advice n°7 ```ba6e8f9cd4140ac8b8d2bf96c9acd2fb58c0827d556b78e331d1113fcbfe425ca9299fe917f6015978f7e1644382d1ea45fd581aed6298acde2fa01e7d83cdbd```
```
!@#redrose!@#
```
### Advice n°8 ```9f7376709d3fe09b389a27876834a13c6f275ed9a806d4c8df78f0ce1aad8fb343316133e810096e0999eaf1d2bca37c336e1b7726b213e001333d636e896617```
```
hackinghackinghackinghacking
```
### Advice n°9 ```$6$kI6VJ0a31.SNRsLR$Wk30X8w8iEC2FpasTo0Z5U7wke0TpfbDtSwayrNebqKjYWC4gjKoNEJxO/DkP.YFTLVFirQ5PEh4glQIHuKfA/```
```
kakashi1
```
## Task 7. Info About the author

Thank you
```
No answer needed
```

### Done 🙂
