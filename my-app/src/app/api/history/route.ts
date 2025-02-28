import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const GET = async (req: NextRequest) => {
    try {
        const sessionId = req.nextUrl.searchParams.get('sessionId');
        
        if (!sessionId) {
            return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const chatSession = await db.collection("chatSessions").findOne({ sessionId });

        if (!chatSession) {
            return NextResponse.json({ message: "Chat session not found" }, { status: 404 });
        }

        return NextResponse.json({ chatSession }, { status: 200 });
    } catch (error) {
        console.error("Error fetching chat session:", error);
        return NextResponse.json({ message: "Error fetching chat session" }, { status: 500 });
    }
}