import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/lib/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/lib/db";



export async function GET() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email })
      .populate("clubsJoined")
      .populate("eventsRegistered")
      .populate("talksRegistered")
      .select("-password");

    return NextResponse.json({
      message: "Dashboard data fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json(
      { message: "Error fetching dashboard data", error: error.message },
      { status: 500 }
    );
  }
}
