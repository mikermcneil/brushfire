/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  find: function(req, res) {

    return res.json([{
      title: 'Cat eats dog.',
      src: 'https://www.youtube.com/embed/INscMGmhmX4'
    }]);

  }

};