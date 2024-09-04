require("dotenv").config();
const express = require("express");
const cors = require("cors");
const favicon = require("express-favicon");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./src/config/passportConfig.js"); // Import passport configuration

const mainRouter = require("./src/routes/mainRouter.js");
const authRouter = require("./src/routes/authRouter.js"); // Import authentication router

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.static("public"));
app.use(favicon(__dirname + "/public/favicon.ico"));

// Session management
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1", mainRouter); // Existing routes
app.use("/auth", authRouter); // Authentication routes

module.exports = app;
