/**
 * Mocha setup.
 */

var async = require('async');
var db = require('../db/db');
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

  syncDatabase(syncComplete);
});

var syncDatabase = function(done) {
  db
    .sync()
    .success(function() {
      done();
    })
    .error(function(error) {
      console.log('Unable to synchronize database: ' + error);
    });
};

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
