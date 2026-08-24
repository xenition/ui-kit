import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

/** Same public contract as {@link LoyaltyCard} — a drop-in alternate design. */
export type LoyaltyCardV2Props = LoyaltyCardProps;

const TIER: Record<LoyaltyTier, { label: string; glyph: string; tint: string; text: string; fill: string }> = {
  bronze: { label: 'Bronze', glyph: '🥉', tint: 'bg-warn/10', text: 'text-warn', fill: 'bg-warn' },
  silver: { label: 'Silver', glyph: '🥈', tint: 'bg-neutral-100', text: 'text-muted', fill: 'bg-neutral-400' },
  gold: { label: 'Gold', glyph: '🥇', tint: 'bg-accent/10', text: 'text-accent', fill: 'bg-accent' },
  platinum: { label: 'Platinum', glyph: '💎', tint: 'bg-primary/10', text: 'text-primary', fill: 'bg-primary' },
};

/**
 * LoyaltyCard, redesigned (v2): a **membership card face**. A tier-tinted card with
 * the tier glyph + label, member name/id, a big points balance, and a next-tier
 * progress bar. Bolder than v1. Same props, token-only.
 */
export const LoyaltyCardV2 = React.forwardRef<HTMLDivElement, LoyaltyCardV2Props>(function LoyaltyCardV2(
  { memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest },
  ref
) {
  const t = TIER[tier] ?? TIER.bronze;
  const pct = typeof nextTierAt === 'number' && nextTierAt > 0 ? Math.min(100, Math.round((points / nextTierAt) * 100)) : null;

  return (
    <div ref={ref} data-xen-loyalty-card="" className={cn('flex flex-col gap-3 rounded-xl p-md shadow-md', t.tint, className)} {...rest}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-bold text-on-surface"><span aria-hidden>{t.glyph}</span> {t.label} member</span>
        <span className="text-2xl" aria-hidden>💖</span>
      </div>
      <div>
        <p className="text-lg font-bold text-on-surface">{memberName}</p>
        {memberId ? <p className="font-mono text-xs text-muted">{memberId}</p> : null}
      </div>
      <div>
        <p className={cn('text-3xl font-bold', t.text)}>{points.toLocaleString()}</p>
        <p className="text-xs text-muted">points</p>
      </div>
      {pct !== null ? (
        <div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface/60" role="progressbar" aria-valuenow={points} aria-valuemin={0} aria-valuemax={nextTierAt}>
            <div className={cn('h-full rounded-full', t.fill)} style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-xs text-muted">{nextTierAt! - points} pts to {nextTierLabel ?? 'next tier'}</p>
        </div>
      ) : null}
    </div>
  );
});
