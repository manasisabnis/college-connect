import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Club } from "@/lib/models/club";
import { User } from "@/lib/models/user";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const club = await Club.findById(id);
    if (!club) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }

    // Find all users who have joined this club
    const members = await User.find({ clubsJoined: id }).select("name email");

    return NextResponse.json({
      club: club.name,
      members,
    });
  } catch (error) {
    console.error("❌ Error fetching members:", error);
    return NextResponse.json(
      { message: "Error fetching members", error: error.message },
      { status: 500 }
    );
  }
}
