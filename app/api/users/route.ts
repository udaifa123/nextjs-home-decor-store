import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ get email from URL
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // ✅ if email exists → return that user only
    if (email) {
      const user = await User.find({ email });
      return NextResponse.json(user);
    }

    // ✅ else return all users
    const users = await User.find();
    return NextResponse.json(users);

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}