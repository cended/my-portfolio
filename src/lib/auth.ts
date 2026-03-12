// src/lib/auth.ts
// NextAuth configuration.
//
// This sets up authentication for your admin dashboard.
// We're using "Credentials" provider — you log in with email + password
// stored in your .env.local file. No OAuth/social login needed for a
// personal portfolio where only YOU are the admin.
//
// PHP equivalent: like checking $_POST['password'] against a stored hash,
// then setting $_SESSION['user'] = true.

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Use JWT sessions (stored in a cookie) instead of database sessions
  session: {
    strategy: "jwt",
  },

  // Custom pages — we'll build /admin/login ourselves
  pages: {
    signIn: "/admin/login",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // This function runs when the login form is submitted
      async authorize(credentials) {
        // Check if credentials match your .env.local values
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Return the admin user object
          return {
            id: "admin",
            email: process.env.ADMIN_EMAIL,
            name: "Alced Jhon Madiales",
            role: "admin",
          };
        }

        // Return null = login failed
        return null;
      },
    }),
  ],

  callbacks: {
    // Add role to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },

    // Add role to the session object (accessible in components)
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
