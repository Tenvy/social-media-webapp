import prisma from "@/utils/db";
import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";

interface Credentials {
  Username: string;
  Password: string;
}

export const authOptions: NextAuthOptions = {
    session: {
      strategy: 'jwt' as SessionStrategy
    },
    pages: {
      signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "username" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: Credentials, req: any) {
          const { Username, Password } = credentials;
  
          const user = await prisma.user.findUnique({
            where: {
              Username: Username
            },
          });
          if (!user) {
            return null;
          }
  
          const confirmPass = await bcrypt.compare(Password, user?.Password);
  
          if (confirmPass) {
            return user;
          }
          return null;
        },
      } as any),
    ],
  
    callbacks: {
      async jwt({ token, session, trigger, user }: any) {
        if (user) {
          if (trigger === "update") {
            // if (session && session.uuid && session.username && session.role && session.profileImage) {
              return {
                ...token,
                ...session.UserID,
                ...session.Username,
                ...session.NamaLengkap,
                ...session.Email,
              // };
            }
          }
          return {
            ...token,
            UserID: user.UserID,
            Username: user.Username,
            NamaLengkap: user.NamaLengkap,
            Email: user.Email
          }
        }
        return token
      },
      async session({ session, token, user }) {
        return {
          ...session,
          user: {
            ...session.user,
            UserID: token.UserID,
            Username: token.Username,
            NamaLengkap: token.NamaLengkap,
            Email: token.Email
          }
        }
  
      }
    }
  }