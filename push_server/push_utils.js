/**
 * Utility functions for helping with push notifications.
 */

var apn = require('apn');
var pushConfig = require('config').get('PUSH');

var configureAPNSFeedback =  function() {

  // TODO(leah): update this once certs are available.
  return;

  var options = {
    'batchFeedback': true,
    'interval': pushConfig.get('APNS_FEEDBACK_INTERVAL')
  };

  // Configure the APNS feedback service
  var feedback = new apn.Feedback(options);
  feedback.on('feedback', function(devices) {
    devices.forEach(function(item) {
      // Do something with item.device and item.time;
    });
  });
};

var pruneAndroidDeviceId = function() {

};

module.exports.pruneAndroidDeviceId = pruneAndroidDeviceId;
module.exports.configureAPNSFeedback = configureAPNSFeedback;
