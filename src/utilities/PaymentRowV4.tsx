import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';
import { formatMoney } from './internal/format';
import { paymentState } from './internal/status';
import type { PaymentRowProps } from './PaymentRow';

/** Drop-in for {@link PaymentRowProps} — same props, a different design. */
export type PaymentRowV4Props = PaymentRowProps;

/**
 * PaymentRow — **V4** design. The clean, trust-first payment line: an elevated
 * rounded surface, the settlement-state glyph in a small brand-gradient disc (the
 * signature V4 touch), a method/date stack with a status pill, and a right-aligned
 * amount. The state is still conveyed redundantly (glyph + label + a color that
 * traces to a semantic token: paid → success, failed → danger) so it is never
 * color-alone, and a refunded/failed amount stays muted with a strike. Amount is
 * integer cents via `formatMoney`; becomes a `role="button"` row only when
 * `onClick` is supplied. Same props/behavior as {@link PaymentRowProps};
 * token-only colors.
 */
export const PaymentRowV4 = React.forwardRef<HTMLDivElement, PaymentRowV4Props>(function PaymentRowV4(
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
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const voided = status === 'failed' || status === 'refunded';
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
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
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700">
        <Icon glyph={sd.glyph} color="onPrimary" aria-label={sd.label} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{method ?? 'Payment'}</span>
        <div className="flex items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">{date}</span>
          <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span
          className={cn(
            'text-base font-bold',
            voided ? 'text-muted line-through' : 'text-on-surface'
          )}
        >
          {format(amount, currency)}
        </span>
        {reference != null ? <span className="truncate text-xs text-muted">{reference}</span> : null}
      </div>
    </div>
  );
});
