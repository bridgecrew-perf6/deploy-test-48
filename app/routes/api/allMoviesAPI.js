const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie
  axios
    .get("discover/movie")
    .then((response) => {
      console.log("discover/movie");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// @path/api/all-movies/most-popular/:page
// @desc Show most popular movies
// @access Public
router.get("/most-popular/:page", (req, res) => {
  // their API
  axios
    .get("/discover/movie", {
      params: { sort_by: "popularity.desc", page: req.params.page }
    })
    .then((response) => {
      console.log("discover/movie", "most popular");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// @path/api/all-movies/most-revenue/:page
// @desc Show most revenue movies
// @access Public
router.get("/most-revenue/:page", (req, res) => {
  // their API
  axios
    .get("/discover/movie", {
      params: { sort_by: "revenue.desc", page: req.params.page }
    })
    .then((response) => {
      console.log("discover/movie", "most rev");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// @path/api/all-movies/most-popular/:page
// @desc Show most popular movies
// @access Public
router.get("/top-rated", (req, res) => {
  // their API
  axios
    .get("/movie/top_rated")
    .then((response) => {
      console.log("/movie/top_rated");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/now-playing", (req, res) => {
  // their API
  axios
    .get("/movie/now_playing")
    .then((response) => {
      console.log("/movie/now_playing");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/upcoming", (req, res) => {
  // their API
  axios
    .get("/movie/upcoming")
    .then((response) => {
      console.log("/movie/upcoming");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// @path /api/all-movies/:page
router.get("/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?page={page}
  axios
    .get("discover/movie", { params: { page: req.params.page } })
    .then((response) => {
      console.log("discover/movie");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
