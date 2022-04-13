let IMAGE_URL = "http://image.tmdb.org/t/p/w500";
let page = 1;
let display = "now-playing";

// On load
$().ready(() => {
  $("select").formSelect();
  $(".progress").hide();
  getMovies();
});

// Search------------------------------------------------------------------
$("#searchtxtbox").change((e) => {
  console.log(e.target.value);
  searchMovie(e.target.value);
  $("#head").html("Search: " + e.target.value);
  $("#movies").empty();
  $(".progress").show();
});

const searchMovie = (query) => {
  $.getJSON(`/api/search/${query}`)
    .then((data) => {
      const { results } = data;
      renderPages(results);
    })
    .catch((err) => {
      console.log("err");
      $("#api-content").append(`<p>${err.responseJSON.status_message}</p>`);
    })
    .then(() => {
      $(".progress").hide();
    });
};

// Genres------------------------------------------------------------------
$("#genre").change((e) => {
  filterByGenre();
});

const filterByGenre = () => {
  $("#searchtxtbox").val("");
  const selectedGenres = [];
  $("#genre p label input[type=checkbox]:checked").each((i, v) => {
    selectedGenres.push($(v).attr("id"));
  });
  const genreQueryString = selectedGenres.join(",");
  $("#head").html("Genres Search");

  $.getJSON(`/api/genre/${genreQueryString}`)
    .then((data) => {
      const { results } = data;
      renderPages(results);
    })
    .catch((err) => {
      console.log("err");
      $("#api-content").append(`<p>${err.responseJSON.status_message}</p>`);
    })
    .then(() => {
      $(".progress").hide();
    });
};

// Options------------------------------------------------------------------
$("#now-playing").click(() => {
  display = "now-playing";
  $("#head").html("Now Playing");
  getMovies(page);
});
// Random button - select random page out of 100
$("#top-rated").click(() => {
  display = "top-rated";
  $("#head").html("Top Rated");
  getMovies(page);
});
// Random button - select random page out of 100
$("#upcoming").click(() => {
  $("#head").html("Upcoming");
  display = "upcoming";
  getMovies(page);
});

// Movies -------------------------------------------------------
function getMovies(page) {
  $.getJSON("/api/all-movies/" + display)
    .then((data) => {
      const { results } = data;
      console.log(data);
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
      $(".progress").hide();
      $("#movies").fadeIn();
    });
}

function renderPages(results) {
  $(".progress").show();
  $("#movies").hide();
  $("#movies").empty();
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
  $(".progress").hide();
  $("#movies").fadeIn();
}
