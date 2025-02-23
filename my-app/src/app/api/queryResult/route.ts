import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async (req: NextRequest) => {
    try {
        const { query } = await req.json();
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const response = await model.generateContent(`Generate a SQL query for: ${query}`);

        const aiResponse = response.response.text(); 

        console.log(aiResponse);

        return NextResponse.json({ response: aiResponse });

    } catch (error) {
        console.error("Error generating SQL query:", error);
        return NextResponse.json({ error: "Failed to generate SQL query" }, { status: 500 });
    }
}
