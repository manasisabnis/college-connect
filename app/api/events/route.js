import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/event";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
