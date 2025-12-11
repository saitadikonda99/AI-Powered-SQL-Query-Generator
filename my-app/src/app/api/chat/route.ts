import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from 'uuid';
import clientPromise from "@/lib/mongodb";

import ChatSession from "@/models/chatSession";

interface IRequestBody {
    message: string;
    apiKey: string;
}

export const POST = async (req: NextRequest) => {
    try {
        
        const { message, apiKey }: IRequestBody = await req.json();

        const genAI = new GoogleGenerativeAI(apiKey);

        if (!genAI) {
            return NextResponse.json({ error: "Invalid API key check again" }, { status: 401 });
        }

       const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const response = await model.generateContent(`${message}`);

        console.log("AI Response:", response.response.text());

        const client = await clientPromise;
        const db = client.db();

        const chatSession = new ChatSession({
            sessionId: uuidv4(),
            messages: []
        });

        chatSession.messages.push({ role: "user", content: message });

        chatSession.messages.push({ role: "ai", content: response.response.text() });

        await db.collection("chatSessions").insertOne(chatSession);

        console.log("chatSession", chatSession);

        const aiResponse = await db.collection("chatSessions").findOne({ sessionId: chatSession.sessionId });

        return NextResponse.json({ response: aiResponse, sessionId: chatSession.sessionId }, { status: 200 });

    } catch (error) {
        console.error("Error generating SQL query:", error);
        return NextResponse.json({ message: "Please check your API key" }, { status: 500 });
    }
}
