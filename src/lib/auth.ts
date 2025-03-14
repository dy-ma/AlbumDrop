import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {
  account,
  session,
  user,
  verification
} from "@/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    }
  }),
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // cache duration in seconds
    }
  }
})