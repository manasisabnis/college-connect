import { connectDB } from "@/lib/mongodb"
import { Talk } from "@/lib/models/talk"

/**
 * GET /api/talks/[id]
 * Get talk details
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const talk = await Talk.findById(params.id).populate("registrations")

    if (!talk) {
      return Response.json({ message: "Talk not found" }, { status: 404 })
    }

    return Response.json(talk)
  } catch (error) {
    console.error("Get talk error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/talks/[id]
 * Update talk
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    await connectDB()

    const talk = await Talk.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!talk) {
      return Response.json({ message: "Talk not found" }, { status: 404 })
    }

    return Response.json(talk)
  } catch (error) {
    console.error("Update talk error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/talks/[id]
 * Delete talk
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const talk = await Talk.findByIdAndDelete(params.id)

    if (!talk) {
      return Response.json({ message: "Talk not found" }, { status: 404 })
    }

    return Response.json({ message: "Talk deleted successfully" })
  } catch (error) {
    console.error("Delete talk error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
