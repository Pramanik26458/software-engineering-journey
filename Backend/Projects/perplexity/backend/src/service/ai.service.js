import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

export async function testAi() {
    model.invoke([
        {
            role: "user",
            content: "What is AI explain under 100 words? in simple so that a 5 year old can understand"
        }
    ]).then((response) => {
        console.log("AI Response:", response);
    }).catch((error) => {
        console.error("Error invoking AI model:", error);
    });
}