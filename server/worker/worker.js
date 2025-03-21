
const extractTextFromPDF = require("../utils/extractTextFromPDF");
const matchResumeWithJobDescription = require("../utils/match_Resume_With_JobDesc");


module.exports = async (resume) => {
  try {
    const resumeText = await extractTextFromPDF(resume.resumeURL);
    
    const matched = await matchResumeWithJobDescription(
      resumeText.text,
      resume.jobDescription
    );

    return {
      ...matched,
      resumeURL: resume.resumeURL,
      attemptId: resume.attemptId,
    };

} catch (error) {

    console.log("error in worker", error);
    return { resumeId: resume._id, matched: false };

}
};
