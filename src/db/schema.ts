import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { organization, user } from "./auth-schema";

export const file = pgTable("file", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: text("owner_id").notNull().references(() => user.id),
  orgId: text("org_id").references(() => organization.id),
  filename: text("filename").notNull(),
  createdAt: timestamp('created_at').notNull(),
  bucket: text("bucket").notNull(),
  key: text("key").notNull()
})