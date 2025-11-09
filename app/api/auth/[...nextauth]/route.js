import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/lib/db";

import { User } from "@/lib/models/user";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcryptjs.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        // ✅ Return user object with ID
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // ✅ Persist user.id to token
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      // ✅ Attach token.id to session.user.id
      if (token) session.user.id = token.id;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
