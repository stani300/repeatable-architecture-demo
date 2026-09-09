# Design Once, Deploy to Many

A deliberately simple, powerful demo for a Cloudflare Partner Solutions Architect
interview. One idea, one screen: a repeatable Cloudflare reference architecture,
deployed identically across a partner's entire customer fleet.

Pick a real Cloudflare partner, see their signature blueprint (defined once at the
partner Organization), then deploy it across N customer accounts — each inheriting
the exact same baseline. That single move *is* repeatable architecture.

## Why this, and why it doesn't overlap the partner portal

The PowerUP portal already covers program mechanics, solution bundles, price lists,
deal registration, and generic customer-oriented reference architectures. It does
**not** show a partner-specific "design once → deploy to your whole fleet" motion
tied to real partners and Cloudflare's Organizations (MSSP/Distributor) multi-tier
model. That gap is the demo.

## Real partners used

- **Kyndryl** (GSI) — Managed WAN-as-a-Service + Zero Trust network transformation
- **NTT DATA** (GSI) — secure network / SASE transformation on Cloudflare One
- **Assurance Data** (PowerUP) — cloud-native Zero Trust cyber defense
- **Yakuq** (MSSP) — multi-tenant WAF/DDoS/Zero Trust operations

All are publicly named Cloudflare partners; motions reflect their documented focus.
Fleet figures are directional planning values, not commitments.

## Key properties

- **Fully client-side** — no backend, no database, no API keys. Runs offline.
- **Tiny and fast** — no chart library; loads instantly for a live demo.

## 🌐 Live Hosted Demo

- **Public Production Link:** [https://repeatable.shanezerotrust.com](https://repeatable.shanezerotrust.com)
- **Cloudflare Pages Domain:** [https://repeatable-architecture-demo.pages.dev](https://repeatable-architecture-demo.pages.dev)

## Run locally

Prerequisites: Node.js 18+

1. `npm install`
2. `npm run dev` → open http://localhost:3000
3. `npm run build` → static files in `dist/`
4. `npm run deploy` → deploy updates directly to Cloudflare Pages

In the demo: switch partners, drag the fleet slider, and hit **Deploy across fleet**
to replay the fan-out. **Copy** grabs the Terraform.

