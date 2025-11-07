import mongoose from "mongoose"

/** @type {mongoose.Connection | null} */
let cachedConnection = null

/**
 * Connect to MongoDB
 * @returns {Promise<mongoose.Connection>}
 */
export async function connectDB() {
  if (cachedConnection) {
    console.log("Using cached DB connection")
    return cachedConnection
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    cachedConnection = connection
    console.log("MongoDB connected successfully")
    return connection
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
