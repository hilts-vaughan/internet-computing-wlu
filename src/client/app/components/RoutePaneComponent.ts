import {Component} from 'angular2/core';
import {RouteRequest} from '../models/RouteRequest'
import {MaterialPlacesAutocomplete} from './MaterialPlacesAutocomplete';

@Component({
  selector: 'pane',
  directives: [MaterialPlacesAutocomplete],
  template: `
    <div id="info-pane">
    <div class="content-wrapper">
      <h4>Plan Route</h4>
      <form>
      <div class="row">
         <form class="col s12">
           <div class="row">
             <places-input labelText="Start" (placeChanged)="newPlace(value)" ></places-input>
             <places-input labelText="Destination" (placeChanged)="newPlace(value)" ></places-input>

             <div class="input-field col s12">
               <select>
                 <option value="1">Vroom</option>
                 <option value="2">Vroom Vroom</option>
                 <option value="3">Vroom Vroom Vroom</option>
               </select>
               <label>Car Model</label>
             </div>

           </div>
         </form>
         <a (click)="beginSearch()" class="waves-effect waves-light btn center-align">Search</a>
       </div>
      </form>
    </div>
    </div>
  `
})

export class Pane {

  searchRequest : RouteRequest = new RouteRequest();

  constructor() {

  }

  // ngAfterContentInit is used to initialize the component inside
  // for the fancy selections
  ngAfterContentInit() {
    // window['$']('select').material_select();
  }

  beginSearch() {
    console.log(this.searchRequest)
  }

  newPlace(value) {
  }

}
