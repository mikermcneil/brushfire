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
      // return cb();
      return createTestUsers();
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

        Video.create(returnedVideos).exec(function(err, videoRecordsCreated) {
          if (err) {
            return cb(err);
          }

          // console.log(videoRecordsCreated);             
          // return cb();
          return createTestUsers();
        });
      },
    });
  });

  function createTestUsers() {

    var Passwords = require('machinepack-passwords');
    var Gravatar = require('machinepack-gravatar');

    User.findOne({
      email: 'sailsinaction@gmail.com'
    }).exec(function(err, foundUser) {
      if (foundUser){
       return cb();
      }

      Passwords.encryptPassword({
        password: 'abc123',
      }).exec({
        // An unexpected error occurred.
        error: function(err) {
          return cb(err);
        },
        // OK.
        success: function(result) {

          var options = {};

          try {
            // Build the URL of a gravatar image for a particular email address.
            options.gravatarURL = Gravatar.getImageUrl({
              emailAddress: 'sailsinaction@gmail.com'
            }).execSync();

          } catch (err) {
            return cb(err);
          }

          options.email = 'sailsinaction@gmail.com';
          options.encryptedPassword = result;
          User.create(options).exec(function(err, createdUser) {
            if (err) {

              return cb(err);
            }

            return cb();

          });
        }
      });
    });
  }
}