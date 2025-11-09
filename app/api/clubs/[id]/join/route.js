import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Club } from "@/lib/models/club";
import { User } from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    // Ensure DB connection
    await connectDB();

    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const club = await Club.findById(id);
    if (!club) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }

    // Prevent duplicates
    if (user.clubsJoined.includes(id)) {
      return NextResponse.json({ message: "Already joined this club" }, { status: 400 });
    }

    // ✅ Add club to user's joined list
    user.clubsJoined.push(club._id);
    await user.save();

    // ✅ Always return JSON with message + updated data
    return NextResponse.json({
      message: `Successfully joined ${club.name}`,
      clubsJoined: user.clubsJoined,
    });
  } catch (error) {
    console.error("❌ Error joining club:", error);
    // Ensure valid JSON response on every failure
    return NextResponse.json(
      { message: "Error joining club", error: error.message },
      { status: 500 }
    );
  }
}
