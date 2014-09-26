/**
 * Test for the local server route handlers.
 */

var assert = require('assert');

var models = require('../db/models');
var serverRoutes = require('../routes/routes');
var server = require('../server');

describe('RouteHandlers', function() {
  describe('#subscriptions', function() {

    var sampleSub = {channel: 'APNS',language: 'en', deviceId: 'a'};

    before(function(done){
      models.Subscriptions.build(sampleSub).save().success(function(subscription) {
        done()
      });
    });

    var validSubscription = {
      channel: 'APNS',
      language: 'en',
      deviceId: 'pretenddevicetoken'
    };
    var addSubscriptionOptions = {
      method: 'POST', url: serverRoutes.makePrefixedPath('subscriptions'), payload: validSubscription};

    it('should add a subscription to the database', function(done) {
      server.inject(addSubscriptionOptions, function(response) {

        assert(200, response.statusCode);

        models.Subscriptions
          .find({where: {subscriptionId: 1}})
          .success(function(subscription) {
            assert.notEqual(null, subscription);
            done();
          })
      });
    });

    it('should not add a new subscription to the database', function(done) {
      server.inject(addSubscriptionOptions, function(response) {
        assert(201, response.statusCode);
        done();
      });
    });

    it('should delete a subscription from the database', function(done) {
      var deleteSubscriptionOptions = {
        method: 'DELETE', url: serverRoutes.makePrefixedPath('subscriptions', sampleSub.deviceId)};
      server.inject(deleteSubscriptionOptions, function(response) {
        models.Subscriptions
          .find({where: {deviceId: sampleSub.deviceId}})
          .success(function(subscription) {
            assert.equal(null, subscription);
            done();
          })
      });
    });

  });


  describe('#notifications', function() {
    it('should add a notification to the database', function(done) {
      var validNotification = {title: 'title', message: 'message'};
      var addNotificationOptions = {
        method: 'POST', url: serverRoutes.makePrefixedPath('notifications'), payload: validNotification};

      server.inject(addNotificationOptions, function(response) {
        models.Notifications
          .find({where: {notificationId: 1}})
          .success(function(notification) {
            assert.notEqual(null, notification);
            done();
          })
      });
    });
  });

});
