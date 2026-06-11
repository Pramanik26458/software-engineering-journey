import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    mistral: "mistral-small-latest",
    temperature: 0.3, 
    maxRetries: 3,
    apiKey: process.env.MISTRAL_API_KEY
})

export async function testAi() {
    geminiModel.invoke([
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

export async function genertaeResponse(message) {
    const response = await geminiModel.invoke([
        new HumanMessage(message)
    ]);

    return response.text;

}

export async function generateChatTitle(message) {
    const response = await mistralModel.invoke([
        new SystemMessage(`  You are a helpful assistant that generates conscious and descriptive titles for the chat conversation.
            
            User will provide you with the first message of the chat conversion, And you will generate a title that capture the essence of the conversation in 2 to four words The title should be clear relevant and engaging ,giving user a quick understanding of the chat's Topic. 
            `),
        new HumanMessage(` Generate a title for website conversation based on the following first message: "${message}"`)
    ])
    return response.text;
}

