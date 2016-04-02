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


def jsonParsingIntoRequestList(requestList, data, startindex, suppportedChargers):
    x=startindex
    for point in data:

        chargerList = []
        chargerIDList = []
        lat = point['AddressInfo']['Latitude']
        long = point['AddressInfo']['Longitude']

        addressLine = point['AddressInfo']['AddressLine1']
        addressTitle = point['AddressInfo']['Title']
        addressDetails = [lat, long, addressLine, addressTitle]


        for chargerType in point['Connections']:
            if (chargerType['Level']!=None and 'ID' in chargerType['Level']):
                chargerList.append(chargerType['Level']['ID'])
            else:
                chargerList.append(None)
            if (chargerType['ConnectionType']!=None and 'ID' in chargerType['ConnectionType']):
                chargerIDList.append(str(chargerType['ConnectionType']['ID']))

        if (addressDetails not in requestList and (1 in chargerList or 2 in chargerList or None in chargerList)):
            requestList.append([lat, long, str(x),addressLine,addressTitle])
            x=x+1

        elif ((3 in chargerList)):
            found=checkValidThree(chargerIDList,suppportedChargers)
            if found:
                requestList.append([lat, long, str(x),addressLine,addressTitle])

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
def requestGenerator(startLatitude, startLongitude, endLatitude, endLongitude, suppportedChargers):
    start = "start"
    end = "end"


    requestList = []
    requestList.append([startLatitude, startLongitude, start])
    requestList.append([endLatitude, endLongitude, end])
    distance = distanceCalculator(startLatitude,startLongitude,endLatitude,endLongitude)

    #generate datapoints for start index
    data = jsonFetch(distance, startLatitude, startLongitude)
    x, requestList = jsonParsingIntoRequestList(requestList,data,1, suppportedChargers)

    #generate datapoints for end index
    data = jsonFetch(distance, endLatitude, endLongitude)
    x, requestList = jsonParsingIntoRequestList(requestList,data,x, suppportedChargers)

    return requestList



def main(startLatitude, startLongitude, endLatitude, endLongitude, maxDistance, supportedChargers):
    requestList = requestGenerator(startLatitude,startLongitude,endLatitude,endLongitude, supportedChargers)
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
    if shortestPath==None:
        return None
    waypoints = []
    waypoints.append([requestList[0][0],requestList[0][1],None,None])
    for point in shortestPath:
        if point != "start" and point != "end":
            waypoints.append([requestList[int(point)+1][0],requestList[int(point)+1][1],requestList[int(point)+1][3],requestList[int(point)+1][4]])
            print(requestList[int(point)+1])
    waypoints.append([requestList[1][0],requestList[1][1],None,None])
    print(waypoints)
    return waypoints
#current Inputs
startLatitude = 39.5
startLongitude = -121.9
endLatitude = 40
endLongitude = -121
maxDistance = 100
supportedChargers = []
waypoints = main(startLatitude,startLongitude,endLatitude,endLongitude,maxDistance,supportedChargers)
#https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=longtitude,latitude&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=YOUR_API_KEY