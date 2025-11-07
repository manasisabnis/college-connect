import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide event title"],
    },
    description: String,
    date: {
      type: Date,
      required: [true, "Please provide event date"],
    },
    time: String,
    location: String,
    category: {
      type: String,
      enum: ["Tech", "Sports", "Arts", "Science"],
      default: "Tech",
    },
    hostClub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    capacity: Number,
    image: String,
  },
  { timestamps: true },
)

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)
