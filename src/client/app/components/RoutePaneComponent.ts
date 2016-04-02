import {Component} from 'angular2/core';

@Component({
  selector: 'pane',
  template: `
    <div id="info-pane">
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
         <a class="waves-effect waves-light btn center-align">Search</a>
       </div>
      </form>
    </div>
    </div>
  `
})

export class Pane {
  constructor() {

  }

  // ngAfterContentInit is used to initialize the component inside
  // for the fancy selections
  ngAfterContentInit() {
    window['$']('select').material_select();
  }

}
