import * as React from 'react';
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
export declare const ProductCard: React.ForwardRefExoticComponent<ProductCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductCard.d.ts.map