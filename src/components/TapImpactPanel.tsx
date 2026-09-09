import { Partner, BlueprintMode, getPartnerMetrics } from '../data/partners';
import { DollarSign, ShieldCheck, Cpu, Bot, TrendingUp, PiggyBank, Shield, Sparkles } from 'lucide-react';

interface TapImpactPanelProps {
  partner: Partner;
  fleetCount: number;
  mode: BlueprintMode;
}

export function TapImpactPanel({ partner, fleetCount, mode }: TapImpactPanelProps) {
  const metrics = getPartnerMetrics(partner, mode);

  const totalPio = metrics.pioPerUnit * fleetCount;
  const partnerMrr = metrics.partnerMrrPerUnit * fleetCount;
  const partnerArr = partnerMrr * 12;

  // Automation margin dynamic per mode
  const marginRatio = metrics.marginRatio;
  const monthlyProfit = partnerMrr * marginRatio;
  const annualProfit = partnerArr * marginRatio;
  const asdHealthScore = metrics.asdHealthScore;

  const monthlyPio = totalPio / 12;
  const totalClientBundleMonthly = monthlyPio + partnerMrr;

  // Comparison vs manual operations (65% cost of delivery, 35% margin)
  const manualMonthlyProfit = partnerMrr * 0.35;
  const manualAnnualProfit = partnerArr * 0.35;
  const annualProfitGain = annualProfit - manualAnnualProfit;

  const formatCurrency = (val: number) => {
    if (val >= 1_000_000) {
      return `$${(val / 1_000_000).toFixed(2)}M`;
    }
    return `$${(val / 1_000).toFixed(0)}k`;
  };

  const modeBadge = {
    dual: {
      label: 'Dual-Pillar Economics (SASE + AI)',
      icon: Sparkles,
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    },
    cf1: {
      label: 'Cloudflare One (SASE) Economics',
      icon: Shield,
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    },
    ai: {
      label: 'AI Infrastructure & Safety Economics',
      icon: Bot,
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
  }[mode];

  const ModeIcon = modeBadge.icon;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-5 shadow-lg mb-6 transition-all duration-300">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <TrendingUp className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display text-sm font-bold tracking-wide text-slate-100">
                TECHNICAL ACCOUNT PLAN (TAP) & FINANCIAL ECONOMICS
              </h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 ${modeBadge.color}`}>
                <ModeIcon className="w-3 h-3" />
                {modeBadge.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Joint partner monetization, Cloudflare PIO, and automated profit margins across {fleetCount} {fleetCount === 1 ? partner.unit : partner.unitPlural}
            </p>
          </div>
        </div>

        {/* Autonomous AI Tool Badge */}
        <div className="flex items-center gap-1.5 text-[11px] bg-slate-800/80 border border-slate-700/60 rounded-lg px-2.5 py-1 text-slate-300">
          <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Automation Telemetry:</span>
          <span className="font-mono text-cyan-300 font-semibold">{metrics.telemetryStatus}</span>
        </div>
      </div>

      {/* Metrics Grid - 4 Columns */}
      <div key={`${partner.id}-${mode}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 animate-fadeIn">
        {/* Cloudflare PIO */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 relative overflow-hidden transition hover:border-orange-500/40">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span>Cloudflare PIO</span>
            <DollarSign className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <div className="text-xl font-bold font-display text-white transition-all">
            {formatCurrency(totalPio)}
            <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ yr</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {metrics.pioSubtext} ({formatCurrency(monthlyPio)}/mo)
          </div>
        </div>

        {/* Partner Managed Services MRR */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 relative overflow-hidden transition hover:border-cyan-500/40">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span>{partner.name} Gross Revenue</span>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-display text-cyan-300 transition-all">
            {formatCurrency(partnerMrr)}
            <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ mo</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {formatCurrency(partnerArr)}/yr billable · {formatCurrency(totalClientBundleMonthly)}/mo client bundle
          </div>
        </div>

        {/* Partner Net Profit */}
        <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-3.5 relative overflow-hidden transition hover:border-emerald-500/40">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-emerald-300 text-[11px] mb-1">
            <span className="font-semibold">{partner.name} Net Profit</span>
            <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-display text-emerald-400 transition-all">
            {formatCurrency(monthlyProfit)}
            <span className="text-xs font-normal text-emerald-300/80 font-sans ml-1">/ mo</span>
          </div>
          <div className="text-[10px] text-emerald-300/70 mt-1 font-medium">
            ~{Math.round(marginRatio * 100)}% margin ({formatCurrency(annualProfit)}/yr) · +{formatCurrency(annualProfitGain)}/yr gain
          </div>
        </div>

        {/* Telemetry Health */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 relative overflow-hidden transition hover:border-emerald-500/40">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
            <span>Architectural Health</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-display text-emerald-400 transition-all">
            {asdHealthScore}%
            <span className="text-xs font-normal text-slate-400 font-sans ml-1.5">{metrics.healthLabel}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {metrics.healthSubtext} (&lt; 5 min onboard)
          </div>
        </div>
      </div>

      {/* Joint Offering Bar */}
      <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 px-3.5 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Cpu className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            <strong className="text-slate-100">Accelerated Services Offering:</strong>{' '}
            <span className="text-orange-300 font-medium">{metrics.managedServiceTitle}</span>
          </span>
        </div>
        <div className="text-[11px] text-slate-400 font-mono">
          Automation Profit Boost: <span className="text-emerald-400 font-semibold">{metrics.automationBoost}</span>
        </div>
      </div>
    </div>
  );
}
