import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"
import { validatePassword } from "@/lib/utils/validation"

/**
 * POST /api/auth/reset-password
 * Reset user password
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { email, newPassword, confirmPassword } = body

    if (!email || !newPassword || !confirmPassword) {
      return Response.json({ message: "Missing required fields" }, { status: 400 })
    }

    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.valid) {
      return Response.json({ message: passwordValidation.error }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return Response.json({ message: "Passwords do not match" }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 })
    }

    user.password = newPassword
    await user.save()

    return Response.json({ message: "Password reset successfully" })
  } catch (error) {
    console.error("Reset password error:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}
