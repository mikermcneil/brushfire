/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  find: function(req, res) {
    var Youtube = require('machinepack-youtube');

    // List Youtube videos which match the specified search query.
    Youtube.searchVideos({
      query: 'grumpy cat',
      apiKey: 'xAmBxAmBxAmBkjbyKkjbyKkjbyK',
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

      },
      // OK.
      success: function(result) {

      },
    });

    return res.json([{
      title: 'Cat eats dog.',
      src: 'https://www.youtube.com/embed/INscMGmhmX4'
    }]);

  }

};