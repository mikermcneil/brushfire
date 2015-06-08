angular.module('brushfire').controller('signupPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.signupForm = {
    loading: false
  };

  $scope.submitSignupForm = function(){

    // Set the loading state (i.e. show loading spinner)
    $scope.signupForm.loading = true;

    // Submit a POST request to Sails.
    $http.post('/user/signup', {
      email: $scope.signupForm.email,
      password: $scope.signupForm.password,
      confirmation: $scope.signupForm.confirmPassword
    })
    .then(function onSuccess(sailsResponse){
      window.location = '#/profile/' + sailsResponse.data.id;
      // window.location = '/user/' + sailsResponse.data.id;
    })
    .catch(function onError(sailsResponse){

    // Handle known error type(s).
    // If using sails-disk adpater -- Handle Duplicate Key
    var emailAddressAlreadyInUse = sailsResponse.status == 409;

    if (emailAddressAlreadyInUse) {
      toastr.error(sailsResponse.data);
      return;
    }

    toastr.error(sailsResponse.data, 'Error');

    })
    .finally(function eitherWay(){
      $scope.signupForm.loading = false;
    });
  };

  $scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

        toastr.error('An unexpected error occurred, please try again.', 'Error', {
          closeButton: true
        });
        return;

    })
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  };

}]);