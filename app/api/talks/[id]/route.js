import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Talk } from "@/lib/models/talk";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const talk = await Talk.findById(params.id);
    if (!talk) {
      return NextResponse.json({ message: "Talk not found" }, { status: 404 });
    }
    return NextResponse.json(talk);
  } catch (error) {
    console.error("❌ Error fetching talk:", error);
    return NextResponse.json({ error: "Failed to fetch talk" }, { status: 500 });
  }
}
