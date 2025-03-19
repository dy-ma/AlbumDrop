import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {
  account,
  session,
  user,
  verification,
  organization as orgSchema,
  member,
  invitation
} from "@/db/auth-schema";
import { sendEmail } from "@/lib/ses";
import {
  ac,
  admin as adminRole,
  member as memberRole,
  owner as ownerRole
} from "./permissions";
import { organization } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      organization: orgSchema,
      member,
      invitation
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
    organization({
      allowUserToCreateOrganization: async () => {
        // TODO: check stripe subscription
        return true
      },
      ac: ac,
      roles: {
        member: memberRole,
        owner: ownerRole,
        admin: adminRole,
      },
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/accept-invitation/${data.id}`
        sendEmail({
          to: data.email,
          subject: `Pasal: ${data.inviter.user.name} has invited you to join ${data.organization.name}`,
          body: `Click the link to join the org. ${inviteLink}`
        })
      },
    }),
  ]
})

export type ServerMember = typeof auth.$Infer.Member
export type ServerOrganization = typeof auth.$Infer.Organization