const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({
    name: String
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    { collection: "Users" }
);

const model = mongoose.model("User", userSchema);

module.exports = model;