// MONGO_URL=mongodb://localhost:27017/shortenURL


require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const URL = require("./model/url");

const register = require("./routes/register");
const login = require("./routes/login");
const url = require("./routes/url");

const app = express();
const PORT = process.env.PORT || 3000;




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

// MONGOOSE
mongoose.connect(process.env.MONGO_URL);

// else {
// NOT IN PRODUCTION
const cors = require("cors");
app.use(cors());
// }
// End points
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/url", url);

app.get("/:short", async (req, res) => {
    shortURL = req.params.short;
    // console.log(shortURL);
    const findUrl = await URL.findOne({ shortURL: shortURL }, "_id longURL count");
    if (findUrl) {
        findUrl.count++;
        await findUrl.save();
        res.redirect(findUrl.longURL);
    }
    else
        res.redirect("/");
})
if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`port ${process.env.PORT}`);
});