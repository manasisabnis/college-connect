import { connectDB } from "@/lib/mongodb"
import { Event } from "@/lib/models/event"

/**
 * GET /api/events/[id]
 * Get event details
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const event = await Event.findById(params.id).populate("hostClub").populate("registrations")

    if (!event) {
      return Response.json({ message: "Event not found" }, { status: 404 })
    }

    return Response.json(event)
  } catch (error) {
    console.error("Get event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/events/[id]
 * Update event
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    await connectDB()

    const event = await Event.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!event) {
      return Response.json({ message: "Event not found" }, { status: 404 })
    }

    return Response.json(event)
  } catch (error) {
    console.error("Update event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/events/[id]
 * Delete event
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const event = await Event.findByIdAndDelete(params.id)

    if (!event) {
      return Response.json({ message: "Event not found" }, { status: 404 })
    }

    return Response.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Delete event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
