angular.module('brushfire').controller('homePageController', ['$location', '$scope', '$http', 'toastr', function($location, $scope, $http, toastr) {

  // set-up loading state
  $scope.loginForm = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;

  // $scope.submitLoginForm = function() {

  //   // Set the loading state (i.e. show loading spinner)
  //   $scope.loginForm.loading = true;

  //   // Submit request to Sails.
  //   $http.put('/login', {
  //       email: $scope.loginForm.email,
  //       password: $scope.loginForm.password
  //     })
  //     .then(function onSuccess() {
  //       // Refresh the page now that we've been logged in.
  //       window.location = '/videos';
  //     })
  //     .catch(function onError(sailsResponse) {

  //       if (sailsResponse.status === 403) {
  //         // toastr.error('Removed', 'Error', {
  //         //   closeButton: true
  //         // });
  //         window.location = '/restore';
  //         return;
  //       }

  //       // Handle known error type(s).
  //       // Invalid username / password combination.
  //       if (sailsResponse.status === 400 || 404) {
  //         // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
  //         //
  //         toastr.error('Invalid email/password combination.', 'Error', {
  //           closeButton: true
  //         });
  //         return;
  //       }

  //       toastr.error('An unexpected error occurred, please try again.', 'Error', {
  //         closeButton: true
  //       });
  //       return;

  //     })
  //     .finally(function eitherWay() {
  //       $scope.loginForm.loading = false;
  //     });
  // };


}]);