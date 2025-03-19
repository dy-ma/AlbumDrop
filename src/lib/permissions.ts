import { createAccessControl } from "better-auth/plugins/access";
import { memberAc, adminAc, ownerAc, defaultStatements } from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements
} as const;

export const ac = createAccessControl(statement)

export const member = ac.newRole({
  ...memberAc.statements
})

export const admin = ac.newRole({
  ...adminAc.statements
})

export const owner = ac.newRole({
  ...ownerAc.statements
})

/**
 * Just used for type checking string arguments.
 * Add any new roles as created
 */
export type Role = "member" | "admin" | "owner"
export const RoleOptions = ["member", "admin"]