import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct, pressableProps } from './internal';

export type BinState = 'empty' | 'partial' | 'full' | 'reserved' | 'blocked';

const BIN_META: Record<BinState, { glyph: string; label: string; text: string; bg: string }> = {
  empty: { glyph: '▫', label: 'Empty', text: 'text-muted', bg: 'bg-muted' },
  partial: { glyph: '▤', label: 'Partial', text: 'text-primary', bg: 'bg-primary' },
  full: { glyph: '■', label: 'Full', text: 'text-success', bg: 'bg-success' },
  reserved: { glyph: '⏳', label: 'Reserved', text: 'text-accent', bg: 'bg-accent' },
  blocked: { glyph: '⛔', label: 'Blocked', text: 'text-danger', bg: 'bg-danger' },
};

export interface WarehouseBinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Bin / location code (headline, e.g. `A-12-03`). */
  code: string;
  /** Zone / aisle sub-label. */
  zone?: string;
  /** Fill percentage 0–100 (clamped, NaN-safe) — drives the token fill bar. */
  fill?: number;
  /** Item / SKU count stored in the bin. */
  itemCount?: number;
  /** Occupancy state — glyph + word, never color alone. */
  state?: BinState;
  /** Selection highlight. */
  selected?: boolean;
  /** Makes the tile clickable (open the bin). */
  onClick?: () => void;
}

/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill bar
 * sized to `fill`, an item count, and an occupancy chip carried by a glyph +
 * word. Exposes a `progressbar` role with `aria-valuenow` for the fill so
 * fullness is announced, not color-inferred. Clickable when `onClick` is set.
 * All colors are theme tokens. Web parity of the native `WarehouseBin`.
 */
export const WarehouseBin = React.forwardRef<HTMLDivElement, WarehouseBinProps>(function WarehouseBin(
  { code, zone, fill, itemCount, state = 'partial', selected = false, onClick, className, ...rest },
  ref
) {
  const meta = BIN_META[state] ?? BIN_META.partial;
  const pct = clampPct(fill);
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : 'progressbar'}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive?.onClick}
      onKeyDown={interactive?.onKeyDown}
      aria-label={`Bin ${code}, ${meta.label}, ${pct}% full`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-selected={selected}
      className={cn(
        'flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border bg-surface p-[var(--xen-space-sm)]',
        selected ? 'border-primary' : 'border-border',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-xs)]">
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-on-surface">{code}</span>
        <span aria-hidden="true" className={cn('text-sm', meta.text)}>
          {meta.glyph}
        </span>
      </div>

      {zone ? <span className="truncate text-xs text-muted">{zone}</span> : null}

      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-100">
        <div className={cn('h-full rounded-full', meta.bg)} style={{ width: `${pct}%` }} />
      </div>

      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-semibold', meta.text)}>{meta.label}</span>
        {itemCount != null ? (
          <span className="text-xs text-muted">{`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}</span>
        ) : null}
      </div>
    </div>
  );
});
