import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "../../../models/Order";


export async function GET() {

  await connectDB();

  const orders = await Order.find();

  return NextResponse.json(orders);
}


export async function POST(req: Request) {

  try {

    await connectDB();

    const body = await req.json();

    const order = await Order.create(body);

    return NextResponse.json(order);

  } catch(error) {

    return NextResponse.json(
      {
        message:"Order creation failed"
      },
      {
        status:500
      }
    );

  }

}