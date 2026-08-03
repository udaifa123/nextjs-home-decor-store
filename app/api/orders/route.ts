import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  // ✅ IMPORTANT FILTER
  const orders = await Order.find({ userId });

  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.items || !body.total) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    const order = await Order.create(body);

    return NextResponse.json(order, { status: 201 });

  } catch (error) {
    console.error("Order error:", error);

    return NextResponse.json(
      { message: "Order creation failed" },
      { status: 500 }
    );
  }
}