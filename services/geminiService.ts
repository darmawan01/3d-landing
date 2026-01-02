
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAssetStory = async (assetTitle: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a philosopher-curator for a futuristic museum of human memories. Write a short, evocative (max 30 words) "provenance record" for a 3D scan of "${assetTitle}". The tone should be slightly melancholic yet awe-inspiring, focusing on the weight of preserving physical reality forever. Description context: ${description}. Do not use clichés like "tucked away" or "frozen in time".`,
      config: {
        temperature: 0.85,
        maxOutputTokens: 150,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A digital silhouette of a physical existence, successfully migrated to the infinite cloud.";
  }
};
