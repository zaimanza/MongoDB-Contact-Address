const mongoose = require("mongoose");

const conn = require("../middleware/connection");

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
    }],
});

const modelDesign = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
    }],
    categories: [{
        type: category,
        default: () => ({}),
    }],
    recentSearch: [{
        type: String,
    }],
});

module.exports = conn.dropgodb.model("User", modelDesign);