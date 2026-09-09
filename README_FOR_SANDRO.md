# Repeatable Architecture Demo — Instructions for Sandro

Welcome to the **Design Once, Deploy to Many** Cloudflare PSA Service Providers demo!

## 🚀 How to Run on Your Computer

### Option A: 1-Click Launch (Windows)
Double-click **`run.bat`** in this folder. It will automatically detect Bun or Node.js, install dependencies, and launch the demo in your browser at `http://localhost:3000`.

---

### Option B: Terminal Setup (Mac / Linux / Windows)

1. Open your terminal in this folder.
2. Install dependencies:
   ```bash
   bun install   # or: npm install
   ```
3. Start the dev server:
   ```bash
   bun run dev   # or: npm run dev
   ```
4. Open **http://localhost:3000** in your browser.

---

## 🎯 Key Demo Features to Check Out

1. **Architecture Mode Switcher** (Top Right):
   - Switch between **Dual-Pillar (CF1 + AI)**, **Cloudflare One (SASE)**, and **AI Infrastructure & Safety**.
2. **Partner Alliance Picker**:
   - Switch between **Kyndryl**, **NTT DATA**, **Assurance Data**, and **Yakuq**.
3. **Interactive Fleet Slider**:
   - Drag the slider from 1 to 60 enterprise accounts to watch the **Partner-Influenced Opportunity (PIO)**, **Kyndryl Managed Revenue**, and **Net Profit (~75% margin)** scale in real time.
4. **Presentation Slides Deck Button** (Header):
   - Click **`Presentation Slides`** to view the full 4-slide executive presentation deck.
5. **Config-as-Code HCL Viewer**:
   - See the dynamically generated Terraform module and Cloudflare AI Gateway code at the bottom.
