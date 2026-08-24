import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  varianceMeta,
  TONE_TEXT,
  PAYMENT_METHOD_META,
  type PaymentMethod,
} from './internal';

export interface ShiftPaymentBreakdown {
  /** Tender type. */
  method: PaymentMethod;
  /** Total taken with this tender, in integer **cents**. */
  amountCents: number;
  /** Transaction count for this tender. */
  count?: number;
}

export type ShiftReportVariant = 'summary' | 'detailed';

export interface ShiftReportProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Cashier / operator name. */
  cashier?: string;
  /** Register / terminal id. */
  registerId?: string;
  /** Pre-formatted shift window (e.g. "9:00 AM – 5:00 PM"). */
  period?: string;
  /** Gross sales in integer **cents**. */
  grossSalesCents: number;
  /** Refunds issued in cents. */
  refundsCents?: number;
  /** Discounts given in cents. */
  discountsCents?: number;
  /** Tax collected in cents. */
  taxCents?: number;
  /** Net (gross − refunds) in cents; derived when omitted. */
  netSalesCents?: number;
  /** Transaction count over the shift. */
  transactionCount?: number;
  /** Expected cash in drawer, in cents (for the variance line). */
  expectedCashCents?: number;
  /** Counted cash in drawer, in cents (for the variance line). */
  countedCashCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Per-tender breakdown. When empty a labelled {@link EmptyState} renders. */
  breakdown?: ShiftPaymentBreakdown[];
  /** `detailed` (default) shows the breakdown + cash variance; `summary` omits them. */
  variant?: ShiftReportVariant;
  /** Empty-state copy for a shift with no sales. */
  emptyLabel?: string;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

interface MetricProps {
  label: string;
  value: string;
  strong?: boolean;
}

function Metric({ label, value, strong }: MetricProps): React.ReactElement {
  return (
    <div className="flex items-baseline justify-between py-0.5">
      <span className={cn('text-muted', strong ? 'text-base font-semibold' : 'text-sm')}>
        {label}
      </span>
      <span
        className={cn('tabular-nums text-on-surface', strong ? 'text-base font-bold' : 'text-sm font-medium')}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * End-of-shift Z-report card — the DOM parity of the native `ShiftReport`:
 * header (cashier / register / window), the headline metrics (gross, refunds,
 * discounts, tax, net, transactions), an optional per-tender breakdown, and a
 * cash-count variance drawn as a **glyph + word** pill (over/short/balanced —
 * never color alone). All money is integer **cents** via `formatMoney`. A shift
 * with no sales renders an {@link EmptyState}. Composed from `Card` +
 * `StatusPill`; token-only colors.
 */
export const ShiftReport = React.forwardRef<HTMLDivElement, ShiftReportProps>(function ShiftReport(
  {
    cashier,
    registerId,
    period,
    grossSalesCents,
    refundsCents,
    discountsCents,
    taxCents,
    netSalesCents,
    transactionCount,
    expectedCashCents,
    countedCashCents,
    currency = 'USD',
    breakdown,
    variant = 'detailed',
    emptyLabel = 'No sales this shift',
    testID,
    className,
    ...rest
  },
  ref
) {
  const detailed = variant === 'detailed';
  const gross = safeCents(grossSalesCents);
  const net =
    typeof netSalesCents === 'number' ? safeCents(netSalesCents) : gross - safeCents(refundsCents);
  const empty =
    gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;

  const hasVariance =
    detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
  const variance = hasVariance
    ? varianceMeta(safeCents(expectedCashCents), safeCents(countedCashCents))
    : null;

  return (
    <Card
      ref={ref}
      data-xen-shift-report=""
      data-testid={testID}
      className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
      {...rest}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-lg font-bold text-on-surface">Shift report</span>
        {cashier || registerId || period ? (
          <span className="text-xs text-muted">
            {[cashier, registerId ? `Reg ${registerId}` : null, period].filter(Boolean).join(' · ')}
          </span>
        ) : null}
      </div>

      {empty ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <>
          <div className="flex flex-col gap-0.5">
            <Metric label="Gross sales" value={formatMoney(gross, currency)} />
            {typeof refundsCents === 'number' ? (
              <Metric label="Refunds" value={`−${formatMoney(refundsCents, currency)}`} />
            ) : null}
            {typeof discountsCents === 'number' ? (
              <Metric label="Discounts" value={`−${formatMoney(discountsCents, currency)}`} />
            ) : null}
            {typeof taxCents === 'number' ? (
              <Metric label="Tax" value={formatMoney(taxCents, currency)} />
            ) : null}
            <div className="my-[var(--xen-space-xs)] h-px bg-border" />
            <Metric label="Net sales" value={formatMoney(net, currency)} strong />
            {typeof transactionCount === 'number' ? (
              <Metric label="Transactions" value={String(transactionCount)} />
            ) : null}
          </div>

          {detailed && breakdown && breakdown.length > 0 ? (
            <div className="flex flex-col gap-[var(--xen-space-xs)]">
              <span className="text-sm font-semibold text-on-surface">By tender</span>
              {breakdown.map((b, i) => (
                <div key={i} className="flex items-center justify-between">
                  <StatusPill meta={PAYMENT_METHOD_META[b.method]} variant="inline" size="sm" />
                  <span className="text-sm tabular-nums text-on-surface">
                    {formatMoney(b.amountCents, currency)}
                    {typeof b.count === 'number' ? (
                      <span className="text-xs text-muted">{`  (${b.count})`}</span>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          ) : null}

          {variance ? (
            <div className="flex items-center justify-between border-t border-border pt-[var(--xen-space-sm)]">
              <div className="flex items-center gap-[var(--xen-space-xs)]">
                <span className="text-sm text-muted">Cash variance</span>
                <StatusPill meta={variance.meta} variant="soft" size="sm" />
              </div>
              <span className={cn('text-sm font-bold tabular-nums', TONE_TEXT[variance.meta.tone])}>
                {variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : ''}
                {formatMoney(Math.abs(variance.deltaCents), currency)}
              </span>
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
});
