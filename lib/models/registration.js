import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ["club", "event", "talk"], required: true },
  refId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
