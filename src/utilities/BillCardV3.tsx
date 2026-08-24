import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Button } from '../primitives';
import { formatMoney, SOLID_TINT, tintSlot } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import type { BillCardProps } from './BillCard';

/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV3Props = BillCardProps;

/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `status · line · due · account` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
export const BillCardV3 = React.forwardRef<HTMLDivElement, BillCardV3Props>(function BillCardV3(
  {
    kind,
    provider,
    accountNumber,
    amountCents,
    dueDate,
    status = 'due',
    currency = 'USD',
    formatMoney: format = formatMoney,
    payLabel = 'Pay',
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
  const slot = tintSlot(sd.tone);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';
  const overdue = status === 'overdue';
  const interactive = onClick != null;

  const caption = [`${sd.glyph} ${sd.label}`, kd.label, dueDate].filter((s): s is string => s != null).join(' · ');

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
      <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', SOLID_TINT[slot])} aria-hidden="true" />
      <Icon glyph={kd.glyph} size="sm" aria-label={`${kd.label} bill`} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-on-surface">{provider}</span>
        <span className="truncate text-xs text-muted">{`${caption} · ${accountNumber}`}</span>
      </div>
      <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
        <span className={cn('text-base font-bold', overdue ? 'text-danger' : 'text-on-surface')}>
          {format(amount, currency)}
        </span>
        {onPay != null && !settled ? (
          <Button
            variant="primary"
            size="sm"
            tone={overdue ? 'danger' : 'default'}
            onClick={onPay}
            disabled={paying}
            aria-busy={paying}
          >
            {payLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
