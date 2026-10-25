# Tasks

Three delivery phases. Task IDs are stable (they keep their original numbers).

- **Phase 1 — MVP:** basic end-to-end flow (signup → dashboard → wizard → compliance → on-screen preview)
- **Phase 2 — Advanced:** PDF generation and export, language change (Hindi), email-dependent auth, versioning, quality passes
- **Phase 3 — More advanced:** organisations, AI assist, UDI, SUGAM export and other new capabilities

---

# Phase 1 — MVP

## 1. Foundation
- [x] 1.1 Get approval for packages D5–D11 _(approved: Tiptap, @react-pdf/renderer, sanitize-html, Better Auth built-in rate limiting; deferred: storage SDK, email; not yet approved: Vitest, Playwright)_
- [x] 1.2 Install approved packages
- [x] 1.3 Review and apply the pending Prisma migration (`add_ifu_document_models`); verify the schema matches REQUIREMENTS §9
- [x] 1.4 Add `src/lib/dates.ts` (IST, DD-MM-YYYY, en-IN)
- [x] 1.5 Add the i18n scaffold (English strings file + helper)
- [x] 1.6 Add `getOwnedDocumentOrThrow` in `src/server/services/documents/` (not-found on foreign docs)
- [x] 1.7 Add a shared Server Action result type and an audit-event helper
- [x] 1.8 Build the dashboard layout: header (logo, EN chip, avatar menu) and auth guard redirecting to `/login?next=`

## 2. S1 Auth
- [x] 2.1 `features/auth/schema.ts` (login, signup, forgot, reset)
- [x] 2.2 Login page and form (generic error, remember me)
- [x] 2.3 Signup page and form (company, DPDP consent, password rules)
- [x] 2.5 Google OAuth button
- [ ] 2.7 Rate limiting (5 failures / 15 min)
- [x] 2.8 Log out
- [x] 2.9 Split-screen brand panel and tab switcher

## 3. S2 Dashboard
- [x] 3.1 `dashboard/queries.ts` (list, counts, `select` limited)
- [x] 3.2 Stats cards
- [x] 3.3 Search (300 ms debounce, `?q=`)
- [x] 3.4 Status and risk class filters (URL state)
- [x] 3.5 Documents table with badges and relative dates
- [x] 3.6 Row actions by status and overflow menu (Duplicate, Delete dialog) _(Duplicate shown disabled until 9.2)_
- [x] 3.7 Soft delete action
- [x] 3.8 Server-side pagination (20 per page)
- [x] 3.9 Empty states
- [x] 3.10 "+ Create New IFU" action (create DRAFT, redirect to basic-info)

## 4. Wizard shell and S3 Basic Info
- [x] 4.1 `ifu/[id]/layout.tsx` with ownership guard and 4-step stepper
- [x] 4.2 Step navigation rules (WF-01, WF-04 resume at `lastStep`)
- [x] 4.3 `ifu-wizard/schema.ts` (basicInfo with draft and full variants)
- [x] 4.4 Basic Info form and fields (PIN, state dropdown, phone/email)
- [x] 4.5 Manufacturer type ↔ licence type consistency (FR-S1-06)
- [x] 4.6 Importer fields (conditional)
- [x] 4.7 `saveBasicInfo` action (draft + continue)
- [x] 4.8 Autosave hook (2 s) and saved indicator
- [x] 4.9 Unsaved-changes dialog on Back

## 5. S4 Category & Risk
- [x] 5.1 `rules/applicability.ts` (pure functions, section list, extra warnings)
- [ ] 5.2 Unit tests for applicability rules _(needs Vitest approval)_
- [x] 5.3 Category cards (radio group) and defaults _(UI only — mock data, no backend)_
- [x] 5.4 Core and conditional toggles _(UI only — mock data, no backend)_
- [x] 5.5 Risk class segmented control _(UI only — mock data, no backend)_
- [x] 5.6 Live "we'll include" panel (ARIA live) _(UI only — mock data, no backend)_
- [x] 5.7 Consistency warnings _(UI only — mock data, no backend)_
- [x] 5.9 `saveCategoryRisk` action; keep-but-hide content on change (WF-02) with notice

## 6. S5 Sections
- [x] 6.1 `sections/catalogue.ts` (16 sections, fields, tips, placeholders)
- [x] 6.2 `sections/schema.ts` (rich-text and structured fields, 10,000-char limit)
- [x] 6.3 Tiptap editor wrapper (bold, italic, underline, lists)
- [x] 6.4 Server-side sanitisation (allow-list)
- [x] 6.5 Section nav (states, required dots, progress bar)
- [x] 6.6 Section editor page `sections/[sectionKey]`
- [x] 6.7 Compliance tip box
- [x] 6.8 Structured fields: storage, sterilisation, shelf life
- [x] 6.9 Auto-generated manufacturer_licence section (read-only)
- [x] 6.10 Prefill device description from Step 1
- [x] 6.11 `saveSection` and `markSectionComplete` actions
- [x] 6.12 Autosave (2 s and on blur), Previous / Save & Exit
- [x] 6.13 "Go to Compliance Check" gating
- [x] 6.14 Mark the compliance run stale on any edit (WF-03)

