angular.module('brushfire').controller('navPageController', ['$location', '$scope', '$http', 'toastr', function($location, $scope, $http, toastr) {

  $scope.me = window.SAILS_LOCALS.me;

}]);