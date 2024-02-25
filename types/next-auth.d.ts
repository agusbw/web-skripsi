import { type Role } from "@prisma/client";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's name. */
      id: string;
      username: string;
      role: Role;
      id_warga?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    role: Role;
    id_warga?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: Role;
    id_warga?: string;
  }
}
