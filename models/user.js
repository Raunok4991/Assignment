const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String

    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
