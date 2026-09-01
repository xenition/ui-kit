import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { NetworkBadgeV4 } from './NetworkBadgeV4';
import { PLACEHOLDER_CLASS, spokenLine, TABULAR_CLASS } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { NFTCardProps } from './NFTCard';

export interface NFTCardV4Props extends NFTCardProps {
  /** Announced while the artwork skeleton is up. Default `'Loading artwork'`. */
  loadingLabel?: string;
  /** Caption over the floor price. Default `'Floor'`. */
  floorLabel?: string;
}

/**
 * **V4 NFT card** — the web twin of the native `NFTCardV4`, same props as
 * {@link NFTCard} plus `loadingLabel` and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** It was `bg-neutral-100` painted inside a box
 *    that was *also* `bg-neutral-100`, so the only thing separating "loading"
 *    from "empty frame" was the pulse — and under `prefers-reduced-motion`,
 *    nothing at all. The placeholder is now the shared opaque mix against the
 *    card's own ground, in a `role="status"` region rather than a bare
 *    `aria-label` on a `div` with no role.
 * 2. **The floor price never prints without a unit.** `floorSymbol` is
 *    optional and there was no fallback, so a collectible could advertise a
 *    floor of "0.85" of nothing. A floor with no ticker is not shown.
 * 3. **The card announces what it is holding.** `aria-label` carried the name
 *    and collection only, and replaced the subtree — so the network and the
 *    floor price, the two things a buyer is looking for, went unspoken.
 * 4. **`Card` takes the same treatment on both twins**, and a press is a state
 *    layer on a real `<button>` rather than `role="button"` plus a
 *    hand-written key handler on a `div`. The base also stacked its own `p-sm`
 *    class on top of `Card`'s `lg` padding and let stylesheet order pick the
 *    winner; `padding` is passed properly now.
 */
export const NFTCardV4 = React.forwardRef<HTMLDivElement, NFTCardV4Props>(function NFTCardV4(
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
    loadingLabel = 'Loading artwork',
    floorLabel = 'Floor',
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  // A tile with nothing on it is the blank bordered box the line rules out.
  if (!name) return null;

  const isList = variant === 'list';
  const interactive = onClick != null && !loading;
  // A number with no unit is not a price.
  const floorText =
    floorAmount != null && floorSymbol
      ? formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })
      : undefined;

  const media = loading ? (
    <div
      role="status"
      aria-live="polite"
      aria-label={loadingLabel}
      className={cn(
        'animate-pulse',
        PLACEHOLDER_CLASS,
        isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full'
      )}
    />
  ) : (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)]',
        'border border-border bg-card',
        isList ? 'h-16 w-16 shrink-0' : 'h-40 w-full'
      )}
    >
      {image != null ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs text-muted-text">No image</span>
      )}
    </div>
  );

  const meta = (
    <div className={cn('flex flex-col gap-xs', isList ? 'min-w-0 flex-1' : 'mt-sm')}>
      {collection != null ? (
        <span className="truncate text-xs text-muted-text">{collection}</span>
      ) : null}
      <span className="truncate text-base font-bold text-on-card">{name}</span>
      <div className="flex items-center justify-between gap-sm">
        {network != null ? <NetworkBadgeV4 name={network} size="sm" /> : <span />}
        {floorText != null ? (
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-text">{floorLabel}</span>
            <span className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
              {floorText}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );

  const layout = (
    <div className={cn(isList ? 'flex items-center gap-md' : 'flex flex-col')}>
      {media}
      {meta}
    </div>
  );

  return (
    <Card
      ref={ref}
      variant="outlined"
      padding="sm"
      className={className}
      {...rest}
    >
      {interactive ? (
        <button
          type="button"
          aria-label={spokenLine([name, collection, network, floorText ? `${floorLabel} ${floorText}` : undefined])}
          onClick={onClick}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(
            'block w-full rounded-[var(--xen-radius-md)] text-left',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            MIN_TAP_CLASS
          )}
        >
          {layout}
        </button>
      ) : (
        layout
      )}
    </Card>
  );
});
