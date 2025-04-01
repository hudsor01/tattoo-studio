import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Extend the built-in User type
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }

  /**
   * Extend the built-in session type
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession["user"];
    expires: string;
  }
}

declare module "next-auth/jwt" {
  /** Extend the built-in JWT type */
  interface JWT {
    id: string;
    role?: string;
  }
}
