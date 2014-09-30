/**
 * Handlers for dealing with subscribing devices and deleting subscriptions.
 */

var models = require('../db/models');
var modelUtils = require('../db/model_utils');

module.exports.deleteSubscription = function(request, reply) {
  var deviceId = request.params.deviceId;

  var success = function(subscriptionDeleted) {
    if (subscriptionDeleted) {
      reply({deviceId: deviceId, deleted: true});
    } else {
      reply({deviceId: deviceId, deleted: false}).code(404);
    }
  };

  var error = function() {
    // TODO(leah): Figure out how to deal with the 500
    // reply({deleted: false});
  };

  modelUtils.deleteSubscription(deviceId, success, error);
};


module.exports.addSubscription = function(request, reply) {
  models.Subscriptions
    .findOrCreate({where: {deviceId: request.payload.deviceId}}, request.payload)
    .success(function(subscription, created) {
      reply({
        channel: subscription.channel,
        language: subscription.language,
        deviceId: subscription.deviceId
      }).code(created ? 200 : 201);
    })
    .error(function(error) {
      // TODO(leah): raise a 500
      console.log('ADD SUB ERROR: ' + error);
    });
};
