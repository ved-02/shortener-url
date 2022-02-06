const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = requre("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
