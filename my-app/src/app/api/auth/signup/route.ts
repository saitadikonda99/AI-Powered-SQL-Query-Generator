import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import User from "@/models/userScheme";

export const POST = async (req: NextRequest) => {
    try {
        
        const { user } = await req.json();

        const client = await clientPromise;
        const db = client.db('');

        const existingUser = await db.collection("users").findOne({ email: user.email });

        console.log(existingUser)

        if (!existingUser) {
            const newUser = new User(user);
            await db.collection("users").insertOne(newUser);
        }

        return NextResponse.json({ message: 'login successful', status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({message: 'signup failed', status: 500})
    }
}