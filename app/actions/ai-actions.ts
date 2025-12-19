'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateText(prompt: string) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return { error: "GEMINI_API_KEY is not set in environment variables." };
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using gemini-1.5-flash as it is the current standard efficient model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return { text };
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return { error: `Failed to generate text: ${error.message || 'Unknown error'}` };
    }
}

export async function generateImage(prompt: string) {
    // Using Pollinations.ai for dynamic, real-time AI image generation
    // This does not require an API key and generates real images based on the prompt.
    const encodedPrompt = encodeURIComponent(prompt);
    // Add a random seed to ensure uniqueness if prompt is same
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&nologo=true`;

    return {
        imageUrl,
        success: true
    };
}
