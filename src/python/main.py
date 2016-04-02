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


def checkValidThree(chargerNames, supportedChargers):

    currentSupportedIndex = 0
    while currentSupportedIndex<len(chargerNames):
        if(chargerNames[currentSupportedIndex] in supportedChargers):
            return True
        currentSupportedIndex +=1

    return False

def jsonFetch(distance, midLat, midLong):
    url = 'http://api.openchargemap.io/v2/poi/'
    payload = {'output': 'json', 'distanceunit': 'KM', 'distance': str(distance), 'latitude': str(midLat), 'longitude': str(midLong)}
    r = requests.get(url, params=payload)
    return json.loads(r.text)

def jsonParsingIntoRequestList(requestList, data, startindex):
    x=startindex
    for point in data:
        lat = point['AddressInfo']['Latitude']
        long = point['AddressInfo']['Longitude']
        tempAddress = point['AddressInfo']['AddressLine1']
        temp = [lat, long, tempAddress]
        if (temp not in requestList):
            requestList.append([lat, long, str(x)])
            x=x+1
    return x, requestList

def graphGenerator(requestList, maxDistance):
    graph = {}
    for x in requestList:
        temp_graph = {}
        for y in requestList:
            if (x[2]!=y[2]):
                distance = distanceCalculator(x[0],x[1],y[0],y[1])
                if (distance<maxDistance/2):
                    temp_graph[y[2]]=distance
        if (len(temp_graph)!=0):
            graph[x[2]]=temp_graph
    return graph
def requestGenerator(startLatitude, startLongitude, endLatitude, endLongitude):
    start = "start"
    end = "end"


    requestList = []
    requestList.append([startLatitude, startLongitude, start])
    requestList.append([endLatitude, endLongitude, end])
    distance = distanceCalculator(startLatitude,startLongitude,endLatitude,endLongitude)

    #generate datapoints for start index
    data = jsonFetch(distance, startLatitude, startLongitude)
    x, requestList = jsonParsingIntoRequestList(requestList,data,1)

    #generate datapoints for end index
    data = jsonFetch(distance, endLatitude, endLongitude)
    x, requestList = jsonParsingIntoRequestList(requestList,data,x)

    return requestList




#current Inputs
startLatitude = 39.5
startLongitude = -121.9
endLatitude = 40
endLongitude = -121
maxDistance = 100
requestList = requestGenerator(startLatitude,startLongitude,endLatitude,endLongitude)
graph = graphGenerator(requestList,maxDistance)
shortestPath = dijkstra.shortestPath(graph,"start","end")
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