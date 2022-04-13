let IMAGE_URL = "http://image.tmdb.org/t/p/w500";
let page = 1;
let sort = "most-popular";

// On load
$(document).ready(function () {
  $("select").formSelect();
  getMovies(page);
});

$("#sort").change(function () {
  sort = $("#sort").val();
  getMovies(page);
});

// Pagination
$("#nextPage").click(() => {
  page++;
  getMovies(page);
});
$("#prevPage").click(() => {
  page--;
  getMovies(page);
});
// Random button - select random page out of 100
$("#random").click(() => {
  page = Math.floor(Math.random() * (500 - 1)) + 1;
  getMovies(page);
});

// Movies -------------------------------
function getMovies(page) {
  $("#movies").empty();
  $("#movies").hide();
  $.getJSON("/api/all-movies/" + sort + `/${page}`)
    .then((data) => {
      const { results } = data;
      console.log(results);
      $("#page-number").html(data.page);
      renderPages(results);
    })
    .catch((err) => {
      console.log(err);
      $("#movies").append(
        `
      <div class="col s12 m4 l3 movie-container">
      <h3> There was an error<h3>
      <a href="/movies">Go Back</a>
      </div>
      `
      );
      $(".preloader-wrapper").hide();
      $("#movies").fadeIn();
    });
}

function renderPages(results) {
  results.forEach((movie) => {
    $("#movies").append(
      `
    <div class="col s12 m4 l3 movie-container">
    <a href="/movies/${movie.id}">
    <img src="${IMAGE_URL}${movie.poster_path}" class="responsive-img" alt="${movie.title}"/>
    </a>
    </div>
    `
    );
  });
  // Show movies
  // Progress Progress
  $(".preloader-wrapper").hide();
  $("#movies").fadeIn();
}
