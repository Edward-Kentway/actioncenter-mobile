/**
 * Base application definition for the Push Notification App.
 */

var formController = require('./form_controller');
require('../templates/templates');

var pushNotificationApp = angular.module('PushNotificationApp', ['pushNotification.templates']);
pushNotificationApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
});

// Set up all application controllers
pushNotificationApp.controller('PushNotificationFormController', formController);
