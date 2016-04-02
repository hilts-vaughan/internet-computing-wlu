'use strict'

class CarRoute {
  constructor(server) {
    this.server = server
    this._setupRoutes()
  }

  setup() {
    this.server.get('/cars', (request, resource, next) => {
      // Do something with the cars where possible
    })
  }
}
