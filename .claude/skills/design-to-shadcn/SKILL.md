---
name: design-to-shadcn
description: Convert a shared UI image, screenshot, or mockup into shadcn/ui components matching project conventions. Use whenever the user shares a design image and wants it implemented in code.
---

# Design Image → shadcn/ui Component

## Step 1 — Read the image

Identify:
- Layout grid / spacing rhythm (not exact pixels — map to Tailwind's spacing scale).
- Typography hierarchy (heading sizes/weights, body text).
- Which elements map to existing shadcn primitives: `Card`, `Dialog`, `Form`, `Table`,
  `DropdownMenu`, `Tabs`, `Badge`, `Avatar`, etc.
- Interactive states visible or implied (hover, disabled, loading, error, empty state).
- Whether this is a whole page/section or a single reusable component.

## Step 2 — Check what already exists

- Look in `src/components/ui/` for already-installed shadcn primitives before assuming a new
  one needs installing (`npx shadcn add [component]`).
- Look in `src/components/shared/` for existing project-specific wrappers that might already
  cover this pattern — reuse before rebuilding.
- Check `tailwind.config` / `globals.css` for existing design tokens (colors, radii, spacing)
  — match the image to *those*, don't introduce new ad hoc values.

## Step 3 — Map to component conventions

Follow `component-architecture` skill rules while building this:
- Static/no-data UI → single presentational file.
- Anything with data, forms, or Server Actions → container/presentational split.
- Forms specifically → hand off to the `form-builder` skill for the RHF + zod pattern.
- Stay under 300 lines; split subcomponents (card items, list rows, etc.) as needed.

## Step 4 — Build with composition, not one-off CSS

- Prefer composing shadcn primitives over writing custom CSS for something shadcn already
  solves (e.g. don't hand-roll a modal when `Dialog` exists).
- Use `cn()` for conditional/variant classes.
- If the image shows a variant shadcn doesn't have out of the box (e.g. a custom card style),
  wrap the primitive in `components/shared/` rather than editing `components/ui/` directly.

## Step 5 — Flag ambiguity instead of guessing

If exact spacing, color hex values, font, or breakpoint behavior isn't clear from the image,
say so explicitly and propose the closest match from existing tokens rather than inventing new
one-off values silently. Ambiguity in responsive behavior (how this collapses on mobile) should
also be flagged if the image only shows one breakpoint.

## Step 6 — Output location

- New feature-specific component → `features/[feature]/components/`.
- Cross-feature reusable component → `components/shared/`.
- Never write directly into `components/ui/`.
