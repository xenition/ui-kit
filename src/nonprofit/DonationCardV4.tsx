import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';
import type { DonationCardProps } from './DonationCard';

/** Drop-in for {@link DonationCardProps} — same props, the V4 "rally" design. */
export type DonationCardV4Props = DonationCardProps;

/**
 * DonationCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven donate call-to-action surface: an elevated rounded card with a
 * soft shadow, a bold title/blurb, a grid of preset gift amounts as tappable
 * soft-primary chips (integer cents → localized currency via `formatMoney`), and
 * a primary CTA that reports the chosen amount. Selection is conveyed by a filled
 * soft-primary chip, a bold border, AND `aria-checked` on a `role="radio"` button
 * — never color alone. Honors all three `variant`s — `default` (full card),
 * `compact` (dense padding), and `featured` (larger title) — identical
 * props/behavior to {@link DonationCardProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export const DonationCardV4 = React.forwardRef<HTMLDivElement, DonationCardV4Props>(
  function DonationCardV4(
    {
      title,
      description,
      presets = [],
      selected,
      currency = 'USD',
      ctaLabel = 'Donate',
      variant = 'default',
      onSelectAmount,
      onDonate,
      loading = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';

    const fallback = presets.length > 0 ? (presets[0] ?? 0) : 0;
    const active = selected != null ? selected : fallback;
    const busy = loading || disabled;

    const container = 'overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md';

    return (
      <div
        ref={ref}
        role="group"
        aria-label={title}
        className={cn('flex flex-col gap-md', container, isCompact ? 'p-md' : 'p-lg', className)}
        {...rest}
      >
        <div className="flex flex-col gap-xs">
          <span className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-lg')}>{title}</span>
          {description ? <span className="text-sm text-muted">{description}</span> : null}
        </div>

        {presets.length > 0 ? (
          <div role="radiogroup" aria-label="Gift amount" className="flex flex-wrap gap-sm">
            {presets.map((cents, i) => {
              const isOn = cents === active;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={isOn}
                  aria-label={formatMoney(cents, currency)}
                  disabled={disabled}
                  onClick={() => onSelectAmount?.(cents)}
                  className={cn(
                    'min-h-[44px] rounded-full px-md py-sm text-base font-bold transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    'disabled:pointer-events-none disabled:opacity-50',
                    isOn
                      ? 'border-2 border-primary bg-primary/10 text-primary'
                      : 'border border-border bg-surface text-on-surface hover:bg-primary/10'
                  )}
                >
                  {formatMoney(cents, currency)}
                </button>
              );
            })}
          </div>
        ) : null}

        <Button variant="primary" disabled={busy} onClick={() => onDonate?.(active)} className="gap-xs">
          <Icon glyph="❤️" size="base" />
          {presets.length > 0 ? `${ctaLabel} ${formatMoney(active, currency)}` : ctaLabel}
        </Button>
      </div>
    );
  }
);
