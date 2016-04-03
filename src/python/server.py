import zerorpc
import json

class routeData():
    def __init__(self, startLat, startLong, endLat, endLong, distance, chargerTypes):
        self.start = (startLat, startLong)
        self.end = (endLat, endLong)
        self.distance = distance
        self.chargerTypes = chargerTypes

class routeRPC(object):
    def getPossibleRoute(self, object):
        obj = json.loads(object)
        sampleRoute = routeData(obj['start']['lat'], obj['start']['long'], obj['end']['lat'], obj['end']['long'], obj['distance'], obj['chargerTypes'])
        return json.dumps(sampleRoute.__dict__)

s = zerorpc.Server(routeRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()

#test stuff
#JSONtest = '{"start":{"lat":99,"long":0},"end":{"lat":10,"long":5},"distance": 50, "chargerTypes": [1, 2]}'
#obj = json.loads(JSONtest)

#sampleRoute = routeData(obj['start']['lat'], obj['start']['long'], obj['end']['lat'], obj['end']['long'], obj['distance'], obj['chargerTypes'])
