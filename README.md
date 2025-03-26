# Getting Started

This project uses bun for package management. Install it [here](https://bun.sh/docs/installation)

```bash
bun install # Install dependencies

bun dev # Run the development server

bun run build # Builds server, checks linting
```

## Making schema changes in a branch

This project uses drizzle to manage migrations safely.
To test changes in development, we can create database [branches](https://neon.tech/docs/introduction/branching).

The migrations directory tracks the history for the main branch only. This is for safety reasons. In development, you can push schema changes directly to your database branch. When we merge into main, we perform the migration manually and save the migration files to git.

1. Create a branch in the Neon Console.
2. Copy the connection string into your `.env.development` file. You should have 2 changes `DATABASE_URL` and `DATABASE_URL_UNPOOLED` for the pooled and non-pooled connections, respectively.
3. Make changes to schema, add new schemas, etc.
4. To reflect these changes in your development branch on neon, run `bun db:push`. This is a command which essentially performs a database migration without saving the migration files. See more details [here](https://orm.drizzle.team/docs/drizzle-kit-push). This is considered unsafe for the main database instance, but it's ok for development.
5. Commit your changes and publish your branch. Ensure that you have not committed any new files in src/db/migrations.
6. Open a Pull Request back to the parent branch.

## Updating the main database

We only need to do this if there are necessary schema changes to the production database.
If our changes only access the database, but don't change the schema declarations, then we don't have to do this.

1. Ensure you have the file `.env.production` with the connection string of the main branch in neon.
2. Run `bun db:generate` to create new migration files.
3. Run `bun db:migrate` to run these migration files on the main database branch.
4. Commit and push to trigger a new production deployment on Vercel.
