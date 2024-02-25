import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcryptjs";
import { getServerSession, type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        let user;
        const includeStatement = {
          warga: {
            select: {
              id: true,
            },
          },
        };

        if (credentials.role === "PERBEKEL") {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
              role: "PERBEKEL",
            },
            include: includeStatement,
          });
        } else if (credentials.role === "ADMIN") {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
              role: "ADMIN",
            },
            include: includeStatement,
          });
        } else {
          user = await prisma.user.findUnique({
            where: {
              username: credentials.username,
              role: "WARGA",
            },
            include: includeStatement,
          });
        }

        if (!user || !(await compare(credentials.password, user.password)))
          return null;

        return {
          id: user.id,
          username: user.username,
          role: user.role,
          id_warga: user.warga?.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          role: token.role,
          id_warga: token.id_warga,
        },
      };
    },

    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          id: u.id,
          username: u.username,
          role: u.role,
          id_warga: u.id_warga,
        };
      }
      return token;
    },
  },
};

export const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
