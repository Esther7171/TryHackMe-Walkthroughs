#!/usr/bin/env python3

import requests

host = input("Enter IP:")
url = 'http://{}/th1s_1s_h1dd3n/?secret={}'

for i in range(100):
    r = requests.get(url.format(host, i))
    if not 'wrong' in r.text:
        print("Found secret: {}".format(i))
        print(r.text)
