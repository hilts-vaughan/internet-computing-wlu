import {Component} from 'angular2/core';
import {RouteRequest} from '../models/RouteRequest'
import {MaterialPlacesAutocomplete} from './MaterialPlacesAutocomplete';
import {DropdownComponent} from './DropdownComponent';

@Component({
  selector: 'pane',
  directives: [MaterialPlacesAutocomplete, DropdownComponent],
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
             <dropdown [collection]="carNames" labelText="Car Make" (optionSelected)="selected($event)"></dropdown>
             <div class="input-field col s12">
               <select>
                 <option selected disabled value="-1">Select an option</option>
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

  carNames = ["Audi", "Tesla", "Geo Suck", 'Miata', 'Nissan']

  constructor() {

  }

  // ngAfterContentInit is used to initialize the component inside
  // for the fancy selections
  ngAfterContentInit() {
    window['$']('select').material_select();
  }

  beginSearch() {
    console.log(this.searchRequest)
  }

  newPlace(value) {
  }

  selected(index) {
    console.log('Index for car was selected: ' + index)
  }

}
