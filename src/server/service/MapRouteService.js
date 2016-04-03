'use strict'

/**
 * Provides basic services for routing, such as finding paths and the such.
 */
class MapRouteService {

  constructor(remoteExecutionService) {
    this._remoteService = remoteExecutionService
  }

  getPossibleRoute(options, callback) {
    // This is just a wrapper around the remote worker that does this logic
    this._remoteService.invokeAsyncJsonMethod('getPossibleRoute', options, (result) => {      
      callback(result)
    })
  }
}

module.exports = MapRouteService
