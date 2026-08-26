import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { Rating } from '../primitives/Rating';
import { PriceTag } from '../commerce';
import type { MoneyFormatter } from '../commerce';

/** Layout variants for a menu item tile. */
export type DishCardVariant = 'list' | 'grid' | 'featured';

export interface DishCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Dish name. */
  name: string;
  /** Short description / ingredients line. */
  description?: string;
  /** Price in integer cents. Omit for an unpriced dish — a recipe, a saved
   * dish, a menu line that carries no price — and the price element is left
   * out entirely rather than reading `$0.00`. */
  priceCents?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Dish photo URL. When absent a token-tinted placeholder is drawn. */
  imageUrl?: string;
  /** Average rating (0–5); renders a compact star row when provided. */
  rating?: number;
  /** Optional dietary / cuisine chip slot (e.g. `NutritionBadge`s). */
  badges?: React.ReactNode;
  /** Layout variant (default `list`). */
  variant?: DishCardVariant;
  /** When true the dish is out of stock: dimmed and the add button disabled. */
  soldOut?: boolean;
  /** Loading placeholder — renders a token-tinted skeleton, no content. */
  loading?: boolean;
  /** Whole-card activation handler (native `onPress`). */
  onClick?: () => void;
  /** Add-to-cart handler; renders an add button when provided. */
  onAdd?: () => void;
  /** Add button label (default `Add`). */
  addLabel?: string;
  /** Sold-out label (default `Sold out`). */
  soldOutLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A single menu item — the food-domain sibling of `ProductCard`. Renders a
 * photo (or a token-tinted placeholder), name, description, an optional star
 * rating and dietary `badges`, a {@link PriceTag}, and an optional add button.
 * `variant` switches between a horizontal `list` row, a vertical `grid` tile,
 * and a larger `featured` hero. `soldOut` dims the card and disables adding;
 * `loading` shows a token-only skeleton. Web parity of the native `DishCard`.
 * When `onClick` is set the root is a keyboard-operable `role="button"` so the
 * nested add button stays independently focusable. Token-only.
 */
export const DishCard = React.forwardRef<HTMLDivElement, DishCardProps>(function DishCard(
  {
    name,
    description,
    priceCents,
    currency = 'USD',
    imageUrl,
    rating,
    badges,
    variant = 'list',
    soldOut = false,
    loading = false,
    onClick,
    onAdd,
    addLabel = 'Add',
    soldOutLabel = 'Sold out',
    formatMoney,
    className,
    ...rest
  },
  ref
) {
  const horizontal = variant === 'list';
  const containerClass = cn(
    'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
    horizontal
      ? 'flex flex-row gap-[var(--xen-space-md)] p-[var(--xen-space-md)]'
      : 'flex flex-col',
    soldOut && 'opacity-60',
    className
  );

  if (loading) {
    return (
      <div ref={ref} aria-busy="true" aria-label="Loading dish" className={containerClass} {...rest}>
        <div
          className={cn(
            'rounded-[var(--xen-radius-md)] bg-neutral-200',
            horizontal ? 'h-[88px] w-[88px] shrink-0' : 'h-[140px] w-full'
          )}
        />
        <div
          className={cn(
            'flex flex-1 flex-col gap-[var(--xen-space-sm)]',
            !horizontal && 'p-[var(--xen-space-md)]'
          )}
        >
          <div className="h-3.5 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-11/12 rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      </div>
    );
  }

  const mediaHeight = horizontal ? 'h-[88px] w-[88px] shrink-0' : variant === 'featured' ? 'h-[180px] w-full' : 'h-[140px] w-full';
  const media = (
    <div className={cn('overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100', mediaHeight)}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} loading="lazy" className="h-full w-full object-cover" />
      ) : null}
    </div>
  );

  const body = (
    <div
      className={cn(
        'flex flex-1 flex-col gap-[var(--xen-space-xs)]',
        !horizontal && 'p-[var(--xen-space-md)]'
      )}
    >
      <p className={cn('font-heading font-semibold text-on-surface', horizontal ? 'truncate' : 'line-clamp-2')}>
        {name}
      </p>
      {description ? <p className="line-clamp-2 text-sm text-muted">{description}</p> : null}
      {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
      {badges ? <div className="flex flex-wrap gap-[var(--xen-space-xs)]">{badges}</div> : null}
      <div className="mt-[var(--xen-space-xs)] flex items-center justify-between">
        {/* No price, no price element — a recipe or an unpriced menu line must
            not read `$0.00`. The empty spacer keeps `justify-between` pushing the
            add button to the trailing edge where it always sits. */}
        {typeof priceCents === 'number' ? (
          <PriceTag cents={priceCents} currency={currency} formatMoney={formatMoney} />
        ) : (
          <span />
        )}
        {soldOut ? (
          <span className="text-sm font-semibold text-danger">{soldOutLabel}</span>
        ) : onAdd ? (
          <Button size="sm" onClick={onAdd} disabled={soldOut}>
            {addLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );

  const inner = (
    <>
      {media}
      {body}
    </>
  );

  const interactive = typeof onClick === 'function';
  return (
    <div
      ref={ref}
      className={cn(
        containerClass,
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
      )}
      {...rest}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: soldOut ? -1 : 0,
            'aria-label': name,
            'aria-disabled': soldOut || undefined,
            onClick,
            onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
    >
      {inner}
    </div>
  );
});
