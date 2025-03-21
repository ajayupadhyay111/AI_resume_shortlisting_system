const Attempt = require("../models/attempt");
const Candidate = require("../models/candidate");
const User = require("../models/user");
const processResumes = require("../utils/processResumes");
const worker = require("../worker/worker");

const resumeController = {
  matchResumeWithJobDescription: async (req, res, next) => {
    try {
      const { jobDescription } = req.body;
      const userId = req.userId;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No resumes uploaded" });
      }

      if (!jobDescription) {
        return res.status(400).json({ message: "Job description is required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.attemptCount >= 5) {
        return res
          .status(400)
          .json({
            message: "You have reached the maximum limit of your free account",
          });
      }

      // whenever user upload the resume then create a new attempt and this will ensure that the user can only take 5 attempts on free account when user takes the subscription then the number of attempts will be unlimited based on the subscription plan.
      const attempt = new Attempt({
        role: "",
        shortlistResumes: 0,
        rejectedResumes: 0,
        TotalResumes: req.files.length,
        uploaderId: userId,
        jobDescription,
      });

      await attempt.save();
    
      user.attemptCount = await Attempt.countDocuments({ uploaderId: userId });
      await user.save();


      const resumes = [];
      req.files.forEach(file => {
        resumes.push({
          resumeURL: file.path,
          jobDescription,
          attemptId: attempt._id.toString(),
        });
      });
      // send all resumes to the process function and extract their text then match it with the job description
      const matchedResumes = await processResumes(resumes);

      let rejectedResumes = await Candidate.countDocuments({status:"Rejected",attemptId:attempt._id});
      let shortlistResumes = await Candidate.countDocuments({status:"Shortlisted",attemptId:attempt._id});
      console.log("rejectedResumes ", rejectedResumes);
      console.log("shortlistResumes ", shortlistResumes);
      await Attempt.findByIdAndUpdate(attempt._id, {
        rejectedResumes,
        shortlistResumes,
      });
    
      res.status(200).json({success:true});
    } catch (error) {
      next(error);
    }
  },
  getAttempts: async (req, res, next) => {
    try {
      const userId = req.userId;
      const attempts = await Attempt.find({ uploaderId: userId });
      res.status(200).json(attempts);
    } catch (error) {
      next(error);
    }
  },
  getCandidatesByAttemptId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const candidates = await Candidate.find({attemptId:id});
      res.status(200).json(candidates);
    } catch (error) {
      next(error);
    }
  }
};



module.exports = resumeController;
