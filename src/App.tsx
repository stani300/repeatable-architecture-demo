import { useState } from 'react';
import { PARTNERS, Partner, BlueprintMode, DISCLAIMER } from './data/partners';
import { FleetFanout } from './components/FleetFanout';
import { TapImpactPanel } from './components/TapImpactPanel';
import { SlideDeckModal } from './components/SlideDeckModal';
import { Layers, Rocket, ArrowRight, Copy, Check, Building2, Boxes, Sparkles, Bot, Shield, Presentation } from 'lucide-react';

const TYPE_STYLE: Record<Partner['type'], string> = {
  GSI: 'bg-violet-50 text-[var(--control)] border-violet-200',
  PowerUP: 'bg-orange-50 text-[var(--cf)] border-orange-200',
  MSSP: 'bg-sky-50 text-[var(--flow)] border-sky-200',
};

export default function App() {
  const [partnerId, setPartnerId] = useState(PARTNERS[0].id);
  const [fleet, setFleet] = useState(PARTNERS[0].defaultFleet);
  const [mode, setMode] = useState<BlueprintMode>('dual');
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSlideDeckOpen, setIsSlideDeckOpen] = useState(false);

  const partner = PARTNERS.find((p) => p.id === partnerId)!;

  const selectPartner = (p: Partner) => {
    setPartnerId(p.id);
    setFleet(p.defaultFleet);
    setAnimKey((k) => k + 1);
  };
  const deploy = () => setAnimKey((k) => k + 1);

  // Dynamic Terraform snippet reflect both SASE and AI Infrastructure Modules
  const tf = `# One blueprint, every customer — Cloudflare Organizations (${partner.type})
# Partner: ${partner.name} | Fleet: ${fleet} ${partner.unitPlural} | Mode: ${mode.toUpperCase()}
# Joint Practice Offering: ${partner.modes?.[mode]?.managedServiceTitle ?? partner.managedServiceTitle}

resource "cloudflare_account" "customer" {
  for_each = var.customers          # ${fleet} accounts under the ${partner.name} Organization
  name     = each.value.name
}

${
  mode === 'cf1' || mode === 'dual'
    ? `# 1. Cloudflare One (SASE / Zero Trust Baseline)
module "${partner.moduleName}_sase" {
  for_each   = cloudflare_account.customer
  source     = "./modules/${partner.moduleName}-sase"
  account_id = each.value.id        # WAF · Zero Trust · Access · Gateway — defined once
}`
    : ''
}

${
  mode === 'ai' || mode === 'dual'
    ? `# ${mode === 'dual' ? '2' : '1'}. Enterprise AI Protection & Gateway Baseline
resource "cloudflare_ai_gateway" "enterprise_ai_shield" {
  for_each   = cloudflare_account.customer
  account_id = each.value.id
  id         = "${partner.id}-ai-gateway-default"
  rate_limit = 1000                # Protect client LLM pipelines from overload/abuse
  collect_logs = true
}

