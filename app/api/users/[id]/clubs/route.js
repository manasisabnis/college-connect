import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"

/**
 * GET /api/users/[id]/clubs
 * Get user's joined clubs
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const user = await User.findById(params.id).populate("clubsJoined")

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user.clubsJoined)
  } catch (error) {
    console.error("Get user clubs error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
