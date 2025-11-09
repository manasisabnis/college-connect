import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/lib/models/user";
import { connectDB } from "@/lib/db";

import bcryptjs from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error("No user found with this email");

        const isPasswordValid = await bcryptjs.compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
