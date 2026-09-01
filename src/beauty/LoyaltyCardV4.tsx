import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { metaLine, TONE_INK, type ToneV4 } from './internal/salon-v4';
import type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

export interface LoyaltyCardV4Props extends LoyaltyCardProps {
  /** Override the tier names — four English words lived inside. */
  tierLabels?: Partial<Record<LoyaltyTier, string>>;
  /** Format the points figure. Default `'1,240 points'`. */
  formatPoints?: (points: number) => string;
  /** Build the to-next-tier line. Default `'260 to Gold'`. */
  formatRemaining?: (remaining: number, nextTier: string) => string;
  /** Shown when the member is at the top tier. Default `'Top tier'`. */
  topTierLabel?: string;
}

/**
 * Tier → tone, glyph and default word.
 *
 * `silver` takes `neutral` rather than the base's `muted`: both mean "no
 * status", but `muted` is a ramp step with no contrast promise and this is a
 * *label*, not a wash.
 */
const TIER_META: Record<LoyaltyTier, { label: string; glyph: string; tone: ToneV4 }> = {
  bronze: { label: 'Bronze', glyph: '🥉', tone: 'warn' },
  silver: { label: 'Silver', glyph: '🥈', tone: 'neutral' },
  gold: { label: 'Gold', glyph: '🥇', tone: 'accent' },
  platinum: { label: 'Platinum', glyph: '💎', tone: 'primary' },
};

/**
 * **V4 loyalty card** — the web twin of the native `LoyaltyCardV4`, same props
 * as {@link LoyaltyCard} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The progress bar is `ProgressV4`.** The base drew its own track and
 *    fill, so the one meter on this card did not match the meters everywhere
 *    else and announced no value.
 * 2. **The points figure is tabular and formatted** — a loyalty balance is a
 *    number a member compares against a target.
 * 3. **The tier ink is contrast-corrected**, where the base put a fill slot on
 *    text, including `muted`, which promises nothing.
 * 4. **A top-tier member is told so** rather than silently getting a full bar.
 *
 * **Renders nothing without a `memberName`** (§4.5).
 */
export const LoyaltyCardV4 = React.forwardRef<HTMLDivElement, LoyaltyCardV4Props>(
  function LoyaltyCardV4(
    {
      memberName,
      points,
      tier = 'bronze',
      nextTierAt,
      nextTierLabel,
      memberId,
      tierLabels,
      formatPoints,
      formatRemaining,
      topTierLabel = 'Top tier',
      className,
      ...rest
    },
    ref
  ) {
    if (!memberName) return null;

    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const word = tierLabels?.[tier] ?? meta.label;
    const total = Number.isFinite(points) ? points : 0;
    const pointsText = (formatPoints ?? ((n: number) => `${n.toLocaleString()} points`))(total);

    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > total;
    const pct = hasTarget ? Math.max(0, Math.min(100, (total / (nextTierAt as number)) * 100)) : 100;
    const remaining = hasTarget ? (nextTierAt as number) - total : 0;
    const remainingText = hasTarget
      ? (formatRemaining ?? ((n: number, t: string) => `${n.toLocaleString()} to ${t}`))(
          remaining,
          nextTierLabel ?? 'next tier'
        )
      : topTierLabel;

    return (
      <CardV4
        ref={ref}
        data-xen-loyalty-card={tier}
        aria-label={metaLine([word, memberName, pointsText, remainingText])}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate font-heading text-base font-bold text-on-card">
              {memberName}
            </span>
            {memberId ? (
              <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
                {memberId}
              </span>
            ) : null}
          </div>
          <span className="flex shrink-0 items-center gap-xs">
            <IconV4 glyph={meta.glyph} size="lg" />
            <BadgeV4 tone={meta.tone} variant="soft" size="sm">
              {word}
            </BadgeV4>
          </span>
        </div>

        <div className="flex flex-col gap-xs">
          <div className="flex items-baseline justify-between gap-sm">
            <span
              className={cn(
                'font-heading text-2xl font-bold [font-variant-numeric:tabular-nums]',
                TONE_INK[meta.tone]
              )}
            >
              {pointsText}
            </span>
            <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
              {remainingText}
            </span>
          </div>
          <ProgressV4 value={pct} tone="primary" />
        </div>
      </CardV4>
    );
  }
);
