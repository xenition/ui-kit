import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../commerce/money';
import { StatusPillV4 } from './StatusPillV4';
import { deductionParts } from './workforce-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  PAYSLIP_DATE_LABELS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import { PAYSLIP_STATUS_META, type PayslipStatus } from './internal';
import type { PayslipRowProps } from './PayslipRow';

export interface PayslipRowV4Props extends PayslipRowProps {
  /**
   * Why the payment failed.
   *
   * `failed` is the one status on this row a person must act on — a wrong
   * account number, a closed bank — and the row had no field to say which.
   */
  failureReason?: string;
  /**
   * The word before `payDate`, per status. Defaults to `'Paid'` for `paid`,
   * `'Expected'` for a run that has not happened yet (`processing`, `pending`)
   * and `'Attempted'` for `failed`, where the date came and went.
   */
  dateLabels?: Partial<Record<PayslipStatus, string>>;
  /** Render the amounts. Defaults to the shared `formatMoney`. */
  formatMoney?: MoneyFormatter;
  /** Caption over the gross figure. Default `'Gross'`. */
  grossLabel?: string;
  /** Caption over the deductions figure. Default `'Deductions'`. */
  deductionsLabel?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 payslip row** — the web twin of the native `PayslipRowV4`, same props as
 * {@link PayslipRow} plus `failureReason`, `dateLabels`, `formatMoney`,
 * `grossLabel`, `deductionsLabel` and `testID`.
 *
 * ## Six changes
 *
 * 1. **A failed payment no longer says "Paid 15 Aug".** The row printed the
 *    literal word `Paid ` before `payDate` whatever the status was, so a
 *    failed payroll run rendered "Paid 15 Aug" one line above a "✕ Failed"
 *    pill and the employee had two contradictory facts and no way to tell
 *    which was true. Only `paid` claims the money moved; see `dateLabels`.
 * 2. **A failure can say why.** See `failureReason`.
 * 3. **A refunded deduction no longer renders "−-$50.00".** The row prepended
 *    a literal U+2212 to `formatMoney(deductionsCents)`, and most payroll APIs
 *    sign a refunded deduction negative. `deductionParts()` formats the
 *    **magnitude** and the sign comes from the direction, so a refund reads as
 *    a credit instead of as a double negative.
 * 4. **The row is one accessible name carrying the status.** `Payslip Aug
 *    1–15, net $3,200.00` told the reader the money had arrived when it had
 *    not — the pill saying otherwise was never announced.
 * 5. **Press and hover are a state layer**, not `hover:bg-neutral-100` — a
 *    ramp step, which mirrors under `[data-theme="dark"]` and paints a
 *    near-white slab across a dark page.
 * 6. **Money is overridable and column-aligned.** `formatMoney`'s third
 *    `locale` argument was unreachable from any prop, and figures that stack
 *    in a column now use tabular figures so they line up. "Gross" and
 *    "Deductions" were hard-coded English in a payroll component; they are
 *    `grossLabel` and `deductionsLabel`.
 */
export const PayslipRowV4 = React.forwardRef<HTMLDivElement, PayslipRowV4Props>(
  function PayslipRowV4(
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
      failureReason,
      dateLabels,
      formatMoney = defaultFormatMoney,
      grossLabel = 'Gross',
      deductionsLabel = 'Deductions',
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const compact = variant === 'compact';
    const interactive = onClick != null;
    const statusMeta = status ? PAYSLIP_STATUS_META[status] : undefined;
    const net = formatMoney(netCents, currency);

    // With no status the row cannot know the money arrived, so it takes the
    // neutral word rather than the base's unconditional "Paid".
    const dateKey: PayslipStatus = status ?? 'pending';
    const dateWord = dateLabels?.[dateKey] ?? PAYSLIP_DATE_LABELS[dateKey];
    const dateLine = payDate ? `${dateWord} ${payDate}` : undefined;

    const deduction = deductionsCents != null ? deductionParts(deductionsCents) : undefined;
    const deductionText = deduction
      ? `${deduction.direction === 'debit' ? '−' : deduction.direction === 'credit' ? '+' : ''}${formatMoney(
          deduction.magnitudeCents,
          currency
        )}`
      : undefined;

    const showBreakdown = !compact && (grossCents != null || deductionText != null);
    const reason = status === 'failed' ? failureReason : undefined;

    const summary = (
      <span className={ROW_V4_TEXT_CLASS}>
        <span className="truncate text-sm font-bold text-on-card">{period}</span>
        {dateLine ? <span className="text-xs text-muted-text">{dateLine}</span> : null}
      </span>
    );

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(
          'flex flex-col rounded-[var(--xen-radius-md)] border border-border bg-card',
          className
        )}
      >
        <div className={cn(ROW_V4_BASE_CLASS, rowHeightClass(dateLine != null))}>
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                'Payslip',
                period,
                `net ${net}`,
                statusMeta?.label,
                dateLine,
                reason,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-center">{summary}</div>
          )}

          <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
            <span className={cn('text-lg font-bold text-on-card', TABULAR_CLASS)}>{net}</span>
            {statusMeta ? (
              <StatusPillV4
                meta={statusMeta}
                variant="inline"
                size="sm"
                aria-hidden={interactive || undefined}
              />
            ) : null}
          </span>
        </div>

        {reason ? (
          <p className="px-md pb-sm text-xs font-semibold text-danger-text">{reason}</p>
        ) : null}

        {showBreakdown ? (
          <div className="flex gap-lg px-md pb-sm">
            {grossCents != null ? (
              <div>
                <p className="text-xs text-muted-text">{grossLabel}</p>
                <p className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                  {formatMoney(grossCents, currency)}
                </p>
              </div>
            ) : null}
            {deductionText != null ? (
              <div>
                <p className="text-xs text-muted-text">{deductionsLabel}</p>
                <p className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                  {deductionText}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
