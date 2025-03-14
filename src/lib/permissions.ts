import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  project: ["create", "share", "update", "delete"],
  billing: ["upgrade", "downgrade"]
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  project: ["create", "share", "update", "delete"],
  billing: ["upgrade", "downgrade"]
})

export const superadmin = ac.newRole({
  project: ["create", "share", "update", "delete"],
  billing: ["upgrade", "downgrade"],
  ...adminAc.statements
})