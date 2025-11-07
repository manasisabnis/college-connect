import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"
import { validateEmail, validatePassword, validateRequiredFields } from "@/lib/utils/validation"

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    // Validate required fields
    const validation = validateRequiredFields({ name, email, password, confirmPassword }, [
      "name",
      "email",
      "password",
      "confirmPassword",
    ])
    if (!validation.valid) {
      return Response.json({ message: validation.error }, { status: 400 })
    }

    // Validate email format
    if (!validateEmail(email)) {
      return Response.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return Response.json({ message: passwordValidation.error }, { status: 400 })
    }

    // Check password match
    if (password !== confirmPassword) {
      return Response.json({ message: "Passwords do not match" }, { status: 400 })
    }

    await connectDB()

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 409 })
    }

    // Create new user
    const user = new User({ name, email, password })
    await user.save()

    return Response.json(
      {
        message: "User created successfully",
        user: { _id: user._id, name: user.name, email: user.email },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
