import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Club } from "@/lib/models/club";

export async function GET() {
  try {
    await connectDB();
    const clubs = await Club.find({});
    return NextResponse.json(clubs);
  } catch (error) {
    console.error("❌ Error fetching clubs:", error);
    return NextResponse.json({ error: "Failed to fetch clubs" }, { status: 500 });
  }
}
