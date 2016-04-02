'use strict'

var CarRepository = require('../data/CarRepository')
var pool = require('../data/DatabasePool')

class CarRoute {
  constructor(server) {
    this.server = server
    this._setupRoutes()

    // Not very testable but it'll create one
    pool.getConnection((error, connection) => {
      if(error) {
        console.log('Failed to acquire a connection; aborting...')
        console.log(error)
        return
      }
      this.carRepo = new CarRepository(connection)
    })
  }

  _setupRoutes() {
    this.server.get('/cars', (request, resource, next) => {
      this.carRepo.getAllCars((cars) => {
        if(cars != null) {
          resource.send({cars: cars})
        } else {
          resource.send({
            status: 500,
            error: "Failure"
          })
        }
      })
    })
  }
}

module.exports = CarRoute
