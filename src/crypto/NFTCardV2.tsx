import * as React from 'react';
import { cn } from '../primitives/cn';
import { NetworkBadge } from './NetworkBadge';
import { formatToken } from './internal/format';
import { pressableProps } from './internal/pressable';
import type { NFTCardProps } from './NFTCard';

/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV2Props = NFTCardProps;

/**
 * NFTCard, redesigned (v2): **full-bleed artwork with a scrim overlay**. The image
 * fills the whole tile; a bottom-up `neutral-900` → transparent gradient scrim
 * lets the collection, name, and floor sit over the art in near-white ramp ink
 * (readable in both themes), and the network chip floats top-right. The tile is
 * elevated (shadow) and lifts on hover. Floor is fixed-precision (no float
 * drift). Distinct at a glance from the base's media-over-meta stack. Same props;
 * handles `loading` and a missing image.
 */
export const NFTCardV2 = React.forwardRef<HTMLDivElement, NFTCardV2Props>(function NFTCardV2(
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
  const hasImage = !loading && image != null;

  return (
    <div
      ref={ref}
      aria-label={interactive ? (collection ? `${name}, ${collection}` : name) : undefined}
      className={cn(
        'relative flex h-56 flex-col justify-end overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-md',
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading artwork" className="absolute inset-0 animate-pulse bg-neutral-100" />
      ) : image != null ? (
        <>
          <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-neutral-900/85 via-neutral-900/30 to-transparent"
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <span className="text-xs text-muted">No image</span>
        </div>
      )}

      {network != null ? (
        <div className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)]">
          <NetworkBadge name={network} size="sm" />
        </div>
      ) : null}

      {!loading ? (
        <div className="relative flex flex-col gap-0.5 p-[var(--xen-space-md)]">
          {collection != null ? (
            <span className={cn('truncate text-xs font-medium', hasImage ? 'text-neutral-100' : 'text-muted')}>
              {collection}
            </span>
          ) : null}
          <div className="flex items-end justify-between gap-[var(--xen-space-sm)]">
            <span className={cn('min-w-0 flex-1 truncate text-base font-bold', hasImage ? 'text-neutral-50' : 'text-on-surface')}>
              {name}
            </span>
            {floorAmount != null ? (
              <div className="flex flex-col items-end">
                <span className={cn('text-xs', hasImage ? 'text-neutral-100' : 'text-muted')}>Floor</span>
                <span className={cn('text-sm font-bold tabular-nums', hasImage ? 'text-neutral-50' : 'text-on-surface')}>
                  {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
});
