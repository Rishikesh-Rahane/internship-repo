const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5500;
const internshipApplication = require("./routes/internshipApplicationFormRoute.js");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DataBase is connected"))
  .catch((err) => {
    console.log("Error while connecting to db :(");
    console.log(err);
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "your_secret_key", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());



app.use("/api", internshipApplication);

app.listen(PORT, (req, res) => {
  console.log(`server running on port : ${PORT}`);
});
