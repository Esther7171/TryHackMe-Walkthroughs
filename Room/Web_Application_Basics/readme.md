# <div align="center">[Web Application Basics](https://tryhackme.com/room/webapplicationbasics)</div>
<div align="center">Learn the basics of web applications: HTTP, URLs, request methods, response codes, and headers.</div>
<br>
<div align="center">
<img src="https://github.com/user-attachments/assets/e44d9e62-162a-4a02-a01e-91092ca41d69" height="200"></img>
</div>

## Task 1. Introduction

Introduction
Welcome to Web Application Basics! In this room, we’ll walk through the key elements of a web application, such as URLs, HTTP requests, and responses. This is perfect if you're starting and want to get a handle on the essentials or if you're looking to build or work with web apps.

Learning Objectives
By completing this room, you will:

Understand what a web application is and how it runs in a web browser.
Break down the components of a URL and see how it helps access web resources.
Learn how HTTP requests and responses work.
Get familiar with the different types of HTTP request methods.
Understand what different HTTP response codes mean.
Check out how HTTP headers work and why they matter for security.
### I am ready to learn about Web Applications!
```
No answer needed
```

## Task 2
Web Application Overview


Consider an analogy of a web application as a planet. Astronauts travel to the planet to explore its surface, similar to how someone uses a web browser to explore or browse a web application. Although we only see the surface of a planet, a lot is going on under the surface. You can imagine the whole planet as a web server with many things going on under the surface of the web server, yet all we can usually see is the surface of web pages or apps. We will now explore the various components that make up a web application.

Front End
The Front End can be considered similar to the surface of the planet, the parts that an astronaut can see and interact with based on the laws of nature. A web application would have a user interact with it and use a number of technologies such as HTML, CSS, and JavaScript to do this.

Illustration of a planet symbolizing an HTML web page: gray, bare, and motionless, lacking CSS for design and JavaScript for movement.
HTML (Hypertext Markup Language) is a foundational aspect of web applications. It is a set of instructions or code that instructs a web browser on what to display and how to display it. It could be compared to simple organisms living on the planet; these organisms have DNA, which is the instructions for how simple organisms are put together.


Illustration of a vibrant planet representing an HTML web page styled with CSS. The planet is colorful and detailed, showcasing its beauty through design elements like textures, patterns, and vivid colors, symbolizing the visual enhancements CSS provides.
CSS (Cascading Style Sheets) in web applications describes a standard appearance, such as certain colours, types of text, and layouts. Continuing the analogy with DNA, these could be compared to the parts of DNA that describe the colour, shape, size, and texture of the simple organism.


Illustration of a planet symbolizing an HTML web page: gray, bare, and motionless, lacking CSS for design and JavaScript for movement.
JS (JavaScript) is part of a web application front end that enables more complex activity in the web browser. Whereas HTML can be considered a simple set of instructions on what to display, JavaScript is a more advanced set of instructions that allows choices and decisions to be made on what to display. In the planet analogy, JavaScript can be considered the brain of an advanced organism, which allows decisions to be made based on what and how something interacts with it.



Back End
The Back End of a web application is things you don’t see within a web browser but are important for the web application to work. On a planet, these are the non-visual things: the structures that keep a building standing, the air, and the gravity that keeps feet on the ground.


