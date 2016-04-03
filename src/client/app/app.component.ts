/**
 * This file is the main component which houses our two basic views on a high
 * level for getting things done. This will house mostly the InfoComponent
 * and the actual MapComponent for ourselves.
 */

import {Component} from 'angular2/core';
import {Map} from './components/MapComponent'
import {Pane} from './components/RoutePaneComponent';
import {SearchService} from './services/SearchService'
import {RouteResultsComponent} from './components/RouteResultsComponent'
import {RouteRequest} from './models/RouteRequest';
import {RouteReceipt} from './models/RouteReceipt';
import {Point} from './models/Point'

@Component({
    selector: 'my-app',
    directives: [Map, Pane, RouteResultsComponent],
    providers: [SearchService],
    template: `
    <!-- Page Layout here -->
    <div class="row">
      <div class="full-height col s12 m5 l3 grey darken-3">
        <pane [search]="_search" (searchInvoked)="beginSearch($event)"></pane>
        <route-results [routeReceipt]="_receipt"></route-results>
      </div>
      <div class="full-height col s12 m7 l9 grey darken-4">
        <map [routeReceipt]="_receipt">
        </map>
      </div>
    </div>
    `
})

export class AppComponent {
  // Can probably feed some waypoint data into it and force a change, but for now...
  private _receipt : RouteReceipt
  private _search : boolean = false

  constructor(public searchService : SearchService) {

  }

  beginSearch(request : RouteRequest) {

    var isValid = request.validate()
    // TODO: Spawn a proper modal to make things look less shitty
    if(!isValid) {
      alert("Please ensure all fields are filled in")
      return
    }

    this._search = true
    this.searchService.performSearchWithRequest(request, (receipt) => {
      if(receipt != null) {
        this._receipt = receipt
      } else {
        alert("No route could be found.")
      }
      this._search = false
    })
  }
}
