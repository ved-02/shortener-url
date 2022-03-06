const mongoose = require("mongoose");
const User = require("./user");

const urlSchema = mongoose.Schema({
    longURL: {
        type: String,
        required: true,
    },
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    count: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    }
},
    { collection: "URLs" }
);

const model = mongoose.model("URLs", urlSchema);
module.exports = model;