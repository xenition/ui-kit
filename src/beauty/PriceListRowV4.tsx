import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { compareAtCents, metaLine } from './internal/salon-v4';
import type { PriceListRowProps } from './PriceListRow';

export interface PriceListRowV4Props extends PriceListRowProps {
  /** Prefix on an open-ended price. Default `'from'`. */
  fromLabel?: string;
  /** Format the duration. Default `'45 min'`. */
  formatDuration?: (minutes: number) => string;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * **V4 price list row** — the web twin of the native `PriceListRowV4`, same
 * props as {@link PriceListRow} plus `fromLabel`, `formatDuration` and `last`.
 *
 * ## Four changes
 *
 * 1. **The compare-at price is finally drawn.** The base has carried
 *    `compareAtCents` since it was written and never rendered it. It is now an
 *    `<s>` — semantically "no longer accurate", which is exactly what it is —
 *    labelled `Was …`, and a compare-at that is not higher than the price is
 *    refused rather than drawn.
 * 2. **Prices are tabular.** A price list is *the* column-of-money component;
 *    with proportional figures it has no edge to scan down.
 * 3. **A real dotted leader** joins the service to its price, so the eye can
 *    travel across the row.
 * 4. **The `section` variant is a real heading**, announced as one.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export const PriceListRowV4 = React.forwardRef<HTMLDivElement, PriceListRowV4Props>(
  function PriceListRowV4(
    {
      label,
      priceCents,
      currency = 'USD',
      fromPrice = false,
      note,
      durationMin,
      compareAtCents: compareAt,
      variant = 'default',
      formatMoney = defaultFormatMoney,
      fromLabel = 'from',
      formatDuration,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    if (!label) return null;

    if (variant === 'section') {
      return (
        <div ref={ref} className={className} {...rest}>
          <h3 className="pb-xs pt-md text-sm font-bold text-muted-text">{label}</h3>
        </div>
      );
    }

    const hasPrice = typeof priceCents === 'number' && Number.isFinite(priceCents);
    const price = hasPrice ? formatMoney(priceCents as number, currency) : null;
    const wasCents = compareAtCents(priceCents, compareAt);
    const was = wasCents != null ? formatMoney(wasCents, currency) : null;
    const duration =
      typeof durationMin === 'number'
        ? (formatDuration ?? ((m: number) => `${m} min`))(durationMin)
        : null;
    const caption = metaLine([duration, note]);

    return (
      <div
        ref={ref}
        data-xen-price-list-row=""
        className={cn(
          'flex items-baseline gap-sm py-sm',
          !last && 'border-b border-border',
          className
        )}
        {...rest}
      >
        <span className="flex shrink flex-col">
          <span className="text-base font-semibold text-on-surface">{label}</span>
          {caption ? (
            <span className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
              {caption}
            </span>
          ) : null}
        </span>

        {/* A dotted leader, so the eye can travel from a service to its price. */}
        <span
          aria-hidden
          className="min-w-lg flex-1 translate-y-[-2px] border-b border-dotted border-border"
        />

        {price ? (
          <span className="flex shrink-0 items-baseline gap-xs">
            {was ? (
              <s
                aria-label={`Was ${was}`}
                className="text-xs text-muted-text [font-variant-numeric:tabular-nums]"
              >
                {was}
              </s>
            ) : null}
            {fromPrice ? <span className="text-xs text-muted-text">{fromLabel}</span> : null}
            <span className="text-base font-bold text-on-surface [font-variant-numeric:tabular-nums]">
              {price}
            </span>
          </span>
        ) : null}
      </div>
    );
  }
);
