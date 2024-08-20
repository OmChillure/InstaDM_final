import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/sign-in"
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            return null;
          }

          const email = credentials.email as string;

          let user: any = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user?.password
          );
          if (!isPasswordCorrect) {
            return null;
          }

          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
};
