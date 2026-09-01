import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, initials, seedRampStep, rampBgClass, TONE_BORDER, TONE_SOFT_BG } from './internal';
import type { ProductGridTileProps } from './ProductGridTile';

/** Drop-in for {@link ProductGridTileProps} — same props, the V4 "register" design. */
export type ProductGridTileV4Props = ProductGridTileProps;

/**
 * ProductGridTile — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a catalog tile: a larger plate/thumbnail, a **bold,
 * prominent price** (the number that matters at the counter), and a satisfying
 * press/selected state — a `selected` tile lifts with an accent ring, soft tint,
 * and shadow. `soldOut` dims and flags by word (not color alone). Same
 * props/behavior as {@link ProductGridTileProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export const ProductGridTileV4 = React.forwardRef<HTMLButtonElement, ProductGridTileV4Props>(function ProductGridTileV4(
  { name, priceCents, currency = 'USD', imageUrl, seed, tone = 'primary', soldOut = false, selected = false, onLongPress, variant = 'default', testID, className, onContextMenu, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const plateTint = rampBgClass(seedRampStep(seed ?? name));

  const plate = imageUrl ? (
    <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
  ) : (
    <div className={cn('flex h-full w-full items-center justify-center', plateTint)}>
      <span aria-hidden="true" className="text-2xl font-extrabold text-on-surface">
        {initials(name)}
      </span>
    </div>
  );

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      aria-label={`${name}${typeof priceCents === 'number' ? `, ${formatMoney(priceCents, currency)}` : ''}${soldOut ? ', sold out' : ''}`}
      disabled={soldOut}
      data-xen-product-grid-tile=""
      data-testid={testID}
      onContextMenu={(e) => {
        onContextMenu?.(e);
        if (onLongPress) {
          e.preventDefault();
          onLongPress();
        }
      }}
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border text-left transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        soldOut ? 'pointer-events-none opacity-50' : 'hover:opacity-95 active:scale-[0.98]',
        selected ? cn('border-2 shadow-md', TONE_BORDER[tone], TONE_SOFT_BG[tone]) : 'border-border bg-surface shadow-sm',
        className
      )}
      {...rest}
    >
      {!compact ? (
        <div className="h-[84px] w-full overflow-hidden">{plate}</div>
      ) : (
        <div className={cn('h-1 w-full', TONE_SOFT_BG[tone])} />
      )}
      <div className="flex flex-col gap-1 p-[var(--xen-space-md)]">
        <span className={cn('text-sm font-semibold text-on-surface', compact ? 'truncate' : 'line-clamp-2')}>{name}</span>
        <div className="flex items-center justify-between">
          {typeof priceCents === 'number' ? (
            <span className="text-base font-extrabold tabular-nums text-on-surface">{formatMoney(priceCents, currency)}</span>
          ) : (
            <span />
          )}
          {soldOut ? <span className="text-xs font-bold text-danger">Sold out</span> : null}
        </div>
      </div>
    </button>
  );
});
