const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
  {
    role: String,
    shortlistResumes: Number,
    rejectedResumes: Number,
    TotalResumes: Number,
    uploaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobDescription: String,
    candidateId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Attempt = mongoose.model("Attempt", attemptSchema);

module.exports = Attempt;
