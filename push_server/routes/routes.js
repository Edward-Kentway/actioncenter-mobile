/**
 * Routing file for handling inbound requests.
 */

var path = require('path');

var notifications = require('./notifications');
var subscriptions = require('./subscriptions');
var notificationValidation = require('../validation/notifications');
var subscriptionValidation = require('../validation/subscriptions');

var API_VERSION = '1';
var API_PREFIX = '/api/' + API_VERSION;

var makePrefixedPath = function() {
  var args = Array.prototype.slice.call(arguments);
  args.splice(0, 0, API_PREFIX);

  return path.join.apply(null, args);
};

var staticRoutes = [

  {
    method: 'GET',
    path: '/{filename}',
    handler: {
      file: function(request) {
        return request.params.filename;
      }
    }
  }

];

var templateRoutes = [

  {
    method: 'GET',
    path: '/create_notification',
    handler: function (request, reply) {
      reply.view('index', {title: 'TODO'});
    }
  }

];

var apiRoutes = [

  {
    method: 'POST',
    path: makePrefixedPath('notifications'),
    handler: notifications.addNotification,
    config: {
      validate: {
        payload: function(value, options, next) {
          notificationValidation.validateNotification(value, function(err) {
            next(err, value);
          });
        }
      }
    }
  },

  {
    method: 'POST',
    path: makePrefixedPath('subscriptions'),
    handler: subscriptions.addSubscription,
    config: {
      validate: {
        payload: function(value, options, next) {
          subscriptionValidation.validateSubscriptions(value, function(err) {
            next(err, value);
          });
        }
      }
    }
  },

  {
    method: 'DELETE',
    path: makePrefixedPath('subscriptions/{deviceId}'),
    handler: subscriptions.deleteSubscription
  }

];

module.exports.makePrefixedPath = makePrefixedPath;
module.exports.routes = [].concat(staticRoutes, templateRoutes, apiRoutes);
