System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Car;
    return {
        setters:[],
        execute: function() {
            Car = (function () {
                function Car() {
                }
                Object.defineProperty(Car.prototype, "name", {
                    /**
                     * Returns the name of this car
                     * @return {String} [description]
                     */
                    get: function () {
                        return name;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Car;
            }());
            exports_1("Car", Car);
        }
    }
});
//# sourceMappingURL=Car.js.map