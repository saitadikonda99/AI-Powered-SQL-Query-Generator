import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';

import ChatSession from "@/models/chatSession";

interface IRequestBody {
    message: string;
    apiKey: string;
    sessionId: string;
}

export const POST = async (req: NextRequest) => {
    try {
        
        const { message, apiKey, sessionId }: IRequestBody = await req.json();

        const genAI = new GoogleGenerativeAI(apiKey);

        if (!genAI) {
            return NextResponse.json({ error: "Invalid API key check again" }, { status: 401 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const response = await model.generateContent(`${message}`);


        const chatSession = await ChatSession.findOne({ sessionId });
        

        chatSession.messages.push({ role: "user", content: message });

        chatSession.messages.push({ role: "ai", content: response.response.text() });

        await chatSession.save();

        const aiResponse = await ChatSession.findOne({ sessionId });

        return NextResponse.json({ response: aiResponse, sessionId }, { status: 200 });

    } catch (error) {
        console.error("Error generating SQL query:", error);
        return NextResponse.json({ message: "Please check your API key" }, { status: 500 });
    }
}
