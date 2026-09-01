import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { ProductCardProps } from './ProductCard';
/**
 * The image box's proportion. A **fixed** ratio is the point: a grid whose
 * tiles are each as tall as whatever photo the seller uploaded is the single
 * loudest "nobody laid this out" signal a storefront can send, and it is what
 * makes an add button land at a different height in every column.
 *
 * Four ratios, no free-form number, because `ListingCardV4` in `marketplace`
 * mirrors this card and the two must be able to agree by name — a storefront
 * and a marketplace have to read as one product.
 */
export type ProductCardV4Aspect = '1:1' | '4:5' | '3:4' | '16:9';
export interface ProductCardV4Props extends ProductCardProps {
    /**
     * One badge, drawn over the top-left of the media — "Sale", "Sold out",
     * "New". Takes a `BadgeV4` or a `StatusBadgeV4`.
     *
     * **One** slot on purpose. A tile that can carry three badges gets three
     * badges, and a catalog page of tiles each shouting two things has no
     * hierarchy left for the thing it is actually selling (§5, §7).
     */
    badge?: React.ReactNode;
    /** The media box's proportion. Default `'4:5'`. */
    aspect?: ProductCardV4Aspect;
    /**
     * Whether the card carries `elevation.card`. Default `true` — a product tile
     * is the on-page card.
     *
     * Pass `false` when the grid sits **inside** another card: §4.6 is explicit
     * that a card inside a card is flat, and never nesting a shadow in a shadow
     * is the whole of that section.
     */
    raised?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 product card (native)** — same props as the web `ProductCardV4`,
 * including defaults, except for the one prop the platforms cannot share:
 * navigation is `onPress` here and `href` there, exactly as the base line
 * splits it. Everything V4 adds — `badge`, `aspect`, `raised` — is identical.
 *
 * ## The anatomy, top to bottom
 *
 * ```
 * [ media at a FIXED ratio, one badge over it ]
 * [ title, at most two lines                  ]
 * [ PriceTagV4                                ]
 * [ optional add button, full width           ]
 * ```
 *
 * Nothing else. Every slot a catalog tile is tempted to grow — a rating, a
 * seller, a colour swatch row, a second badge — is a thing the grid has to
 * make room for in every column, and §7 asks for subtraction first.
 *
 * ## Six changes
 *
 * 1. **The ground is `card`, not `surface`.** The single most visible fix in
 *    the pass: every card in this module paints the same colour as the page it
 *    sits on, which is why the border was doing all the work and why a product
 *    grid on a dark page read as a flat sheet of identical rectangles.
 * 2. **The media ratio is fixed and named.** The base pinned `4 / 5` with no
 *    way to say otherwise.
 * 3. **The title is capped at two lines.** The base already did this on
 *    native; the web twin did not, and now both do.
 * 4. **The price is the price.** `PriceTagV4` — a step up the scale, tabular
 *    figures, the display face — instead of the base line's caption-sized
 *    number. A discounted price still does not turn red (§35.4).
 * 5. **The media placeholder is a semantic slot.** `colors.muted`, not
 *    `tokens.ramps.neutral[100]` — the ramps carry the *light* orientation in
 *    both schemes, so the base's placeholder was a pale rectangle on a dark
 *    page. The fallback art is `GenerativeCoverV4`, the same plate the web
 *    twin draws from the same seed (§10.5).
 * 6. **Press is a state layer, not a dimmer.** `opacity: pressed ? 0.9 : 1`
 *    fades the card's own *content*, which is the signal M3 spends 0.38 on to
 *    mean disabled. §4.3: the layer is the card's ink over the card's ground,
 *    flattened opaque so the title keeps the contrast promise it was measured
 *    for.
 *
 * **Renders nothing when `title` is empty.** §4.5: a component with nothing to
 * show renders nothing or an empty state, never a blank bordered box — and a
 * product tile with no product is exactly that box.
 */
export declare function ProductCardV4({ title, priceCents, currency, compareAtCents, imageUrl, imageAlt, slug, onPress, onAdd, addLabel, formatMoney, badge, aspect, raised, style, }: ProductCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ProductCardV4.d.ts.map