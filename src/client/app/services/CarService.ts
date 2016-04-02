import {Inject} from 'angular2/core';
import {Http, HTTP_BINDINGS} from 'angular2/http';

export class CarService {
  constructor(@Inject(Http) http:Http) {
    // do some http magic
  }

  /**
   * Fetches all cars from a remote server and then submits them
   * @return {[type]} [description]
   */
  fetchAllCars() {

  }

}
