import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { formatMoney, PAYSLIP_STATUS_META, type PayslipStatus } from './internal';

export type PayslipRowVariant = 'default' | 'compact';

export interface PayslipRowProps {
  /** Pay period label (e.g. "Aug 1–15, 2026"). */
  period: string;
  /** Net (take-home) pay in integer **cents**. */
  netCents: number;
  /** Gross pay in integer **cents** (shown on the default variant). */
  grossCents?: number;
  /** Total deductions in integer **cents** (shown on the default variant). */
  deductionsCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Payment status — glyph + word pill. */
  status?: PayslipStatus;
  /** Pre-formatted pay date. */
  payDate?: string;
  /** Density. */
  variant?: PayslipRowVariant;
  /** Click handler (open the full payslip / download PDF). */
  onClick?: () => void;
  className?: string;
}

/**
 * One payroll line: pay period, net pay, and optional gross / deductions
 * breakdown. Money is carried as integer **cents** and rendered through the
 * shared `formatMoney` for stable 2-decimal output. Payment status is a glyph +
 * word pill so it never rests on color alone. `compact` shows only period + net.
 * When `onClick` is set the row becomes a keyboard-operable `role="button"`.
 * All colors are `--xen-*` token classes — no literals. `forwardRef` to the
 * root `<div>`.
 */
export const PayslipRow = React.forwardRef<HTMLDivElement, PayslipRowProps>(function PayslipRow(
  {
    period,
    netCents,
    grossCents,
    deductionsCents,
    currency = 'USD',
    status,
    payDate,
    variant = 'default',
    onClick,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const interactive = onClick != null;

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
        'flex flex-col gap-1.5 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2',
        interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-on-surface">{period}</p>
          {payDate ? <p className="text-xs text-muted">Paid {payDate}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold text-on-surface">{formatMoney(netCents, currency)}</span>
          {status ? <StatusPill meta={PAYSLIP_STATUS_META[status]} variant="inline" size="sm" /> : null}
        </div>
      </div>

      {!compact && (grossCents != null || deductionsCents != null) ? (
        <div className="flex gap-6">
          {grossCents != null ? (
            <div>
              <p className="text-xs text-muted">Gross</p>
              <p className="text-sm font-semibold text-on-surface">{formatMoney(grossCents, currency)}</p>
            </div>
          ) : null}
          {deductionsCents != null ? (
            <div>
              <p className="text-xs text-muted">Deductions</p>
              <p className="text-sm font-semibold text-on-surface">−{formatMoney(deductionsCents, currency)}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
