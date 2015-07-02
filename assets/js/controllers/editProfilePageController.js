angular.module('brushfire').controller('editProfilePageController', ['$location', '$routeParams', '$scope', '$http', 'toastr', function($location, $routeParams, $scope, $http, toastr) {

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE = $scope;

  $scope.me = window.SAILS_LOCALS.me;

  // /////////////////////////////////////////////////////////////////////////////////
  // // When HTML is rendered... (i.e. when the page loads)
  // /////////////////////////////////////////////////////////////////////////////////

  // // Set up initial objects
  // // (kind of like our schema for the page)
  $scope.editProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    changePassword: {}
  };

  // $scope.editProfile.loading = true;

  // // console.log('The id is: ', $routeParams.id);
  // var theRoute = '/user/findOne/' + $routeParams.id;

  // // Submit GET request to Sails.
  // $http.get(theRoute)
  //   .then(function onSuccess(sailsResponse) {
  //     // console.log(sailsResponse.data.id);
  //     // window.location = '#/profile/' + sailsResponse.data.id;
  //     // console.log('The response is: ', sailsResponse);
  //     $scope.editProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
  //     $scope.editProfile.properties.email = sailsResponse.data.email;
  //     $scope.editProfile.properties.id = sailsResponse.data.id;

  //     $scope.editProfile.loading = false;
  //   })
  //   .catch(function onError(sailsResponse) {
  //     console.log(sailsResponse);
  //     // Otherwise, display generic error if the error is unrecognized.
  //     $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

  //   })
  //   .finally(function eitherWay() {
  //     $scope.editProfile.loading = false;
  //   });

  $scope.updateProfile = function() {

    var theRoute = 'updateProfile/' + $scope.me.id;

    // Submit PUT request to Sails.
    $http.put(theRoute, {
        gravatarURL: $scope.me.gravatarURL
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        // Response.data[0].id;window.location = '#/profile/' + sails
        
        window.location = '/profile';

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.restore = function() {

    // Submit PUT request to Restore GravatarURL.
    $http.put('/restoreGravatarURL', {
        email: $scope.me.email
      })
      .then(function onSuccess(sailsResponse) {

        // Restore the current gravatarURL
        $scope.me.gravatarURL = sailsResponse.data;

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.changeMyPassword = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    $http.put('/changePassword', {
        id: $scope.me.id,
        password: $scope.editProfile.properties.password
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          // window.location = '#/profile/' + $scope.editProfile.properties.id;
          // 
          window.location = '/profile';

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.changePassword.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

}]);