import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;
    if (!mongodbURI) {
      throw new Error("❌ MONGO_URI is not defined in environment variables.");
    }

    const db = await mongoose.connect(mongodbURI, {
      dbName: process.env.MONGO_DB_NAME || undefined,
    });
    console.log("✅ MongoDB connected:", db.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
