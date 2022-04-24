require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { connect } = require("mongoose");
const FRONTEND_URL = "http://localhost:3000";
const passport = require("passport");
// const { auth, passport } = require("./jwt/passport");
// const {passport_res} = require('./jwt/res_passport');
//listening

app.listen(port, () => console.info("Listening on port " + port));
// const image_dir =
//   "/Users/satishc/Desktop/Folders/Masters/SJSU/Courses/EDS - Shim/Images/restaurants/";
// app.use("/static/images", express.static(image_dir));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(passport.initialize());
//use express session to maintain session data
app.use(
  session({
    secret: "Project_202",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const { mongoConnectionURL } = require("./database/mongoConnection");
const mongoose = require("mongoose");
// const { initDBConnection } = require("./database/mysqlConnection");

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

// initDBConnection().then(async () => {
//   require("./models/CompanyReviewsModel");
//   await global.DB.sync({ alter: false });
// });

mongoose.connect(mongoConnectionURL, mongoDbOptions, (err, result) => {
  if (err) {
    console.log("Error while connecting to mongoDB : " + err);
  } else {
    console.log("Connected to Mongo DB!");
  }
});

console.log(mongoose.connection.readyState);

const indexRouter = require("./routes/index");

console.log("dir_name " + __dirname);
app.use(express.json());
app.use(passport.initialize());
// app.use(passport_res.initialize());
app.use("/api/", indexRouter);
//app.use(cookieParser);