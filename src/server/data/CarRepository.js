'use strict'

var Car = require('../model/Car')

/**
 * Represents a unit of work for electric cars to be loaded.
 */
class CarRepository {
  // PREPARED STATEMENTS
  //
  constructor(connection) {
    this.connection = connection
  }

  /**
   * Fetches a car by the ID it is given.
   * @param  {Number} id The numeric ID that is given to the car that you want to fetch.
   * @return {[type]}    [description]
   */
  getById(id, callback) {
    this.connection.query('SELECT c.name, c.distance, a.ChargerId as chargerType FROM cars AS c INNER JOIN charger AS a ON a.CarId = c.CarId WHERE ID=? LIMIT 1;', [id], (error, rows) => {
        // Only expect to get one row back per ID
        callback(new Car(rows[0]))
    })
  }

  getAllCars(callback) {    
    this.connection.query("SELECT * FROM cars AS c INNER JOIN charger AS a ON a.CarId = c.CarId", (error, rows) => {
      if(error) {
        callback(null)
        return
      }
      callback(_rowsToCollection(rows))
    })
  }

  _rowsToCollection(rows) {
    var results = []
    rows.forEach((row) => {
        results.push(new Car(row))
    })
    return results
  }

}

module.exports = CarRepository
