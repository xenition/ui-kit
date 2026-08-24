import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { TONE_TINT } from './internal/tint';

/** Settlement state of a tax account for a period. */
export type TaxStatus = 'owed' | 'refund' | 'paid' | 'overdue' | 'filed';

const STATUS: Record<TaxStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  owed: { label: 'Balance due', glyph: '💳', tone: 'warn' },
  refund: { label: 'Refund', glyph: '💵', tone: 'success' },
  paid: { label: 'Paid', glyph: '✓', tone: 'success' },
  overdue: { label: 'Overdue', glyph: '!', tone: 'danger' },
  filed: { label: 'Filed', glyph: '📄', tone: 'primary' },
};

export interface TaxSummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tax year / period label (e.g. "2025" or "Q2 2026"). */
  taxYear: string;
  /** Kind of tax (e.g. "Property tax", "Income tax"). */
  taxType?: string;
  /** Account settlement status (default `owed`). */
  status?: TaxStatus;
  /** Primary amount in integer **cents** — balance due or refund total. */
  amountCents: number;
  /** Amount already paid this period, in integer **cents**. */
  paidCents?: number;
  /** Localized due date (already formatted). */
  dueDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires "Pay now" (shown only for owed / overdue balances). */
  onPay?: () => void;
}

/**
 * A tax-account summary for one period: the settlement status conveyed by
 * **text + glyph + color** (never color alone), the primary balance / refund as
 * integer cents through `formatMoney`, an optional amount-paid line, and a gated
 * "Pay now" action for owed / overdue balances. The headline amount is toned
 * success for a refund and danger when overdue. Token-bound throughout — no
 * literal colors. Web parity of the native `TaxSummaryCard`.
 */
export const TaxSummaryCard = React.forwardRef<HTMLDivElement, TaxSummaryCardProps>(
  function TaxSummaryCard(
    {
      taxYear,
      taxType,
      status = 'owed',
      amountCents,
      paidCents,
      dueDate,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onPay,
      className,
      ...rest
    },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.owed;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const isPayable = status === 'owed' || status === 'overdue';
    const amountColor =
      status === 'refund' || status === 'paid'
        ? 'text-success'
        : status === 'overdue'
          ? 'text-danger'
          : 'text-on-surface';

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
              TONE_TINT[sd.tone]
            )}
          >
            <Icon glyph="🧾" size="xl" aria-label="Tax summary" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-on-surface">
              {taxType ?? 'Tax'} · {taxYear}
            </p>
            <Badge tone={sd.tone} className="mt-0.5">
              <span aria-hidden="true">{sd.glyph}</span> {sd.label}
            </Badge>
          </div>
        </div>

        <div className="mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">{status === 'refund' ? 'Refund' : 'Balance'}</span>
            <span className={cn('text-xl font-bold', amountColor)}>{format(amount, currency)}</span>
          </div>
          {paidCents != null ? (
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-xs text-muted">Paid</span>
              <span className="text-base font-semibold text-on-surface">
                {format(Math.max(0, Math.trunc(paidCents)), currency)}
              </span>
            </div>
          ) : null}
        </div>

        {dueDate != null ? (
          <p className="mt-[var(--xen-space-sm)] text-xs text-muted">Due {dueDate}</p>
        ) : null}

        {isPayable && onPay != null && amount > 0 ? (
          <div className="mt-[var(--xen-space-md)] flex justify-end">
            <Button size="sm" variant={status === 'overdue' ? 'danger' : 'primary'} onClick={onPay}>
              Pay now
            </Button>
          </div>
        ) : null}
      </Card>
    );
  }
);
