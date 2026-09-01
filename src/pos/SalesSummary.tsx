import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from './internal';

/** One entry in the optional top-sellers list. */
export interface SalesSummaryTopItem {
  /** Product / line name. */
  name: string;
  /** Units sold in the period. */
  count: number;
}

export interface SalesSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gross takings for the period, in integer **cents** — the big near-white numeral. */
  grossCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Transaction count for the period. Shown as a frosted stat tile when set. */
  transactions?: number;
  /** Period label for the hero (default `"Today"`). */
  period?: string;
  /** Net takings (after refunds), in integer **cents**. Shown as a frosted stat tile when set. */
  netCents?: number;
  /** Refunds issued in the period, in integer **cents**. Shown as a frosted stat tile when set. */
  refundsCents?: number;
  /** Best-selling lines for the period — rendered as a compact frosted list when non-empty. */
  topItems?: readonly SalesSummaryTopItem[];
  /** Percentage change vs the prior comparable period (e.g. `12.5` → up 12.5%). Rendered as a signed delta pill when set. */
  deltaPct?: number;
}

/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero** (web parity of
 * the native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the `period` label, the **big near-white gross numeral** (integer cents
 * via `formatMoney`), and an optional signed `deltaPct` pill vs the prior period.
 * Transactions, net, and refunds read as frosted glass stat tiles
 * (`bg-primary-50/15 border-primary-50/30`); `topItems` render as a compact
 * frosted list. Every color derives from the brand ramp via `--xen-*` classes +
 * gradient utilities — no literals, light + dark safe.
 */
export const SalesSummary = React.forwardRef<HTMLDivElement, SalesSummaryProps>(function SalesSummary(
  {
    grossCents,
    currency = 'USD',
    transactions,
    period = 'Today',
    netCents,
    refundsCents,
    topItems,
    deltaPct,
    className,
    ...rest
  },
  ref
) {
  const gross = Math.max(0, Math.trunc(grossCents || 0));
  const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
  const deltaUp = hasDelta && (deltaPct as number) >= 0;
  const items = topItems ?? [];

  const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
      <span className="text-xs font-semibold text-primary-100">{label}</span>
      <span className="truncate text-base font-extrabold tabular-nums text-primary-50">{value}</span>
    </div>
  );

  return (
    <div
      ref={ref}
      data-xen-sales-summary=""
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <span className="text-sm font-bold text-primary-100">{period}</span>
        {hasDelta ? (
          <span
            aria-label={`${deltaUp ? 'Up' : 'Down'} ${Math.abs(deltaPct as number)} percent vs prior period`}
            className="flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50"
          >
            <span aria-hidden="true">{deltaUp ? '▲' : '▼'}</span>
            <span className="tabular-nums">{`${Math.abs(deltaPct as number)}%`}</span>
          </span>
        ) : null}
      </div>

      <span className="mt-[var(--xen-space-md)] text-sm font-semibold text-primary-100">Gross sales</span>
      <p
        aria-label={`Gross sales ${formatMoney(gross, currency)}`}
        className="text-4xl font-extrabold tabular-nums tracking-tight text-primary-50"
      >
        {formatMoney(gross, currency)}
      </p>

      {typeof transactions === 'number' || typeof netCents === 'number' || typeof refundsCents === 'number' ? (
        <div className="mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {typeof transactions === 'number' ? (
            <Stat label="Transactions" value={String(Math.max(0, Math.trunc(transactions)))} />
          ) : null}
          {typeof netCents === 'number' ? <Stat label="Net" value={formatMoney(Math.trunc(netCents), currency)} /> : null}
          {typeof refundsCents === 'number' ? (
            <Stat label="Refunds" value={formatMoney(Math.max(0, Math.trunc(refundsCents)), currency)} />
          ) : null}
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-[var(--xen-space-lg)] flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 p-[var(--xen-space-md)]">
          <span className="text-xs font-bold text-primary-100">Top items</span>
          {items.map((it, i) => (
            <div key={`${it.name}-${i}`} className="flex items-center justify-between gap-[var(--xen-space-md)]">
              <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary-50">{it.name}</span>
              <span className="text-sm font-bold tabular-nums text-primary-100">{`×${Math.max(0, Math.trunc(it.count))}`}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
});
