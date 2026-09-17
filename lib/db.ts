import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  const MONGO_URI =
    process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("MongoDB URI not found ❌");
  }

  await mongoose.connect(MONGO_URI);

  console.log("MongoDB Connected ✅");
};