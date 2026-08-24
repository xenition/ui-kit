import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatMoney, SOLID_TINT, tintSlot } from './internal/format';
import { paymentState } from './internal/status';
import type { PaymentRowProps } from './PaymentRow';

/** Same public contract as {@link PaymentRow} — a drop-in alternate design. */
export type PaymentRowV3Props = PaymentRowProps;

/**
 * PaymentRow, redesigned (v3): a **dense scan line**. A small state dot + glyph
 * lead, the method and a middot-joined `date · status · reference` caption stack
 * in the flexible middle, and the amount hugs the right (muted + struck when
 * voided). No disc, no card, no badge — the most compact of the three for long
 * histories. Distinct at a glance from v1/v2. Same props; state is dot + glyph +
 * label text (never color alone); integer cents; token-pure.
 */
export const PaymentRowV3 = React.forwardRef<HTMLDivElement, PaymentRowV3Props>(function PaymentRowV3(
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

  const caption = [`${sd.glyph} ${sd.label}`, reference].filter((s): s is string => s != null).join(' · ');

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
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
      <span className={cn('h-2 w-2 shrink-0 rounded-full', SOLID_TINT[slot])} aria-hidden="true" />
      <Icon glyph={sd.glyph} size="sm" aria-label={sd.label} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-on-surface">{method ?? 'Payment'}</span>
        <span className="truncate text-xs text-muted">{`${date} · ${caption}`}</span>
      </div>
      <span className={cn('text-sm font-bold', voided ? 'text-muted line-through' : 'text-on-surface')}>
        {format(amount, currency)}
      </span>
    </div>
  );
});
