import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MoneyFormatter } from './money';
export interface ProductCardProps {
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
    /** Alt / accessibility text for the image (defaults to the title). */
    imageAlt?: string;
    /** Stable id used to seed the cover fallback (defaults to the title). */
    slug?: string;
    /** Press handler for the whole card (native equivalent of the web `href`). */
    onPress?: () => void;
    /** Add-to-cart handler; renders an add button when provided. */
    onAdd?: () => void;
    /** Add button label (default `Add to cart`). */
    addLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * Catalog product tile — the native mirror of the web `ProductCard`: media
 * (image, or a seeded {@link GenerativeCover} when `imageUrl` is absent),
 * title, {@link PriceTag}, and an optional add button. The whole card is
 * pressable via `onPress` (native's `href`). Token-only.
 */
export declare function ProductCard({ title, priceCents, currency, compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel, formatMoney, style, }: ProductCardProps): React.ReactElement;
//# sourceMappingURL=ProductCard.d.ts.map