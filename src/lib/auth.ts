import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {
  account,
  session,
  user,
  verification
} from "@/db/auth-schema";
import { sendEmail } from "@/lib/ses";
import {
  admin,
  organization
} from "better-auth/plugins"
import { ac, superadmin, user as userRole } from "./permissions";

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
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirm Account Deletion",
          body: `Click the link to delete your account: ${url}. This action is not reversible.`
        })
      }
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: process.env.NODE_ENV === 'production'
  },
  emailVerification: {
    sendOnSignUp: process.env.NODE_ENV === 'production', // only send on prod
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        body: `Click the link to verify your email: ${url}`
      })
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // cache duration in seconds
    }
  },
  plugins: [
    admin({
      ac: ac,
      roles: {
        superadmin,
        userRole
      }
    }),
    organization(),
  ]
})