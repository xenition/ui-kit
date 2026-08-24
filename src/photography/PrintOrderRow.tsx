import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { PriceTag, type MoneyFormatter } from '../commerce';

/** Fulfilment state of a print order line. */
export type PrintOrderStatus = 'pending' | 'printing' | 'shipped' | 'delivered';

const STATUS: Record<PrintOrderStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', tone: 'neutral' },
  printing: { label: 'Printing', tone: 'warn' },
  shipped: { label: 'Shipped', tone: 'primary' },
  delivered: { label: 'Delivered', tone: 'success' },
};

export interface PrintOrderRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product name (e.g. "Fine-art matte print"). */
  product: string;
  /** Print size label (e.g. "16 × 24 in"). */
  size?: string;
  /** Finish / paper (e.g. "Lustre"). */
  finish?: string;
  /** Quantity ordered (default 1, clamped to >= 1 in the display). */
  quantity?: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Fulfilment status (default `pending`). */
  status?: PrintOrderStatus;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A single print-order line — product, size/finish/quantity meta, a status
 * `Badge`, and a line total ({@link PriceTag} of `unitPriceCents × quantity`).
 * Quantity is clamped to at least 1 so the total is always guarded. Status is a
 * labelled badge (not color alone). Passing `onClick` exposes the row as a
 * keyboard-operable `button`. Token-only colors.
 */
export const PrintOrderRow = React.forwardRef<HTMLDivElement, PrintOrderRowProps>(
  function PrintOrderRow(
    {
      product,
      size,
      finish,
      quantity = 1,
      unitPriceCents,
      currency = 'USD',
      status = 'pending',
      formatMoney,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const qty = Math.max(1, Math.floor(quantity));
    const meta = STATUS[status];
    const interactive = typeof onClick === 'function';

    const metaBits: string[] = [];
    if (size) metaBits.push(size);
    if (finish) metaBits.push(finish);
    metaBits.push(`×${qty}`);

    return (
      <div
        ref={ref}
        data-xen-print-order-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${product}, ${qty}, ${meta.label}` : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center justify-between gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="truncate text-base font-semibold text-on-surface">{product}</p>
          <p className="truncate text-xs text-muted">{metaBits.join(' · ')}</p>
        </div>
        <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
          <PriceTag cents={unitPriceCents * qty} currency={currency} formatMoney={formatMoney} size="sm" />
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
      </div>
    );
  }
);
