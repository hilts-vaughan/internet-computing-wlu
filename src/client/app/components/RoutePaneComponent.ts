import {Component} from 'angular2/core';
import {RouteRequest} from '../models/RouteRequest'
import {MaterialPlacesAutocomplete} from './MaterialPlacesAutocomplete';
import {DropdownComponent} from './DropdownComponent';
import {CarService} from '../services/CarService';

@Component({
  selector: 'pane',
  directives: [MaterialPlacesAutocomplete, DropdownComponent],
  providers: [CarService],
  template: `
    <div id="info-pane">
    <div class="content-wrapper center-align">
      <h4 style="center">Plan Route</h4>
      <form>
      <div class="row center-align">
         <form class="col s12">
           <div class="row">
             <places-input labelText="Start" (placeChanged)="newPlace(value)" ></places-input>
             <places-input labelText="Destination" (placeChanged)="newPlace(value)" ></places-input>
            <dropdown [collection]="carNames" labelText="Car Make" (optionSelected)="selected($event)"></dropdown>
            <dropdown [collection]="carModels" labelText="Car Model" (optionSelected)="selected($event)"></dropdown>
           </div>
         </form>
         <a (click)="beginSearch()" class="material-icons waves-effect waves-light btn center">Search</a>
       </div>
      </form>
    </div>
    </div>

  `
})

export class Pane {

  searchRequest : RouteRequest = new RouteRequest();
  carNames = ["Audi", "Tesla", "Geo Suck", 'Miata', 'Nissan', 'Noob']
  carModels = ["S", "Volt", "X", "Model S"]

  constructor(carService : CarService) {
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
    console.log('Index for car was selected: ')
  }

}
