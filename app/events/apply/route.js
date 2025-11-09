import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Event } from "@/lib/models/event";
import { Registration } from "@/lib/models/registration";

export async function POST(req) {
  try {
    const { eventId, name, email } = await req.json();

    if (!eventId || !name || !email)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    await mongoose.connect(process.env.MONGODB_URI);
    const event = await Event.findById(eventId);
    if (!event)
      return NextResponse.json({ message: "Event not found" }, { status: 404 });

    await Registration.create({ name, email, type: "event", refId: eventId });

    return NextResponse.json({
      message: `🎉 Registered for ${event.title}!`,
    });
  } catch (err) {
    console.error("Event registration error:", err);
    return NextResponse.json(
      { message: "Error processing registration" },
      { status: 500 }
    );
  }
}
