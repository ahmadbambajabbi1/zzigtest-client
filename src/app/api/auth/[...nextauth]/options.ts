import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
const BACKEND_URL = process.env.BACKEND_URL;
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        "email/username": {
          label: "Email/Username",
          type: "text",
          placeholder: "Enter your email or username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials: any) {
        console.log({ credentials });
        try {
          const res = await axios.post(
            `${BACKEND_URL}/api/v1/auth/login`,
            credentials
          );
          console.log({ accessToken: res.data.accessToken });
          if (res.status === 200) {
            return {
              accessToken: res.data.accessToken,
              user: res.data.user,
            } as any;
          }
          return null;
        } catch (error: any) {
          if (error?.response?.data?.error) {
            throw Error(JSON.stringify(error?.response?.data?.error));
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        session.user = token?.user as any;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user?.user;
        token.accessToken = user.accessToken;
      }
      return { ...token, ...user };
    },
  },
};