Illustration of a planet's ecosystem representing databases. The planet's surface is rich with diverse landscapes, forests, rivers, and resources, symbolizing a vast repository of data. This thriving ecosystem highlights how databases store and provide access to various types of resources essential for the planet’s (website's) functionality.
A Database is where information can be stored, modified, and retrieved. A web application may want to store and retrieve information about a visitor's preferences on what to show or not; this would be stored in a database. A planet may have more advanced inhabitants who store information about locations in maps, write notes in a diary or put books in a library and files in a filing cabinet.


Illustration of a planet’s infrastructure symbolizing web servers, networking, and systems that support the web application, with interconnected networks and servers at its core.
There are many other Infrastructure components underpinning Web Applications, such as web servers, application servers, storage, various networking devices, and other software that support the web application. On a planet, these are the roads that are present, the cars that run on those roads, the fuel that powers the cars.

Illustration of the planet's ozone layer representing a Web Application Firewall (WAF). The protective layer surrounds the planet, symbolizing security measures that shield the web application from external attacks and threats, ensuring its safety and integrity.
WAF (Web Application Firewall) is an optional component for web applications. It helps filter out dangerous requests away from the Web Server and provides an element of protection. This could be considered similar to how a planet's atmosphere can protect inhabitants from harmful UV rays.

Summary
There are many components involved in delivering a web application. Front End components like HTML, CSS, and JavaScript focus on the experience inside the browser. Back End components such as the Web Server, Database, or WAF are the engine under the surface that enable the web application to function. This simple introduction will be built upon in the upcoming tasks.

### Which component on a computer is responsible for hosting and delivering content for web applications?
```
web server
```
### Which tool is used to access and interact with web applications?
```
web browser
```
### Which component acts as a protective layer, filtering incoming traffic to block malicious attacks, and ensuring the security of the the web application?
```
web application firewall
```
### Task 3. Uniform Resource Locator
A Uniform Resource Locator (URL) is a web address that lets you access all kinds of online content—whether it’s a webpage, a video, a photo, or other media. It guides your browser to the right place on the Internet.

Anatomy of a URL
Illustration depicting the various parts of a URL, including the protocol, domain name, path, query parameters, and fragment. Each component is labeled and visually distinct, demonstrating how they work together to form a complete web address.

Think of a URL as being made up of several parts, each playing a different role in helping you find the right resource. Understanding how these parts fit together is important for browsing the web, developing web applications, and even troubleshooting problems.

Here’s a breakdown of the key components:

Scheme

The scheme is the protocol used to access the website. The most common are HTTP (HyperText Transfer Protocol) and HTTPS (Hypertext Transfer Protocol Secure). HTTPS is more secure because it encrypts the connection, which is why browsers and cyber security experts recommend it. Websites often enforce HTTPS for added protection.

User

Some URLs can include a user’s login details (usually a username) for sites that require authentication. This happens mostly in URLs that need credentials to access certain resources. However, it’s rare nowadays because putting login details in the URL isn’t very safe—it can expose sensitive information, which is a security risk.

Host/Domain

The host or domain is the most important part of the URL because it tells you which website you’re accessing. Every domain name has to be unique and is registered through domain registrars. From a security standpoint, look for domain names that appear almost like real ones but have small differences (this is called typosquatting). These fake domains are often used in phishing attacks to trick people into giving up sensitive info.

Port

The port number helps direct your browser to the right service on the web server. It’s like telling the server which doorway to use for communication. Port numbers range from 1 to 65,535, but the most common are 80 for HTTP and 443 for HTTPS.

Path

The path points to the specific file or page on the server that you’re trying to access. It’s like a roadmap that shows the browser where to go. Websites need to secure these paths to make sure only authorised users can access sensitive resources.

Query String

The query string is the part of the URL that starts with a question mark (?). It’s often used for things like search terms or form inputs. Since users can modify these query strings, it’s important to handle them securely to prevent attacks like injections, where malicious code could be added.

Fragment

The fragment starts with a hash symbol (#) and helps point to a specific section of a webpage—like jumping directly to a particular heading or table. Users can modify this too, so like with query strings, it’s important to check and clean up any data here to avoid issues like injection attacks.

### Which protocol provides encrypted communication to ensure secure data transmission between a web browser and a web server?
```
HTTPS
```
### What term describes the practice of registering domain names that are misspelt variations of popular websites to exploit user errors and potentially engage in fraudulent activities?
```
Typosquatting
```
### What part of a URL is used to pass additional information, such as search terms or form inputs, to the web server?
```
Query String
```
## Task 4. HTTP Messages

