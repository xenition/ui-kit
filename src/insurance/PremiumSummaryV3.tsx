import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from './internal/format';
import type { PremiumSummaryProps } from './PremiumSummary';
import type { PremiumCadence } from './PolicyCard';

/** Same public contract as {@link PremiumSummary} — a drop-in alternate design. */
export type PremiumSummaryV3Props = PremiumSummaryProps;

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * PremiumSummary, redesigned (**V3**) — **total-first and chrome-free**. The
 * amount due leads at the top in large type with its cadence; the itemized lines
 * follow as quiet secondary rows (discounts as `text-success` credits). The
 * total still defaults to the sum of `items`, so the headline can never disagree
 * with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export const PremiumSummaryV3 = React.forwardRef<HTMLDivElement, PremiumSummaryV3Props>(
  function PremiumSummaryV3(
    {
      items,
      totalCents,
      cadence = 'monthly',
      currency = 'USD',
      formatMoney: format = formatMoney,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const rows = Array.isArray(items) ? items : [];
    const derivedTotal = rows.reduce(
      (sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0),
      0
    );
    const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;

    if (loading) {
      return (
        <div
          ref={ref}
          aria-label="Loading premium"
          className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
          {...rest}
        >
          <div className="h-8 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none" />
          {[0, 1].map((i) => (
            <div
              key={i}
              className={cn(
                'h-3 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none',
                i === 1 ? 'w-2/5' : 'w-3/5'
              )}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)}
        {...rest}
      >
        <div className="flex items-baseline gap-[var(--xen-space-sm)]">
          <span
            aria-label={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
            className="text-3xl font-extrabold text-on-surface"
          >
            {format(total, currency)}
          </span>
          <span className="text-sm text-muted">{CADENCE_LABEL[cadence]}</span>
        </div>

        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {rows.map((it, i) => {
            const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
            const isCredit = cents < 0;
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center justify-between gap-[var(--xen-space-md)]"
              >
                <span className="min-w-0 flex-1 truncate text-xs text-muted">{it.label}</span>
                <span
                  className={cn(
                    'text-xs font-semibold',
                    isCredit ? 'text-success' : 'text-muted'
                  )}
                >
                  {isCredit ? '−' : ''}
                  {format(Math.abs(cents), currency)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
