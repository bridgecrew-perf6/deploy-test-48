require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const app = express();

const image_URL = "https://image.tmdb.org/t/p/w185/";

const port = process.env.PORT || 3000;

/// Session Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 Day
  })
);

// Passport.js
const initializePassport = require("./passportConfig");
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set login and avatar variable when authenticated
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  if (req.isAuthenticated()) {
    res.locals.avatar = image_URL + req.user.avatar;
  }
  next();
});

// Axios
const axios = require("axios");
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: process.env.TMDB_API_KEY,
  include_adult: false,
  page: 1,
  sort_by: "popularity.desc"
};

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const movieRouter = require("./routes/movies");
app.use("/movies", movieRouter);
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const signupRouter = require("./routes/signup");
app.use("/signup", signupRouter);
// API routes
app.use("/api/weather", require("./routes/api/weatherAPI"));
app.use("/api/all-movies", require("./routes/api/allMoviesAPI"));
app.use("/api/single-movie", require("./routes/api/singleMovieAPI"));
const searchAPI = require("./routes/api/searchApi");
app.use("/api/search", searchAPI);
app.use("/api/genre", require("./routes/api/genreApi"));

// 404
app.get("*", (req, res) => {
  res.render("pages/error");
});

// Server
app.listen(port, () => {
  console.log(`Listening on port https://localhost:${port}`);
});
