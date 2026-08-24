import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

/** Same public contract as {@link LoyaltyCard} — a drop-in alternate design. */
export type LoyaltyCardV3Props = LoyaltyCardProps;

const TIER: Record<LoyaltyTier, { label: string; glyph: string; text: string }> = {
  bronze: { label: 'Bronze', glyph: '🥉', text: 'text-warn' },
  silver: { label: 'Silver', glyph: '🥈', text: 'text-muted' },
  gold: { label: 'Gold', glyph: '🥇', text: 'text-accent' },
  platinum: { label: 'Platinum', glyph: '💎', text: 'text-primary' },
};

/**
 * LoyaltyCard, redesigned (v3): a **compact membership row**. The tier glyph, the
 * member name over a tier·id line, and the points balance pinned right — hairline-
 * bordered for a wallet list. The opposite of v2's card face. Same props,
 * token-only.
 */
export const LoyaltyCardV3 = React.forwardRef<HTMLDivElement, LoyaltyCardV3Props>(function LoyaltyCardV3(
  { memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest },
  ref
) {
  void nextTierAt;
  void nextTierLabel;
  const t = TIER[tier] ?? TIER.bronze;
  const sub = [`${t.label} member`, memberId].filter((s): s is string => !!s).join(' · ');

  return (
    <div ref={ref} data-xen-loyalty-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
      <span className="text-xl" aria-hidden>{t.glyph}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{memberName}</p>
        <p className="truncate text-xs text-muted">{sub}</p>
      </div>
      <div className="text-right">
        <p className={cn('text-lg font-bold', t.text)}>{points.toLocaleString()}</p>
        <p className="text-[10px] text-muted">points</p>
      </div>
    </div>
  );
});
