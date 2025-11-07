import { connectDB } from "@/lib/mongodb"
import { Event } from "@/lib/models/event"
import { User } from "@/lib/models/user"
import { getServerSession } from "next-auth/next"

/**
 * POST /api/events/[id]/register
 * Register user for event (auth required)
 */
export async function POST(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const event = await Event.findById(params.id)
    if (!event) {
      return Response.json({ message: "Event not found" }, { status: 404 })
    }

    const user = await User.findById(session.user.id)
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    // Check if already registered
    if (event.registrations.includes(session.user.id)) {
      return Response.json({ message: "Already registered for this event" }, { status: 409 })
    }

    // Add registration
    event.registrations.push(session.user.id)
    user.eventsRegistered.push(params.id)

    await event.save()
    await user.save()

    return Response.json({ message: "Registered successfully" })
  } catch (error) {
    console.error("Register event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/events/[id]/register
 * Unregister user from event (auth required)
 */
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const event = await Event.findById(params.id)
    const user = await User.findById(session.user.id)

    if (!event || !user) {
      return Response.json({ message: "Event or user not found" }, { status: 404 })
    }

    event.registrations = event.registrations.filter((id) => id.toString() !== session.user.id)
    user.eventsRegistered = user.eventsRegistered.filter((id) => id.toString() !== params.id)

    await event.save()
    await user.save()

    return Response.json({ message: "Unregistered successfully" })
  } catch (error) {
    console.error("Unregister event error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
