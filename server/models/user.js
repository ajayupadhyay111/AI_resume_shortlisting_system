const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    attemptCount: {
        type: Number,
        default: 0
    },
    refreshToken: {
        type: String,
        default: null
    },
    refreshTokenExpiryDate: {
        type: Date,
        default: null
    }
},{timestamps:true})


const User = mongoose.model("User", userSchema);

module.exports = User;
