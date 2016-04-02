/**
 * Houses a map component.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_BINDINGS} from 'angular2/http';
// import {LocationService} from './../services/LocationService'

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

  // Tracks whether or not the map finished loading initially
  private _isFinishedLoading : boolean = false

  constructor(http: Http) {
    this._httpService = http
  }

  setLocationOnMap(position) {
    // this._googleMap.setCenter(position.latitude, position.longitude);
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
        this._isFinishedLoading = true
      }
    });
  }
}
