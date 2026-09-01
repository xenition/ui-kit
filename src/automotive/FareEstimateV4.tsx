import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { formatMoney } from '../commerce/money';
import { metaLine, SKELETON_CLASS } from './internal/fleet-v4';
import type { FareEstimateProps } from './FareEstimate';

export interface FareEstimateV4Props extends FareEstimateProps {
  /** Label on the total row. Default `'Total'`. */
  totalLabel?: string;
  /** Build the surge chip. Default `'1.8× surge'`. */
  formatSurge?: (multiplier: number) => string;
  /** Copy when there is nothing to estimate. Default `'No estimate yet.'`. */
  emptyMessage?: string;
}

/**
 * **V4 fare estimate** — the web twin of the native `FareEstimateV4`, same
 * props as {@link FareEstimate} plus `totalLabel`, `formatSurge` and
 * `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures there is nothing to scan
 *    down, which is the whole job of the component.
 * 2. **Surge is a labelled chip, not a red total.** A higher price is a
 *    condition, not an error (§35.4) — and colour alone says nothing.
 * 3. **The breakdown is a real `<dl>`**, so a reader hears label/value pairs
 *    rather than a run of loose strings.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
export const FareEstimateV4 = React.forwardRef<HTMLDivElement, FareEstimateV4Props>(
  function FareEstimateV4(
    {
      items = [],
      totalCents,
      currency = 'USD',
      surgeMultiplier,
      distanceLabel,
      durationLabel,
      variant = 'detailed',
      totalLabel = 'Total',
      formatSurge,
      emptyMessage = 'No estimate yet.',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
          {[60, 45, 80].map((w) => (
            <div key={w} className={cn('h-3', SKELETON_CLASS)} style={{ width: `${w}%` }} />
          ))}
        </CardV4>
      );
    }

    const lines = variant === 'detailed' ? items : [];
    const hasTotal = typeof totalCents === 'number' && Number.isFinite(totalCents);
    const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const caption = metaLine([distanceLabel, durationLabel]);

    if (!hasTotal && lines.length === 0) {
      return (
        <CardV4 ref={ref} className={className} {...rest}>
          <p className="text-sm text-muted-text">{emptyMessage}</p>
        </CardV4>
      );
    }

    return (
      <CardV4
        ref={ref}
        data-xen-fare-estimate=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {caption || surging ? (
          <div className="flex items-center gap-sm">
            <span className="min-w-0 flex-1 text-xs text-muted-text">{caption}</span>
            {surging ? (
              <BadgeV4 tone="warn" variant="soft" size="sm">
                {(formatSurge ?? ((m: number) => `${m}× surge`))(surgeMultiplier as number)}
              </BadgeV4>
            ) : null}
          </div>
        ) : null}

        {lines.length > 0 ? (
          <dl className="flex flex-col gap-sm">
            {lines.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-md">
                <dt className="shrink text-sm text-muted-text">{item.label}</dt>
                <dd className="text-sm text-on-card [font-variant-numeric:tabular-nums]">
                  {formatMoney(item.cents, currency)}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {hasTotal ? (
          <div
            className={cn(
              'flex items-baseline justify-between gap-md',
              lines.length > 0 && 'border-t border-border pt-sm'
            )}
          >
            <span className="text-base font-semibold text-on-card">{totalLabel}</span>
            <span className="font-heading text-xl font-bold text-on-card [font-variant-numeric:tabular-nums]">
              {formatMoney(totalCents as number, currency)}
            </span>
          </div>
        ) : null}
      </CardV4>
    );
  }
);
