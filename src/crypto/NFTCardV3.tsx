import * as React from 'react';
import { cn } from '../primitives/cn';
import { NetworkBadge } from './NetworkBadge';
import { formatToken } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { NFTCardProps } from './NFTCard';

/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV3Props = NFTCardProps;

/**
 * NFTCard, redesigned (v3): a **grid tile with a bottom info strip**. The artwork
 * runs flush to the top corners as a square; a flat filled strip (neutral ramp)
 * below it — separated by a hairline — carries the name and, on its own line, the
 * collection (or network chip) with a right-aligned floor (fixed precision — no
 * float drift). No overlay, no shadow: a clean gallery tile that tessellates in a
 * grid. Distinct at a glance from the base's outlined card and v2's full-bleed
 * scrim. Same props; handles `loading` and a missing image.
 */
export const NFTCardV3 = React.forwardRef<HTMLDivElement, NFTCardV3Props>(function NFTCardV3(
  {
    name,
    collection,
    image,
    floorAmount,
    floorSymbol,
    floorDecimals = 3,
    network,
    variant: _variant,
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? (collection ? `${name}, ${collection}` : name) : undefined}
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-neutral-100">
        {loading ? (
          <div aria-label="Loading artwork" className="h-full w-full animate-pulse bg-neutral-100" />
        ) : image != null ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-muted">No image</span>
        )}
      </div>

      <div className="flex flex-col gap-[var(--xen-space-xs)] border-t border-border bg-neutral-100 p-[var(--xen-space-sm)]">
        <span className="truncate text-sm font-bold text-on-surface">{name}</span>
        <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
          {network != null ? (
            <NetworkBadge name={network} size="sm" />
          ) : collection != null ? (
            <span className="min-w-0 flex-1 truncate text-xs text-muted">{collection}</span>
          ) : (
            <span className="flex-1" />
          )}
          {floorAmount != null ? (
            <span className="shrink-0 text-xs font-semibold tabular-nums text-on-surface">
              {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
});
