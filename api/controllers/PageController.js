/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  showHomePage: function (req, res) {
    
  // // If not logged in, show the public view.
  //   if (!req.session.me) {
  //     return res.view('homepage', {me: req.session.me});
  //   }

  if (!req.session.me) {
    return res.view('homepage', {
      me: null
    });
  }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me, function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('homepage', {
        me: {
          id: user.id,
          email: user.email,
          gravatarURL: user.gravatarURL
        }
      });
    });
  },

  showSignupPage: function (req, res) {
    
  // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('signup', {me: null});
    }

    return res.view('videos', {
      me: req.session.me
    });
  }
};
