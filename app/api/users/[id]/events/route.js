import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"

/**
 * GET /api/users/[id]/events
 * Get user's registered events
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const user = await User.findById(params.id).populate("eventsRegistered")

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user.eventsRegistered)
  } catch (error) {
    console.error("Get user events error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
