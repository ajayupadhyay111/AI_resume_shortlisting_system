const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    attemptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attempt",
        required: true
    },
    name:String,
    experience:String,
    score:Number,
    resumeURL:String,
    location:String,
    status:String
},{
    timestamps: true
})

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
