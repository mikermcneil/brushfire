angular.module('brushfire').controller('editProfilePageController', ['$location', '$routeParams', '$scope', '$http', 'toastr', function($location, $routeParams, $scope, $http, toastr) {

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE = $scope;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.userProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    changePassword: {}
  };

  $scope.userProfile.loading = true;

  // console.log('The id is: ', $routeParams.id);
  var theRoute = '/user/' + $routeParams.id;

  // Submit GET request to Sails.
  $http.get(theRoute)
    .then(function onSuccess(sailsResponse) {
      // console.log(sailsResponse.data.id);
      // window.location = '#/profile/' + sailsResponse.data.id;
      // console.log('The response is: ', sailsResponse);
      $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
      $scope.userProfile.properties.email = sailsResponse.data.email;
      $scope.userProfile.properties.id = sailsResponse.data.id;

      $scope.userProfile.loading = false;
    })
    .catch(function onError(sailsResponse) {
      console.log(sailsResponse);
      // Otherwise, display generic error if the error is unrecognized.
      $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

    })
    .finally(function eitherWay() {
      $scope.loading = false;
    });

  $scope.updateProfile = function() {

    var theRoute = '/user/' + $routeParams.id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        gravatarURL: $scope.userProfile.properties.gravatarURL
      })
      .then(function onSuccess(sailsResponse) {

        window.location = '#/profile/' + sailsResponse.data.id;

        $scope.userProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.loading = false;
      });
  };

  $scope.restore = function() {

    // Submit PUT request to Restore GravatarURL.
    $http.put('/user/restoreGravatarURL/', {
        email: $scope.userProfile.properties.email
      })
      .then(function onSuccess(sailsResponse) {

        // Restore the current gravatarURL
        $scope.userProfile.properties.gravatarURL = sailsResponse.data;

        $scope.userProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.loading = false;
      });
  };

  $scope.changeMyPassword = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    $http.put('/user/changePassword', {
        id: $scope.userProfile.properties.id,
        password: $scope.userProfile.properties.password
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          window.location = '#/profile/' + $scope.userProfile.properties.id;
          // 
          // toastr.success('Password Updated!');

        $scope.userProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.userProfile.changePassword.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.loading = false;
      });

  };

}]);