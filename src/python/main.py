'''
Created on Mar 28, 2016

@author: Brandon
'''





from math import sin, cos, sqrt, atan2, radians
import dijkstra
import googleNodes
import requests
import json
import googlemaps
from datetime import datetime

def distanceCalculator(startLatitude,startLongitude,endLatitude,endLongitude):
    R = 6373.0
    lat1 = radians(startLatitude)
    lon1 = radians(startLongitude)

    lat2=radians(endLatitude)
    lon2=radians(endLongitude)
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance


# inputs

def requestGenerator(startLatitude, startLongitude, endLatitude, endLongitude, maxDistance):
    start = "start"
    end = "end"


    #starting values
    # approximate radius of earth in km

    requestList = []
    requestList.append([startLatitude, startLongitude, start])
    requestList.append([endLatitude, endLongitude, end])



    distance = distanceCalculator(startLatitude,startLongitude,endLatitude,endLongitude)
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
                distance = distanceCalculator(x[0],x[1],y[0],y[1])
                if (distance<maxDistance):
                    temp_graph[y[2]]=distance

        if (len(temp_graph)!=0):
            graph[x[2]]=temp_graph
    print(graph)
    return requestList, graph, (dijkstra.shortestPath(graph,start,end))




#current Inputs
startLatitude = 39.5
startLongitude = -121.9
endLatitude = 40
endLongitude = -121
maxDistance = 100
requestList, graph, shortestPath = requestGenerator(startLatitude,startLongitude,endLatitude,endLongitude,maxDistance)
actualDistances = googleNodes.googleMapsActualPath(requestList, shortestPath)
correctPath = False
print(shortestPath)
while correctPath == False:
    count = 0
    correctPath=True
    currentDistanceCounter = 0
    while currentDistanceCounter<len(actualDistances):
        if actualDistances[currentDistanceCounter]/1000>maxDistance:
            correctPath=False
            graph[str(shortestPath[currentDistanceCounter])].pop(str(shortestPath[currentDistanceCounter+1]),None)
        else:
            graph[str(shortestPath[currentDistanceCounter])][str(shortestPath[currentDistanceCounter+1])]=actualDistances[currentDistanceCounter]/1000
        currentDistanceCounter+=1

    print(graph)
    shortestPath = dijkstra.shortestPath(graph,"start","end")
    print("shortestPath {}".format(shortestPath))
    if shortestPath == None or None in shortestPath or count>50:
        print(count)
        break
    else:
        actualDistances=googleNodes.googleMapsActualPath(requestList,shortestPath)
    print("actual distances {}".format(actualDistances))
    count+=1
print(actualDistances)
print(shortestPath)
#https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=longtitude,latitude&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY