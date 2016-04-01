'use strict'

var ChargerType = require('ChargerType')

class Car {
  constructor(attributes) {
    // Copy attributes into itself where needed... TODO since this is dangerous
    Object.assign(this, attributes)
  }

  getName() {
    return this.name
  }

  getMaximumDistance() {
    return this.distance
  }

  getChargerType() {
    return this.chargerType
  }
}

module.exports = Car
