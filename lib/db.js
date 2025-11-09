import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

// Global cache (important for Next.js hot reload)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "college-connect",
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB");
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
