import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { NetworkBadge } from './NetworkBadge';
import { formatToken } from './internal/format';
import { pressableProps } from './internal/pressable';

export type NFTCardVariant = 'grid' | 'list';

export interface NFTCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Item name (e.g. `Punk #4231`). */
  name: string;
  /** Collection name (e.g. `CryptoPunks`). */
  collection?: string;
  /** Artwork image URL. When absent a token-bound placeholder is shown. */
  image?: string;
  /** Floor price amount in native token units. */
  floorAmount?: number;
  /** Native token ticker for the floor price. */
  floorSymbol?: string;
  /** Fraction digits for the floor amount (default `3`). */
  floorDecimals?: number;
  /** Chain name for a {@link NetworkBadge} footer. */
  network?: string;
  variant?: NFTCardVariant;
  /** Skeleton state while metadata loads. */
  loading?: boolean;
  /** Fires when the card is pressed (keyboard-operable). */
  onClick?: () => void;
}

/**
 * A collectible tile: artwork (or a token-bound `No image` placeholder), name,
 * collection, an optional chain {@link NetworkBadge}, and a floor price
 * (fixed-precision — no float drift). `grid` stacks the media over the meta;
 * `list` places a thumbnail beside it. Handles a `loading` skeleton and a
 * missing image gracefully. Web parity of the native `NFTCard`.
 */
export const NFTCard = React.forwardRef<HTMLDivElement, NFTCardProps>(function NFTCard(
  {
    name,
    collection,
    image,
    floorAmount,
    floorSymbol,
    floorDecimals = 3,
    network,
    variant = 'grid',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const isList = variant === 'list';
  const interactive = pressableProps(onClick);

  const media = (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100',
        isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full'
      )}
    >
      {loading ? (
        <div aria-label="Loading artwork" className="h-full w-full animate-pulse bg-neutral-100" />
      ) : image != null ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs text-muted">No image</span>
      )}
    </div>
  );

  const meta = (
    <div className={cn('flex flex-col gap-1', isList ? 'min-w-0 flex-1' : 'mt-[var(--xen-space-sm)]')}>
      {collection != null ? (
        <span className="truncate text-xs text-muted">{collection}</span>
      ) : null}
      <span className="truncate text-base font-bold text-on-surface">{name}</span>
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        {network != null ? <NetworkBadge name={network} size="sm" /> : <span />}
        {floorAmount != null ? (
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted">Floor</span>
            <span className="text-sm font-semibold tabular-nums text-on-surface">
              {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <Card
      ref={ref}
      aria-label={interactive ? (collection ? `${name}, ${collection}` : name) : undefined}
      className={cn(
        'p-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className={cn(isList ? 'flex items-center gap-[var(--xen-space-md)]' : 'flex flex-col')}>
        {media}
        {meta}
      </div>
    </Card>
  );
});
