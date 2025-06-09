# <div align='center'>[Vulnerabilities 101](https://tryhackme.com/room/vulnerabilities101)</div>
<div align='center'>Understand the flaws of an application and apply your researching skills on some vulnerability databases.</div>
<div align='center'>
  <img src='https://github.com/user-attachments/assets/e664ade5-b34e-4a56-9f8c-bde133eadb69' height='200'/>
</div>

## Task 1. Introduction
Cybersecurity is big business in the modern-day world. The hacks that we hear about in newspapers are from exploiting vulnerabilities. In this room, we're going to explain exactly what a vulnerability is, the types of vulnerabilities and how we can exploit these for success in our penetration testing endeavours.

An enormous part of penetration testing is knowing the skills and resources for whatever situation you face. This room is going to introduce you to some resources that are essential when researching vulnerabilities, specifically, you are going to be introduced to:

* What vulnerabilities are
* Why they're worthy of learning about
* How are vulnerabilities rated
* Databases for vulnerability research
* A showcase of how vulnerability research is used on ACKme's engagement
Answer the questions below
Read this task!
```
No answer needed
```
## Task 2. Introduction to Vulnerabilities

<div align='center'>
  <img src='https://github.com/user-attachments/assets/7b4f5dbf-beb5-4531-8f83-1e5c4a46b762' height='200'/>
</div>

A vulnerability in cybersecurity is defined as a weakness or flaw in the design, implementation or behaviours of a system or application. An attacker can exploit these weaknesses to gain access to unauthorised information or perform unauthorised actions. The term “vulnerability” has many definitions by cybersecurity bodies. However, there is minimal variation between them all.

> National Institute of Standards and Technology (NIST). This organisation develops frameworks and policies for information security that is used all throughout the industry.

For example, NIST defines a vulnerability as “weakness in an information system, system security procedures, internal controls, or implementation that could be exploited or triggered by a threat source”.

Vulnerabilities can originate from many factors, including a poor design of an application or an oversight of the intended actions from a user.

We will come on to discuss the various types of vulnerabilities in a later room. However, for now, we should know that there are arguably five main categories of vulnerabilities:

|Vulnerability|Description|
|--|--|
|Operating System|These types of vulnerabilities are found within Operating Systems (OSs) and often result in privilege escalation.|
|(Mis)Configuration-based|These types of vulnerability stem from an incorrectly configured application or service. For example, a website exposing customer details.|
|Weak or Default Credentials|Applications and services that have an element of authentication will come with default credentials when installed. For example, an administrator dashboard may have the username and password of "admin". These are easy to guess by an attacker.|
|Application Logic|These vulnerabilities are a result of poorly designed applications. For example, poorly implemented authentication mechanisms that may result in an attacker being able to impersonate a user.|
|Human-Factor|Human-Factor vulnerabilities are vulnerabilities that leverage human behaviour. For example, phishing emails are designed to trick humans into believing they are legitimate.|

As a cybersecurity researcher, you will be assessing applications and systems - using vulnerabilities against these targets in day-to-day life, so it is crucial to become familiar with this discovery and exploitation process.

Answer the questions below

### An attacker has been able to upgrade the permissions of their system account from "user" to "administrator". What type of vulnerability is this?
```
Operating System
```
### You manage to bypass a login panel using cookies to authenticate. What type of vulnerability is this?
```
Application Logic
```
## Task 3. Scoring Vulnerabilities (CVSS & VPR)


Vulnerability management is the process of evaluating, categorising and ultimately remediating threats (vulnerabilities) faced by an organisation.
It is arguably impossible to patch and remedy every single vulnerability in a network or computer system and sometimes a waste of resources.

After all, only approximately 2% of vulnerabilities only ever end up being exploited ([Kenna security., 2020](https://www.kennasecurity.com/resources/prioritization-to-prediction-report/)). Instead, it is all about addressing the most dangerous vulnerabilities and reducing the likelihood of an attack vector being used to exploit a system.

This is where vulnerability scoring comes into play. Vulnerability scoring serves a vital role in vulnerability management and is used to determine the potential risk and impact a vulnerability may have on a network or computer system. For example, the popular Common Vulnerability Scoring System (CVSS) awards points to a vulnerability based upon its features, availability, and reproducibility.

Of course, as always in the world of IT, there is never just one framework or proposed idea. Let’s explore two of the more common frameworks and analyse how they differ.


**_Common Vulnerability Scoring System_**

First introduced in 2005, the Common Vulnerability Scoring System (or CVSS) is a very popular framework for vulnerability scoring and has three major iterations. As it stands, the current version is CVSSv3.1 (with version 4.0 currently in draft) a score is essentially determined by some of the following factors (but many more):

  1. How easy is it to exploit the vulnerability?

  2. Do exploits exist for this?

  3. How does this vulnerability interfere with the CIA triad?
     
In fact, there are so many variables that you have to use a [calculator](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator) to figure out the score using this framework. A vulnerability is given a classification (out of five) depending on the score that is has been assigned. I have put the Qualitative Severity Rating Scale and their score ranges into the table below. 

| Rating | Score |
|--|--|
|None| 0 |
|Low	| 0.1 - 3.9|
|Medium	| 4.0 - 6.9|
|High	| 7.0 - 8.9|
|Critical |	9.0 - 10.0|

However, CVSS is not a magic bullet. Let's analyse some of the advantages and disadvantages of CVSS in the table below:

Advantages of CVSS | Disadvantages of CVSS |
|--|--|
|CVSS has been around for a long time.	| CVSS was never designed to help prioritise vulnerabilities, instead, just assign a value of severity.|
|CVSS is popular in organisations.	| CVSS heavily assesses vulnerabilities on an exploit being available. However, only 20% of all vulnerabilities have an exploit available ([Tenable., 2020](https://www.tenable.com/research)) . | 
|CVSS is a free framework to adopt and recommended by organisations such as NIST.	| Vulnerabilities rarely change scoring after assessment despite the fact that new developments such as exploits may be found. |
