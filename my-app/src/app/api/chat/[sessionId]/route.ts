import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import clientPromise from "@/lib/mongodb";

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

        const client = await clientPromise;
        const db = client.db();

        const chatSession = await db.collection("chatSessions").findOne({ sessionId });
        
        if (!chatSession) {
            return NextResponse.json({ message: "Chat session not found" }, { status: 404 });
        }

        chatSession.messages.push({ role: "user", content: message });
        chatSession.messages.push({ role: "ai", content: response.response.text() });

        await db.collection("chatSessions").updateOne({ sessionId }, { $set: chatSession });

        const aiResponse = await db.collection("chatSessions").findOne({ sessionId });

        console.log(aiResponse);

        return NextResponse.json({ chatSession: aiResponse, sessionId }, { status: 200 });

    } catch (error) {
        console.error("Error generating SQL query:", error);
        return NextResponse.json({ message: "Please check your API key" }, { status: 500 });
    }
}
