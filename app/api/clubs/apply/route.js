import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Club } from "@/lib/models/club";
import { Registration } from "@/lib/models/registration";
import { getServerSession } from "next-auth"; // if using NextAuth
import { connectDB } from "@/lib/db";



export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const { clubId, name, email } = await req.json();

    // ---- STEP 1: Handle logged-in user or mock for local ----
    let user = { name, email };

    // If your project uses NextAuth:
    // const session = await getServerSession();
    // if (session?.user) user = session.user;
    // else if (!name || !email) {
    //   return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }

    // ---- STEP 2: Validate ----
    if (!clubId || !user.email)
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    const club = await Club.findById(clubId);
    if (!club)
      return NextResponse.json({ message: "Club not found" }, { status: 404 });

    // ---- STEP 3: Save registration ----
    await Registration.create({
      name: user.name,
      email: user.email,
      type: "club",
      refId: clubId,
    });

    return NextResponse.json({
      message: `✅ ${user.name || "User"} joined ${club.name} successfully!`,
    });
  } catch (err) {
    console.error("Club join error:", err);
    return NextResponse.json(
      { message: "Error joining club" },
      { status: 500 }
    );
  }
}
