import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, Button } from '../primitives';
import { formatMoney } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import type { BillCardProps } from './BillCard';

/** Drop-in for {@link BillCardProps} — same props, a different design. */
export type BillCardV4Props = BillCardProps;

/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated rounded
 * surface, the utility-kind glyph in a small brand-gradient disc (the signature
 * V4 touch), a status pill carrying text + glyph + color, and the amount due in
 * integer cents via `formatMoney`. Restraint by design — the money stays on the
 * calm surface; only the small disc is gradient. An optional pay `Button` (danger
 * tone when overdue) and whole-card click are preserved. Same props/behavior as
 * {@link BillCardProps}; token-only colors.
 */
export const BillCardV4 = React.forwardRef<HTMLDivElement, BillCardV4Props>(function BillCardV4(
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
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
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
        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
          <Icon glyph={kd.glyph} size="xl" color="onPrimary" aria-label={`${kd.label} bill`} />
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
    </div>
  );
});
