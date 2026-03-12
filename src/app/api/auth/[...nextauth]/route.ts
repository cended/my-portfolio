// src/app/api/auth/[...nextauth]/route.ts
// NextAuth catch-all route handler.
//
// This file MUST exist at this exact path.
// It handles all auth routes automatically:
//   POST /api/auth/signin
//   POST /api/auth/signout
//   GET  /api/auth/session
//   GET  /api/auth/csrf
//   etc.
//
// You don't need to edit this file.

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

// Export the same handler for both GET and POST requests
export { handler as GET, handler as POST };
