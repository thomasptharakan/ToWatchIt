var searchMovie = {
  movieTitle : 'Test',
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
    $('#exampleModalTitleLabel').text(searchMovie.movieTitle);
    searchMovie.moviePlot = response.Plot;
    $('#searchModelMoviePlot').text(`Plot : ${searchMovie.moviePlot}`);
    searchMovie.movieActors = response.Actors;
    $('#searchModelMovieActors').text(`Actors: ${searchMovie.movieActors}`);
    searchMovie.movieRatingSource = response.Ratings[0].Source;
    searchMovie.movieRating = response.Ratings[0].Value;
    $('#searchModelMovieRating').text(`Rating: ${searchMovie.movieRating} (${searchMovie.movieRatingSource})`);
    
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
    $('#searchModelMovieTrailer').attr('src',searchMovie.youtubeTrailerURL);
  });

}
