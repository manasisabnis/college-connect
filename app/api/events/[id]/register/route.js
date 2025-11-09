import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/lib/models/event";
import { User } from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.email)
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email });
    const event = await Event.findById(id);

    if (!user || !event)
      return NextResponse.json({ message: "User or Event not found" }, { status: 404 });

    if (user.eventsJoined.includes(id))
      return NextResponse.json({ message: "Already registered" }, { status: 400 });

    user.eventsJoined.push(event._id);
    await user.save();

    return NextResponse.json({ message: `Registered for ${event.title}` });
  } catch (error) {
    console.error("❌ Error registering for event:", error);
    return NextResponse.json({ error: "Error registering" }, { status: 500 });
  }
}
