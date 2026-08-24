import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Button } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { utilityKind, billStatus, type UtilityKind, type BillStatus } from './internal/status';

export type { UtilityKind, BillStatus };

export interface BillCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Utility line — drives the leading glyph disc and label. */
  kind: UtilityKind;
  /** Account / provider name (e.g. "City Power & Light"). */
  provider: string;
  /** Account identifier (e.g. "ACCT-4821-93"). */
  accountNumber: string;
  /** Amount owed in integer **cents**. */
  amountCents: number;
  /** Localized due-date string (already formatted by the caller). */
  dueDate?: string;
  /** Bill lifecycle status — conveyed by text + glyph + color (default `due`). */
  status?: BillStatus;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Pay-now button label (default "Pay now"). Hidden when no `onPay`. */
  payLabel?: string;
  /** Fires when the pay action is pressed; the button shows only when supplied. */
  onPay?: () => void;
  /** Show a spinner and block the pay button. */
  paying?: boolean;
  /** Fires on card click (e.g. open bill detail); becomes a button when supplied. */
  onClick?: () => void;
}

/**
 * A summary card for a single utility bill. The `kind` (electric/water/gas/…)
 * picks a tinted leading glyph disc; a status pill conveys the bill lifecycle by
 * **text + glyph + color** (paid → success, overdue → danger) — never color
 * alone. The amount is integer cents funnelled through `formatMoney`, so printed
 * values never drift. An optional pay `Button` renders only when `onPay` is
 * supplied, and the whole card becomes a `role="button"` surface when `onClick`
 * is supplied. Every color traces to a `--xen-*` token — no literals. Web parity
 * of the native `BillCard`.
 */
export const BillCard = React.forwardRef<HTMLDivElement, BillCardProps>(function BillCard(
  {
    kind,
    provider,
    accountNumber,
    amountCents,
    dueDate,
    status = 'due',
    currency = 'USD',
    formatMoney: format = formatMoney,
    payLabel = 'Pay now',
    onPay,
    paying = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const kd = utilityKind(kind);
  const sd = billStatus(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      variant={interactive ? 'interactive' : 'elevated'}
      className={cn(interactive && 'cursor-pointer', className)}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
          <Icon glyph={kd.glyph} size="xl" aria-label={`${kd.label} bill`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-lg font-bold text-on-surface">{provider}</span>
          <span className="truncate text-sm text-muted">
            {kd.label} · {accountNumber}
          </span>
        </div>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>

      <div className="mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">{settled ? 'Paid' : 'Amount due'}</span>
          <span className="text-2xl font-bold text-on-surface">{format(amount, currency)}</span>
        </div>
        {dueDate != null ? (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-muted">{settled ? 'Paid on' : 'Due'}</span>
            <span
              className={cn(
                'text-sm font-semibold',
                status === 'overdue' ? 'text-danger' : 'text-on-surface'
              )}
            >
              {dueDate}
            </span>
          </div>
        ) : null}
      </div>

      {onPay != null && !settled ? (
        <Button
          variant="primary"
          tone={status === 'overdue' ? 'danger' : 'default'}
          onClick={onPay}
          disabled={paying}
          aria-busy={paying}
          className="mt-[var(--xen-space-md)] w-full"
        >
          {`${payLabel} · ${format(amount, currency)}`}
        </Button>
      ) : null}
    </Card>
  );
});
