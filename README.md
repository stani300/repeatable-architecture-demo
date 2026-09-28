# Design Once, Deploy to Many
### Cloudflare Partner Solutions Architecture (PSA) & Service Provider Alliance Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-repeatable.shanezerotrust.com-F6821F?style=for-the-badge&logo=cloudflare&logoColor=white)](https://repeatable.shanezerotrust.com)
[![Cloudflare Pages](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://repeatable-architecture-demo.pages.dev)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A focused, high-impact reference architecture demo illustrating how Cloudflare Partner Solutions Architects help **Service Providers**, **Global Systems Integrators (GSIs)**, and **MSSPs** turn repeatable technical blueprints into predictable **Partner-Influenced Opportunity (PIO)** and high-margin recurring Managed Services.

---

## 🌐 Live Hosted Demo

- **Primary Production Domain:** [https://repeatable.shanezerotrust.com](https://repeatable.shanezerotrust.com)
- **Cloudflare Pages Edge URL:** [https://repeatable-architecture-demo.pages.dev](https://repeatable-architecture-demo.pages.dev)
- **Executive Walkthrough Guide:** [`Cloudflare_PSA_Demo_Guided_Walkthrough.pdf`](./Cloudflare_PSA_Demo_Guided_Walkthrough.pdf)

---

## 💡 The Core Problem & Solution

Enterprise security and AI delivery models traditionally suffer from **severe margin compression**:
- **Manual Provisioning:** 4 to 6 weeks per customer account.
- **High Cost of Delivery:** Engineering labor consumes ~65% of billable revenue (leaving only ~35% net profit margin).
- **Configuration Drift:** Policies diverge across customer accounts, increasing operational and security risk.

### The Cloudflare PSA Solution:
By establishing a **single-source declarative blueprint** at the Cloudflare Organization parent level and fanning it out to child accounts via Cloudflare's **Tenant API**:
- Onboarding time drops from **6 weeks to < 5 minutes** (99% faster time-to-market).
- Delivery cost drops from **65% to 25%** (slashing operational labor).
- Partner net profit expands by **+114%** (margin increases from **35% to ~75%**).
- Autonomous telemetry maintains **99.4% zero-drift policy health**.

---

## 🤝 Supported Partner Alliance Tracks

Explore 7 documented alliance motions across 3 partner categories with the interactive filter bar:

### 1. Service Providers & Telecommunications
- **Lumen (`Service Provider`)**: Strategic alliance delivering *Lumen SASE with Cloudflare One* — integrating nationwide fiber, edge compute, Magic WAN, Magic Transit, and edge AI protection.
- **AT&T (`Service Provider`)**: Global carrier alliance delivering *AT&T Managed SASE with Cloudflare One* — unifying fiber & 5G network fabric with Zero Trust access, SWG, and AI guardrails.
- **Verizon (`Service Provider`)**: Tier-1 service provider partnership powering *Verizon Business Managed Cloud Security* — edge WAF, DDoS mitigation, and secure AI pipeline governance.

### 2. Global Systems Integrators (GSIs)
- **Kyndryl (`GSI`)**: Global strategic alliance for enterprise network transformation — Managed WAN-as-a-Service, Cloudflare Zero Trust, and Enterprise AI Gateway Security (Default fleet: 48 enterprise accounts).
- **NTT DATA (`GSI`)**: Global system integrator alliance delivering secure network / SASE transformation on Cloudflare One and AI pipeline protection.

### 3. Specialized & MSSP Alliances
- **Assurance Data (`PowerUP`)**: Cloud-native Zero Trust and AI application posture management.
- **Yakuq (`MSSP`)**: Cloudflare MSSP standardizing multi-tenant WAF, DDoS, Zero Trust operations, and AI Gateway rate-limiting without policy drift.

---

## ⚡ Key Architectural Features

1. **Multi-Pillar Practice Switching (Top Bar):**
   - **Dual-Pillar (CF1 + AI):** Full enterprise defense combining Cloudflare One (SASE) and AI Infrastructure & Safety.
   - **Cloudflare One (SASE):** Core network modernization (ZTNA, SWG, CASB, Magic WAN, DLP).
   - **AI Infrastructure & Safety:** Cloud-native AI Gateway, Prompt Guard, Rate Limiting, and Workers AI inference protection.
2. **Technical Account Plan (TAP) & Financial Economics Engine:**
   - Translates technical fleet telemetry directly into P&L metrics: **Cloudflare Subscription PIO**, **Partner Managed Services MRR**, **Net Profit ($/mo & $/yr)**, and **Zero-Drift Telemetry Health Score**.
3. **Interactive Fleet Scaling Slider:**
   - Scale customer fleets from 1 to 60 accounts with quick presets (`12`, `24`, `48`) to see economics and tenant fanout update with mathematical consistency.
4. **Declarative Config-as-Code Terminal (Bottom):**
   - Single-source Terraform snippet illustrating multi-tenant loop over `cloudflare_account.customer` and child account inheritance.
5. **Executive Presentation Deck Modal:**
   - Click **"Presentation Slides"** in the header to view a 4-slide business case designed for partner leadership:
     - *Slide 1:* Executive Overview (+114% profit boost, < 5 min onboarding).
     - *Slide 2:* 4 Core Value Propositions (Margin Expansion, Speed-to-Market, Zero Drift, ASD Monetization).
     - *Slide 3:* Side-by-Side Comparison Table for 48 Enterprise Clients (Manual vs. Cloudflare Automation).
     - *Slide 4:* Monthly Cash Flow Diagram ($1.18M/mo bundle $\rightarrow$ $580k/mo PIO $\rightarrow$ $450k/mo partner net profit).

---

## 🛠️ Local Development & Deployment

### Prerequisites
- Node.js 18+ or Bun

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
# -> Local server opens at http://localhost:3000

# 3. TypeScript type check
npm run lint

# 4. Production build
npm run build
# -> Optimized static bundle output to dist/

# 5. Deploy directly to Cloudflare Pages
npm run deploy
```

---

## 📄 License & Attribution

Directional planning values and reference architectures created for **Cloudflare Partner Solutions Architecture (PSA)** discussions.
Authored by **Sandro Tanis** (Candidate, Partner Solutions Architect).
