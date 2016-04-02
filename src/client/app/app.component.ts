/**
 * This file is the main component which houses our two basic views on a high
 * level for getting things done. This will house mostly the InfoComponent
 * and the actual MapComponent for ourselves.
 */

import {Component} from 'angular2/core';
import {Map} from './components/MapComponent'
import {Pane} from './components/RoutePaneComponent';

@Component({
    selector: 'my-app',
    directives: [Map, Pane],
    providers: [],
    template: `
    <!-- Page Layout here -->
    <div class="row">
      <div class="full-height col s12 m3 l2 grey darken-3">
      <pane>
      </pane>
      </div>
      <div class="full-height col s12 m8 l10 grey darken-4">
        <map>
        </map>
      </div>
    </div>
    `
})

export class AppComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() {

  }
}
