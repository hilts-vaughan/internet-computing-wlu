/**
 * Houses a map component.
 */
System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var Map;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Map = (function () {
                function Map(http) {
                    this.http = http;
                    // The current map style object
                    this._mapStyle = {};
                    this._httpService = http;
                }
                Map.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this._httpService.get('assets/styles.json')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (error) { return _this._mapStyle = error; }, function (data) { return _this._mapStyle = data; }, function () {
                        _this._setupMap();
                    });
                };
                // MARK: Encapsulates the GMaps.js functionality
                Map.prototype._setupMap = function () {
                    var map = new window["GMaps"]({
                        div: '#map',
                        lat: -12.043333,
                        lng: -77.028333
                    });
                    map.addStyle({
                        styledMapName: "Styled Map",
                        styles: this._mapStyle['styles'],
                        mapTypeId: "default"
                    });
                    map.setStyle("default");
                };
                Map = __decorate([
                    core_1.Component({
                        selector: 'map',
                        providers: [http_1.HTTP_BINDINGS],
                        template: "\n    <div id=\"map\">\n      <b>Hello world!</b>\n    </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Map);
                return Map;
            }());
            exports_1("Map", Map);
        }
    }
});
//# sourceMappingURL=MapComponent.js.map