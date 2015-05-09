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
      apiKey: 'AIzaSyCT2IHOJJDgoTxAmBkjbyKu_xU8LY_sA64',
      limit: 15,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {

        return res.serverError(err);

      },
      // OK.
      success: function(videos) {

        _.each(videos, function(video){
          video.src = 'https://www.youtube.com/embed/' + video.id;
          delete video.description;
          delete video.publishedAt;
          delete video.id;
          delete video.url;
        })
        return res.json(videos);
      }
    });


  }

};
