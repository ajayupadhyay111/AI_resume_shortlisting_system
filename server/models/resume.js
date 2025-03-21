const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    resumeURL: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    attemptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attempt",
        required: true
    },
},{timestamps:true})

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;

