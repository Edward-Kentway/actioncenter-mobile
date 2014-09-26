/**
 * Route handlers for all notification routes.
 */

var models = require('../db/models');

module.exports.addNotification = function(request, reply) {
  models.Notifications
    .build(request.payload)
    .save()
    .success(function(notification) {
      // TODO(leah): Update this
      reply({notificationId: notification.notificationId});
    })
    .error(function(error) {
      // TODO(leah): raise a 500
    });
};
