import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// ✅ GET SINGLE PRODUCT
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(null);
  }

  return NextResponse.json(product);
}

// ✅ UPDATE PRODUCT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(
    id,
    body,
    { returnDocument: "after" } // ✅ fix warning
  );

  return NextResponse.json(updated);
}

// ✅ DELETE PRODUCT
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  await Product.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}