/**
 * Utility functions for working with model objects.
 */

var models = require('./models');

var deleteSubscription = function(deviceId, success, error) {

  var recordFound = function(subscription) {
    if (subscription) {
      subscription
        .destroy()
        .success(function() {
          success(true);
        })
        .error(function(err) {
          error(err);
        });
    } else {
      success(false);
    }
  };

  var fetchError = function(err) {
    error(err);
  };

  models.Subscriptions
    .find({where: {deviceId: deviceId}})
    .success(recordFound)
    .error(fetchError);
};

module.exports.deleteSubscription = deleteSubscription;
