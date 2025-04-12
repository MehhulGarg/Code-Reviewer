const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function generateContent(message) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    // Try accessing candidates array if available
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("No valid response text.");
      return "No response received.";
    }

    return text;
  } catch (error) {
    console.error("Error in generateContent:", error);
    return "Error generating content.";
  }
}

module.exports = generateContent;
