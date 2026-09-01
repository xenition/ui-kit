import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { LookbookGridProps, LookbookItem } from './LookbookGrid';

export interface LookbookGridV4Props extends LookbookGridProps {
  /**
   * Build a tile's accessible name when the item carries no `label`. Default
   * `'Look 3 of 12'` — the base fell back to the raw `id`, which is a database
   * key read aloud.
   */
  formatItemLabel?: (position: number, total: number) => string;
}

/** Whole class names — Tailwind's scanner cannot follow `grid-cols-${n}`. */
const COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
};

/**
 * **V4 lookbook grid** — the web twin of the native `LookbookGridV4`, same
 * props as {@link LookbookGrid} plus `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `bg-muted`**, not a translucent wash that
 *    borrows whatever is behind it.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **The caption overlay uses the elevation colour**, dark in both schemes,
 *    rather than `on-surface`, which inverts.
 * 4. **The grid is a real list**, so a reader announces how many looks there
 *    are before walking them.
 */
export const LookbookGridV4 = React.forwardRef<HTMLDivElement, LookbookGridV4Props>(
  function LookbookGridV4(
    {
      items,
      columns = 2,
      aspectRatio = 1,
      emptyLabel = 'No looks yet.',
      formatItemLabel,
      onSelect,
      className,
      ...rest
    },
    ref
  ) {
    const total = items?.length ?? 0;
    const label = formatItemLabel ?? ((n: number, of: number) => `Look ${n} of ${of}`);
    const cols = COLS[Math.max(1, Math.min(4, Math.floor(columns)))] ?? COLS[2]!;

    if (total === 0) {
      return (
        <p className={cn('p-lg text-center text-sm text-muted-text', className)}>{emptyLabel}</p>
      );
    }

    return (
      /*
        The base's props type is a `<div>`'s, so the root stays one and the
        real `<ul>` sits inside it — a list element that cannot take the
        caller's own div attributes would break prop parity for a semantic
        upgrade, which is not a trade worth making.
      */
      <div ref={ref} data-xen-lookbook-grid="" className={className} {...rest}>
        <ul className={cn('grid gap-sm', cols)}>
        {items.map((item: LookbookItem, index) => {
          const name = item.label ?? label(index + 1, total);
          const tile = (
            <span
              className="relative block w-full overflow-hidden rounded-[var(--xen-radius-md)] bg-muted"
              style={{ aspectRatio: String(aspectRatio) }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={onSelect ? '' : name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : null}

              {item.tag ? (
                <span className="absolute left-sm top-sm">
                  <BadgeV4 tone="primary" variant="soft" size="sm">
                    {item.tag}
                  </BadgeV4>
                </span>
              ) : null}

              {item.label ? (
                <span className="absolute inset-x-0 bottom-0 truncate px-sm py-xs text-xs font-semibold text-neutral-50 bg-[color-mix(in_srgb,var(--xen-elevation-color)_62%,transparent)]">
                  {item.label}
                </span>
              ) : null}
            </span>
          );

          return (
            <li key={item.id ?? index}>
              {onSelect ? (
                <button
                  type="button"
                  aria-label={name}
                  onClick={() => onSelect(item.id)}
                  data-xen-v4-chrome="on-surface"
                  className="block w-full rounded-[var(--xen-radius-md)]"
                >
                  {tile}
                </button>
              ) : (
                tile
              )}
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
);
