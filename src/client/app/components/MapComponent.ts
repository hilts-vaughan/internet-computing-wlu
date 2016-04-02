/**
 * Houses a map component.
 */

import {Component, Input, Output} from 'angular2/core';
import {Http, HTTP_BINDINGS} from 'angular2/http';

import {RouteReceipt} from '../models/RouteReceipt'
import {Point} from '../models/Point'

@Component({
  selector: 'map',
  providers: [HTTP_BINDINGS],
  template: `
    <div class="map-wrapper">
      <div id="map">
        <b>Your browser does not support Javascript.</b>
      </div>
    </div>
  `
})

export class Map {
  // The current map style object
  private _mapStyle : Object = {};
  private _googleMap : any
  private _httpService : Http

  // This is used for
  @Input() routeReceipt : RouteReceipt = null


  constructor(http: Http) {
    this._httpService = http
  }

  ngOnChanges(changes: {[propName: string]: any}) {
     if(changes['routeReceipt']) {
       if(this.routeReceipt != null) {
         var start = this.routeReceipt.first
         var end = this.routeReceipt.last

         var options = {
            origin: [start.lat, start.long],
            destination: [end.lat, end.long],
            waypoints: this._toWaypoints(this.routeReceipt.waypoints),
            travelMode: 'driving',
            strokeColor: '#131540',
            strokeOpacity: 0.6,
            strokeWeight: 6
          }

         this._googleMap.drawRoute(options);

          this.routeReceipt.waypoints.forEach((waypoint) => {
            this._googleMap.addMarker({
              lat: waypoint.lat,
              lng: waypoint.long,
              title: 'Charging Station'
            });
          })
          // Center the map on where we're going
          this._googleMap.setCenter(start.lat, start.long)
       }
     }
   }

   _toWaypoints(points : Array<Point>) {
     var results = []
     points.forEach((point) => {
       var result = {
         stopover: true,
         location: new window['google'].maps.LatLng(point.lat, point.long),
       }
       results.push(result)
     })
     return results
   }

  ngAfterViewInit() {
    this._httpService.get('assets/styles.json')
      .map(res => res.json())
      .subscribe(
        error => this._mapStyle = error,
        data => this._mapStyle = data,
        () => {
          this._setupMap()
        }
      );
  }

  // MARK: Encapsulates the GMaps.js functionality
  private _setupMap() {
    var map = new window["GMaps"] ({
        div: '#map',
        lat: 0,
        lng: 0
    });

    // Save a reference to this map
    this._googleMap = map

    map.addStyle({
        styledMapName:"Styled Map",
        styles: this._mapStyle['styles'],
        mapTypeId: "default"
    });

    map.setStyle("default");


    window['GMaps'].geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
      },
      error: function(error) {
        map.setCenter(-12.043333, -77.028333);
      },
      not_supported: function() {
      },
      always: () => {

      }
    });
  }
}
