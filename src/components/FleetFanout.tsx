import { Partner, BlueprintMode } from '../data/partners';
import { ShieldCheck, Bot, Cpu } from 'lucide-react';

const CAP = 24; // render cap; counter still reflects the true fleet size

interface FleetFanoutProps {
  partner: Partner;
  count: number;
  animKey: number;
  mode: BlueprintMode;
}

export function FleetFanout({ partner, count, animKey, mode }: FleetFanoutProps) {
  const shown = Math.min(count, CAP);
  const overflow = count - shown;

  const stackToDisplay =
    mode === 'cf1'
      ? partner.cf1Stack
      : mode === 'ai'
      ? partner.aiStack
      : [...partner.cf1Stack, ...partner.aiStack];

  return (
    <div key={animKey} className="fanout grid gap-2"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}>
      {Array.from({ length: shown }, (_, i) => (
        <div key={i}
          className="child rounded-xl border border-[var(--line)] bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-orange-300 transition-colors"
          style={{ animationDelay: `${Math.min(i * 22, 520)}ms` }}>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono text-[11px] text-[var(--ink)] font-medium truncate">
                {partner.type === 'MSSP' || partner.type === 'PowerUP' ? 'Customer' : 'Enterprise'} {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            {mode === 'ai' || mode === 'dual' ? (
              <Bot className="w-3 h-3 text-cyan-500 shrink-0" />
            ) : (
              <Cpu className="w-3 h-3 text-orange-400 shrink-0" />
            )}
          </div>

          {/* identical inherited baseline — color coded stack dots */}
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            {stackToDisplay.map((item, k) => {
              const isAi = partner.aiStack.includes(item);
              return (
                <span
                  key={k}
                  title={item}
                  className={`w-1.5 h-1.5 rounded-full transition-transform hover:scale-150 ${
                    isAi ? 'bg-cyan-500 ring-1 ring-cyan-300' : 'bg-orange-500'
                  }`}
                />
              );
            })}
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-1.5 truncate">
            {mode === 'dual' ? 'CF1 + AI Synchronized' : mode === 'ai' ? 'AI Gateway Enforced' : 'SASE Enforced'}
          </div>
        </div>
      ))}
      {overflow > 0 && (
        <div className="child rounded-xl border border-dashed border-slate-300 bg-[var(--bg)] p-2.5 flex items-center justify-center"
          style={{ animationDelay: `${Math.min(shown * 22, 520)}ms` }}>
          <span className="font-mono text-[11px] text-[var(--ink-3)] font-medium">+{overflow} more</span>
        </div>
      )}
    </div>
  );
}
