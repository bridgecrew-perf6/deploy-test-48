const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:query", (req, res) => {
  axios
    .get("/search/movie", {
      params: { query: req.params.query }
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
