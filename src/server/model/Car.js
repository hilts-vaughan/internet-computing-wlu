'use strict'

var ChargerType = require('./ChargerType')

class Car {
  constructor(attributes) {
    // Copy attributes into itself where needed... TODO since this is dangerous
    Object.assign(this, attributes)

    // TODO: Maybe do something else with the tuples, as well?
  }

  getId() {
    return this.id
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
