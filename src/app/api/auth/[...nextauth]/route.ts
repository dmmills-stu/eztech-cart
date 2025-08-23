import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
// Make sure to set the environment variables in your .env.local file

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirects unauthenticated users to the custom login page
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };