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


//Add Event listener to capture click on Search div 
$('#result').on('click', () => addtosearchList(event));

function addtosearchList(event) {
  var clickedButton = event.target;
  console.log($(clickedButton).attr('id'));
  if ($(clickedButton).attr('id') === 'searchMovieTrailer') {
    var searchMovieTrailerURL = $('#searchMovieTrailer').attr('data-url');
    console.log(searchMovieTrailerURL);
    $('#exampleModalLabel').text(searchMovie.movieTitle);
    $('.modal-body iframe').attr('src', searchMovieTrailerURL);
  } else if (($(clickedButton).attr('id') === 'addMovie')) {
    $('#result').empty();
    $('#resultsContainer').attr('style','display:none');
    // Add a local Storage Entry
    var movieDB = localStorage.getItem('movieDB');
    if (movieDB === null) {
      movieDB = [];
      movieDB[0] = searchMovie;
    } else {
      movieDB = JSON.parse(movieDB);
      movieDB.unshift(searchMovie);
    }
    localStorage.setItem('movieDB', JSON.stringify(movieDB));

    const toastLiveExample = document.getElementById("liveToast");
    const toast = new bootstrap.Toast(toastLiveExample);
    $('#toast-title').text(searchMovie.movieTitle);
    $('#toast-text').text('Movie Added to your Watch-List');
    toast.show();
  }
  
  populateSearchResults();

}


//Add Event listener to capture click on saved Movies 
$('#SavedMovies').on('click', () => removeFromList(event));

function removeFromList(event) {
  var clickedButton = event.target;
  if ($(clickedButton).attr('id') === 'watchTrailer') {
    var searchMovieTrailerURL = $(clickedButton).attr('data-url');
    var movieTitle = $(clickedButton).attr('data-title');
    $('#exampleModalLabel').text(movieTitle);
    $('.modal-body iframe').attr('src', searchMovieTrailerURL);
  } else if (($(clickedButton).attr('id') === 'DeleteMovie')) {
    // Add a local Storage Entry
    var deleteItem = $(clickedButton).attr('data-id');
    var movieDB = localStorage.getItem('movieDB');
    var movieTitle = 'MovieName';
    if (!(movieDB === null)) {
      movieDB = JSON.parse(movieDB);
      movieTitle = movieDB[deleteItem].movieTitle;
      movieDB.splice(deleteItem,1);
    }
    localStorage.setItem('movieDB', JSON.stringify(movieDB));

    const toastLiveExample = document.getElementById("liveToast");
    const toast = new bootstrap.Toast(toastLiveExample);
    $('#toast-title').text(movieTitle);
    $('#toast-text').text('Movie Removed from your List');
    toast.show();
  }
  populateSearchResults();

}

// // =================================================================
// // TOAST
// // =================================================================

// const toastTrigger = document.getElementById("DeleteMovie");

// if (toastTrigger) {
//   toastTrigger.addEventListener("click", (event) => {
//     const toast = new bootstrap.Toast(toastLiveExample);
//     var addMovieTitle = $('#result').eq('<h5>').text;
//     alert(addMovieTitle);
//     toast.show();
//   });
// }


function populateSearchResults() {

  var movieDB = localStorage.getItem('movieDB');
  movieDB = JSON.parse(movieDB);
  if (!(movieDB === null)) {
    $("#movieDB").empty();
    for (i in movieDB) {
      // MAKE A CARD TO SHOW SAVED MOVIES
      var newCard = $("<div>");
      newCard.addClass("card mb-3");

      var rowDiv = $("<div>");
      rowDiv.addClass("row g-0");

      var cardBody = $("<div>");
      cardBody.addClass("card-body");

      var title = $("<h5>");
      title.addClass("card-title");
      title.text(movieDB[i].movieTitle);
      cardBody.append(title);

      var cardPlot = $("<p>");
      cardPlot.addClass("card-text");
      cardPlot.text(movieDB[i].moviePlot);
      cardBody.append(cardPlot);

      var cardRating = $("<p>");
      cardRating.text(`Rating: ${movieDB[i].movieRating} (${movieDB[i].movieRatingSource})`);
      cardBody.append(cardRating);

      var cardActors = $("<p>");
      cardActors.addClass("card-text");
      cardActors.text(movieDB[i].movieActors);
      cardBody.append(cardActors);

      var colButtons = $("<div>");
      colButtons.addClass("col-md-2 d-grid gap-2 p-2");


      var addBtn = $("<button>");
      addBtn.addClass("btn btn-success");
      addBtn.attr('id', "DeleteMovie");
      addBtn.attr('data-id',i);
      var btnIcon = $("<i>");
      btnIcon.addClass("bi bi-check2-circle");
      addBtn.text(" Watched It");
      addBtn.prepend(btnIcon);
      colButtons.append(addBtn);

      var trailerBtn = $("<button>");
      trailerBtn.addClass("btn btn-dark");
      trailerBtn.attr('id', "watchTrailer");
      trailerBtn.attr('data-url',movieDB[i].youtubeTrailerURL);
      trailerBtn.attr('data-title',movieDB[i].movieTitle);
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
      poster.attr("src", movieDB[i].moviePoster);
      colPoster.append(poster);


      var colDiv8 = $("<div>");
      colDiv8.addClass("col-md-8");
      colDiv8.append(cardBody);


      rowDiv.append(colPoster);
      rowDiv.append(colDiv8);
      rowDiv.append(colButtons);
      newCard.append(rowDiv);

      $("#movieDB").append(newCard);
      $('#SavedMovies').attr('style', 'display:block');
    }

  }
}

populateSearchResults();