const PdfParse = require("pdf-parse");
const axios = require("axios");

const extractTextFromPDF = async (pdfURL) => {
  try {

    const response = await axios.get(pdfURL, { responseType: "arraybuffer" });
    
    const extractedText = await PdfParse(response.data, {
      normalizeWhitespace: true,
    });
    
    return { success: true, text: extractedText.text };
  
} catch (error) {
    console.log("error in extractTextFromPDF", error);
    return { success: false, message: error.message };
  }
};

module.exports = extractTextFromPDF;
