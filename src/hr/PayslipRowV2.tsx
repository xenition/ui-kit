import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Progress } from '../primitives';
import { StatusPill } from './StatusPill';
import { formatMoney, PAYSLIP_STATUS_META } from './internal';
import type { PayslipRowProps } from './PayslipRow';

/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV2Props = PayslipRowProps;

/**
 * PayslipRow, design **V2** — an expanded pay-statement card. A hero net figure
 * sits above a gross → deductions → net breakdown, with a take-home meter
 * showing net as a share of gross. Money stays integer **cents** through
 * `formatMoney`; payment status is a glyph + word pill (never color alone).
 * Same Props as {@link PayslipRow}. Elevated with a subtle hover lift;
 * token-pure (no literals).
 */
export const PayslipRowV2 = React.forwardRef<HTMLDivElement, PayslipRowV2Props>(function PayslipRowV2(
  {
    period,
    netCents,
    grossCents,
    deductionsCents,
    currency = 'USD',
    status,
    payDate,
    onClick,
    className,
  },
  ref
) {
  const interactive = onClick != null;
  const takeHomePct =
    grossCents != null && grossCents > 0
      ? Math.max(0, Math.min(100, Math.round((netCents / grossCents) * 100)))
      : null;
  const hasBreakdown = grossCents != null || deductionsCents != null;

  return (
    <Card
      ref={ref}
      variant="elevated"
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Payslip ${period}, net ${formatMoney(netCents, currency)}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-3 transition duration-200 motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-muted">{period}</p>
          <p className="text-2xl font-bold text-on-surface">{formatMoney(netCents, currency)}</p>
          {payDate ? <p className="text-xs text-muted">Paid {payDate}</p> : null}
        </div>
        {status ? <StatusPill meta={PAYSLIP_STATUS_META[status]} size="sm" /> : null}
      </div>

      {hasBreakdown ? (
        <div className="flex flex-col gap-1.5 rounded-md bg-neutral-100 p-3">
          {grossCents != null ? (
            <div className="flex justify-between">
              <span className="text-sm text-muted">Gross</span>
              <span className="text-sm font-semibold text-on-surface">{formatMoney(grossCents, currency)}</span>
            </div>
          ) : null}
          {deductionsCents != null ? (
            <div className="flex justify-between">
              <span className="text-sm text-muted">Deductions</span>
              <span className="text-sm font-semibold text-danger">−{formatMoney(deductionsCents, currency)}</span>
            </div>
          ) : null}
          <div className="my-0.5 h-px bg-border" />
          <div className="flex justify-between">
            <span className="text-sm font-bold text-on-surface">Net</span>
            <span className="text-sm font-bold text-on-surface">{formatMoney(netCents, currency)}</span>
          </div>

          {takeHomePct != null ? (
            <div className="mt-1 flex flex-col gap-1">
              <Progress value={takeHomePct} max={100} size="sm" tone="success" />
              <span className="text-xs text-muted">Take-home {takeHomePct}% of gross</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
