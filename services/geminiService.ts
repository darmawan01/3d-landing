
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAssetStory = async (assetTitle: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a philosopher-curator for a futuristic museum of human memories. Write a short, evocative (max 25 words) "provenance record" for a 3D scan of "${assetTitle}". Focus on the weight of preserving physical reality. Description context: ${description}.`,
      config: {
        temperature: 0.8,
        maxOutputTokens: 100,
      }
    });
    // Use the .text property directly as per the latest SDK guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A digital silhouette of physical existence.";
  }
};

export const suggestRemix = async (assetTitle: string, userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a futuristic 3D visual remix for an object titled "${assetTitle}". The user wants: "${userPrompt}". Describe the new material properties (e.g., iridescent glass, liquid chrome, obsidian) and environmental lighting in 2 sentences. Be highly technical and creative.`,
      config: {
        temperature: 0.9,
        maxOutputTokens: 100,
      }
    });
    // Use the .text property directly as per the latest SDK guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Neural patterns suggest an iridescent glass finish with high-frequency emission pulses.";
  }
};
