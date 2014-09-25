/**
 * Controller for the push notification form.
 */

var PushNotificationFormController = function($scope) {

    // Support an abbreviated version of the full push options
//  title: Joi.string(),    // the message title, unused for iOS where the app name is used instead by default
//  message: Joi.string(),  // the message body
//  sound: Joi.string(),    // the name of a sound file to play, this file must be on the device (iOS only)
//  data: Joi.object(),     // a bundle of key / value pairs to include in the notification
//
//  // admin variables
//  channels: Joi.string().valid(supportedChannels).default(supportedChannels), // the channel(s) (GCM, APNS) to send to
//  mode: Joi.string().valid(['prod', 'sandbox']).default('prod'),  // the notification mode, if it's sandbox, the notification will be processed but not sent
//  deviceIds: Joi.array().includes(Joi.string())   // an array of deviceIds to send the notification to. If not supplied, the server will notify all deviceIds in the database

  // Handle channel actions

  $scope.toggleSupportedChannel = function(channel) {
    var channelIndex = $scope.notification.channels.indexOf(channel);
    if (channelIndex !== -1) {
      $scope.notification.channels.splice(channelIndex, 1);
    } else {
      $scope.notification.channels.push(channel);
    }
  };

  // Handle push data actions

  $scope.makePushDataRow = function() {
    return {key: '', type: 'string', value: ''};
  };

  $scope.addDataItem = function() {
    $scope.pushDataRows.push($scope.makePushDataRow());
  };

  $scope.removeDataItem = function(index) {
    if ($scope.pushDataRows.length === 1) {
      $scope.pushDataRows[0] = $scope.makePushDataRow();
    } else {
      $scope.pushDataRows.splice(index, 1);
    }
  };

  $scope.pushRowIsBoolean = function(index) {
    // TODO(leah): Update this
    return false;
  };

  // Data definitions

  // NOTE: pushServerSettings is brought in via a build step, see gulpfile for details
  var channels = pushServerSettings['SUPPORTED_CHANNELS'];

  // Set up an initial empty notification
  $scope.notification = {
    title: '',
    message: '',
    sound: '',
    data: {},

    // admin variables
    channels: _.cloneDeep(channels)
  };

  $scope.selectedChannels = _.zipObject(channels, _.map(channels, function() {
    return true;
  }));

  $scope.dataTypeConverters = {
    'integer': parseInt,
    'float': parseFloat
  };
  $scope.supportedDataTypes = ['string', 'integer', 'float', 'boolean'];

  $scope.pushDataRows = [$scope.makePushDataRow()];

  // push the (optionally) converted push data values into the notification object
  $scope.$watch('pushDataRows', function(newValue, oldValue) {
    if (_.isArray(newValue)) {
      $scope.notification.data = {};
      for (var i = 0, pushRow, converter, value; i < newValue.length; ++i) {
        pushRow = newValue[i];
        if (pushRow.key !== '' && pushRow.value !== '') {
          converter = $scope.dataTypeConverters[pushRow.type];
          value = !_.isUndefined(converter) ? converter(pushRow.value) : pushRow.value;
          $scope.notification.data[pushRow.key] = value;
        }
      }
    }
  }, true);

};

module.exports = PushNotificationFormController;
