import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Talk } from "@/lib/models/talk";
import { Registration } from "@/lib/models/registration";

export async function POST(req) {
  try {
    const { talkId, name, email } = await req.json();

    if (!talkId || !name || !email)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    await mongoose.connect(process.env.MONGODB_URI);
    const talk = await Talk.findById(talkId);
    if (!talk)
      return NextResponse.json({ message: "Talk not found" }, { status: 404 });

    await Registration.create({ name, email, type: "talk", refId: talkId });

    return NextResponse.json({
      message: `🎙 Registered for "${talk.title}" successfully!`,
    });
  } catch (err) {
    console.error("Talk registration error:", err);
    return NextResponse.json(
      { message: "Error submitting registration" },
      { status: 500 }
    );
  }
}
