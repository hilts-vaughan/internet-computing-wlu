import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    <!-- Page Layout here -->
    <div class="row">

      <div class="full-height col s12 m3 l2 grey darken-3">
        <div class="content-wrapper">
          <h4>Plan Route</h4>
          <form>
          <div class="row">
             <form class="col s12">
               <div class="row">
                 <div class="input-field col s12">
                   <input id="src" type="text">
                   <label for="src">Start</label>
                 </div>
                 <div class="input-field col s12">
                   <input id="dest" type="text">
                   <label for="dest">Destination</label>
                 </div>
               </div>
             </form>
             <a class="waves-effect waves-light btn center-align">Search</a>             
           </div>

          </form>
        </div>
      </div>

      <div class="full-height col s12 m8 l10 grey darken-4">
      </div>

    </div>
    `
})
export class AppComponent { }