## 7. Compliance engine and S6
- [x] 7.1 Types and `runCompliance` engine in `server/services/compliance/engine.ts`
- [x] 7.2 `phrases.ts` keyword lists
- [x] 7.3 Rules: general (IN-GEN)
- [x] 7.4 Rules: labelling (IN-LBL)
- [x] 7.5 Rules: sterile, single-use, reusable (IN-STR, IN-SU, IN-RU)
- [x] 7.6 Rules: contraindications, class C/D, implant, IVD (IN-CI, IN-CD, IN-IMP, IN-IVD)
- [x] 7.7 Rules: vigilance, disposal, lay-user readability (IN-VIG, IN-DSP, IN-LAY)
- [ ] 7.8 Unit tests per rule _(needs Vitest approval)_
- [x] 7.9 `runCheck` action (stores ComplianceRun + issues, sets status READY)
- [x] 7.11 S6 page: summary banner, issue cards, deep links, looks-good list
- [x] 7.12 Continue to Preview gating and tooltip
- [x] 7.13 Disclaimer footer component

## 8. S7 Preview (on-screen only)
- [x] 8.1 Shared document template primitives (preview + PDF)
- [x] 8.2 `DocumentRenderer` (document view) and `PrintLayout` (paginated A4)
- [x] 8.3 Preview page with page indicator and view toggle
- [x] 8.4 Read-only view mode for COMPLETED docs

## 9. MVP polish
- [x] 9.3 Audit events on every mutation
- [x] 9.4 Loading states and toasts for all actions
- [x] 9.5 Error and not-found states

## 10. MVP gate
- [x] 10.2 `npm run typecheck` and `npm run lint` clean

---

# Phase 2 — Advanced (PDF generation, language change, account lifecycle)

## 8. PDF, S8 Export
- [ ] 8.5 PDF template: cover page, header/footer, watermark, metadata
- [ ] 8.6 Symbol glossary (auto-selected symbols; confirm symbol list/licensing)
- [ ] 8.7 `pdf/generate.ts` with duration metric
- [ ] 8.8 Storage adapter (India-region S3-compatible) _(storage SDK needs approval)_
- [ ] 8.9 Export schema, options form, filename sanitising _(UI only — mock data, no backend)_
- [ ] 8.10 `generatePdf` action (gate: non-stale run, no blocking issues, verified email → else forced watermark)
- [ ] 8.11 Set COMPLETED on first non-watermarked export
- [ ] 8.12 Ownership-checked download route handler (signed URL / stream)
- [ ] 8.13 Export history (last 10) and ready panel _(UI only — mock data, no backend)_

## 12. Language change
- [ ] 12.1 Hindi strings file and translation coverage for the UI
- [ ] 12.2 Language switcher in the header (replaces the display-only EN chip)
- [ ] 12.3 Export language option on S8 (FR-EXP-02) and Hindi PDF fonts/rendering

## 2. Email-dependent auth
- [ ] 2.4 Email verification and unverified banner _(email provider needs approval)_
- [ ] 2.6 Forgot/reset password pages (1h single-use link) _(UI only — mock data, no backend)_

## 5/7. Compliance extras
- [ ] 5.8 Risk Class Helper sheet (IVD and non-IVD trees)
- [ ] 7.10 `dismissIssue` action (reason, audit)

## 6/9. Versioning and quality
- [ ] 6.15 Mobile drawer for section nav _(UI only — mock data, no backend)_
- [ ] 9.1 New version flow from COMPLETED (snapshot + v1.0 → v1.1)
- [ ] 9.2 Duplicate document action
- [ ] 9.6 Accessibility pass (keyboard, focus, ARIA)
- [ ] 9.7 Responsive pass (768 px and 360 px)
- [ ] 9.8 Account deletion and data export (DPDP)

## 10. Phase 2 gate
- [ ] 10.1 Playwright E2E happy path (signup → export PDF) _(needs Playwright approval)_
- [ ] 10.3 Run `security-reviewer` on all Server Actions
- [ ] 10.4 Run `pr-review-checklist`
- [ ] 10.5 Regulatory sign-off on all `[verify]` items

---

# Phase 3 — More advanced

## 11. New capabilities
- [ ] 11.1 Organisations and roles (Org Admin / Editor / Reviewer)
- [ ] 11.2 Shared company profile (manufacturer and licence details reused across documents)
- [ ] 11.3 Review and approval workflow, comments
- [ ] 11.4 Version comparison (diff between versions)
- [ ] 11.5 Company logo upload and brand colours on the PDF
- [ ] 11.6 AI writing assistance (advisory issues only, never blocking)
- [ ] 11.7 UDI / barcode generation, label and carton artwork
- [ ] 11.8 Section template library per device type
- [ ] 11.9 Exports packaged for CDSCO / SUGAM submissions
- [ ] 11.10 Further regional languages beyond Hindi
- [ ] 11.11 Repeat the Phase 2 gate (security review, PR checklist, regulatory sign-off) for the new scope
