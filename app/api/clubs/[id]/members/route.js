import { connectDB } from "@/lib/mongodb"
import { Club } from "@/lib/models/club"

/**
 * GET /api/clubs/[id]/members
 * Get club members
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const club = await Club.findById(params.id).populate("members")

    if (!club) {
      return Response.json({ message: "Club not found" }, { status: 404 })
    }

    return Response.json(club.members)
  } catch (error) {
    console.error("Get club members error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
