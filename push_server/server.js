/**
 * Core server implementation for the push server.
 */

var apn = require('apn');
var hapi = require('hapi');
var pushUtils = require('./push_utils');
var serverConfig = require('config').get('SERVER');

var db = require('./db');

var server = new hapi.Server(serverConfig.URL, serverConfig.PORT);
server.route(require('./routes/routes').routes);

pushUtils.configureAPNSFeedback();

module.exports = server;
