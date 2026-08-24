import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { formatMoney, type MoneyFormatter } from './internal/format';
import type { PremiumCadence } from './PolicyCard';

/** One line in the premium breakdown. A negative `amountCents` is a credit. */
export interface PremiumLineItem {
  /** Line label (e.g. "Base premium", "Multi-policy discount", "Taxes & fees"). */
  label: string;
  /** Amount in integer **cents**; negative = discount/credit. */
  amountCents: number;
}

export interface PremiumSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered breakdown lines (base, riders, discounts, taxes …). */
  items: PremiumLineItem[];
  /**
   * Total premium in integer **cents**. When omitted it is derived by summing
   * `items`, so the printed total always reconciles with the lines shown.
   */
  totalCents?: number;
  /** Billing cadence label suffix (default `monthly`). */
  cadence?: PremiumCadence;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Loading skeleton flag — renders placeholder rows instead of data. */
  loading?: boolean;
}

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * An itemized premium breakdown card: labelled lines (discounts shown as
 * `text-success` credits with a leading `−`) summing to a bold total. The total
 * defaults to the sum of `items` so it can never disagree with the lines. All
 * amounts are integer cents via `formatMoney` (two decimals, no drift), and
 * every color traces to a semantic token slot. Supports a `loading` state. Web
 * parity of the native `PremiumSummary`.
 */
export const PremiumSummary = React.forwardRef<HTMLDivElement, PremiumSummaryProps>(
  function PremiumSummary(
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
        <Card ref={ref} className={className} {...rest}>
          <div aria-label="Loading premium">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  'mb-[var(--xen-space-sm)] h-4 rounded-[var(--xen-radius-sm)] bg-border',
                  i === 2 ? 'w-1/2' : 'w-full'
                )}
              />
            ))}
          </div>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex flex-col gap-[var(--xen-space-sm)]">
          {rows.map((it, i) => {
            const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
            const isCredit = cents < 0;
            return (
              <div
                key={`${it.label}-${i}`}
                className="flex items-center justify-between gap-[var(--xen-space-md)]"
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

        <div className="mt-[var(--xen-space-md)] flex items-baseline justify-between border-t border-border pt-[var(--xen-space-md)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-bold text-on-surface">Total</span>
            <span className="text-xs text-muted">{CADENCE_LABEL[cadence]}</span>
          </div>
          <span
            aria-label={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
            className="text-2xl font-bold text-primary"
          >
            {format(total, currency)}
          </span>
        </div>
      </Card>
    );
  }
);
