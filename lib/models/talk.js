import mongoose from "mongoose"

const talkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide talk title"],
    },
    speaker: {
      type: String,
      required: [true, "Please provide speaker name"],
    },
    topic: String,
    date: {
      type: Date,
      required: [true, "Please provide talk date"],
    },
    time: String,
    bio: String,
    videoUrl: String,
    isArchived: {
      type: Boolean,
      default: false,
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
)

export const Talk = mongoose.models.Talk || mongoose.model("Talk", talkSchema)
