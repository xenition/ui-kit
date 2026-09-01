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
  TONE_SOFT_BG,
  PAYMENT_METHOD_META,
} from './internal';
import type { ShiftReportProps } from './ShiftReport';

/** Drop-in for {@link ShiftReportProps} — same props, the V4 "register" design. */
export type ShiftReportV4Props = ShiftReportProps;

interface StatTileProps {
  label: string;
  value: string;
  accent?: boolean;
}

/** A single big-numeral stat tile — the headline number reads at a glance. */
function StatTile({ label, value, accent }: StatTileProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]',
        accent ? TONE_SOFT_BG.primary : 'bg-neutral-100'
      )}
    >
      <span className="text-xs font-medium text-muted">{label}</span>
      <span
        className={cn(
          'text-xl font-extrabold tabular-nums',
          accent ? 'text-primary' : 'text-on-surface'
        )}
      >
        {value}
      </span>
    </div>
  );
}

/**
 * ShiftReport — **V4** "register" design (web parity of the native V4). The
 * tactile end-of-shift Z-report: the headline numbers (gross sales,
 * transactions, cash counted, variance) become a crisp **grid of big-numeral
 * stat tiles** you can read across the counter, gross sales carrying the one
 * accent. Refunds / discounts / tax / net stay as a compact ledger beneath. The
 * variance tile is colored by over/short (icon + word pill, never color alone).
 * Optional per-tender breakdown; a shift with no sales renders an
 * {@link EmptyState}. All money is integer **cents** via `formatMoney`. Same
 * props/behavior as {@link ShiftReportProps}; token-only colors.
 */
export const ShiftReportV4 = React.forwardRef<HTMLDivElement, ShiftReportV4Props>(
  function ShiftReportV4(
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
              {[cashier, registerId ? `Reg ${registerId}` : null, period]
                .filter(Boolean)
                .join(' · ')}
            </span>
          ) : null}
        </div>

        {empty ? (
          <EmptyState title={emptyLabel} />
        ) : (
          <>
            {/* Big-numeral stat grid — the numbers that matter at the counter. */}
            <div className="grid grid-cols-2 gap-[var(--xen-space-sm)]">
              <StatTile label="Gross sales" value={formatMoney(gross, currency)} accent />
              {typeof transactionCount === 'number' ? (
                <StatTile label="Transactions" value={String(transactionCount)} />
              ) : (
                <StatTile label="Net sales" value={formatMoney(net, currency)} />
              )}
              {typeof countedCashCents === 'number' ? (
                <StatTile label="Cash counted" value={formatMoney(safeCents(countedCashCents), currency)} />
              ) : null}
              {variance ? (
                <div
                  className={cn(
                    'flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] p-[var(--xen-space-md)]',
                    TONE_SOFT_BG[variance.meta.tone]
                  )}
                >
                  <div className="flex items-center gap-[var(--xen-space-xs)]">
                    <span className="text-xs font-medium text-muted">Variance</span>
                    <StatusPill meta={variance.meta} variant="inline" size="sm" />
                  </div>
                  <span
                    className={cn(
                      'text-xl font-extrabold tabular-nums',
                      TONE_TEXT[variance.meta.tone]
                    )}
                  >
                    {variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : ''}
                    {formatMoney(Math.abs(variance.deltaCents), currency)}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Compact ledger — the supporting line items. */}
            <div className="flex flex-col gap-0.5">
              {typeof refundsCents === 'number' ? (
                <div className="flex items-baseline justify-between py-0.5">
                  <span className="text-sm text-muted">Refunds</span>
                  <span className="text-sm font-medium tabular-nums text-on-surface">
                    {`−${formatMoney(refundsCents, currency)}`}
                  </span>
                </div>
              ) : null}
              {typeof discountsCents === 'number' ? (
                <div className="flex items-baseline justify-between py-0.5">
                  <span className="text-sm text-muted">Discounts</span>
                  <span className="text-sm font-medium tabular-nums text-on-surface">
                    {`−${formatMoney(discountsCents, currency)}`}
                  </span>
                </div>
              ) : null}
              {typeof taxCents === 'number' ? (
                <div className="flex items-baseline justify-between py-0.5">
                  <span className="text-sm text-muted">Tax</span>
                  <span className="text-sm font-medium tabular-nums text-on-surface">
                    {formatMoney(taxCents, currency)}
                  </span>
                </div>
              ) : null}
              <div className="my-[var(--xen-space-xs)] h-px bg-border" />
              <div className="flex items-baseline justify-between py-0.5">
                <span className="text-base font-semibold text-muted">Net sales</span>
                <span className="text-base font-bold tabular-nums text-on-surface">
                  {formatMoney(net, currency)}
                </span>
              </div>
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
          </>
        )}
      </Card>
    );
  }
);
