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
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <!-- Page Layout here -->\n    <div class=\"row\">\n\n      <div class=\"full-height col s12 m3 l2 grey darken-3\">\n        <div class=\"content-wrapper\">\n          <h4>Plan Route</h4>\n          <form>\n          <div class=\"row\">\n             <form class=\"col s12\">\n               <div class=\"row\">\n                 <div class=\"input-field col s12\">\n                   <input id=\"src\" type=\"text\">\n                   <label for=\"src\">Start</label>\n                 </div>\n                 <div class=\"input-field col s12\">\n                   <input id=\"dest\" type=\"text\">\n                   <label for=\"dest\">Destination</label>\n                 </div>\n               </div>\n             </form>\n             <a class=\"waves-effect waves-light btn center-align\">Search</a>             \n           </div>\n\n          </form>\n        </div>\n      </div>\n\n      <div class=\"full-height col s12 m8 l10 grey darken-4\">\n      </div>\n\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map