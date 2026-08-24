import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  formatMoney,
  initials,
  seedRampStep,
  rampBgClass,
  TONE_BORDER,
  TONE_SOFT_BG,
  type PosTone,
} from './internal';

export type ProductGridTileVariant = 'default' | 'compact';

export interface ProductGridTileProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Product name. */
  name: string;
  /** Price in integer **cents**. */
  priceCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Thumbnail URL. When absent a token-tinted plate with initials is drawn. */
  imageUrl?: string;
  /** Seed for the fallback plate tint (defaults to the name). */
  seed?: string;
  /** Optional category accent tone for the plate/label. */
  tone?: PosTone;
  /** Out-of-stock — dims the tile and shows a "Sold out" flag (text, not color). */
  soldOut?: boolean;
  /** Selected/active state (accent ring, announced to a11y). */
  selected?: boolean;
  /** Long-press analog handler (fired on context menu). */
  onLongPress?: () => void;
  /** `default` is a square card with a plate; `compact` is a color-block chip. */
  variant?: ProductGridTileVariant;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

/**
 * A tappable catalog tile for the register grid — the DOM parity of the native
 * `ProductGridTile`. A real `<button>`. With an `imageUrl` it shows the
 * thumbnail; otherwise a deterministic token-tinted plate with the product's
 * initials (the kit ships no image loader — a missing image never blanks). Price
 * is integer **cents** via `formatMoney`. `soldOut` dims and flags by word (not
 * color alone); `selected` draws an accent ring reflected in `aria-pressed`.
 * Token-only tints from a theme ramp.
 */
export const ProductGridTile = React.forwardRef<HTMLButtonElement, ProductGridTileProps>(
  function ProductGridTile(
    {
      name,
      priceCents,
      currency = 'USD',
      imageUrl,
      seed,
      tone = 'primary',
      soldOut = false,
      selected = false,
      onLongPress,
      variant = 'default',
      testID,
      className,
      onContextMenu,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const plateTint = rampBgClass(seedRampStep(seed ?? name));

    const plate = imageUrl ? (
      <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
    ) : (
      <div className={cn('flex h-full w-full items-center justify-center', plateTint)}>
        <span aria-hidden="true" className="text-xl font-bold text-on-surface">
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
          'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border text-left transition-opacity',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          soldOut ? 'pointer-events-none opacity-50' : 'hover:opacity-90',
          selected ? cn('border-2', TONE_BORDER[tone], TONE_SOFT_BG[tone]) : 'border-border bg-surface',
          className
        )}
        {...rest}
      >
        {!compact ? (
          <div className="h-[72px] w-full overflow-hidden">{plate}</div>
        ) : (
          <div className={cn('h-1 w-full', TONE_SOFT_BG[tone])} />
        )}
        <div className="flex flex-col gap-0.5 p-[var(--xen-space-sm)]">
          <span
            className={cn(
              'text-xs font-semibold text-on-surface',
              compact ? 'truncate' : 'line-clamp-2'
            )}
          >
            {name}
          </span>
          <div className="flex items-center justify-between">
            {typeof priceCents === 'number' ? (
              <span className="text-xs tabular-nums text-muted">
                {formatMoney(priceCents, currency)}
              </span>
            ) : (
              <span />
            )}
            {soldOut ? (
              <span className="text-xs font-bold text-danger">Sold out</span>
            ) : null}
          </div>
        </div>
      </button>
    );
  }
);
