import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { formatMoney } from './internal/format';
import type { PremiumSummaryProps } from './PremiumSummary';
import type { PremiumCadence } from './PolicyCard';

/** Same public contract as {@link PremiumSummary} — a drop-in alternate design. */
export type PremiumSummaryV2Props = PremiumSummaryProps;

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * PremiumSummary, redesigned (**V2**) — an **elevated receipt**. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `text-success` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. The
 * total defaults to the sum of `items`, so it always reconciles with the lines.
 * Same `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export const PremiumSummaryV2 = React.forwardRef<HTMLDivElement, PremiumSummaryV2Props>(
  function PremiumSummaryV2(
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
        <Card
          ref={ref}
          variant="elevated"
          padding="none"
          radius="md"
          className={cn('overflow-hidden', className)}
          {...rest}
        >
          <div aria-label="Loading premium" className="p-[var(--xen-space-lg)]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'mb-[var(--xen-space-sm)] h-4 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100 motion-reduce:animate-none',
                  i === 2 ? 'w-1/2' : 'w-full'
                )}
              />
            ))}
          </div>
          <div className="h-14 bg-primary/10" />
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        variant="elevated"
        padding="none"
        radius="md"
        className={cn('overflow-hidden', className)}
        {...rest}
      >
        <div className="px-[var(--xen-space-lg)] pt-[var(--xen-space-lg)]">
          {rows.map((it, i) => {
            const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
            const isCredit = cents < 0;
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center justify-between gap-[var(--xen-space-md)] border-b border-border py-[var(--xen-space-sm)]"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-muted">{it.label}</span>
                <span
                  className={cn(
                    'text-sm font-semibold',
                    isCredit ? 'text-success' : 'text-on-surface'
                  )}
                >
                  {isCredit ? '−' : ''}
                  {format(Math.abs(cents), currency)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-extrabold text-on-surface">Total due</span>
            <span className="text-xs text-muted">{CADENCE_LABEL[cadence]}</span>
          </div>
          <span
            aria-label={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
            className="text-2xl font-extrabold text-primary"
          >
            {format(total, currency)}
          </span>
        </div>
      </Card>
    );
  }
);
