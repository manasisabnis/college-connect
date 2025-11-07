import { connectDB } from "@/lib/mongodb"
import { News } from "@/lib/models/news"

/**
 * GET /api/news
 * Get all news with optional category and region filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const region = searchParams.get("region")

    await connectDB()

    const query = {}
    if (category) query.category = category
    if (region) query.region = region

    const news = await News.find(query).sort({ date: -1 })
    return Response.json(news)
  } catch (error) {
    console.error("Get news error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

/**
 * POST /api/news
 * Create news article
 */
export async function POST(request) {
  try {
    const body = await request.json()
    await connectDB()

    const newsItem = new News(body)
    await newsItem.save()

    return Response.json(newsItem, { status: 201 })
  } catch (error) {
    console.error("Create news error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
