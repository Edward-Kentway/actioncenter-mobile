/**
 * Route handlers for all notification routes.
 */

var models = require('../db/models');

var addNotification = function(request, reply) {
  models.Notifications
    .build(request.payload)
    .save()
    .success(function(notification) {
      // TODO(leah): Update this to return something that's not exposing the private db id
      reply({notificationId: notification.notificationId});
    })
    .error(function(err) {
      console.log('failed to add notification: ' + err);
      // TODO(leah): raise a 500
    });
};


var getNotification = function(request, reply) {

};


var getNotifications = function(request, reply) {

};


module.exports.addNotification = addNotification;
module.exports.getNotification = getNotification;
module.exports.getNotifications = getNotifications;
