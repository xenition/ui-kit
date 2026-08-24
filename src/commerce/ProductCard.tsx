import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { PriceTag } from './PriceTag';
import { MoneyFormatter } from './money';

export interface ProductCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Product title. */
  title: string;
  /** Price in integer cents. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Optional "was" price in cents (struck through). */
  compareAtCents?: number;
  /** Product image URL. When absent a deterministic `GenerativeCover` is drawn. */
  imageUrl?: string;
  /** Alt text for the image (defaults to the title). */
  imageAlt?: string;
  /** Stable id used to seed the cover fallback (defaults to the title). */
  slug?: string;
  /** If given, the card image + title link here. */
  href?: string;
  /** Add-to-cart handler; renders an add button when provided. */
  onAdd?: () => void;
  /** Add button label (default `Add to cart`). */
  addLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * Catalog product tile: media (image, or a seeded {@link GenerativeCover}
 * fallback when `imageUrl` is absent), title, {@link PriceTag}, and an optional
 * add-to-cart button / `href` link. Token-only; the media box uses the theme
 * radius and a neutral placeholder surface.
 */
export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  function ProductCard(
    {
      title,
      priceCents,
      currency = 'USD',
      compareAtCents,
      imageUrl,
      imageAlt,
      slug,
      href,
      onAdd,
      addLabel = 'Add to cart',
      formatMoney,
      className,
      ...rest
    },
    ref
  ) {
    const media = imageUrl ? (
      <img
        src={imageUrl}
        alt={imageAlt ?? title}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ) : (
      <GenerativeCover seed={slug ?? title} label={title} className="h-full w-full" />
    );

    const mediaBox = (
      <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100">{media}</div>
    );

    return (
      <div
        ref={ref}
        data-xen-product-card=""
        className={cn(
          'group flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          className
        )}
        {...rest}
      >
        {href ? (
          <a href={href} className="block" aria-label={title}>
            {mediaBox}
          </a>
        ) : (
          mediaBox
        )}
        <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]">
          <h3 className="font-heading text-base font-semibold leading-snug text-on-surface">
            {href ? (
              <a href={href} className="hover:text-primary">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <PriceTag
            cents={priceCents}
            currency={currency}
            compareAtCents={compareAtCents}
            formatMoney={formatMoney}
          />
          {onAdd ? (
            <Button
              type="button"
              size="sm"
              onClick={onAdd}
              className="mt-[var(--xen-space-xs)] w-full"
            >
              {addLabel}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
);
