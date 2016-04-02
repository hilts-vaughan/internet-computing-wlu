System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Pane;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Pane = (function () {
                function Pane() {
                }
                // ngAfterContentInit is used to initialize the component inside
                // for the fancy selections
                Pane.prototype.ngAfterContentInit = function () {
                    window['$']('select').material_select();
                };
                Pane = __decorate([
                    core_1.Component({
                        selector: 'pane',
                        template: "\n    <div id=\"info-pane\">\n    <div class=\"content-wrapper\">\n      <h4>Plan Route</h4>\n      <form>\n      <div class=\"row\">\n         <form class=\"col s12\">\n           <div class=\"row\">\n             <div class=\"input-field col s12\">\n               <input id=\"src\" type=\"text\">\n               <label for=\"src\">Start</label>\n             </div>\n             <div class=\"input-field col s12\">\n               <input id=\"dest\" type=\"text\">\n               <label for=\"dest\">Destination</label>\n             </div>\n\n             <div class=\"input-field col s12\">\n               <select>\n                 <option value=\"1\">Vroom</option>\n                 <option value=\"2\">Vroom Vroom</option>\n                 <option value=\"3\">Vroom Vroom Vroom</option>\n               </select>\n               <label>Car Model</label>\n             </div>\n\n           </div>\n         </form>\n         <a class=\"waves-effect waves-light btn center-align\">Search</a>\n       </div>\n      </form>\n    </div>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Pane);
                return Pane;
            }());
            exports_1("Pane", Pane);
        }
    }
});
//# sourceMappingURL=RoutePaneComponent.js.map