module "${partner.moduleName}_ai" {
  for_each   = cloudflare_account.customer
  source     = "./modules/${partner.moduleName}-ai-guard"
  account_id = each.value.id        # Workers AI · Vectorize · LLM Guardrails
}`
    : ''
}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tf);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="border-b border-[var(--line)] bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1150px] mx-auto px-5 py-3.5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-[var(--cf)] flex items-center justify-center shadow-sm">
                <Layers className="w-4 h-4 text-white" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-lg font-bold tracking-tight text-[var(--ink)]">
                    Design once, deploy to many
                  </h1>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200">
                    PSA Service Providers Demo
                  </span>
                </div>
                <p className="text-xs text-[var(--ink-2)]">
                  Repeatable Cloudflare SASE & AI Reference Architectures deployed across partner customer fleets.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Architecture Mode Selector */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 text-xs">
                <button
                  onClick={() => {
                    setMode('dual');
                    setAnimKey((k) => k + 1);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                    mode === 'dual'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Dual-Pillar (CF1 + AI)
                </button>
                <button
                  onClick={() => {
                    setMode('cf1');
                    setAnimKey((k) => k + 1);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                    mode === 'cf1'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-orange-500" /> Cloudflare One (SASE)
                </button>
                <button
                  onClick={() => {
                    setMode('ai');
                    setAnimKey((k) => k + 1);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                    mode === 'ai'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-500" /> AI Infrastructure & Safety
                </button>
              </div>

              {/* Presentation Deck Button */}
              <button
                onClick={() => setIsSlideDeckOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white px-3.5 py-2 hover:bg-slate-800 transition shadow-sm border border-slate-700"
              >
                <Presentation className="w-4 h-4 text-orange-400" /> Presentation Slides
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1150px] w-full mx-auto px-5 py-6">
        {/* Partner picker */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-[var(--ink-3)] uppercase tracking-wide mb-2 flex items-center justify-between">
            <span>Select Cloudflare Partner Alliance</span>
            <span className="text-[11px] font-normal text-slate-500 italic">Publicly Documented Motions</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PARTNERS.map((p) => {
              const active = p.id === partnerId;
              return (
                <button
                  key={p.id}
                  onClick={() => selectPartner(p)}
                  className={`text-left rounded-xl border p-3.5 transition-all ${
                    active
                      ? 'border-[var(--cf)] bg-orange-50/50 shadow-[0_2px_8px_rgba(246,130,31,0.15)] ring-1 ring-orange-400/30'
                      : 'border-[var(--line)] bg-white hover:border-[var(--ink-3)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-[15px] text-slate-900">{p.name}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${TYPE_STYLE[p.type]}`}>
                      {p.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium truncate">
                    {p.modes?.[mode]?.managedServiceTitle ?? p.managedServiceTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Strategic Motion line */}
        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm text-sm text-[var(--ink-2)] leading-relaxed">
          <span className="font-semibold text-slate-900">{partner.name} Motion:</span> {partner.motion}
        </div>

        {/* TAP & Partner Economics Panel */}
        <TapImpactPanel partner={partner} fleetCount={fleet} mode={mode} />

        {/* Blueprint → fleet */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-5 items-start">
          {/* Baseline blueprint (defined once) */}
          <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-b from-orange-50/40 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-orange-700">
                <Boxes className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-wide">Repeatable Baseline</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-mono">
                {mode === 'dual'
                  ? `${partner.cf1Stack.length + partner.aiStack.length} Modules Active`
                  : mode === 'cf1'
                  ? `${partner.cf1Stack.length} SASE Modules Active`
                  : `${partner.aiStack.length} AI Modules Active`}
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-3)] mb-3">
              Configured at partner Organization level & inherited across fleet
            </p>

            <div className="rounded-xl border border-[var(--line)] bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2.5 border-b border-slate-100 pb-2">
                <Building2 className="w-3.5 h-3.5 text-[var(--ink-2)]" />
                <span className="font-mono text-[11px] font-semibold text-slate-800">{partner.name} Organization</span>
              </div>

              {/* Cloudflare One Stack */}
              {(mode === 'cf1' || mode === 'dual') && (
                <div className="mb-2.5">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-orange-600 mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Cloudflare One SASE
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.cf1Stack.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 border border-orange-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Infrastructure Stack */}
              {(mode === 'ai' || mode === 'dual') && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1">
                    <Bot className="w-3 h-3" /> AI Infrastructure & Safety
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.aiStack.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-orange-600 text-xs font-semibold mt-3">
              <ArrowRight className="w-4 h-4" /> 100% Inherited by every customer account
            </div>
          </div>

          {/* Fleet fan-out */}
          <div className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-3 border-b border-slate-100 pb-3">
              <div>
                <div className="font-display font-bold text-base text-slate-900">
                  {fleet} {fleet === 1 ? partner.unit : partner.unitPlural} Deployed
                </div>
                <div className="text-[11px] text-[var(--ink-3)]">{partner.orgModel}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Fleet Size:</span>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={fleet}
                    onChange={(e) => {
                      setFleet(Number(e.target.value));
                      setAnimKey((k) => k + 1);
                    }}
                    className="w-24 accent-[var(--cf)] cursor-pointer"
                  />
                  <span className="font-mono text-xs font-bold text-slate-800 w-6">{fleet}</span>
                  <div className="flex items-center gap-1 ml-1">
                    {[12, 24, 48].map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setFleet(size);
                          setAnimKey((k) => k + 1);
                        }}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition ${
                          fleet === size
                            ? 'bg-orange-500 text-white border-orange-600 font-bold shadow-xs'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                        title={`Set fleet to ${size} accounts`}
                      >
                        {size}{size === 48 ? ' (Deck)' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={deploy}
                  className="inline-flex items-center gap-1.5 text-xs font-bold rounded-xl bg-[var(--cf)] text-white px-3.5 py-2 hover:bg-orange-600 transition shadow-sm"
                >
                  <Rocket className="w-4 h-4" /> Replay Fleet Deploy
                </button>
              </div>
            </div>

            <FleetFanout partner={partner} count={fleet} animKey={animKey} mode={mode} />
          </div>
        </div>

        {/* Config as Code (Terraform) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Declarative Config-As-Code (Terraform / Cloudflare Tenant API)
              </div>
              <div className="text-[11px] text-slate-500">
                Single-source reference module instantiated per customer account in partner Organization
              </div>
            </div>

            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-lg border border-[var(--line)] bg-white px-3 py-1.5 hover:bg-slate-50 transition shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied HCL
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" /> Copy Terraform
                </>
              )}
            </button>
          </div>

          <pre className="thin-scroll overflow-auto rounded-xl border border-slate-800 bg-[#0f172a] text-slate-100 p-4 text-[12px] leading-relaxed font-mono shadow-inner">
            <code>{tf}</code>
          </pre>
        </div>
      </main>

      <footer className="border-t border-[var(--line)] bg-white mt-8">
        <div className="max-w-[1150px] mx-auto px-5 py-4 text-[11px] text-[var(--ink-3)] leading-relaxed flex items-center justify-between flex-wrap gap-2">
          <div>{DISCLAIMER}</div>
          <div className="font-semibold text-slate-600">Built for Cloudflare PSA Service Providers Alliance</div>
        </div>
      </footer>

      {/* Presentation Deck Modal */}
      <SlideDeckModal
        isOpen={isSlideDeckOpen}
        onClose={() => setIsSlideDeckOpen(false)}
        partner={partner}
        fleetCount={fleet}
        mode={mode}
      />
    </div>
  );
}
