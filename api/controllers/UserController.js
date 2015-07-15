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

  setSession: function(req, res) {

    req.session.me = req.param('sessionVar');

    return res.json(req.session.me || 'not yet set');

  },

  getSession: function(req, res) {

    return res.json(req.session.me || 'not yet set');

  },

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

              // Create a dictionary of values to add to the session
              req.session.me = {};

              req.session.me.id = createdUser.id;

              return res.json();

            });
          }
        });
      },
    });
  },

  /**
   * Check the provided email address and password, and if they
   * match a real user in the database, sign in to Brushfire.
   */
  login: function (req, res) {

    // Try to look up the user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {

      // Handle error
      if (err) return res.negotiate(err);

      // Handle no user being found
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          if(user.deleted) {

            return res.forbidden();

          }

          // Create a dictionary of values to add to the session
          var userProperties = {};

          userProperties.id = user.id;
          userProperties.email = user.email;
          userProperties.gravatarURL = user.gravatarURL;

          // Store user id in the user session
          req.session.me = userProperties;

          // All done- let the client know that everything worked.
          return res.json();
        }
      });
    });

  },

  findOne: function(req, res) {

    // Try to look up user using the provided email address
    User.findOne(req.param('id'),
      function foundUser(err, user) {
        // Handle error
        if (err) return res.negotiate(err);

        // Handle no user being found
        if (!user) return res.notFound();

        // Return the user
        return res.json(user);
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

  updateProfile: function(req, res) {

    User.update({
      id: req.param('id')
    }, {
      gravatarURL: req.param('gravatarURL')
    }, function(err, updatedUser) {

      // Handle error
      if (err) return res.negotiate(err);

      // Return updated User
      return res.json(updatedUser);

    });
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

        // console.log('the result: ', result);
        // console.log('req.param: ', req.param('id'))

        User.update({
          id: req.param('id')
        }, {
          encryptedPassword: result
        }).exec(function(err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          }

          return res.json(updatedUser);

        });

      },
    });


    // return res.ok();

  },

  delete: function(req, res) {

    // Validate for id
    if (!req.param('id')){
      return res.badRequest('id is a required parameter.');
    }

    // Destroy record
    User.destroy({
      id: req.param('id')
    }).exec(function (err, usersDestroyed){
      if (err) return res.negotiate(err);
      if (usersDestroyed.length === 0) {
        return res.notFound();
      }

      // Send back a 200 status
      return res.ok();
    });
  },

  removeProfile: function(req, res) {

    // Validate for id
    if (!req.param('id')){
      return res.badRequest('id is a required parameter.');
    }

    User.update({
      id: req.param('id')
    },{
      deleted: true
    }, function(err, removedUser){

      if (err) return res.negotiate(err);
      if (removedUser.length === 0) {
        return res.notFound();
      }

      req.session.me = null;
      return res.ok();
    });
  },

  restoreProfile: function(req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function() {
          return res.notFound();
        },

        success: function() {

          User.update({
            id: user.id
          }, {
            deleted: false
          }).exec(function(err, updatedUser) {
            if (err) return res.negotiate(err);

            req.session.me = user.id;

            return res.ok();


          });

          // // All done- let the client know that everything worked.
          // return res.ok();
        }
      });
    });
  },

  me: function(req, res) {

    var id = req.param('id');

    User.findOne(req.param('id')).exec(function(err, me) {

      // console.log(me);

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
  },

  /**
   * Log out of Activity Overlord.
   * (wipes `me` from the sesion)
   */
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // Wipe out the session (log out)
      req.session.me = null;

      return res.redirect('/');

    });
  }
};