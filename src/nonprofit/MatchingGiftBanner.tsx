import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney, goalPct } from './internal';

/** Visual treatment of a {@link MatchingGiftBanner}. */
export type MatchingGiftVariant = 'solid' | 'soft' | 'outline';

export interface MatchingGiftBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sponsor doing the matching, e.g. `Acme Foundation`. */
  matcherName: string;
  /** Match multiplier, e.g. `2` renders `2×`. */
  multiplier?: number;
  /** Amount matched so far, integer **cents** (enables a progress bar with cap). */
  matchedCents?: number;
  /** Total match pool / cap, integer **cents**. */
  capCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Pre-formatted deadline label, e.g. `Ends Sep 30`. */
  deadlineLabel?: string;
  /** CTA label (default `Give now`). Button renders only when `onAction` is set. */
  actionLabel?: string;
  /** Fires when the CTA is clicked. */
  onAction?: () => void;
  /** Visual treatment (default `soft`). */
  variant?: MatchingGiftVariant;
}

/**
 * Web parity of the native `MatchingGiftBanner`: a promotional banner announcing
 * a gift-matching offer — sponsor, multiplier, an optional matched/cap progress
 * bar (integer cents → `formatMoney`, cap divide-by-zero guarded), a deadline,
 * and an optional CTA. `variant` chooses a solid primary fill, a soft primary
 * tint, or an outline. Progress is shown as a `role="progressbar"` bar plus a
 * printed cap figure — not color alone. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
export const MatchingGiftBanner = React.forwardRef<HTMLDivElement, MatchingGiftBannerProps>(
  function MatchingGiftBanner(
    {
      matcherName,
      multiplier = 2,
      matchedCents,
      capCents,
      currency = 'USD',
      deadlineLabel,
      actionLabel = 'Give now',
      onAction,
      variant = 'soft',
      className,
      ...rest
    },
    ref
  ) {
    const solid = variant === 'solid';
    const surfaceClass = solid
      ? 'bg-primary text-on-primary'
      : variant === 'soft'
        ? 'bg-primary-50 text-on-surface'
        : 'border border-primary bg-surface text-on-surface';
    const subFg = solid ? 'text-on-primary' : 'text-muted';

    const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
    const pct = hasBar ? goalPct(matchedCents, capCents) : 0;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`${matcherName} is matching gifts ${multiplier}x`}
        className={cn('flex flex-col gap-sm rounded-lg p-md', surfaceClass, className)}
        {...rest}
      >
        <div className="flex items-center gap-sm">
          <Icon glyph="✨" size="lg" color={solid ? 'onPrimary' : 'primary'} />
          <span className="flex-1 text-base font-extrabold">
            {`${matcherName} matches ${multiplier}× your gift`}
          </span>
        </div>

        {hasBar ? (
          <div className="flex flex-col gap-xs">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct)}
              className={cn(
                'h-2 w-full overflow-hidden rounded-full',
                solid ? 'bg-primary-300' : 'bg-border'
              )}
            >
              <div
                className={cn('h-full rounded-full', solid ? 'bg-on-primary' : 'bg-primary')}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={cn('text-xs', subFg)}>
              {`${formatMoney(matchedCents, currency)} of ${formatMoney(capCents, currency)} matched`}
            </span>
          </div>
        ) : null}

        {deadlineLabel ? <span className={cn('text-sm', subFg)}>{deadlineLabel}</span> : null}

        {onAction ? (
          <Button variant={solid ? 'secondary' : 'primary'} onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
