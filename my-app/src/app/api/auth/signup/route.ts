import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const POST = async (req: NextRequest, res:NextResponse) => {
    try {
        
        const { user } = await req.json();

        const client = await clientPromise;
        const db = client.db('');

        const existingUser = await db.collection("users").findOne({ email: user.email });

        console.log(existingUser)

        if (!existingUser) {
            await db.collection("users").insertOne({
                name: user.name,
                email: user.email,
                createdAt: new Date(),
            });
        }

        return NextResponse.json({ message: 'login successful', status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'signup failed', status: 500})
    }
}