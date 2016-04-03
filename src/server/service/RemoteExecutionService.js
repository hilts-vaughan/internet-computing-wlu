'use strict'

var assert = require('chai').assert
var zerorpc = require("zerorpc");
var config = require('config')
var util = require('util')

/**
 * Offers a way to fetch results from a remote server. Uses a ZeroMQ backend
 * with a zeroRPC library for the remote execution.
 */
class RemoteExecutionService {
  constructor() {
    this.client = new zerorpc.Client({ timeout: 60, heartbeatInterval: 60000 });

    var workerConfig = config.get('workers')
    var SERVER_URL = util.format('tcp://%s:%s', workerConfig.host, workerConfig.port)
    this.client.connect(SERVER_URL);
  }

  /**
   * Invokes a method async with object parameters, returning an object
   * as the result.
   * @param  {[type]}   methodName [The method to invoke on the remote service]
   * @param  {[type]}   params     [The parameters to pass (an object) to the remote service]
   * @param  {Function} callback   [A callback to return your results to when this service is finished]
   */
  invokeAsyncJsonMethod(methodName, params, callback) {
    assert.isNotNull(this.client)
    assert.isObject(params)

    this.client.invoke(methodName, JSON.stringify(params), function(error, result) {
      if(error) {
        throw error
      }

      var returnResult = JSON.parse(result)
      callback(returnResult)
    });

  }
}

module.exports = RemoteExecutionService
