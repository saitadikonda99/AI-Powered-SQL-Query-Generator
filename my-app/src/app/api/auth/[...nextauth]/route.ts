import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        // Call the signup API route
        const response = await fetch(`${process.env.NEXT_AUTH_URL}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });

        if (!response.ok) {
          console.error('Failed to create user in database');
          return false;
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach user information to the session
      if (session) {
        session.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
