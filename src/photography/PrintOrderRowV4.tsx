import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import { PriceTag } from '../commerce';
import type { PrintOrderRowProps, PrintOrderStatus } from './PrintOrderRow';

/** Drop-in for {@link PrintOrderRowProps} — same props, the V4 "studio" design. */
export type PrintOrderRowV4Props = PrintOrderRowProps;

const STATUS: Record<PrintOrderStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
  printing: { label: 'Printing', tone: 'warn', glyph: '🖨' },
  shipped: { label: 'Shipped', tone: 'primary', glyph: '📦' },
  delivered: { label: 'Delivered', tone: 'success', glyph: '✅' },
};

/**
 * PrintOrderRow — **V4** "studio" design (web parity of the native V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; passing `onClick` makes the whole row a
 * keyboard-operable `button`. All colors from `--xen-*` token classes.
 */
export const PrintOrderRowV4 = React.forwardRef<HTMLDivElement, PrintOrderRowV4Props>(
  function PrintOrderRowV4(
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
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 text-lg ring-1 ring-inset ring-border">
          <span aria-hidden="true">{meta.glyph}</span>
        </div>
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <p className="truncate text-base font-bold text-on-surface">{product}</p>
          <p className="truncate text-xs text-muted">{metaBits.join(' · ')}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-[var(--xen-space-xs)]">
          <PriceTag cents={unitPriceCents * qty} currency={currency} formatMoney={formatMoney} size="sm" />
          <Badge tone={meta.tone} variant="soft">
            {meta.label}
          </Badge>
        </div>
      </div>
    );
  }
);
