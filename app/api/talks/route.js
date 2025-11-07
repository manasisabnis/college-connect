import { connectDB } from "@/lib/mongodb"
import { Talk } from "@/lib/models/talk"

/**
 * GET /api/talks
 * Get all talks with optional archived filter
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const archived = searchParams.get("archived") === "true"

    await connectDB()

    const talks = await Talk.find({ isArchived: archived })
    return Response.json(talks)
  } catch (error) {
    console.error("Get talks error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/talks
 * Create new talk
 */
export async function POST(request) {
  try {
    const body = await request.json()
    await connectDB()

    const talk = new Talk(body)
    await talk.save()

    return Response.json(talk, { status: 201 })
  } catch (error) {
    console.error("Create talk error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
