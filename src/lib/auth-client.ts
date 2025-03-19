import { createAuthClient } from "better-auth/react"
import {
  inferAdditionalFields,
  organizationClient
} from "better-auth/client/plugins"
import { ac, admin, member, owner } from "./permissions"
import type { auth } from "./auth"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    organizationClient({
      ac: ac,
      roles: {
        owner,
        admin,
        member
      }
    }),
    inferAdditionalFields<typeof auth>()
  ]
})

/**
 * The types are slightly different on server and client.
 * So we prefix them to make it easier to distinguish
 */
export type Organization = typeof authClient.$Infer.Organization
export type Session = typeof authClient.$Infer.Session
export type Member = typeof authClient.$Infer.Member
export type Invitation = typeof authClient.$Infer.Invitation

export const ReservedSlugs = ["u"]