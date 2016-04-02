import googlemaps
from datetime import datetime
import requests
import json

def googleMapsActualPath(positionList,path):
    actualDistances = []
    if None not in path and len(path)>2:
        pathIndex = 1

        url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +str(positionList[0][0])+","+str(positionList[0][1])+"&destinations="+str(positionList[int(path[pathIndex])+1][0])+"%2C"+str(positionList[int(path[pathIndex])+1][1])+"&key=AIzaSyB-hn6btafEpxn9e74C9Djkv7fzLwzpYh4"
        print(url)
        r = requests.get(url,None)
        data = json.loads(r.text)
        actualDistances.append(data['rows'][0]['elements'][0]['distance']['value'])
        while (pathIndex<len(path)-2):
            url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+str(positionList[int(path[pathIndex])+1][0])+","+str(positionList[int(path[pathIndex])+1][1])+"&destinations="+str(positionList[int(path[pathIndex+1])+1][0])+"%2C"+str(positionList[int(path[pathIndex+1])+1][1])+"&key=AIzaSyB-hn6btafEpxn9e74C9Djkv7fzLwzpYh4"
            print(url)
            pathIndex+=1
            r = requests.get(url,None)
            data = json.loads(r.text)
            actualDistances.append(data['rows'][0]['elements'][0]['distance']['value'])
        url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+str(positionList[int(path[pathIndex])+1][0])+","+str(positionList[int(path[pathIndex])+1][1])+"&destinations="+str(positionList[1][0])+"%2C"+str(positionList[1][1])+"&key=AIzaSyB-hn6btafEpxn9e74C9Djkv7fzLwzpYh4"
        r = requests.get(url,None)
        data = json.loads(r.text)
        actualDistances.append(data['rows'][0]['elements'][0]['distance']['value'])
    elif len(path)==2:
        url="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=" +str(positionList[0][0])+","+str(positionList[0][1])+"&destinations="+str(positionList[1][0])+"%2C"+str(positionList[1][1])+"&key=AIzaSyB-hn6btafEpxn9e74C9Djkv7fzLwzpYh4"
        print(url)
        r = requests.get(url,None)
        data = json.loads(r.text)
        actualDistances.append(data['rows'][0]['elements'][0]['distance']['value'])

    return actualDistances





