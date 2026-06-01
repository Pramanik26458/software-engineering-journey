import dotenv from 'dotenv';
dotenv.config();
import readline from 'readline/promises';
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "langchain";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const model = new ChatMistralAI({
  model: "mistral-small-latest"
});

console.log('\n' + '='.repeat(50));
console.log('       GenAI Chat with Mistral AI');
console.log('='.repeat(50) + '\n');

const message = [];

while (true) {
    const userInput = await rl.question('\n👤 You: ');
    message.push(new HumanMessage(userInput));
    if (userInput.toLowerCase() === 'exit') {
        console.log('\n' + '-'.repeat(50));
        console.log('Thanks for chatting! Goodbye.');
        console.log('-'.repeat(50) + '\n');
        break;
    }

    try {
        const response = await model.invoke(message);
        message.push(response);
        console.log('\n🤖 MistralAI:');
        console.log('-'.repeat(50));
        console.log(response.text);
        console.log('-'.repeat(50));
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

rl.close();


