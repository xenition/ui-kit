import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, formatPct, type MoneyFormatter, SOLID_TINT, type TintSlot } from './internal/format';

export type CostBreakdownTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

export interface CostBreakdownSlice {
  /** Line item name (e.g. "Energy", "Delivery", "Taxes"). */
  label: string;
  /** This item's amount, in integer **cents**. */
  amountCents: number;
  /** Semantic tone used for its segment + legend dot (default cycles). */
  tone?: CostBreakdownTone;
}

export interface CostBreakdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card heading (default "Cost breakdown"). */
  title?: string;
  /** The line items that sum to the total. */
  slices: CostBreakdownSlice[];
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

const TONE_CYCLE: CostBreakdownTone[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/**
 * Where the bill goes (web parity) — the clean, trust-first breakdown card: the
 * title + the summed total (integer cents via `formatMoney`), a single
 * horizontal stacked bar whose segments are widthed by each slice's share, and a
 * legend listing a tone dot, the label, the amount, and its `formatPct` share.
 * Color-coding is meaningful here — each slice carries a soft, semantic tone.
 * Token-only colors.
 */
export const CostBreakdown = React.forwardRef<HTMLDivElement, CostBreakdownProps>(function CostBreakdown(
  { title = 'Cost breakdown', slices, currency = 'USD', formatMoney: format = formatMoney, className, ...rest },
  ref
) {
  const items = slices.map((s, i) => ({
    label: s.label,
    amount: Math.max(0, Math.trunc(s.amountCents || 0)),
    tone: (s.tone ?? TONE_CYCLE[i % TONE_CYCLE.length]) as CostBreakdownTone,
  }));
  const total = items.reduce((sum, s) => sum + s.amount, 0);
  const share = (amount: number): number => (total > 0 ? (amount / total) * 100 : 0);

  return (
    <div
      ref={ref}
      aria-label={`${title}, total ${format(total, currency)}`}
      className={cn('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', className)}
      {...rest}
    >
      <div className="flex items-end justify-between gap-[var(--xen-space-md)]">
        <span className="text-lg font-bold text-on-surface">{title}</span>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-xs text-muted">Total</span>
          <span className="text-2xl font-extrabold text-on-surface">{format(total, currency)}</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-[var(--xen-space-lg)] flex h-3 overflow-hidden rounded-full bg-neutral-100"
      >
        {items.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className={cn('h-full', SOLID_TINT[s.tone as TintSlot])}
            style={{ width: `${share(s.amount)}%` }}
          />
        ))}
      </div>

      <div className="mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-md)]">
        {items.map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            aria-label={`${s.label}, ${format(s.amount, currency)}, ${formatPct(share(s.amount))}`}
            className="flex items-center gap-[var(--xen-space-sm)]"
          >
            <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', SOLID_TINT[s.tone as TintSlot])} />
            <span className="flex-1 truncate text-sm font-semibold text-on-surface">{s.label}</span>
            <span className="text-sm text-muted">{formatPct(share(s.amount))}</span>
            <span className="min-w-[64px] text-right text-sm font-bold text-on-surface">
              {format(s.amount, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
