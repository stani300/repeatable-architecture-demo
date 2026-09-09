import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, TrendingUp, Zap, ShieldCheck, Bot, CheckCircle, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { Partner, BlueprintMode, PARTNERS, getPartnerMetrics } from '../data/partners';

interface SlideDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner?: Partner;
  fleetCount?: number;
  mode?: BlueprintMode;
}

export function SlideDeckModal({ isOpen, onClose, partner = PARTNERS[0], fleetCount = 48, mode = 'dual' }: SlideDeckModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const totalSlides = 4;
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const metrics = getPartnerMetrics(partner, mode);

  const totalPio = metrics.pioPerUnit * fleetCount;
  const monthlyPio = totalPio / 12;
  const partnerMrr = metrics.partnerMrrPerUnit * fleetCount;
  const partnerArr = partnerMrr * 12;

  const marginRatio = metrics.marginRatio;
  const monthlyProfit = partnerMrr * marginRatio;
  const annualProfit = partnerArr * marginRatio;
  const asdHealthScore = metrics.asdHealthScore;

  const autoCostOfDelivery = partnerMrr * (1 - marginRatio);
  const autoCostPct = Math.round((1 - marginRatio) * 100);

  // Manual delivery baseline: 65% cost of delivery, 35% margin
  const manualCostOfDelivery = partnerMrr * 0.65;
  const manualMonthlyProfit = partnerMrr * 0.35;
  const manualAnnualProfit = partnerArr * 0.35;
  const annualProfitGain = annualProfit - manualAnnualProfit;
  const monthlyLaborSavings = manualCostOfDelivery - autoCostOfDelivery;

  const profitBoostPct = Math.round(((monthlyProfit - manualMonthlyProfit) / manualMonthlyProfit) * 100);

  const totalBundleMonthly = monthlyPio + partnerMrr;
  const totalBundleAnnual = totalPio + partnerArr;

  const formatCurrency = (val: number) => {
    if (val >= 1_000_000) {
      return `$${(val / 1_000_000).toFixed(2)}M`;
    }
    return `$${(val / 1_000).toFixed(0)}k`;
  };

  const formatFullCurrency = (val: number) => {
    return `$${Math.round(val).toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
      {/* Slide Deck Container */}
      <div className="relative w-full max-w-5xl aspect-[16/9] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Top Bar / Slide Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
              <Presentation className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold tracking-wide text-white">
                  CLOUDFLARE PSA PARTNER ALLIANCE PRESENTATION
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {partner.name} · {fleetCount} {fleetCount === 1 ? partner.unit : partner.unitPlural} · {mode.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Executive Slide Deck: Partner Value & Automation Economics</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-slate-400">
              Slide <span className="text-orange-400 font-bold">{currentSlide + 1}</span> of {totalSlides}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition"
              title="Close Presentation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Body */}
        <div className="flex-1 p-8 sm:p-12 overflow-y-auto flex flex-col justify-center">
          {/* SLIDE 1: Cover / Overview */}
          {currentSlide === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                Partner Strategic Alliance Blueprint
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight text-white max-w-3xl">
                Unlocking Partner Profitability Through <span className="text-orange-500">Cloudflare Repeatable Automation</span>
              </h1>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                How {partner.name} scales {mode === 'dual' ? 'Cloudflare One (SASE) and AI Infrastructure' : mode === 'cf1' ? 'Cloudflare One (SASE)' : 'AI Infrastructure & Safety'} across {fleetCount}+ {fleetCount === 1 ? partner.unit : partner.unitPlural} with ~{Math.round(marginRatio * 100)}% profit margins and zero configuration drift.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 max-w-2xl">
                <div>
                  <div className="text-2xl font-bold font-display text-emerald-400">+{profitBoostPct}%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Partner Net Profit Boost</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-cyan-400">&lt; 5 Mins</div>
                  <div className="text-xs text-slate-400 mt-0.5">Client Onboarding Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-display text-orange-400">{asdHealthScore}%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Zero-Drift Telemetry Health</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: 4 Core Value Propositions */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Executive Value Pillars</div>
                <h2 className="text-2xl font-bold font-display text-white">4 Core Value Propositions for {partner.name}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Value Prop 1 */}
                <div className="p-4 rounded-xl border border-emerald-900/60 bg-emerald-950/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
                    <TrendingUp className="w-4 h-4" /> 1. Margin Expansion (35% → {Math.round(marginRatio * 100)}%)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Automation slashes cost-of-delivery by {100 - autoCostPct}%, adding <strong className="text-white">+{formatCurrency(annualProfitGain)}/year in net profit</strong> across {fleetCount} {fleetCount === 1 ? partner.unit : partner.unitPlural} without adding engineering headcount.
                  </p>
                </div>

                {/* Value Prop 2 */}
                <div className="p-4 rounded-xl border border-cyan-900/60 bg-cyan-950/20">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
                    <Zap className="w-4 h-4" /> 2. Speed-to-Market (6 Wks → &lt; 5 Mins)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Single-source Terraform and Tenant API automation allows one-click deployment of standardized baselines, accelerating time-to-revenue.
                  </p>
                </div>

                {/* Value Prop 3 */}
                <div className="p-4 rounded-xl border border-orange-900/60 bg-orange-950/20">
                  <div className="flex items-center gap-2 text-orange-400 font-bold text-sm mb-1.5">
                    <ShieldCheck className="w-4 h-4" /> 3. Zero Configuration Drift ({asdHealthScore}%)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Central Organization architecture and autonomous AI telemetry (<span className="text-cyan-300 font-mono">{metrics.telemetryStatus}</span>) continuously enforce 100% policy inheritance across child accounts.
                  </p>
                </div>

                {/* Value Prop 4 */}
                <div className="p-4 rounded-xl border border-violet-900/60 bg-violet-950/20">
                  <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-1.5">
                    <Bot className="w-4 h-4" /> 4. Practice Monetization & ASD
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Standardize on <span className="text-orange-300 font-medium">{metrics.managedServiceTitle}</span> with {metrics.automationBoost} to capture high-margin recurring advisory revenue.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Side-by-Side Comparison Table */}
          {currentSlide === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Business Case Analysis</div>
                  <h2 className="text-xl font-bold font-display text-white">{fleetCount} {fleetCount === 1 ? partner.unit : partner.unitPlural}: Without vs. With Automation</h2>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg">
                  +{formatCurrency(annualProfitGain)}/yr Net Profit Gain
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Operational Metric</th>
                      <th className="p-2.5 text-slate-300">WITHOUT Automation (Manual)</th>
                      <th className="p-2.5 text-emerald-400 font-bold bg-emerald-950/30">WITH Cloudflare Automation</th>
                      <th className="p-2.5 text-orange-400">Impact / Difference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Monthly Gross Revenue</td>
                      <td className="p-2.5">{formatFullCurrency(partnerMrr)} / mo</td>
                      <td className="p-2.5 bg-emerald-950/10 font-bold text-white">{formatFullCurrency(partnerMrr)} / mo</td>
                      <td className="p-2.5 text-slate-400">Same billing ({formatFullCurrency(metrics.partnerMrrPerUnit)}/{partner.unit})</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Onboarding Time / Client</td>
                      <td className="p-2.5 text-red-400">4 to 6 Weeks</td>
                      <td className="p-2.5 bg-emerald-950/10 font-bold text-emerald-400">&lt; 5 Minutes</td>
                      <td className="p-2.5 text-emerald-400 font-semibold">99% Faster Time-to-Market</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Engineers Needed ({fleetCount} {fleetCount === 1 ? partner.unit : partner.unitPlural})</td>
                      <td className="p-2.5 text-red-400">{Math.max(10, Math.round(fleetCount * 0.35))} to {Math.max(15, Math.round(fleetCount * 0.45))} Engineers</td>
                      <td className="p-2.5 bg-emerald-950/10 font-bold text-cyan-400">2 to 3 Engineers</td>
                      <td className="p-2.5 text-cyan-400 font-semibold">{Math.max(8, Math.round(fleetCount * 0.35) - 2)}+ Engineers Saved</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Cost of Delivery (% Revenue)</td>
                      <td className="p-2.5 text-red-400">65% ({formatCurrency(manualCostOfDelivery)} / mo)</td>
                      <td className="p-2.5 bg-emerald-950/10 font-bold text-emerald-400">{autoCostPct}% ({formatCurrency(autoCostOfDelivery)} / mo)</td>
                      <td className="p-2.5 text-emerald-400 font-semibold">{formatCurrency(monthlyLaborSavings)}/mo Labor Savings</td>
                    </tr>
                    <tr className="bg-slate-900/90 font-bold">
                      <td className="p-2.5 text-white">Monthly Net Profit</td>
                      <td className="p-2.5 text-slate-400">{formatFullCurrency(manualMonthlyProfit)} / mo</td>
                      <td className="p-2.5 bg-emerald-950/40 text-emerald-300 text-sm">{formatFullCurrency(monthlyProfit)} / mo</td>
                      <td className="p-2.5 text-emerald-400 text-sm">+{profitBoostPct}% Profit Boost</td>
                    </tr>
                    <tr className="bg-emerald-950/20 font-bold border-t border-emerald-800">
                      <td className="p-2.5 text-emerald-300">Annual Net Profit</td>
                      <td className="p-2.5 text-slate-400">{formatCurrency(manualAnnualProfit)} / yr</td>
                      <td className="p-2.5 text-emerald-400 text-sm">{formatCurrency(annualProfit)} / yr</td>
                      <td className="p-2.5 text-emerald-300 font-extrabold">+{formatCurrency(annualProfitGain)} / yr Net</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white">Profit Margin %</td>
                      <td className="p-2.5 text-slate-400">35% Margin</td>
                      <td className="p-2.5 bg-emerald-950/10 font-bold text-emerald-400">{Math.round(marginRatio * 100)}% Margin</td>
                      <td className="p-2.5 text-emerald-400 font-semibold">+{Math.round(marginRatio * 100) - 35} Percentage Points</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 4: Cash Flow Architecture & Conclusion */}
          {currentSlide === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3">
                <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">Joint Strategic Ecosystem</div>
                <h2 className="text-2xl font-bold font-display text-white">Monthly Money Flow & Executive Summary</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-center">
                  <div className="text-xs text-slate-400 mb-1">End Clients Pay Partner</div>
                  <div className="text-2xl font-bold text-white font-display">{formatFullCurrency(totalBundleMonthly)} / mo</div>
                  <div className="text-[10px] text-slate-400 mt-1">{formatCurrency(totalBundleAnnual)} / yr Total Bundle</div>
                </div>

                <div className="p-4 rounded-xl border border-orange-900/60 bg-orange-950/20 text-center">
                  <div className="text-xs text-orange-300 mb-1">Partner Pays Cloudflare</div>
                  <div className="text-2xl font-bold text-orange-400 font-display">{formatFullCurrency(monthlyPio)} / mo</div>
                  <div className="text-[10px] text-orange-300/80 mt-1">{formatCurrency(totalPio)} / yr Cloudflare PIO</div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-900/60 bg-emerald-950/30 text-center">
                  <div className="text-xs text-emerald-300 mb-1">Partner Monthly Net Profit</div>
                  <div className="text-2xl font-bold text-emerald-400 font-display">{formatFullCurrency(monthlyProfit)} / mo</div>
                  <div className="text-[10px] text-emerald-300/80 mt-1">{formatCurrency(annualProfit)} / yr Net Profit (~{Math.round(marginRatio * 100)}% Margin)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-200">Ready to present to partner leadership?</div>
                  <div className="text-xs text-slate-400">
                    Use these 4 slides to demonstrate how Cloudflare PSA alliance architecture delivers unmatched partner profitability.
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition shrink-0"
                >
                  Return to Live Interactive Demo <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Slide Indicators */}
        <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div>Cloudflare Partner Solutions Architecture (PSA) Presentation Deck</div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-orange-500 w-6' : 'bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
