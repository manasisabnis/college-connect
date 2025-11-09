import { NextResponse } from "next/server";

export async function GET() {
  try {
    // You can later connect to an API or MongoDB collection for news
    return NextResponse.json([
      { title: "Tech Fest 2025 Announced!", date: "2025-11-01" },
      { title: "New Club Registrations Open", date: "2025-11-03" },
    ]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
