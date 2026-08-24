import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, Button } from '../primitives';
import { formatMoney } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import type { BillCardProps } from './BillCard';

/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV2Props = BillCardProps;

/**
 * BillCard, redesigned (v2): a **lifted hero card**. A tinted header band carries
 * a large utility glyph tile, provider, and a status pill; the body sets the
 * amount big on the left with a bordered **due-date block** (calendar-style tile,
 * tinted danger when overdue) on the right; a full-width pay CTA anchors the
 * bottom. Distinct at a glance from v1's flat horizontal disc row and v3's dense
 * line. Same props, integer cents, status by glyph+text+tone (never color
 * alone), token-pure.
 */
export const BillCardV2 = React.forwardRef<HTMLDivElement, BillCardV2Props>(function BillCardV2(
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
  const overdue = status === 'overdue';
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface text-on-surface shadow-md',
        interactive &&
          'cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
      {/* Tinted header band */}
      <div className="flex items-center gap-[var(--xen-space-md)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
          <Icon glyph={kd.glyph} size="2xl" aria-label={`${kd.label} bill`} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-lg font-bold text-on-surface">{provider}</span>
          <span className="truncate text-sm text-muted">
            {kd.label} · {accountNumber}
          </span>
        </div>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>

      {/* Body: amount + due-date block */}
      <div className="flex items-end justify-between gap-[var(--xen-space-md)] px-[var(--xen-space-lg)] pt-[var(--xen-space-md)]">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">{settled ? 'Paid' : 'Amount due'}</span>
          <span className="text-3xl font-bold text-on-surface">{format(amount, currency)}</span>
        </div>
        {dueDate != null ? (
          <div
            className={cn(
              'flex min-w-[88px] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] border px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
              overdue ? 'border-danger bg-danger/10' : 'border-border'
            )}
          >
            <span className="text-xs font-semibold text-muted">{settled ? 'Paid on' : 'Due'}</span>
            <span className={cn('text-base font-bold', overdue ? 'text-danger' : 'text-on-surface')}>{dueDate}</span>
          </div>
        ) : null}
      </div>

      {onPay != null && !settled ? (
        <div className="px-[var(--xen-space-lg)] pb-[var(--xen-space-lg)] pt-[var(--xen-space-md)]">
          <Button
            variant="primary"
            tone={overdue ? 'danger' : 'default'}
            onClick={onPay}
            disabled={paying}
            aria-busy={paying}
            className="w-full"
          >
            {`${payLabel} · ${format(amount, currency)}`}
          </Button>
        </div>
      ) : (
        <div className="h-[var(--xen-space-lg)]" />
      )}
    </div>
  );
});
