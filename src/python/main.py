'''
Created on Mar 28, 2016

@author: Brandon
'''





from math import sin, cos, sqrt, atan2, radians
import dijkstra
import requests
import json
import googlemaps
from datetime import datetime

# inputs
start = "start"
end = "end"

startLatitude = 39.5
startLongitude = -121.9
endLatitude = 40
endLongitude = -121
maxDistance = 50

#starting values
# approximate radius of earth in km
R = 6373.0
requestList = []
requestList.append([startLatitude, startLongitude, start])
requestList.append([endLatitude, endLongitude, end])



lat1 = radians(startLatitude)
lon1 = radians(startLongitude)

lat2=radians(endLatitude)
lon2=radians(endLongitude)
dlon = lon2 - lon1
dlat = lat2 - lat1
a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
c = 2 * atan2(sqrt(a), sqrt(1 - a))
distance = R * c
print(distance)


url = 'http://api.openchargemap.io/v2/poi/'
payload = {'output': 'json', 'distanceunit': 'KM', 'distance': str(distance), 'latitude': str(startLatitude), 'longitude': str(startLongitude)}
print(payload)
r = requests.get(url, params=payload)
data = json.loads(r.text)
#first loop for close to start

x = 1
for point in data:
    lat = point['AddressInfo']['Latitude']
    long = point['AddressInfo']['Longitude']
    tempAddress = point['AddressInfo']['AddressLine1']
    temp = [lat, long, tempAddress]
    if (temp not in requestList):
        requestList.append([lat, long, str(x)])
        x=x+1

#second loop for close to end

payload = {'output': 'json', 'distanceunit': 'KM', 'distance': str(distance), 'latitude': str(endLatitude), 'longitude':str(endLongitude)}
r = requests.get(url, params=payload)
data = json.loads(r.text)
for point in data:
    lat = point['AddressInfo']['Latitude']
    long = point['AddressInfo']['Longitude']
    tempAddress = point['AddressInfo']['AddressLine1']
    temp = [lat, long, tempAddress]
    if (temp not in requestList):
        requestList.append([lat, long, str(x)])
        x=x+1






print(requestList)
#o.write(str(data))
#    print(x)
#o.close()



#sample=[[39.7966490183476,-121.901470242328,"a"],[46.5442471899861,-87.3940504476074,"b"],[39.4045363,-75.8684369,"c"],[39.1001649,-94.5802416,"d"],[39.097535,-94.584097,"e"],[38.9570844,-94.6008525,"f"],[38.883209,-77.000572,"g"],[38.785151,-77.015387,"h"],[35.203747,-80.8636569999999,"i"],[38.072328,-122.132469,"j"]]

graph ={}
graph_index = 0
for x in requestList:
    lat1 = radians(x[0])
    lon1 = radians(x[1])
    first = 0
    #print(lat1)
    #print(lon1)
    temp_graph = {}
    for y in requestList:
        if (x[2]!=y[2]):
            lat2=radians(y[0])
            lon2=radians(y[1])   
            dlon = lon2 - lon1
            dlat = lat2 - lat1
            a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
            c = 2 * atan2(sqrt(a), sqrt(1 - a))
            distance = R * c
            #print(distance)
            if (distance<maxDistance):
                temp_graph[y[2]]=distance
                
    if (len(temp_graph)!=0):
        graph[x[2]]=temp_graph
print(graph)
print(dijkstra.shortestPath(graph,start,end))

'''

if None not in path:
    x=0
    while (x<len(path)-2):
        if path[x]!= start or path[x+1]!=end:
            lat_one = sample[int(path[x])+2][0]
            lon_one = sample[int(path[x])+2][1]
            lat_two = sample[int(path[x])+3][0]
            lon_two = sample[int(path[x])+3][1]
        elif path[x] == start:
            lat_one = sample[int(path[0])][0]
            lon_one = sample[int(path[0])][1]
            lat_two = sample[int(path[x]+3)][0]
            lon_two = sample[int(path[x])+3][1]
        else:
            lat_one = sample[int(path[x])+2][0]
            lon_one = sample[int(path[x])+2][1]
            lat_two = sample[1][0]
            lon_two = sample[1][1]
        #one is start point
        #two is destination
        gmaps = googlemaps.Client(key='IzaSyDMLDGm1PV9AwhvbosGsbbbdFuAARfrFdw')#key
        temp = gmaps.directions()
        now = datetime.now()
        gmaps.
        directions_result = gmaps.directions("Sydney Town Hall", "Parramatta, NSW",mode="transit", departure_time=now)
        x+=1
#google API
'''

#https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=longtitude,latitude&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY