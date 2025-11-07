import mongoose from "mongoose"

const rsvpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    status: {
      type: String,
      enum: ["registered", "attended", "cancelled"],
      default: "registered",
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export const RSVP = mongoose.models.RSVP || mongoose.model("RSVP", rsvpSchema)
