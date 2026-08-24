import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge } from '../primitives';
import { formatMoney, DISC_TINT, tintSlot } from './internal/format';
import { paymentState } from './internal/status';
import type { PaymentRowProps } from './PaymentRow';

/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV2Props = PaymentRowProps;

/**
 * PaymentRow, redesigned (v2): a **method card**. The whole payment is a Card: a
 * tinted method-glyph tile leads, the method and reference stack in the middle,
 * and the right column sets the amount big above a status pill. A failed /
 * refunded amount is muted + struck so it reads non-current. Distinct at a glance
 * from v1's bare dense row and v3's line. Same props; state is glyph + label +
 * tone (never color alone); integer cents; token-pure.
 */
export const PaymentRowV2 = React.forwardRef<HTMLDivElement, PaymentRowV2Props>(function PaymentRowV2(
  {
    amountCents,
    date,
    status,
    method,
    reference,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const sd = paymentState(status);
  const slot = tintSlot(sd.tone);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';
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
            'aria-label': `Payment ${format(amount, currency)}, ${date}, ${sd.label}`,
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
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT[slot]
          )}
        >
          <Icon glyph={sd.glyph} size="lg" aria-label={sd.label} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{method ?? 'Payment'}</span>
          <span className="truncate text-xs text-muted">
            {reference != null ? `${date} · ${reference}` : date}
          </span>
        </div>
        <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
          <span className={cn('text-lg font-bold', voided ? 'text-muted line-through' : 'text-on-surface')}>
            {format(amount, currency)}
          </span>
          <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
        </div>
      </div>
    </Card>
  );
});
