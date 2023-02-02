var title = "Spider Man";
var queryURL =
  "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});

// =================================================================
// YOUTUBE API
// =================================================================
var search = "matrix trailer";
var queryURL =
  "https://www.googleapis.com/youtube/v3/search?key=" +
  youtubeapi +
  "&q=" +
  title +
  "&part=snippet&maxResults=1&type=video&videoEmbeddable=true";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
