import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/user";
import { Club } from "@/lib/models/club";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const user = await User.findById(id).populate("clubsJoined");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Fetched joined clubs successfully",
      clubsJoined: user.clubsJoined || [],
    });
  } catch (error) {
    console.error("❌ Error fetching user's clubs:", error);
    return NextResponse.json(
      { message: "Error fetching user's clubs", error: error.message },
      { status: 500 }
    );
  }
}
