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

const recentSearch = new mongoose.Schema({
    searchWord: {
        type: String,
        required: true
    },
    searchDate: {
        type: Date,
        default: Date.now
    },
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
        type: recentSearch,
        default: () => ({}),
    }],
});

module.exports = conn.dropgodb.model("User", modelDesign);