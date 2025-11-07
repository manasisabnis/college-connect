import { connectDB } from "@/lib/mongodb"
import { Event } from "@/lib/models/event"
import { getServerSession } from "next-auth/next"

/**
 * GET /api/events
 * Get all events with optional category filter
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    await connectDB()

    const query = category ? { category } : {}
    const events = await Event.find(query).populate("hostClub")

    return Response.json(events)
  } catch (error) {
    console.error("Get events error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/events
 * Create new event
 */
export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    await connectDB()

    const event = new Event(body)
    await event.save()

    return Response.json(event, { status: 201 })
  } catch (error) {
    console.error("Create event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
