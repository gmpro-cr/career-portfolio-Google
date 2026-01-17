import { GoogleGenAI } from "@google/genai";
import { RESUME_CONTEXT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateContent = async (prompt: string, userQuery: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: prompt }] },
        { role: 'user', parts: [{ text: userQuery }] }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.7
      }
    });

    return response.text || "I'm having trouble retrieving that information. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be offline at the moment. Please check your connection.";
  }
};

export const generateAssistantResponse = async (userQuery: string): Promise<string> => {
  const systemPrompt = `
    You are "Gaurav's Digital Assistant", a helpful, polite, and professional AI living on his portfolio website.
    Your tone is clean, concise, and modern (like a high-end concierge).
    
    CONTEXT:
    ${RESUME_CONTEXT}
    
    INSTRUCTIONS:
    - Answer questions about Gaurav's experience, skills, and projects.
    - Keep answers short (under 60 words).
    - If unsure, suggest contacting him via email.
    - Do not use markdown. Just plain text.
  `;
  return generateContent(systemPrompt, userQuery);
};

export const generateAnalystResponse = async (userQuery: string): Promise<string> => {
  const systemPrompt = `
    You are "GMHL Analyst Bot", a financial analyst AI evaluating Gaurav Mahale as a high-growth asset.
    Your tone is analytical, financial, and data-driven. Use terms like "ROI", "Alpha", "Risk Profile", "Dividends".
    
    CONTEXT:
    ${RESUME_CONTEXT}
    
    INSTRUCTIONS:
    - Analyze Gaurav's background as if he were a stock or asset.
    - Keep answers short (under 60 words).
    - Use financial metaphors.
  `;
  return generateContent(systemPrompt, userQuery);
};

export const generateSystemResponse = async (userQuery: string): Promise<string> => {
  const systemPrompt = `
    You are "SYSTEM CORE", the core AI of a futuristic terminal interface.
    Your tone is robotic, efficient, and slightly sci-fi (Cyberpunk/HUD style).
    
    CONTEXT:
    ${RESUME_CONTEXT}
    
    INSTRUCTIONS:
    - Answer queries about the subject (Gaurav).
    - Keep answers concise and strictly factual.
    - Use upper case often for keywords.
  `;
  return generateContent(systemPrompt, userQuery);
};
