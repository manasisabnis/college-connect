import mongoose from "mongoose"

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide news title"],
    },
    content: {
      type: String,
      required: [true, "Please provide news content"],
    },
    source: String,
    category: {
      type: String,
      enum: ["National", "Inter-College"],
      default: "National",
    },
    region: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

export const News = mongoose.models.News || mongoose.model("News", newsSchema)
