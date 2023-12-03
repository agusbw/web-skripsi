import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcryptjs";
import { getServerSession, type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;
        console.log(credentials);
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username
          },
          include: {
            warga: true
          }
        });

        if (!user || !(await compare(credentials.password, user.password)))
          return null;

        return {
          id: user.id,
          username: user.username,
          role: user.role,
          display_name: user.warga ? user.warga.nama : "Admin",
          id_warga: user.warga?.id
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          username: token.username,
          role: token.role,
          display_name: token.display_name,
          id_warga: token.id_warga
        }
      };
    },

    jwt: ({ token, user }) => {
      if (user) {
        const u = user;
        return {
          id: u.id,
          username: u.username,
          role: u.role,
          display_name: u.display_name,
          id_warga: u.id_warga
        };
      }
      return token;
    }
  }
};

export const getCurrentSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
