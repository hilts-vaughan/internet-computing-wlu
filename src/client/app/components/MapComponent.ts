/**
 * Houses a map component.
 */

import {Component} from 'angular2/core';
import {Http, HTTP_BINDINGS} from 'angular2/http';

@Component({
  selector: 'map',
  providers: [HTTP_BINDINGS],
  template: `
    <div id="map">
      <b>Hello world!</b>
    </div>
  `
})

export class Map {
  // The current map style object
  _mapStyle : Object = {};
  _httpService : Http

  constructor(public http: Http) {
    this._httpService = http
  }

  ngAfterContentInit() {
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
  _setupMap() {
    var map = new window["GMaps"] ({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    map.addStyle({
        styledMapName:"Styled Map",
        styles: this._mapStyle['styles'],
        mapTypeId: "default"
    });
    map.setStyle("default");
  }
}
