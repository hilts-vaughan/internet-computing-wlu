/**
 * This is a database pool. There's not much here except returning MySQL instances
 * where it is required.
 */

var mysql = require('mysql');
var config = require('config');

var dbConfig = config.get('db')
var pool  = mysql.createPool({
  host     : dbConfig.host,
  user     : dbConfig.username,
  password : dbConfig.password
});

// Exports the pool to ourselves
module.exports = pool
