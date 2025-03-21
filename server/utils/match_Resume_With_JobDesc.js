const { GoogleGenerativeAI } = require("@google/generative-ai");

const matchResumeWithJobDescription = async (resumeText, jobDescription) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Apna API key yaha daalo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Compare the given resume text with the job description and calculate the match percentage based on relevant keywords, skills, experience, and qualifications. 

Return the response in JSON format with the following structure:
{
    "name": "John Doe",
    "experience": "3 years" (or "Fresher" if no experience is mentioned),
    "role": "Software Developer",
    "currentLocation": "New York, USA",
    "score": 72,
    "status": "Shortlisted" (if score >= 50, otherwise "Rejected")
}

Job Description: ${jobDescription}
Resume Text: ${resumeText}`;

    const result = await model.generateContent(prompt);

    return {success:true,matchResult:result.response.text()}
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = matchResumeWithJobDescription;
