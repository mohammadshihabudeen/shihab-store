import { NextAuthOptions, Session, User, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          { id: "1", username: "user", password: "user123", role: "user" },
          { id: "2", username: "admin", password: "admin123", role: "admin" },
        ];
        const user = users.find(
          (u) =>
            u.username === credentials?.username &&
            u.password === credentials?.password
        );

        if (user) return { id: user.id, name: user.username, role: user.role };
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.role) {
        session.user = { ...(session.user || {}), role: token.role as string };
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && "role" in user) {
        token.role = user.role as string; // Ensure role is a string
      }
      return token;
    },
  },
  session: { strategy: "jwt" as SessionStrategy },
  pages: { signIn: "/signup" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
