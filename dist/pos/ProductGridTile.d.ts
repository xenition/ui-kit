import * as React from 'react';
import { type PosTone } from './internal';
export type ProductGridTileVariant = 'default' | 'compact';
export interface ProductGridTileProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
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
export declare const ProductGridTile: React.ForwardRefExoticComponent<ProductGridTileProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ProductGridTile.d.ts.map