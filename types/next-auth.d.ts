import NextAuth from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's name. */
      id: string;
      username: string;
      role: string;
      id_warga?: string;
      display_name: string;
    };
  }

  interface User {
    id: string;
    username: string;
    role: string;
    id_warga?: string;
    display_name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
    id_warga?: string;
    display_name: string;
  }
}
