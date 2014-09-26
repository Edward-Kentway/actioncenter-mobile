/**
 * Database access.
 */

var sequelize = require('sequelize');

var dbConfig = require('config').get('DATABASE');

var db = new sequelize(
  dbConfig.get('DB_NAME'), dbConfig.get('USERNAME'), dbConfig.get('PASSWORD'),
  dbConfig.get('OPTIONS'));

module.exports = db;
