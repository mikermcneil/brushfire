/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // find: function(req, res) {

  //   var Youtube = require('machinepack-youtube');

  //   // Display the number of views of a Youtube Video.
  //   Youtube.getPlayCount({
  //     url: 'https://www.youtube.com/watch?v=TruIq5IxuiU',
  //     apiKey: 'AIzaSyCT2IHOJJDgoTxAmBkjbyKu_xU8LY_sA64',
  //   }).exec({

  //     // An unexpected error occurred.
  //     error: function(err) {
  //       // Respond with a simple error message.
  //       return res.serverError(err);
  //     },
  //     // OK.
  //     success: function(videos) {

  //       // Marshal the video data from machinepack-youtube
  //       // to look just like the stuff in our database.
  //       _.each(videos, function(video){
  //         video.title = video.name;
  //         delete video.title;
  //       });

  //       // Respond with a list of videos as JSON.
  //       return res.json(videos);

  //     }
  //   });

  // }

};