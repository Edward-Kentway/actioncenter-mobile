/**
 * Handlers for dealing with subscribing devices and deleting subscriptions.
 */

var models = require('../models');

module.exports.deleteSubscription = function(request, reply) {
  var deviceId = request.params.deviceId;

  models.Subscriptions
    .find({where: {deviceId: deviceId}})
    .success(function(subscription) {
      if (subscription) {
        subscription
          .destroy()
          .success(function() {
            reply({deleted: true});
          })
          .error(function(err) {
            console.log(err);
            // TODO(leah): Raise a 500
          });
      } else {
        reply('no subscription found for deviceId: ' + deviceId).code(404);
      }
    })
    .error(function() {
      // TODO(leah): raise a 500
    });
};


module.exports.addSubscription = function(request, reply) {
  models.Subscriptions
    .findOrCreate({deviceId: request.payload.deviceId}, request.payload)
    .success(function(subscription, created) {
      reply({
        channel: subscription.channel,
        language: subscription.language,
        deviceId: subscription.deviceId
      }).code(created ? 200 : 201);
    })
    .error(function(error) {
      // TODO(leah): raise a 500
    });
};
