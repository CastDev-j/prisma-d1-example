migrate the database and generate the Prisma Client:

```bash
bunx prisma migrate diff --from-empty --to-schema ./prisma/schema.prisma --script --output migrations/0001_create_user_table.sql
```

realize the migration:

```bash
# Local database
bunx wrangler d1 migrations apply prisma-demo-db --local

# Remote database
bunx wrangler d1 migrations apply prisma-demo-db --remotes
```
