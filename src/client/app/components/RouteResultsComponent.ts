/**
 * Implements a material dropdown which enables us to be able to have elements
 * selected and changed at will.
 */

import {Component, Output, Input, EventEmitter, ElementRef, Renderer} from 'angular2/core';

@Component({
    selector: 'route-results',
    providers: [],
    template: `
    <div class="content-wrapper center-align">
      <h4 style="center">Stops</h4>
      <div id="route-results">
        <div class="content-wrapper">
        <ul class="collection grey darken-3" style="border: none !important;">
          <li *ngFor="#result of results" class="collection-item avatar grey darken-3" style="border-bottom: 1px dashed lightgray !important;">
            <img src="img/marker.png" alt="" class="circle">
            <span class="title">{{result}}</span>
            <p>786 Elgin Street North, Cambridge, ON<br>
            </p>
          </li>
        </ul>
        </div>
      </div>
    </div>
    `
})

export class RouteResultsComponent {
  results : Array<String> = ["Everything Is Awesome", "Charging Station #2", "Charging Station #3", "Fu Exception", "Elemental Eradicate"]
  constructor(public elementRef: ElementRef, public renderer: Renderer) {

  }
}
