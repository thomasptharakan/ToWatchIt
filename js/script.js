var searchMovie = {
  movieTitle : '',
  moviePlot : '' , 
  movieActors : '',
  movieRatingSource : '',
  movieRating : '',
  youtubeTrailerURL : ''
}

$('#searchButton').on('click', function (event) {
  event.preventDefault();
  var movieName = $('#searchMovie').val();
alert(movieName);
  getMovieDetails(movieName);

});

function getMovieDetails(movieName){
  getOMDBApi(movieName);
  getYouTubeAPI(movieName);
  console.log(searchMovie);
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
    searchMovie.movieTitle = response.Title;
    searchMovie.moviePlot = response.Plot;
    searchMovie.movieActors = response.Actors;
    searchMovie.movieRatingSource = response.Ratings[0].Source;
    searchMovie.movieRating = response.Ratings[0].Value;
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
    var movieTrailedID = response.items[0].id.videoId;
    searchMovie.youtubeTrailerURL = "https://www.youtube.com/embed/" +
        movieTrailedID +
        ";SameSite=Strict;Secure";
  });

}
