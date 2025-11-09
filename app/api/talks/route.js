import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Talk } from "@/lib/models/talk";

export async function GET() {
  try {
    await connectDB();
    const talks = await Talk.find({});
    return NextResponse.json(talks);
  } catch (error) {
    console.error("❌ Error fetching talks:", error);
    return NextResponse.json({ error: "Failed to fetch talks" }, { status: 500 });
  }
}
