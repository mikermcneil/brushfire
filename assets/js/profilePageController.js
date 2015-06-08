angular.module('brushfire').controller('profilePageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http){

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.userProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false
  };

  $scope.userProfile.loading = true;

  // console.log('The id is: ', $routeParams.id);
  var theRoute = '/user/' +  $routeParams.id;

  // Submit GET request to Sails.
  $http.get(theRoute)
  .then(function onSuccess(sailsResponse){
    // console.log(sailsResponse.data.id);
    // window.location = '#/profile/' + sailsResponse.data.id;
    // console.log('The response is: ', sailsResponse);
    $scope.userProfile.properties.email = sailsResponse.data.email;
    $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
    $scope.userProfile.properties.id = sailsResponse.data.id;

    $scope.userProfile.loading = false;
  })
  .catch(function onError(sailsResponse){
    // console.log(sailsResponse);
    // Otherwise, display generic error if the error is unrecognized.
    $scope.userProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);

  })
  .finally(function eitherWay(){
    $scope.loading = false;
  })

}]);