# <div align="center">Silver Platter</div>
<div align="center">Can you breach the server?</div>
<div align="center">
  <img src="https://github.com/user-attachments/assets/5d49e885-e0d8-4058-a8ea-eb23b7bf8b2a" height="200"></img>
</div>


Recone
Let start with the Network Scan
```
death@esther:~$ nmap 10.10.12.168 -sV -sC
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-03-02 18:30 IST
Nmap scan report for 10.10.12.168
Host is up (0.16s latency).
Not shown: 997 closed tcp ports (conn-refused)
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 8.9p1 Ubuntu 3ubuntu0.4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 1b:1c:87:8a:fe:34:16:c9:f7:82:37:2b:10:8f:8b:f1 (ECDSA)
|_  256 26:6d:17:ed:83:9e:4f:2d:f6:cd:53:17:c8:80:3d:09 (ED25519)
80/tcp   open  http       nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Hack Smarter Security
8080/tcp open  http-proxy
|_http-title: Error
| fingerprint-strings: 
|   FourOhFourRequest, HTTPOptions: 
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Sun, 02 Mar 2025 13:01:19 GMT
|     <html><head><title>Error</title></head><body>404 - Not Found</body></html>
|   GenericLines, Help, Kerberos, LDAPSearchReq, LPDString, RTSPRequest, SMBProgNeg, SSLSessionReq, Socks5, TLSSessionReq, TerminalServerCookie: 
|     HTTP/1.1 400 Bad Request
|     Content-Length: 0
|     Connection: close
|   GetRequest: 
|     HTTP/1.1 404 Not Found
|     Connection: close
|     Content-Length: 74
|     Content-Type: text/html
|     Date: Sun, 02 Mar 2025 13:01:18 GMT
|_    <html><head><title>Error</title></head><body>404 - Not Found</body></html>
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 115.03 seconds
```
As We can See there are 3 services that are runnig 
* `SSH` on port `22`.
* `Http` on port `80`.
* `Http-proxy` on port `8080`.

First Let take a look at web,

