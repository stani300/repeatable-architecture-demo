# Repeatable Architecture Demo — Instructions for Sandro

Welcome to the **Design Once, Deploy to Many** Cloudflare PSA Service Providers demo!

## 🚀 Live Demo & Repository Links

- **Live Custom Domain:** [https://repeatable.shanezerotrust.com](https://repeatable.shanezerotrust.com)
- **Cloudflare Pages Edge URL:** [https://repeatable-architecture-demo.pages.dev](https://repeatable-architecture-demo.pages.dev)
- **GitHub Repository:** [https://github.com/stani300/repeatable-architecture-demo](https://github.com/stani300/repeatable-architecture-demo)
- **Guided Walkthrough PDF:** [`Cloudflare_PSA_Demo_Guided_Walkthrough.pdf`](./Cloudflare_PSA_Demo_Guided_Walkthrough.pdf)

---

## 💻 How to Run on Your Mac / Local Computer

1. Open your terminal in this project folder:
   ```bash
   cd /Users/shanewestern/Projects/repeatable-architecture-demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:3000** in your browser.

---

## 🎯 Key Demo Features to Showcase

1. **Service Providers Track (Lumen, AT&T, Verizon):**
   - Click the **Service Providers (3)** filter tab to display **Lumen**, **AT&T**, and **Verizon**.
   - Show how carrier and telco multi-tenant architectures fan out to child enterprise accounts without linear operational overhead.
2. **Architecture Mode Switcher (Top Right):**
   - Switch between **Dual-Pillar (CF1 + AI)**, **Cloudflare One (SASE)**, and **AI Infrastructure & Safety**.
3. **Interactive Fleet Slider & Presets:**
   - Drag the slider from 1 to 60 accounts (or use `[12]`, `[24]`, `[48]`) to watch **Cloudflare PIO**, **Partner Gross Revenue**, and **Partner Net Profit (~75% margin)** scale dynamically.
4. **Presentation Slides Deck Button (Header):**
   - Click **`Presentation Slides`** to view the full 4-slide executive presentation deck for partner leadership.
5. **Declarative Config-as-Code HCL Viewer (Bottom):**
   - Review the dynamically generated Terraform module looping over `cloudflare_account.customer` via the Tenant API.
