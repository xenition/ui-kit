import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress, type ProgressTone } from '../primitives/Progress';

/** Risk tier — an ordered, non-color signal. */
export type RiskTier = 'low' | 'moderate' | 'high';

interface TierDescriptor {
  label: string;
  glyph: string;
  /** Progress tone slot (traces to semantic tokens via Progress). */
  tone: ProgressTone;
  /** Foreground + tint token classes for the tier pill. */
  text: string;
  tint: string;
}

const TIER: Record<RiskTier, TierDescriptor> = {
  low: { label: 'Low risk', glyph: '🟢', tone: 'success', text: 'text-success', tint: 'bg-success/10' },
  moderate: { label: 'Moderate risk', glyph: '🟡', tone: 'warn', text: 'text-warn', tint: 'bg-warn/10' },
  high: { label: 'High risk', glyph: '🔴', tone: 'danger', text: 'text-danger', tint: 'bg-danger/10' },
};

/** Derive a tier from a 0–100 score when one isn't provided. */
function tierFromScore(score: number): RiskTier {
  if (score <= 33) return 'low';
  if (score <= 66) return 'moderate';
  return 'high';
}

export interface RiskScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Underwriting risk score, 0–100 (higher = riskier). */
  score: number;
  /** Explicit tier; derived from `score` when omitted. */
  tier?: RiskTier;
  /** Heading label (default "Risk score"). */
  label?: string;
  /** Contributing factors listed under the bar. */
  factors?: string[];
}

/**
 * An underwriting risk gauge: a 0–100 score with a tier read out by
 * **glyph + label + color** (low → success, high → danger — never color alone),
 * a token `Progress` bar, and an optional factor list. The score is clamped to
 * 0–100 and rounded; the tier derives from the score when not given. Factor
 * indexing is guarded. Token-bound throughout. Web parity of the native
 * `RiskScore`.
 */
export const RiskScore = React.forwardRef<HTMLDivElement, RiskScoreProps>(function RiskScore(
  { score, tier, label = 'Risk score', factors = [], className, ...rest },
  ref
) {
  const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0;
  const td = TIER[tier ?? tierFromScore(clamped)];
  const list = Array.isArray(factors) ? factors : [];

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-muted">{label}</span>
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span
              aria-label={`${label}: ${clamped} out of 100, ${td.label}`}
              className="text-3xl font-bold text-on-surface"
            >
              {clamped}
            </span>
            <span className="text-sm text-muted">/ 100</span>
          </span>
        </div>
        <span
          className={cn(
            'flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
            td.tint
          )}
        >
          <span aria-hidden="true" className="text-xs">
            {td.glyph}
          </span>
          <span className={cn('text-xs font-bold', td.text)}>{td.label}</span>
        </span>
      </div>

      <Progress value={clamped} max={100} tone={td.tone} />

      {list.length > 0 ? (
        <ul className="mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-xs)]">
          {list.map((factor, i) => (
            <li key={`${factor}-${i}`} className="flex gap-[var(--xen-space-xs)] text-xs text-muted">
              <span aria-hidden="true">•</span>
              <span className="flex-1">{factor}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
