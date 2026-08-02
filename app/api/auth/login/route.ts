import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Wrong password" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Login success",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Login error" },
      { status: 500 }
    );
  }
}