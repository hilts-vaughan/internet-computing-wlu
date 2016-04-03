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
  getModelsForCarId(id, callback) {
    this.connection.query("SELECT m.model_id, m.name, m.range_km, m.year FROM model AS m WHERE car_id =?", [id], (error, rows) => {
      callback(rows)
    })
  }

  /**
   * Fetches a specific model ID from server and fetches the range
   * @param  {[type]}   id       [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getModelById(id, callback) {
    console.log(id)
    this.connection.query("SELECT m.range_km FROM model AS m WHERE model_id =?", [id], (error, rows) => {
      this.connection.query("SELECT charger_id FROM model_charger WHERE model_id=?", [id], (error, chargerRows) => {
        // Build charger types
        var chargerList = []
        chargerRows.forEach((charger) => {
            chargerList.push(charger.charger_id)
        })

        // Now build the object completely
        var result = {
          chargerTypes: chargerList,
          distance: rows[0].range_km
        }

        // Get the model object
        callback(result)
      })
    })
  }

  getAllCars(callback) {
    this.connection.query("SELECT c.id, c.name FROM car AS c", (error, rows) => {
      if(error) {
        console.log(error)
        callback(null)
        return
      }
      callback(this._rowsToCollection(rows))
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
