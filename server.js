require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const register = require("./routes/register");
const login = require("./routes/login");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

// MONGOOSE
mongoose.connect('mongodb://localhost:27017/shortenURL');

// End points
app.use("/api/register", register);
app.use("/api/login", login);

app.listen(80, () => {
    console.log("port 80");
});