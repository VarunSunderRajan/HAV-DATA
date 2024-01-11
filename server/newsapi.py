import http.client, urllib.parse
conn = http.client.HTTPConnection('api.mediastack.com')

params = urllib.parse.urlencode({
    'access_key': '6e7ddb1dcf5da881d518ae95e954b49f',
    'keywords': 'cannabis weed -police -charges',
    # 'categories': '-general,-sports',
    'countries': 'ca',
    'limit': 10,
    })

conn.request('GET', '/v1/news?{}'.format(params))

res = conn.getresponse()
data = res.read()

#print(data.decode('utf-8'))