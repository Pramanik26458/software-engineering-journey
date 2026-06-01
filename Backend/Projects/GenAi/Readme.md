# 🤖 GenAI Chatbot with LangChain & Mistral AI

## 📖 Project Overview

This project demonstrates how to build a conversational AI application using Node.js, LangChain, and Mistral AI.

The application runs inside a terminal and allows users to interact with a Large Language Model (LLM) through natural language.

Unlike a basic prompt-response application, this implementation maintains conversation history, enabling the model to understand context from previous interactions.

The project serves as a foundational implementation for:

* AI Assistants
* Customer Support Systems
* Personal AI Chatbots
* Retrieval-Augmented Generation (RAG) Systems
* AI Agent Architectures

---

# 🎯 Why This Project Matters

Most beginner AI projects send a single prompt to a model and display the response.

Real-world conversational systems require:

* Context Awareness
* Memory
* Message Management
* Error Handling
* Secure Configuration

This project introduces these concepts through a practical implementation.

Understanding the architecture presented here provides the foundation necessary for building more advanced AI systems.

---

# 🏗️ Technologies Used

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript Runtime              |
| LangChain  | LLM Application Framework       |
| Mistral AI | Large Language Model            |
| dotenv     | Environment Variable Management |
| readline   | Terminal Interaction            |

---

# 📚 Learning Objectives

## Generative AI (GenAI)

Generative AI is a category of Artificial Intelligence capable of producing new content such as text, images, audio, video, and source code.

Traditional software follows predefined instructions.

Generative AI learns patterns from large datasets and dynamically generates outputs based on context.

Examples:

* ChatGPT
* Gemini
* Claude
* Mistral

---

## Large Language Models (LLMs)

Large Language Models are neural networks trained on vast collections of textual information.

Their primary objective is to understand and generate human language.

An LLM predicts the most probable next token based on the context provided.

Examples:

* GPT
* Gemini
* Claude
* Mistral

---

## AI Service Providers

An AI Service Provider offers access to AI models through APIs.

Instead of training and hosting models independently, developers consume these services.

Examples:

* OpenAI
* Google AI
* Anthropic
* Mistral AI

In this project, Mistral AI acts as the AI Service Provider.

---

## LangChain

LangChain is an application framework designed specifically for Large Language Models.

Responsibilities include:

* Prompt Management
* Conversation Memory
* Tool Integration
* Agent Development
* Retrieval Systems

LangChain simplifies communication between applications and LLMs.

---

# 🏛️ System Architecture

```text
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Readline   │
│ (Terminal)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Message     │
│ History     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ LangChain   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Mistral AI  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ AI Response │
└─────────────┘
```

---

# 📁 Project Structure

```text
GenAI-Chatbot/
│
├── index.js
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Step 1: Initialize Project

```bash
npm init -y
```

---

## Step 2: Install Dependencies

```bash
npm install dotenv
npm install @langchain/mistralai
npm install @langchain/core
```

---

## Step 3: Create Environment File

Create a `.env` file:

```env
MISTRAL_API_KEY=YOUR_API_KEY
```

---

# 🚀 Complete Source Code

```javascript
import dotenv from 'dotenv';
dotenv.config();

import readline from 'readline/promises';
import { ChatMistralAI } from '@langchain/mistralai';
import { HumanMessage } from '@langchain/core/messages';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const model = new ChatMistralAI({
    model: 'mistral-small-latest'
});

const messages = [];

while (true) {

    const userInput =
        await rl.question('\n👤 You: ');

    if (userInput.toLowerCase() === 'exit') {
        break;
    }

    messages.push(
        new HumanMessage(userInput)
    );

    const response =
        await model.invoke(messages);

    messages.push(response);

    console.log(response.text);
}

rl.close();
```

---

# 🔍 Code Breakdown

## Loading Environment Variables

```javascript
dotenv.config();
```

Loads values stored inside `.env`.

Purpose:

* Protect API Keys
* Separate configuration from source code

---

## Creating Terminal Interface

```javascript
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
```

Creates an interactive terminal session.

---

## Initializing Mistral AI

```javascript
const model = new ChatMistralAI({
    model:'mistral-small-latest'
});
```

Creates a connection to the Mistral AI model.

---

## Creating Memory

```javascript
const messages = [];
```

Stores conversation history.

Acts as chatbot memory.

---

# 🧠 Understanding Chat History

Without memory:

```text
User: My name is Basak

User: What is my name?
```

Response:

```text
I don't know.
```

The model never saw the first message.

---

With memory:

```javascript
messages.push(
 new HumanMessage(userInput)
);

messages.push(response);
```

The complete history is stored.

---

# 📦 Message Evolution

Initial:

```javascript
[]
```

After first message:

```text
[
 Human: My name is Basak
]
```

After AI response:

```text
[
 Human: My name is Basak,
 AI: Nice to meet you Basak
]
```

After second message:

```text
[
 Human: My name is Basak,
 AI: Nice to meet you Basak,
 Human: What is my name?
]
```

---

# 🔄 Request Lifecycle

```text
User Input
      ↓
Readline
      ↓
HumanMessage
      ↓
messages[]
      ↓
LangChain
      ↓
Mistral AI
      ↓
AI Response
      ↓
Store Response
      ↓
Display Output
```

---

# Stateless vs Stateful Conversations

## Stateless

Each request is independent.

```text
Request 1

Request 2

Request 3
```

No memory exists.

---

## Stateful

Previous interactions are preserved.

```text
Request 1

Request 1 + 2

Request 1 + 2 + 3
```

Context exists.

This project implements a stateful architecture.

---

# ⚠️ Error Handling

```javascript
try{
   const response =
      await model.invoke(messages);
}
catch(error){
   console.log(error.message);
}
```

Protects against:

* Invalid API Keys
* Network Failures
* Rate Limits
* Service Outages

---

# 🧪 Example Conversation

```text
👤 You:
My name is Basak

🤖 AI:
Nice to meet you, Basak.

👤 You:
What is my name?

🤖 AI:
Your name is Basak.
```

---

# 🚧 Current Limitations

Conversation history exists only in memory.

If the application stops:

```text
All previous conversations are lost.
```

Persistent memory is not implemented.

---

# 🔮 Future Improvements

* System Messages
* Persistent Chat History
* Streaming Responses
* Prompt Templates
* RAG
* Vector Databases
* AI Agents
* Tool Calling
* Multi-Model Support

---

# ✅ Key Concepts Covered

* Generative AI
* Large Language Models
* AI Service Providers
* LangChain
* Environment Variables
* HumanMessage
* Chat History
* Stateful Conversations
* Request Lifecycle
* Error Handling

---

# 🏁 Conclusion

This project demonstrates how conversational AI applications maintain context through chat history.

By storing both user messages and AI responses inside a message array and sending the complete conversation to the model during every request, the chatbot can generate context-aware responses.

The concepts introduced here provide the foundation for building advanced AI systems including assistants, retrieval systems, autonomous agents, and enterprise-grade conversational platforms.
