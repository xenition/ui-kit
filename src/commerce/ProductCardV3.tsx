import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import { GenerativeCover } from '../marketing/GenerativeCover';
import { PriceTag } from './PriceTag';
import type { ProductCardProps } from './ProductCard';

/** Drop-in alternate of {@link ProductCardProps} — identical prop contract. */
export type ProductCardV3Props = ProductCardProps;

/**
 * ProductCard — design variant **V3**: a **minimal, borderless** editorial
 * treatment. No card chrome at all: a tiny round thumbnail sits beside a small
 * muted, letter-spaced title, and the **price is the hero** (large PriceTag).
 * Separation comes from spacing, not a box. Same props as
 * {@link ProductCardProps}. Token-only.
 */
export const ProductCardV3 = React.forwardRef<HTMLDivElement, ProductCardV3Props>(
  function ProductCardV3(
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

    const thumb = (
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-100">
        {media}
      </div>
    );

    const titleNode = (
      <span className="line-clamp-2 text-sm font-semibold tracking-wide text-muted">{title}</span>
    );

    return (
      <div
        ref={ref}
        data-xen-product-card=""
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] bg-transparent py-[var(--xen-space-sm)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {href ? (
            <a href={href} className="block shrink-0" aria-label={title}>
              {thumb}
            </a>
          ) : (
            thumb
          )}
          {href ? (
            <a href={href} className="min-w-0 flex-1 hover:text-primary">
              {titleNode}
            </a>
          ) : (
            <div className="min-w-0 flex-1">{titleNode}</div>
          )}
        </div>
        <PriceTag
          cents={priceCents}
          currency={currency}
          compareAtCents={compareAtCents}
          formatMoney={formatMoney}
          size="lg"
        />
        {onAdd ? (
          <Button
            type="button"
            size="sm"
            variant="link"
            onClick={onAdd}
            className="self-start px-0"
          >
            {addLabel}
          </Button>
        ) : null}
      </div>
    );
  }
);
