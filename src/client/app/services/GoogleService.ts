import {Inject} from 'angular2/core';
import {ServiceConfig} from './ServiceConfig';
import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Point} from '../models/Point'

export class GoogleService {
  constructor(@Inject(Http) public http : Http) {

  }



  /**
   * Gets a point from the address string given
   * @param  {String} address [description]
   * @return {[type]}         [description]
   */
  getPointFromAddressString(address : string, callback : Function)  {
    var GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) +  "+CA&key=" + ServiceConfig.API_KEY
    this.http.get(GEOCODE_URL).map(res => res.json()).subscribe(
      error => callback(error),
      data => callback(data)
    )
  }

  // This may require implementing to get everything down to spec
  _scrubPointFromGeometry() {

  }

}
