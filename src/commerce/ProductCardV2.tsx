import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { PriceTag } from './PriceTag';
import type { ProductCardProps } from './ProductCard';

/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV2Props = ProductCardProps;

/**
 * ProductCard — design variant **V2**: a horizontal, media-left **list card**
 * with drop-shadow elevation and no border. Where the base is a vertical
 * image-top tile, V2 puts a square thumbnail on the left and stacks title →
 * price + add-button in a right-hand column, so it reads as a row in a scrolling
 * list. Lifts on hover. Same props as {@link ProductCardProps}; only the layout
 * differs. Token-only.
 */
export const ProductCardV2 = React.forwardRef<HTMLDivElement, ProductCardV2Props>(
  function ProductCardV2(
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
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100">
        {media}
      </div>
    );

    return (
      <div
        ref={ref}
        data-xen-product-card=""
        className={cn(
          'group flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md',
          'transition duration-200 hover:-translate-y-0.5 hover:shadow-lg',
          'motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        {href ? (
          <a href={href} className="block shrink-0" aria-label={title}>
            {mediaBox}
          </a>
        ) : (
          mediaBox
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-[var(--xen-space-sm)]">
          <h3 className="line-clamp-2 font-heading text-base font-semibold leading-snug text-on-surface">
            {href ? (
              <a href={href} className="hover:text-primary">
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
          <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
            <PriceTag
              cents={priceCents}
              currency={currency}
              compareAtCents={compareAtCents}
              formatMoney={formatMoney}
            />
            {onAdd ? (
              <Button type="button" size="sm" variant="soft" onClick={onAdd}>
                {addLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
