---
name: prisma-schema-change
description: Use whenever modifying prisma/schema.prisma — adding models, fields, relations, or indexes. Workflow for safe migrations in a production app.
---

# Prisma Schema Change Workflow

## Step 1 — Plan the change

- Identify every model/relation affected, including cascading relations (`onDelete`
  behavior) and existing indexes that might need updating.
- Check for existing Server Actions/queries that assume the current shape — a field rename
  or relation change breaks them silently at runtime, not compile time, unless types are
  regenerated and checked.

## Step 2 — Edit schema.prisma

- New required fields on existing tables with data: provide a `@default(...)` or plan a
  data backfill — a required field with no default breaks migration on non-empty tables.
- Add indexes (`@@index`, `@@unique`) for any field used in a `where`/`orderBy` on a
  Server Action that queries at scale (avoid table scans as data grows).
- Set `onDelete` explicitly on relations (`Cascade`, `Restrict`, `SetNull`) rather than
  leaving Prisma's default — an unconsidered cascade delete is a common production incident.

## Step 3 — Generate and apply

```bash
npx prisma format
npx prisma validate
npx prisma migrate dev --name [descriptive_name]
```

- Migration name should describe the change (`add_project_visibility_field`, not `update1`).
- Review the generated SQL in `prisma/migrations/.../migration.sql` before confirming —
  especially for anything involving `DROP COLUMN`, `ALTER ... NOT NULL`, or cascade deletes.

## Step 4 — Regenerate types and check usages

```bash
npx prisma generate
npm run typecheck
```

- Typecheck will surface every Server Action/query that needs updating for the new shape —
  fix all of them, don't leave `as any` casts to silence errors.

## Step 5 — Update dependent code

- [ ] Zod schemas in affected `schema.ts` files updated to match new/changed fields.
- [ ] Server Actions updated (`select`/`include`, validation).
- [ ] Seed script (`prisma/seed.ts`) updated if it creates affected models.
- [ ] Any place doing manual `select` for the affected model reviewed for missing/removed
      fields.

## Step 6 — Production considerations

- For a field rename: prefer additive-then-cleanup (add new field, backfill, migrate reads,
  drop old field in a later migration) over a single destructive rename on a live table with
  data, unless downtime is acceptable.
- Flag any migration that will lock a large table for an extended period, and suggest running
  it during a low-traffic window.
