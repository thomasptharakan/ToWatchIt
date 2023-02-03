$('#searchButton').on('click', function (event) {
  alert('inhere');
  event.preventDefault();
  var movieName = 'Matrix';
  getMovieDetails(movieName);

});

function getMovieDetails(movieName){
  getOMDBApi(movieName);
  getYouTubeAPI(movieName);
}

function getOMDBApi(movieName) {
  //Query the OMDB API
  var queryURL =
    "https://www.omdbapi.com/?t=" 
    + movieName 
    + "&y=&plot=short" +
    "&apikey=" + omdbApiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}


function getYouTubeAPI(movieName) {
  // // =================================================================
  // // YOUTUBE API
  // // =================================================================
  var search = movieName + " trailer";
  var queryURL =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    youTubeApiKey +
    "&q=" +
    search +
    "&part=snippet&maxResults=1&type=video&videoEmbeddable=true";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });

}
