import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    bio: String,
    avatar: String,
    phone: String,
    clubsJoined: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    eventsRegistered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    talksRegistered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Talk",
      },
    ],
  },
  { timestamps: true },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  try {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)
}

export const User = mongoose.models.User || mongoose.model("User", userSchema)
