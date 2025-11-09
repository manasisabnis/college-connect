import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { Event } from "@/lib/models/event";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const user = await User.findById(id).populate("eventsRegistered");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Fetched registered events successfully",
      eventsRegistered: user.eventsRegistered || [],
    });
  } catch (error) {
    console.error("❌ Error fetching user's events:", error);
    return NextResponse.json(
      { message: "Error fetching user's events", error: error.message },
      { status: 500 }
    );
  }
}
