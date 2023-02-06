var searchMovie = {
  movieTitle: "",
  movieYear: "",
  moviePoster: "",
  moviePlot: "",
  movieActors: "",
  movieRatingSource: "",
  movieRating: "",
  youtubeTrailerURL: "",
};

$("#searchButton").on("click", function (event) {
  event.preventDefault();
  var movieName = $("#searchMovie").val();
  getMovieDetails(movieName);
});

function getMovieDetails(movieName) {
  getOMDBApi(movieName);
  // getYouTubeAPI(movieName);
  console.log(searchMovie);
}

function getOMDBApi(movieName) {
  //Query the OMDB API
  var queryURL =
    "https://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short" +
    "&apikey=" +
    omdbApiKey;

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
    searchMovie.movieYear = response.Year;
    searchMovie.moviePoster = response.Poster;
    //Add Search Result to Screen
    getYouTubeAPI(response.Title)


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
    searchMovie.youtubeTrailerURL =
      "https://www.youtube.com/embed/" +
      movieTrailedID +
      ";SameSite=Strict;Secure";
    $("#searchModelMovieTrailer").attr("src", searchMovie.youtubeTrailerURL);
    addSearchResult();
  });
}


function addSearchResult() {
  alert('in here');
  $("#result").empty();
  // MAKE A CARD TO SHOW RESULTS
  var newCard = $("<div>");
  newCard.addClass("card mb-3");

  var rowDiv = $("<div>");
  rowDiv.addClass("row g-0");

  var cardBody = $("<div>");
  cardBody.addClass("card-body");

  var title = $("<h5>");
  title.addClass("card-title");
  title.attr('id', 'searchMovieTitle');
  title.text(searchMovie.movieTitle);
  cardBody.append(title);

  var cardPlot = $("<p>");
  cardPlot.addClass("card-text");
  cardPlot.attr('id', 'seacrhMoviePlot');
  cardPlot.text(searchMovie.moviePlot);
  cardBody.append(cardPlot);

  var cardRating = $("<p>");
  cardRating.attr('id', 'seacrhMovieRating');
  cardRating.text(`Rating: ${searchMovie.movieRating} (${searchMovie.movieRatingSource})`);
  cardBody.append(cardRating);

  var cardActors = $("<p>");
  cardActors.addClass("card-text");
  cardActors.attr('id', 'searchMovieActors');
  cardActors.text(searchMovie.movieActors);
  cardBody.append(cardActors);

  var colButtons = $("<div>");
  colButtons.addClass("col-md-2 d-grid gap-2 p-2");


  var addBtn = $("<button>");
  addBtn.addClass("btn btn-success");
  addBtn.attr('id', "addMovie");
  var btnIcon = $("<i>");
  btnIcon.addClass("bi bi-plus-square");
  addBtn.text(" Add To List");
  addBtn.prepend(btnIcon);
  colButtons.append(addBtn);

  var trailerBtn = $("<button>");
  trailerBtn.addClass("btn btn-dark");
  trailerBtn.attr('id', "searchMovieTrailer");
  trailerBtn.attr('data-url', searchMovie.youtubeTrailerURL);
  trailerBtn.attr('data-bs-toggle', 'modal');
  trailerBtn.attr('data-bs-target', '#exampleModal');
  var trlBtnIcon = $("<i>");
  trlBtnIcon.addClass("bi bi-film");
  trailerBtn.text(" Trailer");
  trailerBtn.prepend(trlBtnIcon);
  colButtons.append(trailerBtn);





  var colPoster = $("<div>");
  colPoster.addClass("col-md-2");

  var poster = $("<img>");
  poster.addClass("img-fluid rounded-start");
  poster.attr('id', 'searchMoviePoster');
  poster.attr("src", searchMovie.moviePoster);
  colPoster.append(poster);


  var colDiv8 = $("<div>");
  colDiv8.addClass("col-md-8");
  colDiv8.append(cardBody);


  rowDiv.append(colPoster);
  rowDiv.append(colDiv8);
  rowDiv.append(colButtons);
  newCard.append(rowDiv);

  $("#result").append(newCard);
  $('#resultsContainer').attr('style', 'display:block');


}
// // =================================================================
// // TOAST
// // =================================================================

// const toastTrigger = document.getElementById("liveToastBtn");
// const toastLiveExample = document.getElementById("liveToast");
// if (toastTrigger) {
//   toastTrigger.addEventListener("click", (event) => {
//     const toast = new bootstrap.Toast(toastLiveExample);
//     var addMovieTitle = $('#result').eq('<h5>').text;
//     alert(addMovieTitle);
//     toast.show();
//   });
// }

//Add Event listener to capture click 
$('#result').on('click', () => addtosearchList(event));

function addtosearchList(event) {
  var clickedButton = event.target;
  console.log($(clickedButton).attr('id'));
  if ($(clickedButton).attr('id') === 'searchMovieTrailer') {
    alert('clicked trailer');
    var searchMovieTrailerURL = $('#searchMovieTrailer').attr('data-url');
    console.log(searchMovieTrailerURL);
    $('.modal-body iframe').attr('src', searchMovieTrailerURL);
  }else if (($(clickedButton).attr('id') === 'addMovie')){

    // Add a local Storage Entry
    localStorage.setItem('movie','Matrix');
  }

}
