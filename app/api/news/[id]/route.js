import { connectDB } from "@/lib/mongodb"
import { News } from "@/lib/models/news"

/**
 * GET /api/news/[id]
 * Get news article
 */
export async function GET(request, { params }) {
  try {
    await connectDB()
    const newsItem = await News.findById(params.id)

    if (!newsItem) {
      return Response.json({ message: "News not found" }, { status: 404 })
    }

    return Response.json(newsItem)
  } catch (error) {
    console.error("Get news error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * PUT /api/news/[id]
 * Update news article
 */
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    await connectDB()

    const newsItem = await News.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    })

    if (!newsItem) {
      return Response.json({ message: "News not found" }, { status: 404 })
    }

    return Response.json(newsItem)
  } catch (error) {
    console.error("Update news error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * DELETE /api/news/[id]
 * Delete news article
 */
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    const newsItem = await News.findByIdAndDelete(params.id)

    if (!newsItem) {
      return Response.json({ message: "News not found" }, { status: 404 })
    }

    return Response.json({ message: "News deleted successfully" })
  } catch (error) {
    console.error("Delete news error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
