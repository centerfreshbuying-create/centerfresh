# Center Fresh Supermarket — online store

4517 13th Ave, Brooklyn, NY 11219 · 718-633-8099 · office@centerfreshsupermarket.com

Static site (no build step). Backend: Supabase (auth, database, storage, realtime).

- `index.html`, `cf.css` — storefront shell and design
- `boot.js` — Supabase project settings and script loader
- `cf-data.js` — data layer (Supabase)
- `app.js`, `cf-store.js` — customer storefront
- `backoffice.js`, `cf-bo.js` — back office (orders, picking, delivery, reports, settings)
- `catalog.js` — product catalog; `img/` — photos and logo

Deploy: Netlify, publish directory `.` (see `netlify.toml`). First run: sign up with the owner email to become admin.
