import mongoose from "mongoose"

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide club name"],
      unique: true,
    },
    description: String,
    tagline: String,
    icon: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    category: String,
  },
  { timestamps: true },
)

export const Club = mongoose.models.Club || mongoose.model("Club", clubSchema)
