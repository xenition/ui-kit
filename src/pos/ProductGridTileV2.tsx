import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type PosTone } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Same public contract as {@link ProductGridTile} — a drop-in alternate design. */
export type ProductGridTileV2Props = ProductGridTileProps;

const PLATE: Record<PosTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface', primary: 'bg-primary/10 text-primary', success: 'bg-success/10 text-success',
  warn: 'bg-warn/10 text-warn', danger: 'bg-danger/10 text-danger', accent: 'bg-accent/10 text-accent',
};

/**
 * ProductGridTile, redesigned (v2): an **image-forward tile**. The photo (or a
 * tone-tinted initials plate) fills the top of a square card; the name + price
 * sit on a surface footer. Selected draws an accent ring; sold-out dims and flags
 * "Sold out" (text, not color). Distinct from v1. Same props, token-only.
 */
export const ProductGridTileV2 = React.forwardRef<HTMLButtonElement, ProductGridTileV2Props>(
  function ProductGridTileV2(
    { name, priceCents, currency = 'USD', imageUrl, seed, tone = 'neutral', soldOut = false, selected = false, onLongPress, variant, testID, className, ...rest },
    ref
  ) {
    void seed;
    void variant;
    const initials = name.trim().slice(0, 2).toUpperCase();

    return (
      <button
        ref={ref}
        type="button"
        data-xen-product-grid-tile=""
        data-testid={testID}
        aria-pressed={selected}
        aria-label={`${name}${soldOut ? ', sold out' : ''}`}
        disabled={soldOut}
        onContextMenu={onLongPress ? (e) => { e.preventDefault(); onLongPress(); } : undefined}
        className={cn(
          'flex flex-col overflow-hidden rounded-lg bg-surface text-left shadow-sm transition-transform',
          selected && 'ring-2 ring-accent',
          soldOut ? 'opacity-50' : 'hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          className
        )}
        {...rest}
      >
        <div className={cn('flex aspect-square items-center justify-center', imageUrl ? 'bg-neutral-100' : PLATE[tone])}>
          {imageUrl ? <img src={imageUrl} alt="" className="h-full w-full object-cover" /> : <span className="text-2xl font-bold">{initials}</span>}
        </div>
        <div className="flex flex-col gap-0.5 p-2">
          <span className="truncate text-sm font-semibold text-on-surface">{name}</span>
          <span className="text-xs text-muted">
            {soldOut ? 'Sold out' : typeof priceCents === 'number' ? formatMoney(priceCents, currency) : ''}
          </span>
        </div>
      </button>
    );
  }
);
