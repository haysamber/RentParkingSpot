# ParkSpot — MVP Plan

> True parallel build — Dev A and Dev B start at the same time. See `WORKING-AGREEMENT.md` for file ownership.

**Repo:** https://github.com/haysamber/RentParkingSpot
**Stack:** Next.js 14 (App Router) · Tailwind CSS · In-memory store · No auth

---

## How parallel work is possible

Dev A and Dev B own completely different files. Dev B builds frontend pages against the agreed data shapes below — no waiting needed. When Dev A's API routes are ready, Dev B's fetch calls work automatically because the shapes match.

**Agreed data shapes (both devs build to these):**

Spot: `{ id, address, neighborhood, type: 'driveway'|'garage', pricePerHour, description, available: boolean }`
Booking: `{ id, spotId, renterName, renterEmail, date, hours }`

---

## Dev A — Backend

All tasks can start immediately. Run in order.

---

### Task 1 — Scaffold + Design System

**Owner:** Dev A
**Status:** [ ] pending

**Todo**
1. Inside `RentParkingSpot/`, run `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-eslint`
2. Extend `tailwind.config.ts` with color tokens from `design-system.md` and set Inter as default sans font
3. Load Inter via `next/font/google` in `app/layout.tsx`, apply to `<body>`
4. Clear boilerplate from `app/page.tsx`
5. Confirm `npm run dev` starts clean
6. Push to `main` immediately so Dev B can pull and start

---

### Task 2 — Data Store

**Owner:** Dev A
**Status:** [ ] pending

**Todo**
1. Create `lib/data.ts` — export `spots` array (6 SF seed spots) and `bookings` array (empty)
2. Export helpers: `getSpots()`, `getSpot(id)`, `addSpot()`, `addBooking()`
3. Seed spot fields: `id`, `address`, `neighborhood`, `type`, `pricePerHour`, `description`, `available: true`
4. Use realistic SF addresses across neighborhoods: Mission, SoMa, Castro, Marina, Sunset, NOPA

---

### Task 3 — API Routes

**Owner:** Dev A
**Status:** [ ] pending

**Todo**
1. `app/api/spots/route.ts` — `GET` all spots, `POST` new spot (400 if required fields missing, 201 on success)
2. `app/api/spots/[id]/route.ts` — `GET` single spot (404 if not found)
3. `app/api/bookings/route.ts` — `POST` booking, set spot `available: false`, return 201

---

## Dev B — Frontend

All tasks can start immediately after Dev A pushes the initial scaffold (Task 1). Build against the agreed data shapes above — the API routes will be ready by the time the UI is wired up.

---

### Task 4 — Shared Components

**Owner:** Dev B
**Status:** [ ] pending

**Todo**
1. `components/Navbar.tsx` — "ParkSpot" logo (primary color, bold) + "List your spot" button linking to `/list`. Sticky top, white bg, bottom border secondary color.
2. `components/SpotCard.tsx` — shows address, neighborhood badge (accent), type badge, price/hr, "View" link to `/spots/[id]`. Greyed out with "Booked" overlay when `available: false`.
3. Add `<Navbar>` to `app/layout.tsx`

---

### Task 5 — Listing Page

**Owner:** Dev B
**Status:** [ ] pending

**Todo**
1. `app/page.tsx` — server component, fetch `/api/spots` with `no-store`
2. H1: "Parking spots in San Francisco"
3. Responsive grid: 1 col → 2 col → 3 col. Render `<SpotCard>` for each spot.
4. Empty state: "No spots listed yet."

---

### Task 6 — Spot Detail + Booking

**Owner:** Dev B
**Status:** [ ] pending

**Todo**
1. `app/spots/[id]/page.tsx` — server component, fetch single spot, display all fields. "Book this spot" button (primary) links to `/spots/[id]/book`. Show "Already booked" (muted text) if unavailable.
2. `app/spots/[id]/book/page.tsx` — client component. Form: date, hours (1–8), name, email. POST to `/api/bookings`. On success `router.push('/')`. On error show "Booking failed. Please try again."

---

### Task 7 — List Your Spot

**Owner:** Dev B
**Status:** [ ] pending

**Todo**
1. `app/list/page.tsx` — client component. Form: address (text), neighborhood (`<select>` — Mission, SoMa, Castro, Haight, Marina, Sunset, Richmond, NOPA, Tenderloin, Nob Hill), type (radio: driveway/garage), price/hr (number), description (textarea). All fields required.
2. POST to `/api/spots`. On success `router.push('/')`. On error show "Could not list spot. Please try again."

---

## Out of Scope

Auth · Payments · Map · Search/filters · Image uploads · Database
