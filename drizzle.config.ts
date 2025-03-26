import { defineConfig } from "drizzle-kit";

// We use the unpooled endpoint for migrations
const url = process.env.DATABASE_URL_UNPOOLED

if (!url) throw new Error("Missing DATABASE_URL_UNPOOLED")

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: { url },
  schema: [
    'src/db/schema.ts',
    'src/db/auth-schema.ts',
  ],
  out: 'src/db/migrations'
})