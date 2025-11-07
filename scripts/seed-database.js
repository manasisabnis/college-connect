import mongoose from "mongoose"
import { User } from "../lib/models/user.js"
import { Event } from "../lib/models/event.js"
import { Club } from "../lib/models/club.js"
import { Talk } from "../lib/models/talk.js"
import { News } from "../lib/models/news.js"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/college-connect"

/**
 * Connect to MongoDB
 */
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection failed:", error)
    process.exit(1)
  }
}

/**
 * Clear existing data
 */
async function clearDatabase() {
  console.log("Clearing database...")
  await User.deleteMany({})
  await Event.deleteMany({})
  await Club.deleteMany({})
  await Talk.deleteMany({})
  await News.deleteMany({})
  console.log("Database cleared")
}

/**
 * Seed users
 */
async function seedUsers() {
  console.log("Seeding users...")
  const users = [
    {
      name: "John Doe",
      email: "john@college.com",
      password: "Password123",
      bio: "Computer Science student",
      phone: "1234567890",
    },
    {
      name: "Jane Smith",
      email: "jane@college.com",
      password: "Password123",
      bio: "Business Administration student",
    },
    {
      name: "Bob Johnson",
      email: "bob@college.com",
      password: "Password123",
      bio: "Engineering student",
    },
    {
      name: "Alice Brown",
      email: "alice@college.com",
      password: "Password123",
      bio: "Arts student",
    },
    {
      name: "Charlie Wilson",
      email: "charlie@college.com",
      password: "Password123",
      bio: "Sports enthusiast",
    },
  ]

  const createdUsers = await User.insertMany(users)
  console.log(`Created ${createdUsers.length} users`)
  return createdUsers
}

/**
 * Seed clubs
 */
async function seedClubs() {
  console.log("Seeding clubs...")
  const clubs = [
    {
      name: "Tech Club",
      description: "For technology enthusiasts",
      tagline: "Tagline Tagline",
      icon: "⚙️",
      category: "Technology",
    },
    {
      name: "Arts Club",
      description: "For art lovers",
      tagline: "Tagline a Stoprrators",
      icon: "🎨",
      category: "Arts",
    },
    {
      name: "Sports Club",
      description: "For sports enthusiasts",
      tagline: "Tagline Stovertly",
      icon: "🏅",
      category: "Sports",
    },
    {
      name: "Science Society",
      description: "For science enthusiasts",
      tagline: "Explore scientific wonders",
      icon: "🔬",
      category: "Science",
    },
    {
      name: "Coding Club",
      description: "Learn and practice coding",
      tagline: "Code for fun",
      icon: "💻",
      category: "Technology",
    },
  ]

  const createdClubs = await Club.insertMany(clubs)
  console.log(`Created ${createdClubs.length} clubs`)
  return createdClubs
}

/**
 * Seed events
 */
async function seedEvents(clubs) {
  console.log("Seeding events...")
  const events = [
    {
      title: "Tech Innovators Challenge",
      description: "A coding competition",
      date: new Date("2024-10-26"),
      time: "2:00 PM",
      location: "Auditorium B",
      category: "Tech",
      hostClub: clubs[0]._id,
      capacity: 100,
    },
    {
      title: "Guest Lecture Series",
      description: "Learn from industry experts",
      date: new Date("2024-10-28"),
      time: "3:00 PM",
      location: "Auditorium B",
      category: "Tech",
      hostClub: clubs[0]._id,
      capacity: 150,
    },
    {
      title: "Annual Sports Fest",
      description: "Inter-college sports event",
      date: new Date("2024-11-01"),
      time: "9:00 AM",
      location: "Stadium",
      category: "Sports",
      hostClub: clubs[2]._id,
      capacity: 500,
    },
    {
      title: "Art Exhibition",
      description: "Showcase of student art",
      date: new Date("2024-11-05"),
      time: "4:00 PM",
      location: "Art Gallery",
      category: "Arts",
      hostClub: clubs[1]._id,
      capacity: 200,
    },
    {
      title: "Science Symposium",
      description: "Discussion on scientific advancements",
      date: new Date("2024-11-10"),
      time: "2:00 PM",
      location: "Science Building",
      category: "Science",
      hostClub: clubs[3]._id,
      capacity: 100,
    },
    {
      title: "Hackathon 2024",
      description: "24-hour coding marathon",
      date: new Date("2024-11-15"),
      time: "10:00 AM",
      location: "Lab Building",
      category: "Tech",
      hostClub: clubs[0]._id,
      capacity: 50,
    },
    {
      title: "Music Festival",
      description: "Live performances by students",
      date: new Date("2024-11-20"),
      time: "6:00 PM",
      location: "Amphitheater",
      category: "Arts",
      hostClub: clubs[1]._id,
      capacity: 300,
    },
    {
      title: "Web Development Workshop",
      description: "Learn web technologies",
      date: new Date("2024-11-25"),
      time: "1:00 PM",
      location: "Computer Lab",
      category: "Tech",
      hostClub: clubs[4]._id,
      capacity: 60,
    },
    {
      title: "Debate Competition",
      description: "Inter-college debate",
      date: new Date("2024-12-01"),
      time: "3:00 PM",
      location: "Main Auditorium",
      category: "Arts",
      hostClub: clubs[1]._id,
      capacity: 150,
    },
    {
      title: "Science Quiz Night",
      description: "Test your knowledge",
      date: new Date("2024-12-05"),
      time: "7:00 PM",
      location: "Seminar Hall",
      category: "Science",
      hostClub: clubs[3]._id,
      capacity: 80,
    },
  ]

  const createdEvents = await Event.insertMany(events)
  console.log(`Created ${createdEvents.length} events`)
  return createdEvents
}

