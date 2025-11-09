import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/lib/models/user";
import { Club } from "@/lib/models/club";   // ✅ make sure to import
import { Event } from "@/lib/models/event"; // ✅ make sure to import
import { connectDB } from "@/lib/mongodb";  // if you have a DB helper

export async function GET(req, context) {
  try {
    // ✅ Await params in Next.js App Router
    const { id } = await context.params;

    // ✅ Ensure DB connection
    await connectDB?.() || mongoose.connect(process.env.MONGODB_URI);

    // ✅ Populate with imported models (prevents MissingSchemaError)
    const user = await User.findById(id)
      .populate({
        path: "clubsJoined",
        model: Club, // ensure populated model exists
      })
      .populate({
        path: "eventsRegistered",
        model: Event, // ensure populated model exists
      })
      .select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json(
      { message: "Error fetching user", error: err.message },
      { status: 500 }
    );
  }
}
