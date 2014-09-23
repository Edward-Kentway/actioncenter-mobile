/**
 * Controller for the push notification form.
 */

var PushNotificationFormController = function($scope) {

  // TODO(leah): Link this up via a constants service
  $scope.projectName = 'test';

  // Set up an initial empty notification
  $scope.notification = {};

  $scope.formPageIndex = 0;

};

module.exports = PushNotificationFormController;