![image](https://github.com/user-attachments/assets/c4748ed9-d6ae-43e9-a79a-db1dd7698d48)

After navigating a little through it, I came accros something interesting. In /contact, there some content that leaks the username: scr1ptkiddy. Maybe it will be useful for brute-forcing a form or something, at least that’s what I though initially, but this wasn’t the case. Some other crucial info is mentioned, but I’ll come to it later.

![image](https://github.com/user-attachments/assets/ff2b6fc3-8f54-4fda-99d8-f0c5da2bf76c)

I didn't find anything good let Enemurate the directory.
```
death@esther:~$ dirsearch -u 10.10.12.168 
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.12.168/_25-03-02_18-45-59.txt

Target: http://10.10.12.168/

[18:45:59] Starting: 
[18:46:31] 301 -  178B  - /assets  ->  http://10.10.12.168/assets/
[18:46:31] 403 -  564B  - /assets/
[18:46:50] 301 -  178B  - /images  ->  http://10.10.12.168/images/
[18:46:50] 403 -  564B  - /images/
[18:46:54] 200 -   17KB - /LICENSE.txt
[18:47:08] 200 -  771B  - /README.txt

Task Completed
death@esther:~$ 
```
Let Take a look at both directories

![image](https://github.com/user-attachments/assets/8d0bde1c-865a-44ec-a75f-2b8c323d2005)

![image](https://github.com/user-attachments/assets/fc342ed8-cec3-47ae-ad7c-6c37ee1d5d72)

Both are forbidden let Enemurate http-proxy maybe we could find somthing usefull

```
death@esther:~$ dirsearch -u 10.10.12.168:8080
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.12.168_8080/_25-03-02_18-47-01.txt

Target: http://10.10.12.168:8080/

[18:47:01] Starting: 
[18:47:40] 302 -    0B  - /console/  ->  /noredirect.html
[18:47:40] 302 -    0B  - /console/base/config.json  ->  /noredirect.html
[18:47:40] 302 -    0B  - /console  ->  /noredirect.html
[18:47:40] 302 -    0B  - /console/j_security_check  ->  /noredirect.html
[18:47:40] 302 -    0B  - /console/payments/config.json  ->  /noredirect.html
[18:47:40] 302 -    0B  - /console/login/LoginForm.jsp  ->  /noredirect.html
[18:48:26] 302 -    0B  - /website  ->  http://10.10.12.168:8080/website/

Task Completed
death@esther:~$ 
```
Ok when i try to take a look at website it also forbidden 

![image](https://github.com/user-attachments/assets/0915906f-81bb-44e3-b0a4-6538abb923fc)

And the `/noredirect.html` is also forbidden

![image](https://github.com/user-attachments/assets/e2d8df58-c4dc-41b8-b5ec-eb887f61c1bc)

It's kind a sharp trick to manuplate a human mind on fixed path when i notice this first i just ignre and focus on the username but At this point, I knew I needed to change my approch and thought about enumerating parameters,

![image](https://github.com/user-attachments/assets/dcdd74ce-bb3e-4b40-b39d-4f762d9f8da9)

BUT before that, I felt I should check again the website on port 80. Looking again at /contact, I noticed an interesting name: Silverpeas more exactly., when we create any project name on github the project is be same name as the repo named and the user is a kind a differnt things so i started enemurateing the     

```
death@esther:~$ dirsearch -u 10.10.12.168:8080/silverpeas
/usr/lib/python3/dist-packages/dirsearch/dirsearch.py:23: DeprecationWarning: pkg_resources is deprecated as an API. See https://setuptools.pypa.io/en/latest/pkg_resources.html
  from pkg_resources import DistributionNotFound, VersionConflict

  _|. _ _  _  _  _ _|_    v0.4.3
 (_||| _) (/_(_|| (_| )

Extensions: php, aspx, jsp, html, js | HTTP method: GET | Threads: 25 | Wordlist size: 11460

Output File: /home/death/reports/_10.10.12.168_8080/_silverpeas_25-03-02_19-02-51.txt

Target: http://10.10.12.168:8080/

[19:02:51] Starting: silverpeas/
[19:02:57] 404 -   74B  - /silverpeas/%2e%2e;/test
[19:02:57] 404 -   74B  - /silverpeas/%2e%2e//google.com
[19:02:57] 404 -   74B  - /silverpeas/..;/
[19:02:57] 404 -   74B  - /silverpeas/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd
[19:03:10] 302 -    0B  - /silverpeas/;admin/  ->  http://10.10.12.168:8080/silverpeas/defaultLogin.jsp
[19:03:10] 302 -    0B  - /silverpeas/;json/  ->  http://10.10.12.168:8080/silverpeas/defaultLogin.jsp
[19:03:10] 302 -    0B  - /silverpeas/;login/  ->  http://10.10.12.168:8080/silverpeas/defaultLogin.jsp
[19:03:10] 302 -    0B  - /silverpeas/;/admin  ->  http://10.10.12.168:8080/silverpeas/admin/;=
[19:03:15] 302 -    0B  - /silverpeas/admin  ->  http://10.10.12.168:8080/silverpeas/admin/
[19:03:16] 403 -  801B  - /silverpeas/admin/
[19:03:18] 403 -  801B  - /silverpeas/admin;/
[19:03:32] 403 -  801B  - /silverpeas/blog/
[19:03:32] 302 -    0B  - /silverpeas/blog  ->  http://10.10.12.168:8080/silverpeas/blog/
[19:03:34] 404 -   74B  - /silverpeas/cgi-bin/.%2e/%2e%2e/%2e%2e/%2e%2e/etc/passwd
[19:03:34] 302 -    0B  - /silverpeas/chat  ->  http://10.10.12.168:8080/silverpeas/chat/
[19:03:36] 302 -    0B  - /silverpeas/comment  ->  http://10.10.12.168:8080/silverpeas/comment/
[19:03:38] 500 -  842B  - /silverpeas/console/j_security_check
[19:03:40] 302 -    0B  - /silverpeas/demo  ->  http://10.10.12.168:8080/silverpeas/demo/
[19:03:41] 403 -  801B  - /silverpeas/demo/
[19:03:41] 302 -    0B  - /silverpeas/directory  ->  http://10.10.12.168:8080/silverpeas/directory/
[19:03:44] 404 -    0B  - /silverpeas/faces/javax.faces.resource/web.xml?ln=..\\WEB-INF
[19:03:44] 404 -    0B  - /silverpeas/faces/javax.faces.resource/web.xml?ln=../WEB-INF
[19:03:46] 302 -    0B  - /silverpeas/forums  ->  http://10.10.12.168:8080/silverpeas/forums/
[19:03:46] 403 -  801B  - /silverpeas/forums/
[19:03:46] 302 -    0B  - /silverpeas/gallery  ->  http://10.10.12.168:8080/silverpeas/gallery/
[19:03:50] 403 -  801B  - /silverpeas/images/
[19:03:50] 302 -    0B  - /silverpeas/images  ->  http://10.10.12.168:8080/silverpeas/images/
[19:03:52] 500 -  842B  - /silverpeas/j_security_check
[19:03:52] 404 -   74B  - /silverpeas/javax.faces.resource.../WEB-INF/web.xml.jsf
[19:03:57] 302 -    0B  - /silverpeas/media  ->  http://10.10.12.168:8080/silverpeas/media/
[19:03:57] 403 -  801B  - /silverpeas/media/
[19:03:58] 404 -   74B  - /silverpeas/META-INF/app-config.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/
[19:03:58] 404 -   74B  - /silverpeas/META-INF
[19:03:58] 404 -   74B  - /silverpeas/META-INF/application-client.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/application.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/eclipse.inf
[19:03:58] 404 -   74B  - /silverpeas/META-INF/context.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/container.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/beans.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/CERT.SF
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-app.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/ironjacamar.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/ejb-jar.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-client.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-deployment-structure.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/persistence.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-ejb-client.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/MANIFEST.MF
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-webservices.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jbosscmp-jdbc.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/spring/application-context.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/jboss-ejb3.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/ra.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/openwebbeans/openwebbeans.properties
[19:03:58] 404 -   74B  - /silverpeas/META-INF/SOFTWARE.SF
[19:03:58] 404 -   74B  - /silverpeas/META-INF/weblogic-ejb-jar.xml
[19:03:58] 404 -   74B  - /silverpeas/META-INF/weblogic-application.xml
[19:04:03] 200 -    3KB - /silverpeas/password.js
[19:04:09] 200 -  548B  - /silverpeas/proxy/
[19:04:09] 200 -  548B  - /silverpeas/proxy
[19:04:10] 500 -  842B  - /silverpeas/repository
[19:04:13] 404 -   74B  - /silverpeas/servlet/Oracle.xml.xsql.XSQLServlet/soapdocs/webapps/soap/WEB-INF/config/soapConfig.xml
[19:04:13] 404 -   74B  - /silverpeas/servlet/oracle.xml.xsql.XSQLServlet/soapdocs/webapps/soap/WEB-INF/config/soapConfig.xml
[19:04:13] 404 -  396B  - /silverpeas/services/
[19:04:13] 404 -  416B  - /silverpeas/services/config/databases.yml
[19:04:13] 404 -  395B  - /silverpeas/services
[19:04:15] 404 -   74B  - /silverpeas/soapdocs/webapps/soap/WEB-INF/config/soapConfig.xml
[19:04:17] 302 -    0B  - /silverpeas/survey  ->  http://10.10.12.168:8080/silverpeas/survey/
[19:04:20] 302 -    0B  - /silverpeas/thumbnail  ->  http://10.10.12.168:8080/silverpeas/thumbnail/
[19:04:21] 302 -    0B  - /silverpeas/upload  ->  http://10.10.12.168:8080/silverpeas/upload/
[19:04:21] 403 -  801B  - /silverpeas/upload/
[19:04:24] 404 -   74B  - /silverpeas/war/WEB-INF/deploy/
[19:04:24] 404 -   74B  - /silverpeas/war/WEB-INF/classes/
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF
[19:04:24] 404 -   74B  - /silverpeas/web-app/WEB-INF/classes
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/application-client.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/beans.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/applicationContext.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/application_config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/cas.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/application.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/app-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/cas-servlet.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/applicationContext.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/application.yml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/cas-theme-default.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/commons-logging.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/countries.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/db.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/config.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/default_views.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/default-theme.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/demo.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/faces-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/logback.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/log4j.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/log4j.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/fckeditor.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/languages.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/META-INF/persistence.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/META-INF/app-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/messages.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/hibernate.cfg.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/mobile.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/services.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/persistence.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/resources/config.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/protocol_views.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/struts-default.vm
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/struts.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/struts.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/theme.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/validation.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/web.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/components.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/caches.dat
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/classes/velocity.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/caches.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/core_context.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/core.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/daemons.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/config.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/db.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/lutece.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/jtidy.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/mime.types
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/editors.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/webmaster.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/search.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/wml.properties
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/page_navigator.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/conf/jpa_context.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/dashboard-statistics.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/faces-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/metadata.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/mua-endpoints.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/security.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/users.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/soapConfig.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/web-core.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/webflow-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/config/webmvc-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/dispatcher-servlet.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/decorators.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/deployerConfigContext.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/geronimo-web.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/glassfish-resources.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/ejb-jar.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/faces-config.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/glassfish-web.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/ibm-web-bnd.xmi
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/hibernate.cfg.xml
[19:04:24] 404 -   74B  - /silverpeas/WEB-INF/ias-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jax-ws-catalog.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-client.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/ibm-web-ext.xmi
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-deployment-structure.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-ejb-client.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-webservices.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jboss-ejb3.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jrun-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jonas-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jetty-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/jetty-env.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/liferay-layout-templates.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/liferay-plugin-package.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/liferay-portlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/local.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/logback.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/local-jps.properties
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/liferay-look-and-feel.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/liferay-display.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/logs/log.log
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/openx-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/quartz-properties.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/portlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/remoting-servlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/resin-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/portlet-custom.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/resources/config.properties
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/application-context.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/management-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/authorization-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/service.xsd
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/sitemesh.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/rexip-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/restlet-servlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/messaging-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/services-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-ws-servlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/presentation-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-config/services-remote-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-context.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-dispatcher-servlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-configuration/filters.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring-mvc.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/spring/webmvc-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/springweb-servlet.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/sun-jaxws.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/struts-config-widgets.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/struts-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/sun-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/struts-config-ext.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/tjc-web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/tiles-defs.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/trinidad-config.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/validation.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/web-borland.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/validator-rules.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/urlrewrite.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/web.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/weblogic.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/workflow-properties.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/web.xml.jsf
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/web-jetty.xml
[19:04:25] 404 -   74B  - /silverpeas/WEB-INF/web2.xml
[19:04:25] 403 -  801B  - /silverpeas/web/

Task Completed
death@esther:~$
```
So here is the default Login page,And intreasting thing is the version of the website is mentioned already we can search for any exploit for this

![image](https://github.com/user-attachments/assets/1a1d8c9d-7d21-49ad-be4f-79cee418538f)

CVE-2024-36042As i check for the version there is an `CVE-2024-36042` Silverpeas CRM - Authentication Bypass. I found this repo that describe this things in breef [CVE-2024-36042](https://gist.github.com/ChrisPritchard/4b6d5c70d9329ef116266a6c238dcb2d)

Let Use burpsuite to Intercept the request

As we know the username already `scr1ptkiddy` let try to login

![image](https://github.com/user-attachments/assets/96d5f3ff-244b-46af-8013-35742a4a277d)

Remove the Password Parameter and Follow The Redirection

![image](https://github.com/user-attachments/assets/fd8c4c1d-f6f0-438e-9537-79bb9bc06890)

Again Follow the Redirection

![image](https://github.com/user-attachments/assets/2d3854fd-999e-4b3b-86f8-151fd0844938)

