import {Inject} from 'angular2/core';
import {ServiceConfig} from './ServiceConfig';
import {Http, HTTP_BINDINGS} from 'angular2/http';

export class CarService {
  constructor(@Inject(Http) public http : Http) {

  }

  /**
   * Fetches all cars from a remote server and then submits them.
   * A callback is returned either way, containing the error or cars.
   * @return {[type]} [description]
   */
  fetchAllCars(callback : Function) {
    this.http.get(ServiceConfig.SERVER_URL + "/cars").map(res => res.json()).subscribe(
      error => callback(error),
      data => callback(data)
    )
  }

}
