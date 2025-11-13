I think i need to buid a little help section for beginners maybe ?
## Common Scan technique to find open ports 
```
nmap -sV -sC 
```
## For Scanning WordPress 

Installation 
```
sudo apt  install ruby-rubygems ; sudo apt install ruby-dev
sudo apt install build-essential
sudo gem install wpscan
```
usage 
```
wpscan --url http://10.10.10.10/wordpress/
```
---
