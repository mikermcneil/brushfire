/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var Youtube = require('machinepack-youtube');

  // Display the number of views of a Youtube Video.
  Youtube.getPlayCount({
    url: 'https://www.youtube.com/watch?v=TruIq5IxuiU',
    apiKey: 'AIzaSyCT2IHOJJDgoTxAmBkjbyKu_xU8LY_sA64',
  }).exec({

    // An unexpected error occurred.
    error: function(err) {

      // Respond with a simple error message.
      return cb(err);
    },
    // OK.
    success: function(videos) {

      // Marshal the video data from machinepack-youtube
      // to look just like the stuff in our database.
      _.each(videos, function(video){
        video.title = video.name;
        delete video.title;
      });

      // TODO: store these videos in our database
      console.log(videos);

      // It's very important to trigger this callback method when you are finished
      // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
      return cb();
    
    }
  });

};
