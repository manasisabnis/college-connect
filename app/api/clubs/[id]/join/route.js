import { connectDB } from "@/lib/mongodb"
import { Club } from "@/lib/models/club"
import { User } from "@/lib/models/user"
import { getServerSession } from "next-auth/next"

/**
 * POST /api/clubs/[id]/join
 * Join club (auth required)
 */
export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const club = await Club.findById(params.id)
    if (!club) {
      return Response.json({ message: "Club not found" }, { status: 404 })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    // Check if already a member
    if (club.members.includes(session.user.id)) {
      return Response.json({ message: "Already a member of this club" }, { status: 409 })
    }

    club.members.push(session.user.id)
    user.clubsJoined.push(params.id)

    await club.save()
    await user.save()

    return Response.json({ message: "Joined club successfully" })
  } catch (error) {
    console.error("Join club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/clubs/[id]/join
 * Leave club (auth required)
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const club = await Club.findById(params.id)
    const user = await User.findById(session.user.id)

    if (!club || !user) {
      return Response.json({ message: "Club or user not found" }, { status: 404 })
    }

    club.members = club.members.filter((id) => id.toString() !== session.user.id)
    user.clubsJoined = user.clubsJoined.filter((id) => id.toString() !== params.id)

    await club.save()
    await user.save()

    return Response.json({ message: "Left club successfully" })
  } catch (error) {
    console.error("Leave club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
