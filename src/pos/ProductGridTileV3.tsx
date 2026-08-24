import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, type PosTone } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Same public contract as {@link ProductGridTile} — a drop-in alternate design. */
export type ProductGridTileV3Props = ProductGridTileProps;

const CHIP: Record<PosTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface', primary: 'bg-primary/15 text-primary', success: 'bg-success/15 text-success',
  warn: 'bg-warn/15 text-warn', danger: 'bg-danger/15 text-danger', accent: 'bg-accent/15 text-accent',
};

/**
 * ProductGridTile, redesigned (v3): a **color-block chip**. A compact tone-filled
 * square with the name and price stacked — no photo — for a dense quick-key grid.
 * Selected draws an accent ring; sold-out dims + flags. The opposite of v2's
 * image tile. Same props, token-only.
 */
export const ProductGridTileV3 = React.forwardRef<HTMLButtonElement, ProductGridTileV3Props>(
  function ProductGridTileV3(
    { name, priceCents, currency = 'USD', imageUrl, seed, tone = 'neutral', soldOut = false, selected = false, onLongPress, variant, testID, className, ...rest },
    ref
  ) {
    void seed;
    void variant;
    void imageUrl;

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
          'flex aspect-square flex-col items-center justify-center gap-0.5 rounded-md p-2 text-center transition-colors',
          CHIP[tone],
          selected && 'ring-2 ring-accent',
          soldOut ? 'opacity-50' : 'hover:opacity-90',
          className
        )}
        {...rest}
      >
        <span className="line-clamp-2 text-xs font-bold">{name}</span>
        <span className="text-xs opacity-80">
          {soldOut ? 'Sold out' : typeof priceCents === 'number' ? formatMoney(priceCents, currency) : ''}
        </span>
      </button>
    );
  }
);
