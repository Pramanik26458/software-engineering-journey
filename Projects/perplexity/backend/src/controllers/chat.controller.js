import { response } from "express";
import { genertaeResponse,generateChatTitle } from "../service/ai.service.js";

export async function sendMessage(req, res) {

    const { message } = req.body;

    const title= await generateChatTitle(message);
    console.log(title)

    const result = await genertaeResponse(message)

    
    res.json({
            AiMessage: result,
            title
        })
}


