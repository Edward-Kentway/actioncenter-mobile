/**
 * Tests for the notification route handlers.
 */

var assert = require('assert');

var models = require('../../db/models');
var serverRoutes = require('../../routes/routes');
var server = require('../../server');

describe('NotificationRouteHandlers', function() {

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
        });
    });
  });

  it('should get a notification from the database', function(done) {
    done();
  });

  it('should get a list of notifications from the database', function(done) {
    done();
  });

});
