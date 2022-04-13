const express = require("express");
const router = express.Router();
const axios = require("axios");

// @path /api/single-movie/:movie_id
// @desc access TMDB server
// @acces public

// Our api:
router.get("/:movie_id", (req, res) => {
  axios
    // TMBD API: https://api.themoviedb.org/3/movie/{movie_id}
    .get("/movie/" + req.params.movie_id)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
