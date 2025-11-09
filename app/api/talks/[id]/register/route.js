import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Talk } from "@/lib/models/talk";
import { User } from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    const talk = await Talk.findById(id);

    if (!user || !talk) {
      return NextResponse.json({ message: "User or Talk not found" }, { status: 404 });
    }

    // Prevent duplicate registrations
    if (user.talksRegistered && user.talksRegistered.includes(id)) {
      return NextResponse.json({ message: "Already registered for this talk" }, { status: 400 });
    }

    // ✅ Add talk to user's registered talks
    user.talksRegistered = user.talksRegistered || [];
    user.talksRegistered.push(talk._id);
    await user.save();

    return NextResponse.json({
      message: `Successfully registered for "${talk.title}"`,
      talksRegistered: user.talksRegistered,
    });
  } catch (error) {
    console.error("❌ Error registering for talk:", error);
    return NextResponse.json(
      { message: "Error registering for talk", error: error.message },
      { status: 500 }
    );
  }
}
