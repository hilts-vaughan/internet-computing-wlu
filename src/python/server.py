import zerorpc
import json
import main

class routeData():
    def __init__(self, startLat, startLong, endLat, endLong, distance, chargerTypes):
        self.start = (startLat, startLong)
        self.end = (endLat, endLong)
        self.distance = distance
        self.chargerTypes = chargerTypes

class routeRPC(object):
    def getPossibleRoute(self, object):
        print("Calling getPossibleRoute... \n")
        obj = json.loads(object)
        sampleRoute = routeData(obj['start']['lat'], obj['start']['long'], obj['end']['lat'], obj['end']['long'], obj['distance'], obj['chargerTypes'])
        JSONresult = main.main(sampleRoute.start[0], sampleRoute.start[1], sampleRoute.end[0], sampleRoute.end[1], sampleRoute.distance, chargerTypes)
        print("getPossibleRoute returned: " + json.dumps(JSONresult) + "\n")
        return json.dumps(JSONresult)

s = zerorpc.Server(routeRPC())
s.bind("tcp://0.0.0.0:4242")
s.run()
print("Server running... \n")

#test stuff
#JSONtest = '{"start":{"lat":99,"long":0},"end":{"lat":10,"long":5},"distance": 50, "chargerTypes": [1, 2]}'
#obj = json.loads(JSONtest)

#sampleRoute = routeData(obj['start']['lat'], obj['start']['long'], obj['end']['lat'], obj['end']['long'], obj['distance'], obj['chargerTypes'])
