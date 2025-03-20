import { createAuthClient } from "better-auth/react"
import {
  adminClient,
  inferAdditionalFields,
  multiSessionClient,
  organizationClient,
  passkeyClient,
  twoFactorClient
} from "better-auth/client/plugins"
import { ac, admin, member, owner } from "./permissions"
import type { auth } from "./auth"
import { toast } from "sonner"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    twoFactorClient(),
    multiSessionClient(),
    adminClient(),
    passkeyClient(),
    organizationClient({
      ac: ac,
      roles: {
        owner,
        admin,
        member
      }
    }),
    inferAdditionalFields<typeof auth>()
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.")
      }
    }
  }
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  organization,
  useListOrganizations,
  useActiveOrganization,
} = authClient

/**
 * The types are slightly different on server and client.
 * So we prefix them to make it easier to distinguish
 */
export type Session = typeof authClient.$Infer.Session
export type Member = typeof authClient.$Infer.Member
export type Invitation = typeof authClient.$Infer.Invitation

export const ReservedSlugs = ["u"]