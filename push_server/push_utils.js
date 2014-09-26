/**
 * Utility functions for helping with push notifications.
 */

var apn = require('apn');

var credentials = require('config').get('CREDENTIALS');
var pushConfig = require('config').get('PUSH');

var configurePushServices = function() {
  configureAPNSFeedback();
};

var configureAPNSFeedback = function() {

  var options = {
    'key': credentials.get('APNS').get('KEY_FILE'),
    'cert': credentials.get('APNS').get('CERT_FILE'),
    'batchFeedback': true,
    'interval': pushConfig.get('APNS_FEEDBACK_INTERVAL')
  };

  var feedback = new apn.Feedback(options);
  feedback.on('feedback', function(devices) {
    devices.forEach(function(item) {
      // TODO(leah): Prune the device from our db
    });
  });
};

var pruneAndroidDeviceId = function() {

};

module.exports.configurePushServices = configurePushServices;
module.exports.pruneAndroidDeviceId = pruneAndroidDeviceId;
