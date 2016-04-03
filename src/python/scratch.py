import main


startLatitude = 39.5
startLongitude = -121.9
endLatitude = 40
endLongitude = -121
maxDistance = 100
supportedChargers = []
waypoints = main.main(startLatitude,startLongitude,endLatitude,endLongitude,maxDistance,supportedChargers)
print(waypoints)