# <div align="center">[Dev Diaries - TryHackMe Walkthrough](https://tryhackme.com/room/devdiaries)</div>
<div align="center">Hunt through online development traces to uncover what was left behind.</div>
<div align="center">
  <img width="200" height="200" alt="Dev Diaries" src="https://github.com/user-attachments/assets/0315eff9-8fbe-41a7-84a4-d61e5e0763bd" />
</div>

## Task 1. Challenge
The room starts with a simple OSINT investigation based around a single domain name. The goal was to track down traces left behind during the development phase and recover information that was never fully removed.

The only thing provided at the start was the domain:

```bash
marvenly.com
```

Since this was an OSINT challenge, I started by looking for exposed subdomains related to the project.

I used the following website to enumerate subdomains:

[Merklemap](https://www.merklemap.com/search?query=marvenly.com&page=0&utm_source=chatgpt.com)

<img width="1342" height="669" alt="image" src="https://github.com/user-attachments/assets/c5e565ef-7dbe-4318-b779-68b0511ec45e" />

After searching the domain, I found the development subdomain:

```bash
uat-testing.marvenly.com
```

That answered the first question.

Next, I visited the subdomain directly and started checking the website manually. While looking through the page, I noticed a username inside the footer section.

```bash
notvibecoder23
```

<img width="651" height="128" alt="image" src="https://github.com/user-attachments/assets/af1213e0-d890-4b8c-b429-67266c2e9958" />

I searched the username on Google and found the matching GitHub profile.

<img width="1191" height="682" alt="image" src="https://github.com/user-attachments/assets/3afbad2b-4baa-4412-9bdc-73e0eabd8d17" />

The profile contained a single repository related to the website.

To investigate further, I cloned the repository locally and checked the commit history.

```bash
git clone https://github.com/notvibecoder23/marvenly_site/
cd marvenly_site/
git log
```

<img width="889" height="574" alt="image" src="https://github.com/user-attachments/assets/15974b58-9538-47a4-a9ff-c382928a3a1c" />

Inside the commit logs, I found the developer’s email address:

```bash
freelancedevbycoder23@gmail.com
```

I also found the reason mentioned for removing the source code from the project.

```bash
The project was marked as abandoned due to a payment dispute
```

The final task was to recover the hidden flag.

Instead of checking the latest files, I reviewed the older commit history on GitHub and inspected previous changes made to the repository.

The flag was visible inside the third commit.

[GitHub Commit](https://github.com/notvibecoder23/marvenly_site/commit/33c59e5feedcbcbfee7a1f6d3a435225698f616f?utm_source=chatgpt.com)

<img width="1556" height="918" alt="image" src="https://github.com/user-attachments/assets/c24c9dbc-11ba-4c94-94f8-278c35336f7e" />

The hidden flag was:

```bash
THM{g1t_h1st0ry_n3v3r_f0rg3ts}
```

This room was a good beginner-level OSINT challenge focused on subdomain enumeration, GitHub investigation, and commit history analysis. Even after files are removed, traces often remain publicly accessible through version control history.

<img width="853" height="393" alt="image" src="https://github.com/user-attachments/assets/dab1730e-be29-4e5b-b381-b13560ad804f" />

> **Thanks for reading this walkthrough. I hope it helped you understand the investigation process behind this beginner OSINT room.**
