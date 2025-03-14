import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL

if (!url) throw new Error("Missing DATABASE_URL")

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: { url },
  schema: [
    'src/db/schema.ts',
    'src/db/auth-schema.ts',
  ],
  out: 'src/db/migrations'
})