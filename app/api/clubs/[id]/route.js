import { connectDB } from "@/lib/mongodb"
import { Club } from "@/lib/models/club"

/**
 * GET /api/clubs/[id]
 * Get club details
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const club = await Club.findById(params.id).populate("members").populate("events")

    if (!club) {
      return Response.json({ message: "Club not found" }, { status: 404 })
    }

    return Response.json(club)
  } catch (error) {
    console.error("Get club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/clubs/[id]
 * Update club
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    await connectDB()

    const club = await Club.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!club) {
      return Response.json({ message: "Club not found" }, { status: 404 })
    }

    return Response.json(club)
  } catch (error) {
    console.error("Update club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/clubs/[id]
 * Delete club
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const club = await Club.findByIdAndDelete(params.id)

    if (!club) {
      return Response.json({ message: "Club not found" }, { status: 404 })
    }

    return Response.json({ message: "Club deleted successfully" })
  } catch (error) {
    console.error("Delete club error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
