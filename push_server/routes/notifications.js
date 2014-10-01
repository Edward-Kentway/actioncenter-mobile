/**
 * Route handlers for all notification routes.
 */

var hapi = require('hapi');

var models = require('../db/models');

var addNotification = function(request, reply) {
  models.Notifications
    .build(request.payload)
    .save()
    .on('success', function(notification) {
      // TODO(leah): Update this to return something that's not exposing the private db id
      reply(notification.externalize());
    })
    .on('error', function(err) {
      hapi.error.internal('unable to add the notification', err);
    });
};


var getNotification = function(request, reply) {
  models.Notifications
    .find({where: {notificationId: request.notificationId}})
    .on('success', function(notification) {
      reply(notification.values);
    })
    .on('error', function(err) {
      console.log('----------------');
//            hapi.error.internal('unable to add the notification', err);
      hapi.error.notFound('notification not found');
    });
};


var getNotifications = function(request, reply) {

};


module.exports.addNotification = addNotification;
module.exports.getNotification = getNotification;
module.exports.getNotifications = getNotifications;
