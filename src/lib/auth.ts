import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Add this type definition before your NextAuth configuration
interface ExtendedJWT extends JWT {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<User | null> {
        // For development and testing - only allow specific admin credentials
        if (
          credentials?.email &&
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "admin",
            name: "Admin User",
            email: credentials.email as string,
            image: null,
            role: "ADMIN",
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, user, token }): Promise<Session> {
      const extendedToken = token as ExtendedJWT;
      if (extendedToken) {
        session.user.id = extendedToken.id;
        session.user.role = extendedToken.role;
      } else if (user) {
        session.user.id = user.id;
        session.user.role = user.role ?? "USER";
      }
      return session;
    },
    async jwt({ token = {}, user, trigger }): Promise<ExtendedJWT> {
      const extendedToken: ExtendedJWT = {
        ...token,
        id: token.id ?? user?.id ?? '',
        role: token.role ?? user?.role ?? 'USER',
        name: token.name ?? user?.name ?? null,
        email: token.email ?? user?.email ?? null,
        image: token.picture ?? user?.image ?? null
      };

      return extendedToken;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
});
