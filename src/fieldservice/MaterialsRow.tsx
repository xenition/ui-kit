import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone } from '../primitives';
import { DISC_TINT, formatMoney, type MoneyFormatter } from './internal/format';

/** Stock state — text + glyph + color (never color-alone). */
export type MaterialStock = 'in-stock' | 'low' | 'back-ordered';

interface StockDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const MATERIAL_STOCK: Record<MaterialStock, StockDescriptor> = {
  'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
  low: { label: 'Low', glyph: '▲', tone: 'warn' },
  'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};

export interface MaterialsRowProps {
  /** Part / material name (e.g. "3/4in copper elbow"). */
  name: string;
  /** SKU / part number shown as a meta line. */
  sku?: string;
  /** Quantity used / requested. */
  quantity: number;
  /** Unit of measure (e.g. "ea", "ft", "box"). Default `ea`. */
  unit?: string;
  /** Unit price in integer **cents**. */
  unitCents: number;
  /** Stock availability — text + glyph + color. */
  stock?: MaterialStock;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires on row click (e.g. edit the line item). */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a semantic token — never color alone), and a
 * right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literals.
 */
export const MaterialsRow = React.forwardRef<HTMLDivElement, MaterialsRowProps>(function MaterialsRow(
  {
    name,
    sku,
    quantity,
    unit = 'ea',
    unitCents,
    stock,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    style,
  },
  ref
) {
  const sd = stock ? MATERIAL_STOCK[stock] : undefined;
  const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
  const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
  const totalCents = Math.round(qty * unitSafe);
  const interactive = onClick != null;

  return (
    <div
      ref={ref}
      style={style}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${name}, ${qty} ${unit}, ${format(totalCents, currency)}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer',
        className
      )}
    >
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', DISC_TINT.primary)}>
        <Icon glyph="📦" aria-label="Material" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{name}</span>
        <div className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">
            {qty} {unit} × {format(unitSafe, currency)}
          </span>
          {sku != null ? <span className="text-xs text-muted">· {sku}</span> : null}
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-base font-bold text-on-surface">{format(totalCents, currency)}</span>
        {sd ? <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge> : null}
      </div>
    </div>
  );
});
