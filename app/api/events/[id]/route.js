import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/event";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("❌ Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event", details: error.message },
      { status: 500 }
    );
  }
}
