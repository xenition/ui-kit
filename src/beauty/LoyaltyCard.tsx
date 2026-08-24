import * as React from 'react';
import { cn } from '../primitives/cn';

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface TierMeta {
  label: string;
  glyph: string;
  /** Token `text-*` class for the accent. */
  text: string;
  /** Token `bg-*` class for the progress fill. */
  fill: string;
}

const TIER_META: Record<LoyaltyTier, TierMeta> = {
  bronze: { label: 'Bronze', glyph: '🥉', text: 'text-warn', fill: 'bg-warn' },
  silver: { label: 'Silver', glyph: '🥈', text: 'text-muted', fill: 'bg-muted' },
  gold: { label: 'Gold', glyph: '🥇', text: 'text-accent', fill: 'bg-accent' },
  platinum: { label: 'Platinum', glyph: '💎', text: 'text-primary', fill: 'bg-primary' },
};

export interface LoyaltyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Member name shown on the card. */
  memberName: string;
  /** Current points balance. */
  points: number;
  /** Membership tier; drives label, glyph, and accent. Falls back to `bronze`. */
  tier?: LoyaltyTier;
  /** Points required to reach the next tier. Enables the progress bar. */
  nextTierAt?: number;
  /** Name of the next tier (for the progress caption). */
  nextTierLabel?: string;
  /** Optional membership id / code shown under the name. */
  memberId?: string;
}

/**
 * A membership loyalty card: tier badge, member name/id, a large points balance,
 * and (when `nextTierAt` is set) a progress bar toward the next tier with a
 * remaining-points caption. `tier` drives the accent, glyph, and label — never
 * color alone. Progress is clamped and guards a zero/invalid target. Token-only
 * colors.
 */
export const LoyaltyCard = React.forwardRef<HTMLDivElement, LoyaltyCardProps>(
  function LoyaltyCard(
    { memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, className, ...rest },
    ref
  ) {
    const meta = TIER_META[tier] ?? TIER_META.bronze;

    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > points;
    const pct = hasTarget ? Math.max(0, Math.min(1, points / (nextTierAt as number))) : 1;
    const remaining = hasTarget ? (nextTierAt as number) - points : 0;

    return (
      <div
        ref={ref}
        data-xen-loyalty-card={tier}
        aria-label={`${meta.label} member ${memberName}, ${points} points${
          hasTarget ? `, ${remaining} to ${nextTierLabel ?? 'next tier'}` : ''
        }`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-bold text-on-surface">{memberName}</span>
            {memberId ? <span className="text-xs text-muted">{memberId}</span> : null}
          </div>
          <span className="flex items-center gap-[var(--xen-space-xs)] rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5">
            <span aria-hidden="true" className="text-sm">
              {meta.glyph}
            </span>
            <span className={cn('text-xs font-bold', meta.text)}>{meta.label}</span>
          </span>
        </div>

        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          <span className={cn('text-3xl font-extrabold', meta.text)}>{points}</span>
          <span className="text-sm text-muted">points</span>
        </div>

        {hasTarget ? (
          <div className="flex flex-col gap-[var(--xen-space-xs)]">
            <span className="h-2 overflow-hidden rounded-full bg-neutral-100">
              <span
                className={cn('block h-full rounded-full', meta.fill)}
                style={{ width: `${pct * 100}%` }}
              />
            </span>
            <span className="text-xs text-muted">
              {remaining} points to {nextTierLabel ?? 'next tier'}
            </span>
          </div>
        ) : (
          <span className="text-xs font-semibold text-success">Top tier reached</span>
        )}
      </div>
    );
  }
);
