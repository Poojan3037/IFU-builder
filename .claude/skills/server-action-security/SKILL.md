---
name: server-action-security
description: Use whenever creating or modifying a Server Action, or anything under src/server/. Checklist to enforce auth, validation, and safe error handling before a mutation ships.
---

# Server Action Security Checklist

Run this against every Server Action — new or edited — before considering it done.

## 1. Authentication

- [ ] Session is fetched and checked at the top of the action (Better Auth session helper),
      not assumed from a prop passed by the client.
- [ ] Unauthenticated requests return a typed failure, not a thrown error.

## 2. Authorization

- [ ] The action checks the user actually has permission for *this specific resource*
      (organization/project membership, role), not just "is logged in."
- [ ] Ownership/scoping is enforced in the Prisma query itself where possible (e.g.
      `where: { id, organizationId: session.activeOrgId }`), not only checked in application
      code after fetching — prevents IDOR-style access via guessed IDs.
- [ ] If the action is destructive (delete, role change, billing), consider whether it needs a
      stricter check (e.g. owner-only, re-auth).

## 3. Input validation

- [ ] Every input is parsed with `schema.safeParse()` (zod) before touching Prisma — even if
      the client already validated with the same schema.
- [ ] No raw client input is interpolated into a Prisma `where`/`orderBy` without going through
      the schema first.

## 4. Data exposure

- [ ] Prisma `select`/`include` is explicit — don't return full rows if the client only needs
      a few fields, especially for anything containing password hashes, tokens, or internal
      flags.
- [ ] Errors returned to the client are generic ("Not authorized", "Invalid input") — no raw
      Prisma error messages, stack traces, or internal IDs leaked in the response.

## 5. Error handling shape

- [ ] Returns `{ success: true, data } | { success: false, error }` — never throws across the
      server/client boundary for expected failure cases (validation, auth). Reserve thrown
      errors for truly unexpected failures.

## 6. Side effects

- [ ] `revalidatePath`/`revalidateTag` called for anything the UI needs to reflect immediately.
- [ ] Any audit-worthy mutation (role change, delete, billing) is logged with actor + target,
      not silently applied.

## 7. Rate limiting / abuse (flag, don't necessarily implement inline)

- [ ] For actions exposed to less-trusted contexts (public forms, invite acceptance),
      flag whether rate limiting is needed — surface this to the user rather than assuming
      it's out of scope.

If any box can't be checked, say so explicitly rather than shipping the action silently
incomplete.
