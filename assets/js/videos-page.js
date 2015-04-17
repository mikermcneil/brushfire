/**
 * Some JavaScript for our page with the interactive list of videos, using Angular for the wiring.
 *
 * At the end of the day, the sLOC (number of lines of source code excluding comments and such)
 * is 44 for the jQuery version, and 43 for the Angular version.  In other words, the difference is
 * negligible.  Your front-end JavaScript framework is a personal/business decision, and there are
 * advantages and disadvantages to every approach you might take.  Whether it's Ember, React, Backbone,
 * Knockout, a native iOS app, a native Android app, or an army of robot ants, Sails is accepting of
 * your choice(s).  As you'll see in subsequent chapters, this front-end agnosticism is a key design
 * pattern of modern web apps, and something you should always keep in the back of your mind.
 */

angular.module('brushfire_videosPage', [])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**'
  ]);
});

angular.module('brushfire_videosPage').controller('PageCtrl', [
            '$scope', '$timeout',
  function ( $scope ,  $timeout ){

    /////////////////////////////////////////////////////////////////////////////
    // Immediately start fetching list of videos from the server.
    /////////////////////////////////////////////////////////////////////////////

    // First, show a loading spinner
    $scope.videosLoading = true;

    // Then simulate a delay
    // (TODO: actually fetch videos from server instead of pretending)
    $timeout(function afterRetrievingVideos (){

      // TODO: handle error state from the server

      // Fake data (TODO: use the real data from the server instead of pretending)
      var _videos = [{
        title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
        src: 'https://www.youtube.com/embed/9bZkp7q19f0'
      }, {
        title: 'Justin Bieber - Baby ft. Ludacris',
        src: 'https://www.youtube.com/embed/kffacxfA7G4'
      }, {
        title: 'Charlie bit my finger - again !',
        src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
      }];

      // Hide the loading spinner:
      $scope.videosLoading = false;

      // Stick the videos into the DOM
      $scope.videos = _videos;

    }, 750);

    // };

    ///////////////////////////////////////////////////////////////
    // SET UP LISTENERS FOR DOM EVENTS
    ///////////////////////////////////////////////////////////////

    /**
     * When new video is submitted...
     * (the binding from our form's "submit" event to this function is
     *  handled via `ng-submit="submitNewVideo($event)` in the HTML)
     */
    $scope.submitNewVideo = function (){

      // A little "spin-lock" to prevent double-submission
      // (because disabling the submit button still allows double-posts
      //  if a user hits the ENTER key to submit the form multiple times.)
      if ($scope.busySubmittingVideo) {
        return;
      }

      // Harvest the data out of the form
      // (thanks to ng-model, it's already in the $scope object)
      var _newVideo = {
        title: $scope.newVideoTitle,
        src: $scope.newVideoSrc,
      };

    	// create placeholder anchor element
    	var parser = document.createElement('a');

    	// assign url to parser.href
    	parser.href = _newVideo.src

    	// Use the indexOf parser.search as the first argument and length of
    	// parser.search as the second argument of parser.search.substring
    	// The result is the YouTube ID --> LfOWehvvuo0
    	var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);

      _newVideo.src = 'https://www.youtube.com/embed/'+youtubeID;

      // (this is where you put your client-side validation when relevant)

      // Side note:
      // Why not use something like `$scope.videoForm.title` or `$scope.newVideo.title`?
      // While this certainly keeps things more organized, it is a bit risky in the Angular
      // world.  I'm no Angular expert, but we have run into plenty of 2-way-binding issues/bugs
      // in the past from trying to do this.  I've found two guiding principles that help prevent
      // these sorts of issues:
      // + very clearly separate the $scope variables in your form from the $scope variables
      //   representing the rest of your page.
      // + don't point `ng-model` at the property of an object or array (e.g. `ng-model="foo.bar"`)
      //   Angular handles its 2-way bindings by reference, and it's not too hard to get into weird
      //   situations where your objects are all tangled up.

      // Now we'll submit the new video to the server:

      // First, show a loading state
      // (also disables form submission)
      $scope.busySubmittingVideo = true;

      // Simulate a delay
      $timeout(function (){
        // TODO: handle error state from the server
        // Success!
        // Now we know it's the real deal and the server accepted our submission.

        // Insert HTML for the newly added video into the DOM
        $scope.videos.unshift(_newVideo);

        // Hide the loading state
        // (also re-enables form submission)
        $scope.busySubmittingVideo = false;

        // Clear out form inputs
        $scope.newVideoTitle = '';
        $scope.newVideoSrc = '';

      }, 750);

    };
  }
]);
