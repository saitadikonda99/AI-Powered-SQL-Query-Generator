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

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


        // Wrap AI call in its own try/catch to handle rate limits specifically
        let aiResponseText: string;
        try {
            const response = await model.generateContent(`${message}`);
            aiResponseText = response.response.text();
        } catch (aiError: unknown) {
            console.error("AI generation error:", aiError);
            
            // Check for rate limit error (429)
            if (aiError instanceof Error && (aiError.message?.includes('429') || aiError.message?.includes('Too Many Requests'))) {
                return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
            }
            
            // Check for quota exceeded
            if (aiError instanceof Error && aiError.message?.includes('quota')) {
                return NextResponse.json({ error: "API quota exceeded. Please try again later." }, { status: 429 });
            }
            
            // Handle other AI-specific errors
            return NextResponse.json({ error: "Failed to generate response. Please check your API key." }, { status: 400 });
        }

        // Only proceed with database operations after successful AI response
        const client = await clientPromise;
        const db = client.db();

        const chatSession = await db.collection("chatSessions").findOne({ sessionId });
        
        if (!chatSession) {
            return NextResponse.json({ message: "Chat session not found" }, { status: 404 });
        }

        chatSession.messages.push({ role: "user", content: message });
        chatSession.messages.push({ role: "ai", content: aiResponseText });

        await db.collection("chatSessions").updateOne({ sessionId }, { $set: chatSession });

        const aiResponse = await db.collection("chatSessions").findOne({ sessionId });

        console.log(aiResponse);

        return NextResponse.json({ chatSession: aiResponse, sessionId }, { status: 200 });

    } catch (error) {
        console.error("Error generating SQL query:", error);
        return NextResponse.json({ message: "An unexpected error occurred. Please try again." }, { status: 500 });
    }
}
