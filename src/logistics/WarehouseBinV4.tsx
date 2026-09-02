import * as React from 'react';
import { cn } from '../primitives/cn';
import { clampPct, pressableProps } from './internal';
import type { WarehouseBinProps, BinState } from './WarehouseBin';

/** Drop-in for {@link WarehouseBinProps} — same props, the V4 "dispatch" design. */
export type WarehouseBinV4Props = WarehouseBinProps;

const BIN_META: Record<BinState, { glyph: string; label: string; text: string; bg: string }> = {
  empty: { glyph: '▫', label: 'Empty', text: 'text-muted', bg: 'bg-muted' },
  partial: { glyph: '▤', label: 'Partial', text: 'text-primary', bg: 'bg-primary' },
  full: { glyph: '■', label: 'Full', text: 'text-success', bg: 'bg-success' },
  reserved: { glyph: '⏳', label: 'Reserved', text: 'text-accent', bg: 'bg-accent' },
  blocked: { glyph: '⛔', label: 'Blocked', text: 'text-danger', bg: 'bg-danger' },
};

/**
 * WarehouseBin — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a storage-location tile: an elevated
 * rounded card with a soft shadow, the bin code + zone, a big legible
 * **tabular-nums** fill percentage, a token fill bar sized to `fill`, an item
 * count, and an occupancy chip carried by a glyph + word (never color alone).
 * Exposes a `progressbar` role with `aria-valuenow` so fullness is announced,
 * not color-inferred. Clickable when `onClick` is set. Identical props/behavior
 * to {@link WarehouseBinProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export const WarehouseBinV4 = React.forwardRef<HTMLDivElement, WarehouseBinV4Props>(function WarehouseBinV4(
  { code, zone, fill, itemCount, state = 'partial', selected = false, onClick, className, ...rest },
  ref
) {
  const meta = BIN_META[state] ?? BIN_META.partial;
  const pct = clampPct(fill);
  const interactive = pressableProps(onClick);
  const shell = 'rounded-[var(--xen-radius-lg)] border bg-surface text-on-surface shadow-sm';

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : 'progressbar'}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive?.onClick}
      onKeyDown={interactive?.onKeyDown}
      data-xen-warehouse-bin=""
      aria-label={`Bin ${code}, ${meta.label}, ${pct}% full`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-selected={selected}
      className={cn(
        shell,
        'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]',
        selected ? 'border-primary' : 'border-border',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-xs)]">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-on-surface">{code}</span>
          {zone ? <span className="block truncate text-xs text-muted">{zone}</span> : null}
        </div>
        <span className={cn('text-xl font-bold tabular-nums', meta.text)}>{pct}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
        <div className={cn('h-full rounded-full', meta.bg)} style={{ width: `${pct}%` }} />
      </div>

      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-[var(--xen-space-xs)] rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold',
            meta.text
          )}
        >
          <span aria-hidden="true">{meta.glyph}</span> {meta.label}
        </span>
        {itemCount != null ? (
          <span className="text-xs tabular-nums text-muted">{`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}</span>
        ) : null}
      </div>
    </div>
  );
});
