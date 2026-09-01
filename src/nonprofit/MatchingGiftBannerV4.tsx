import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney, goalPct } from './internal';
import type { MatchingGiftBannerProps } from './MatchingGiftBanner';

/** Drop-in for {@link MatchingGiftBannerProps} — same props, the V4 "rally" design. */
export type MatchingGiftBannerV4Props = MatchingGiftBannerProps;

/**
 * MatchingGiftBanner — **V4** "rally" design (web parity of the native V4). A
 * rallying banner announcing a gift-matching offer, drawn with the warm "rally"
 * identity: a glyph in the tone color, the sponsor + match ratio in a bold
 * legible line, an optional matched/cap progress bar (integer cents →
 * `formatMoney`, cap divide-by-zero guarded via `goalPct`), a deadline, and an
 * optional CTA. Honors all three `variant`s — `solid` (a strong primary fill
 * with near-white `on-primary` ink), `soft` (a soft-primary tint), and
 * `outline` (a bordered surface) — identical props/behavior to
 * {@link MatchingGiftBannerProps}. These are token FILL treatments, not a brand
 * gradient. Progress is a `role="progressbar"` bar plus a printed cap figure —
 * not color alone. All colors come from the `--xen-*` token classes — no
 * literals.
 */
export const MatchingGiftBannerV4 = React.forwardRef<HTMLDivElement, MatchingGiftBannerV4Props>(
  function MatchingGiftBannerV4(
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
      ? 'bg-primary text-on-primary shadow-md'
      : variant === 'soft'
        ? 'bg-primary/10 text-on-surface'
        : 'border border-border bg-surface text-on-surface';
    const subFg = solid ? 'text-on-primary' : 'text-muted';

    const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
    const pct = hasBar ? goalPct(matchedCents as number, capCents as number) : 0;

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
              className={cn('h-2 w-full overflow-hidden rounded-full', solid ? 'bg-primary-300' : 'bg-border')}
            >
              <div
                className={cn('h-full rounded-full', solid ? 'bg-on-primary' : 'bg-primary')}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className={cn('text-xs', subFg)}>
              {`${formatMoney(matchedCents as number, currency)} of ${formatMoney(capCents as number, currency)} matched`}
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
