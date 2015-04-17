$(function whenDomIsReady() {

  //
  // Immediately bind a "submit" event on our "Submit Video" form.
  //

  $('.submit-video-form').submit(function (e){

    // Prevent the browser from doing the default form thing, this is 2015.
    e.preventDefault();

    // Harvest the data out of the form in the DOM
    // (this is where you put your client-side validation when relevant)
    var newVideo = {
      title: $('.submit-video-form input[name="title"]').val(),
      src: $('.submit-video-form input[name="src"]').val()
    };

    // Clear the form fields
    $('.submit-video-form input').val('');

    // Now we'll submit the new video to the server:

    // First, show a loading state
    $('.submit-video-form button').text('Submitting...');
    // and disable the submit button to prevent double-posting while loading.
    $('.submit-video-form button').prop('disabled', true);

	// create placeholder anchor element
    var parser = document.createElement('a');

	// assign url to parser.href
	parser.href = newVideo.src

	// Use the indexOf parser.search as the first argument and length of
    // parser.search as the second argument of parser.search.substring
    // The result is the YouTube ID --> LfOWehvvuo0
	var youtubeID = parser.search.substring(parser.search.indexOf("=")+1, parser.search.length);

 	// Create the source url for the eventual iframe
    newVideo.src = 'https://www.youtube.com/embed/'+youtubeID;

    // Simulate a delay
    setTimeout(function (){
      // TODO: handle error state from the server
      // Success!
      // Now we know it's the real deal and the server accepted our submission.

      // Build up some HTML for our new video
      // Note: this approach is just an example-- you should be HTML-escaping things
      // or better yet, using a more structured front-end web framework on top of (or in lieu of)
      // jQuery.
      var newVideoHtml = '<li class="video">'+
      '  <h2>' + newVideo.title + '</h2>'+
      '  <iframe width="640" height="390" src="'+newVideo.src+'" frameborder="0" allowfullscreen></iframe>'+
      '</li>';


      // Insert HTML for the newly added video into the DOM
      $('.the-list-of-videos').prepend(newVideoHtml);

      // Hide the loading state
      $('.submit-video-form button').text('Submit Video');

      // And re-enable the submit button.
      $('.submit-video-form button').prop('disabled', false);

    }, 750);

  });


  //
  // Immediately start fetching list of videos from the server.
  //

  // First, show a loading spinner
  $('.the-list-of-videos .loading').show();

  // Then simulate a delay
  // (TODO: actually fetch videos from server instead of pretending)
  setTimeout(function afterRetrievingVideos() {

    // TODO: handle error state from the server

    // Fake data (TODO: use the real data from the server instead of pretending)
    var videos = [{
      title: 'PSY - GANGNAM STYLE (강남스타일) M/V',
      src: 'https://www.youtube.com/embed/9bZkp7q19f0'
    }, {
      title: 'Justin Bieber - Baby ft. Ludacris',
      src: 'https://www.youtube.com/embed/kffacxfA7G4'
    }, {
      title: 'Charlie bit my finger - again !',
      src: 'https://www.youtube.com/embed/_OBlgSz8sSM'
    }];

    // Hide the loading spinner:
    $('.the-list-of-videos .loading').hide();

    // Prepare the HTML (<li> elements) for our videos
    var videosHtml = _.reduce(videos, function(html, video) {

      // Note: this approach is just an example-- you should be HTML-escaping things
      // or better yet, using a more structured front-end web framework on top of (or in lieu of)
      // jQuery.
      html += '<li class="video">' +
        '  <h2>' + video.title + '</h2>' +
        '  <iframe width="640" height="390" src="' + video.src + '" frameborder="0" allowfullscreen></iframe>' +
        '</li>';
      return html;
    }, '');

    // Stick the videos into the DOM
    $('.the-list-of-videos ul').replaceWith(videosHtml);

  }, 750);
});
