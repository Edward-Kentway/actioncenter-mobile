/**
 * Mocha setup.
 */

var async = require('async');
var db = require('../db/db');
var dbUtils = require('../db/db_utils');
var models = require('../db/models');

before(function(done) {
  var syncComplete = function() {
    async.parallel(
      [populateSubscriptionData, populateNotificationData],
      function(err, results) {
        done();
      }
    );
  };

  var syncError = function(error) {
    console.log('Unable to synchronize database: ' + error);
  };

  dbUtils.syncDatabase(syncComplete, syncError);
});


var populateSubscriptionData = function(done) {
  var sampleSub = {channel: 'APNS',language: 'en', deviceId: 'test_device_id'};
  models.Subscriptions.build(sampleSub).save().success(function(subscription) {
    done();
  });
};


var populateNotificationData = function(done) {
  models.Notifications.sync().success(function() {
    done();
  });
};
