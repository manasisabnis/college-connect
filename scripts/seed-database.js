
import mongoose from "mongoose";
import { Club } from "../lib/models/club.js";
import { Event } from "../lib/models/event.js";
import { Talk } from "../lib/models/talk.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Club.deleteMany({});
    await Event.deleteMany({});
    await Talk.deleteMany({});

    // Insert sample clubs
    const clubs = await Club.insertMany([
      { name: "Tech Club", tagline: "Innovate. Build. Share.", icon: "💻" },
      { name: "Arts Club", tagline: "Create. Inspire. Express.", icon: "🎨" },
      { name: "Sports Club", tagline: "Play. Compete. Win.", icon: "🏆" },
    ]);

    // Insert sample events
    const events = await Event.insertMany([
      {
        title: "Hackathon 2025",
        description: "A 24-hour coding challenge",
        location: "Auditorium",
        date: new Date(),
        time: "10:00 AM",
      },
      {
        title: "Cultural Fest",
        description: "Dance, music, and art extravaganza",
        location: "Open Ground",
        date: new Date(),
        time: "6:00 PM",
      },
    ]);

    // Insert sample guest talks
    const talks = await Talk.insertMany([
      {
        title: "AI & The Future",
        speaker: "Dr. Jane Smith",
        topic: "Artificial Intelligence",
        bio: "Professor of Computer Science, MIT",
        date: new Date(),
        time: "2:00 PM",
      },
      {
        title: "Entrepreneurship 101",
        speaker: "John Doe",
        topic: "Startups and Growth",
        bio: "Founder, BuildUp Inc.",
        date: new Date(),
        time: "11:00 AM",
      },
    ]);

    console.log("✅ Seeded clubs:", clubs.length);
    console.log("✅ Seeded events:", events.length);
    console.log("✅ Seeded talks:", talks.length);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seed();
