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

  Video.count().exec(function(err, numVideos) {
    if (err) {
      return cb(err);                                
    }

    if (numVideos > 0) {
      console.log('Existing video records: ', numVideos)
      return cb();
    }
    var Youtube = require('machinepack-youtube');

    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: 'AIzaSyDXO3uVugLUvrrziRkWk6PLRnYO4x5QBa0',
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

        return cb(err);

      },
      // OK.
      success: function(returnedVideos) {

        _.each(returnedVideos, function(video) {                   
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        });

        console.log(returnedVideos);
        return cb();
      },
    });
  });
};
