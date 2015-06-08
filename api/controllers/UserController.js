/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');

module.exports = {

  signup: function(req, res) {

    // // Validate parameters
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    // Determine whether or not the provided string is an email address.
    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.badRequest('Doesn\'t look like an email address to me!');
      },
      // OK.
      success: function() {

        // Encrypt a string using the BCrypt algorithm.
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({
          // An unexpected error occurred.
          error: function(err) {
            return res.serverError(err);
          },
          // OK.
          success: function(result) {

            var options = {};

            try {
              // Build the URL of a gravatar image for a particular email address.
              options.gravatarURL = Gravatar.getImageUrl({
                emailAddress: req.param('email')
              }).execSync();

            } catch (err) {
              return res.serverError(err);
            }

            options.email = req.param('email');
            options.encryptedPassword = result;
            User.create(options).exec(function(err, createdUser) {
              if (err) {

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }

                // //     // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              return res.json(createdUser);

            });
          }
        });
      },
    });
  },

  restoreGravatarURL: function(req, res) {

    // Create a Gravatar URL using the passed in email address

    try {
      // Build the URL of a gravatar image for a particular email address.
      var restoredGravatarURL = gravatarURL = Gravatar.getImageUrl({
        emailAddress: req.param('email')
      }).execSync();

      return res.json(restoredGravatarURL);

    } catch (err) {
      return res.serverError(err);
    }
  },

  changePassword: function(req, res) {

    // Validate password

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

        return res.serverError(err);

      },
      // OK.
      success: function(result) {

        console.log('the result: ', result);
        console.log('req.param: ', req.param('id'))

        User.update({id: req.param('id')}, {encryptedPassword: result}).exec(function(err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          }

          return res.json(updatedUser);

        });

      },
    });


    // return res.ok();

  },

  me: function(req, res) {

    var id = req.param('id');

    User.findOne(req.param('id')).exec(function(err, me) {

      console.log(me)

      res.json(me);

    });
  },

  checkPassword: function(req, res) {

    var id = req.param('id');

    User.findOne(req.param('id')).exec(function(err, me) {

      console.log(me);

    // Compare a plaintext password attempt against an already-encrypted version.
    Passwords.checkPassword({
      passwordAttempt: req.param('password'),
      encryptedPassword: me.encryptedPassword,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

        return res.serverError(err);

      },
      // Password attempt does not match already-encrypted version
      incorrect: function() {

        return res.badRequest('nope');

      },
      // OK.
      success: function() {

        return res.ok();

      },
    });
      

    });


  }
};