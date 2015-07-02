angular.module('brushfire', ['toastr'])
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  });



angular.module('brushfire', ['ngRoute', 'toastr'])
.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  })

.config(['$routeProvider', function($routeProvider) {

  $routeProvider

  // // #/    (i.e. ng-view's "home" state)
  // .when('/', {
  //   templateUrl: '/templates/home.html',
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // })

  // .when('/signup', {
  //   templateUrl: '/templates/signup.html',
  //   controller: 'signupPageController'
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // })

  // .when('/videos', {
  //   templateUrl: '/templates/videos.html',
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   controller: 'videosPageController'
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // })

  // .when('/profile/:id', {
  //   templateUrl: '/templates/profile.html',
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   controller: 'profilePageController'
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // })

  // .when('/profile/edit/:id', {
  //   templateUrl: '/templates/edit-profile.html',
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   controller: 'editProfilePageController'
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // })

  // .when('/restore', {
  //   templateUrl: '/templates/restore.html',
  //   // If the current user is an admin, "redirect" (client-side) to `#/users`.
  //   // Otherwise redirect to `#/profile`
  //   controller: 'restorePageController'
  //   // controller: ['$scope', '$location', function($scope, $location) {
  //   //   // if ($scope.me.isAdmin) {

  //   //   //   // Instead of:
  //   //   //   // window.location.hash = '#/users';

  //   //   //   // We can do it the angular way:
  //   //   //   // (to avoid a bunch of weird digest loop errors)
  //   //     //$location.path('/users');
  //   //   //   $location.replace();
  //   //   //   return;
  //   //   // }

  //   //   // // Client-side redirect to `#/profile`
  //   //   // $location.path('/profile');
  //   //   // $location.replace();
  //   //   // return;
  //   // }]
  // });


}]);