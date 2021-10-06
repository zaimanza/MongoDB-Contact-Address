const mongoose = require("mongoose");

const conn = require("../middleware/connection");

const modelDesign = new mongoose.Schema({
    isFav: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String,
        required: true
    },
    pNum: {
        type: String,
        required: true
    },
});

module.exports = conn.dropgodb.model("Contact", modelDesign);