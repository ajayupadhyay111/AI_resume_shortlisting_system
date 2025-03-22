const Piscina = require("piscina");
const path = require("path");
const os = require("os");
const mongoose = require("mongoose");
const Candidate = require("../models/candidate");
const Attempt = require("../models/attempt");

const processResumes = async (resumes) => {
  try {
    const results = [];
    const pool = new Piscina({
      filename: path.join(__dirname, ".././worker/worker.js"),
      maxThreads: os.cpus().length - 1,
    });

    let length = os.cpus().length - 1;
    for (let i = 0; i < resumes.length; i += length) {
      const batch_of_resumes = resumes.slice(i, i + length);


      const match = batch_of_resumes.map((resume) => pool.run(resume));
      const matches = await Promise.all(match);
      results.push(...matches);
    }


    for (let i = 0; i < results.length; i++) {
      // 🔥 Regex to extract JSON content
      const jsonString = results[i].matchResult
        .replace(/```json\n|```/g, "")
        .trim();

      // ✅ Convert to JSON object
      const jsonObject = JSON.parse(jsonString);

      const candidate = new Candidate({
        name: jsonObject.name,
        experience: jsonObject.experience,
        score: jsonObject.score,
        resumeURL: results[i].resumeURL,
        location: jsonObject.currentLocation,
        status: jsonObject.status,
        attemptId: results[i].attemptId,
      });
      await candidate.save();

      const attempt = await Attempt.findById(results[i].attemptId);
      attempt.candidateId.push(candidate._id);
      attempt.role = jsonObject.role;
      await attempt.save();
    }
    return "done";
  } catch (error) {
    console.log("error in processResumes", error);
    return [];
  }
};

module.exports = processResumes;