/**
 * Seed talks
 */
async function seedTalks() {
  console.log("Seeding talks...")
  const talks = [
    {
      title: "The Future of AI",
      speaker: "Dr. Anya Sharma",
      topic: "Artificial Intelligence",
      date: new Date("2024-11-08"),
      time: "4:00 PM",
      bio: "AI ethics researcher",
      isArchived: false,
    },
    {
      title: "Web Development Trends",
      speaker: "Prof. John Smith",
      topic: "Web Technologies",
      date: new Date("2024-11-12"),
      time: "3:00 PM",
      bio: "Full-stack developer",
      isArchived: false,
    },
    {
      title: "Startup Journey",
      speaker: "Sarah Johnson",
      topic: "Entrepreneurship",
      date: new Date("2024-11-18"),
      time: "5:00 PM",
      bio: "Founder of Tech Startup",
      isArchived: false,
    },
    {
      title: "Data Science Insights",
      speaker: "Dr. Ben Carter",
      topic: "Data Science",
      date: new Date("2024-10-10"),
      time: "2:00 PM",
      bio: "Data Science Expert",
      videoUrl: "https://example.com/video",
      isArchived: true,
    },
    {
      title: "Cloud Computing Basics",
      speaker: "Emily White",
      topic: "Cloud Technologies",
      date: new Date("2024-09-20"),
      time: "3:00 PM",
      bio: "Cloud Solutions Architect",
      videoUrl: "https://example.com/video",
      isArchived: true,
    },
  ]

  const createdTalks = await Talk.insertMany(talks)
  console.log(`Created ${createdTalks.length} talks`)
}

/**
 * Seed news
 */
async function seedNews() {
  console.log("Seeding news...")
  const news = [
    {
      title: "Tech Innovators Win National Hackathon",
      content: "Students from our college won the national hackathon",
      source: "National Tech Chronicle",
      category: "National",
      region: "North",
      date: new Date("2024-10-26"),
    },
    {
      title: "Arts Club Hitw Talinine",
      content:
        "Hofra Hackalfor, In dre afeey Tire und ble antlonaled inatemarts com oti ire whs to is and Clube wereret, forttey in the lipos.",
      source: "National Tech",
      category: "National",
      region: "South",
      date: new Date("2024-10-26"),
    },
    {
      title: "Inter-College Sports Meet Announced",
      content: "Annual sports competition between colleges",
      source: "Sports Weekly",
      category: "Inter-College",
      region: "East",
      date: new Date("2024-10-20"),
    },
    {
      title: "New Science Lab Inaugurated",
      content: "State-of-the-art laboratory for research",
      source: "Science Daily",
      category: "National",
      region: "West",
      date: new Date("2024-10-15"),
    },
    {
      title: "Art Exhibition Receives Acclaim",
      content: "Student artwork recognized nationally",
      source: "Arts Today",
      category: "National",
      region: "Central",
      date: new Date("2024-10-12"),
    },
    {
      title: "Inter-College Debate Championship",
      content: "Top debate teams compete",
      source: "Education Times",
      category: "Inter-College",
      region: "North",
      date: new Date("2024-10-08"),
    },
    {
      title: "Technology Innovation Summit",
      content: "Leading tech experts share insights",
      source: "Tech Today",
      category: "National",
      region: "South",
      date: new Date("2024-10-05"),
    },
    {
      title: "Environmental Awareness Campaign",
      content: "Students initiate green initiative",
      source: "Green News",
      category: "Inter-College",
      region: "East",
      date: new Date("2024-09-28"),
    },
    {
      title: "Music Festival Success",
      content: "Thousands attend cultural event",
      source: "Entertainment Hub",
      category: "National",
      region: "West",
      date: new Date("2024-09-25"),
    },
    {
      title: "Research Project Wins Award",
      content: "Scientific research recognized",
      source: "Science Weekly",
      category: "National",
      region: "Central",
      date: new Date("2024-09-20"),
    },
  ]

  const createdNews = await News.insertMany(news)
  console.log(`Created ${createdNews.length} news articles`)
}

/**
 * Main seed function
 */
async function seed() {
  try {
    await connectDB()
    await clearDatabase()

    const users = await seedUsers()
    const clubs = await seedClubs()
    await seedEvents(clubs)
    await seedTalks()
    await seedNews()

    console.log("Database seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Seeding error:", error)
    process.exit(1)
  }
}

seed()
