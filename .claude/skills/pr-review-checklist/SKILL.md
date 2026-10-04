---
name: pr-review-checklist
description: Use before finishing any feature or opening a PR. Self-review pass covering security, performance, accessibility, and project conventions.
---

# Pre-PR Self-Review Checklist

Run this pass before considering a feature done.

## Conventions
- [ ] Arrow functions only, no `function` declarations.
- [ ] Container/presentational split applied where data or logic is involved.
- [ ] No component file over 300 lines.
- [ ] Custom hooks extracted per `component-architecture` rules.
- [ ] Named exports for components, default only for `page.tsx`/`layout.tsx`.

## Security
- [ ] Every new/changed Server Action passes the `server-action-security` checklist.
- [ ] No secrets, tokens, or internal IDs logged or returned to the client.
- [ ] No client-trusted values (role, org ID, user ID) used for authorization without a
      server-side re-check.

## Performance
- [ ] No unnecessary `"use client"` — Server Components used by default.
- [ ] No N+1 Prisma queries (check loops calling `prisma.x.findUnique` — batch with
      `findMany`/`include` instead).
- [ ] Large lists virtualized or paginated, not rendering hundreds of DOM nodes at once.
- [ ] Images use `next/image`, not raw `<img>`, where applicable.
- [ ] No heavy client-side computation that could be a Server Component/Server Action instead.

## Accessibility
- [ ] Interactive elements are actual buttons/links, not `div onClick`.
- [ ] Form fields have associated labels (shadcn `FormLabel` handles this if used correctly).
- [ ] Sufficient color contrast for any custom (non-shadcn-default) colors introduced.
- [ ] Dialogs/menus trap focus and are dismissible via keyboard (shadcn primitives handle this
      by default — flag if a custom implementation bypassed them).

## Data & state
- [ ] Loading, empty, and error states are all handled in presentational components, not just
      the happy path.
- [ ] Optimistic UI (if used) has a rollback path on failure.

## Before opening the PR
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] Commit messages follow Conventional Commits.
