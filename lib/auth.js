import { connectDB } from "./mongodb.js"
import { User } from "./models/user.js"

/**
 * Register new user
 * @param {object} userData
 * @returns {Promise<object>}
 */
export async function registerUser(userData) {
  await connectDB()

  // Check if user exists
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Create new user
  const user = new User({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  })

  await user.save()
  return { _id: user._id, name: user.name, email: user.email }
}

/**
 * Authenticate user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
export async function authenticateUser(email, password) {
  await connectDB()

  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    throw new Error("Invalid email or password")
  }

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  return { _id: user._id, name: user.name, email: user.email }
}

/**
 * Get user by ID
 * @param {string} userId
 * @returns {Promise<object>}
 */
export async function getUserById(userId) {
  await connectDB()

  const user = await User.findById(userId)
    .populate("clubsJoined")
    .populate("eventsRegistered")
    .populate("talksRegistered")

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
