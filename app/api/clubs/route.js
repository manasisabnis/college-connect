import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Club } from "@/lib/models/club";
import { connectDB } from "@/lib/db";



export async function GET(request) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    let clubs;
    if (q) {
      clubs = await Club.find({ name: { $regex: q, $options: "i" } });
    } else {
      clubs = await Club.find({});
    }

    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { message: "Error fetching clubs" },
      { status: 500 }
    );
  }
}
