// Spider-man
// const movie_id = "634649";

// https://api.themoviedb.org/3/movie/634649?api_key=12890aac4bd3d481725b4e373193a5bf&language=en-US
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
// https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg


let IMAGE_URL = "http://image.tmdb.org/t/p/w500/";
$.getJSON("/api/single-movie/" + id)
  .then((movie) => {
    $("#movie-details").hide();
    $("#title").text(movie.title);
    $("#tagline").text(movie.tagline);
    $("#poster").attr({
      src: IMAGE_URL + movie.poster_path,
      alt: "Poster for " + movie.title
    });
    $("#year").text(movie.release_date.substr(0, 4));
    movie.genres.forEach((genre) => {
      $("#genres").append(`<span><em>${genre.name} | </em></span>`);
    });
    $("#synopsis").text(movie.overview);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    $(".progress").hide();
    $("#movie-details").removeClass("hide");
    $("#movie-details").fadeIn();
  });

$("#comment-form").submit((e) => {
  e.preventDefault();
  console.log($("#comment").val());
  $.post(`/movies/${id}`, { comment: $("#comment").val() })
    .then((response) => {
      console.log(response);
      const html = `
    <div>
      <p><strong>${response.comment}</strong></p>
      <p><em>User: ${response.user_id}</em></p>
      <p>${response.created_at}</p>
    </div>
      `;
      $("#comment-body").prepend(html);
    })
    .catch((error) => {
      console.log(error);
    });
});
