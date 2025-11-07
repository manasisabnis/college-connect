import { connectDB } from "@/lib/mongodb"
import { Talk } from "@/lib/models/talk"
import { User } from "@/lib/models/user"
import { getServerSession } from "next-auth/next"

/**
 * POST /api/talks/[id]/register
 * Register user for talk (auth required)
 */
export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const talk = await Talk.findById(params.id)
    if (!talk) {
      return Response.json({ message: "Talk not found" }, { status: 404 })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    if (talk.registrations.includes(session.user.id)) {
      return Response.json({ message: "Already registered for this talk" }, { status: 409 })
    }

    talk.registrations.push(session.user.id)
    user.talksRegistered.push(params.id)

    await talk.save()
    await user.save()

    return Response.json({ message: "Registered successfully" })
  } catch (error) {
    console.error("Register talk error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
