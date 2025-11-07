import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"
import { getServerSession } from "next-auth/next"

/**
 * GET /api/users/[id]
 * Get user profile
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const user = await User.findById(params.id).populate("clubsJoined").populate("eventsRegistered").select("-password")

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user)
  } catch (error) {
    console.error("Get user error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/users/[id]
 * Update user profile (auth required)
 */
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session || session.user.id !== params.id) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await connectDB()

    const user = await User.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).select("-password")

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    return Response.json(user)
  } catch (error) {
    console.error("Update user error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
