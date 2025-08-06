const axios = require('axios');
require('dotenv').config();

async function analyzeStudentData(textContent, imageBase64) {
    try {
        const parts = [{ text: textContent }];
        if (imageBase64) {
            parts.push({
                inline_data: {
                    mime_type: "image/png",
                    data: imageBase64
                }
            });
        }

        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
            { contents: [{ parts }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': process.env.GEMINI_API_KEY
                }
            }
        );

        const candidate = response.data?.candidates?.[0];
        return candidate?.content?.parts?.[0]?.text || "No AI output available.";
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        return "AI analysis failed.";
    }
}

module.exports = { analyzeStudentData };
