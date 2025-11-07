import { connectDB } from "@/lib/mongodb"
import { Club } from "@/lib/models/club"

/**
 * GET /api/clubs
 * Get all clubs with optional search filter
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    await connectDB()

    let query = {}
    if (search) {
      query = { $or: [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }] }
    }

    const clubs = await Club.find(query).populate("members")
    return Response.json(clubs)
  } catch (error) {
    console.error("Get clubs error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/clubs
 * Create new club
 */
export async function POST(request) {
  try {
    const body = await request.json()
    await connectDB()

    const club = new Club(body)
    await club.save()

    return Response.json(club, { status: 201 })
  } catch (error) {
    console.error("Create club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
