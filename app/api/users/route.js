import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"

/**
 * GET /api/users
 * Get all users (admin only)
 */
export async function GET(request) {
  try {
    await connectDB()
    const users = await User.find({}).select("-password")
    return Response.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
