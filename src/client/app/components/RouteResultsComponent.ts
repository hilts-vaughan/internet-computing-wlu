/**
 * Implements a material dropdown which enables us to be able to have elements
 * selected and changed at will.
 */

import {Component, Output, Input, EventEmitter, ElementRef, Renderer} from 'angular2/core';

@Component({
    selector: 'route-results',
    providers: [],
    template: `
    <div id="route-results">
      <div class="content-wrapper">
        <ul>
          <li *ngFor="#result of results">{{result}}</li>
        </ul>
      </div>
    </div>
    `
})

export class RouteResultsComponent {
  results : Array<String> = ["Temp Result"]
  constructor(public elementRef: ElementRef, public renderer: Renderer) {

  }
}
