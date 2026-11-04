# Working Agreement

## File Ownership

| Task | Owner | Files |
|------|-------|-------|
| 1 — Scaffold | Dev A | `package.json`, `tailwind.config.ts`, `app/layout.tsx`, `next.config.*`, `tsconfig.json`, `postcss.config.*` |
| 2 — Data Store | Dev A | `lib/data.ts` |
| 3 — API Routes | Dev A | `app/api/spots/route.ts`, `app/api/spots/[id]/route.ts`, `app/api/bookings/route.ts` |
| 4 — Components | Dev B | `components/Navbar.tsx`, `components/SpotCard.tsx` |
| 5 — Listing Page | Dev B | `app/page.tsx` |
| 6 — Spot Detail + Booking | Dev B | `app/spots/[id]/page.tsx`, `app/spots/[id]/book/page.tsx` |
| 7 — List Your Spot | Dev B | `app/list/page.tsx` |

Dev B reads but never edits `lib/data.ts`, `app/layout.tsx`, or `tailwind.config.ts`.
Dev A never edits anything under `components/` or `app/` pages.

---

## Start condition for Dev B

Dev B pulls and starts as soon as Dev A pushes the scaffold (Task 1 done).
Dev B builds against the agreed shapes — no waiting for API routes.

**Agreed shapes:**
- Spot: `{ id, address, neighborhood, type, pricePerHour, description, available }`
- Booking: `{ id, spotId, renterName, renterEmail, date, hours }`
