const express = require("express");
const router = express.Router();
const genres = require("../helpers/genres");
const db = require("../conn/conn");

// GET All Movies
router.get("/", (req, res, next) => {
  console.log(genres);
  res.render("pages/search", {
    title: "Search",
    genres
  });
});

module.exports = router;
