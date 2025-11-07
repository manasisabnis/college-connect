import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/lib/models/user"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        await connectDB()
        const user = await User.findOne({ email: credentials.email }).select("+password")

        if (!user) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await user.comparePassword(credentials.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
