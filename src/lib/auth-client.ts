import { createAuthClient } from "better-auth/react"
import {
  adminClient,
  organizationClient
} from "better-auth/client/plugins"
import { ac, superadmin, user } from "./permissions"

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [
    adminClient({
      ac: ac,
      roles: {
        superadmin,
        user
      }
    }),
    organizationClient(),
  ]
})