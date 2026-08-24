import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, PAYSLIP_STATUS_META, TONE_TEXT_CLASS } from './internal';
import type { PayslipRowProps } from './PayslipRow';

/** Drop-in alternate design for {@link PayslipRow} — identical Props. */
export type PayslipRowV3Props = PayslipRowProps;

/**
 * PayslipRow, design **V3** — a dense statement line for a payroll list. Period
 * (and pay date) on the left, net pay pinned right with a leading status glyph +
 * word beneath it (never color alone). Money stays integer **cents** through
 * `formatMoney`. Same Props as {@link PayslipRow}; the gross/deductions
 * breakdown is dropped for density, on a borderless divider row. Token-pure.
 */
export const PayslipRowV3 = React.forwardRef<HTMLDivElement, PayslipRowV3Props>(function PayslipRowV3(
  {
    period,
    netCents,
    currency = 'USD',
    status,
    payDate,
    onClick,
    className,
  },
  ref
) {
  const interactive = onClick != null;
  const statusMeta = status ? PAYSLIP_STATUS_META[status] : undefined;

  return (
    <div
      ref={ref}
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
        'flex items-center justify-between gap-3 border-b border-border bg-surface px-2 py-2 transition-colors motion-reduce:transition-none',
        interactive &&
          'cursor-pointer hover:bg-neutral-100 active:scale-[.99] motion-reduce:active:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{period}</p>
        {payDate ? <p className="text-xs text-muted">Paid {payDate}</p> : null}
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-base font-bold text-on-surface">{formatMoney(netCents, currency)}</span>
        {statusMeta ? (
          <span aria-label={statusMeta.label} className="flex items-center gap-1">
            <span aria-hidden="true" className={cn('text-xs', TONE_TEXT_CLASS[statusMeta.tone])}>
              {statusMeta.glyph}
            </span>
            <span className={cn('text-xs font-semibold', TONE_TEXT_CLASS[statusMeta.tone])}>{statusMeta.label}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
});
