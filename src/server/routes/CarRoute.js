'use strict'

var CarRepository = require('../data/CarRepository')
var MapRouteService = require('../service/MapRouteService')
var RemoteExecutionService = require('../service/RemoteExecutionService')
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
      this.mapService = new MapRouteService(new RemoteExecutionService())
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

    this.server.post('/cars/model', (request, resource, next) => {
      this.carRepo.getModelsForCarId(request.body.id, (models) => {
          if(models != null) {
            resource.send({models: models})
          } else {
            resource.send({status: 500, error: "Failure"})
          }
      })
    })

    this.server.post('/route/search', (request, resource, next) => {
      this.carRepo.getModelById(request.body.modelId, (model) => {
        var searchRequest = Object.assign(model, request.body)
        this.mapService.getPossibleRoute(searchRequest, (result) => {
          if(result) {
            resource.send(result)
          }
          else {
            // Hack the waypoints :D
            resource.send({waypoints: null})
          }
        })
      })
    })

  } // end of route posting
}

module.exports = CarRoute
