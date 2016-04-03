import zerorpc

c = zerorpc.Client()
c.connect("tcp://127.0.0.1:4242")
print c.getPossibleRoute('{"start":{"lat":99,"long":0},"end":{"lat":10,"long":5},"distance": 50, "chargerTypes": [1, 2]}')
