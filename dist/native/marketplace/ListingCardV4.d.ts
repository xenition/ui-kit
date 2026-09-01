import * as React from 'react';
import type { MoneyFormatter } from '../commerce/money';
import type { ListingCardProps, ListingCardVariant } from './ListingCard';
export type { ListingCardVariant };
/**
 * The media box's proportion — **the same four names `ProductCardV4` uses.**
 *
 * That card's own doc comment asks for this by name: "four ratios, no
 * free-form number, because `ListingCardV4` in `marketplace` mirrors this card
 * and the two must be able to agree by name — a storefront and a marketplace
 * have to read as one product."
 *
 * The union is restated here rather than imported so that neither module
 * depends on the other's build order; the values are identical and a shared
 * type is a reasonable thing for the barrel pass to hoist later.
 */
export type ListingCardV4Aspect = '1:1' | '4:5' | '3:4' | '16:9';
export interface ListingCardV4Props extends ListingCardProps {
    /**
     * The media box's proportion. Defaults per {@link ListingCardProps.variant} —
     * `4:5` for `grid` (the storefront tile's shape), `16:9` for `featured`,
     * `1:1` for the `list` thumbnail.
     *
     * A **fixed** ratio is the point, and it is the fix for a real twin
     * divergence: this twin gave the grid a fixed height of `160` while the web
     * twin gave the same variant `aspect-[4/3]`, so one prop produced two
     * shapes.
     */
    aspect?: ListingCardV4Aspect;
    /**
     * Carry `elevation.card`. Default `true` — §4.6 gives a shadow to "a card
     * sitting on the page", and a listing in a browse grid is exactly that.
     * Pass `false` for a listing card nested inside another card; §4.6 forbids
     * nesting a shadow in a shadow.
     */
    raised?: boolean;
    /**
     * Locale override for the price, handed straight to `PriceTagV4`.
     *
     * Rule 1 asks that every amount go through `formatMoney` **and** stay
     * overridable per call; the base card composed `PriceTag` without exposing
     * the override, so a card inside a locale-aware page could not be told about
     * it while the tag it contained could.
     */
    formatMoney?: MoneyFormatter;
    /**
     * The card's **one** badge slot, drawn over the top-left of the media —
     * the same slot, in the same corner, as `ProductCardV4`'s. Defaults to a
     * `ConditionBadgeV4` built from {@link ListingCardProps.condition}.
     *
     * One slot, deliberately: a tile that can carry three badges gets three
     * badges, and a page of tiles each shouting two things has no hierarchy left
     * for the thing it is selling (§7). Passing this **replaces** the condition
     * chip rather than adding to it.
     */
    badge?: React.ReactNode;
}
/**
 * **V4 listing card** — the marketplace's product card, and deliberately
 * indistinguishable from the storefront's.
 *
 * Brief §3 Group C: "`ListingCardV4` mirrors `ProductCardV4` — same ground,
 * same image ratio — so a storefront and a marketplace read as one product."
 * The anatomy below is that card's, slot for slot, read off
 * `commerce/ProductCardV4` rather than guessed:
 *
 * ```
 * [ media at a FIXED ratio, one badge over its top-left ]   ← edge to edge
 * [ title, at most two lines                            ]   ┐
 * [ PriceTagV4                                          ]   │ padding md
 * [ location line                                       ]   ┘
 * ```
 *
 * The card is `padding="none"` and the body carries the inset, so the photo
 * runs to the card's corners exactly as the storefront tile's does. The one
 * slot the storefront card does not have is the **watch toggle**, top-right,
 * opposite the badge — a marketplace affordance with no catalogue equivalent.
 *
 * That anatomy settles the one thing the base got backwards. **The price moved
 * below the title.** The base led with the price and put the title under it,
 * which reads as a price list rather than a catalogue: a shopper scanning a
 * grid is looking for *what a thing is*, then what it costs. It is also the
 * order `ProductCardV4` is built in, and the whole point of this component is
 * that the two are one card.
 *
 * The rest:
 *
 * 1. **The ground is `card`** (§4.2). The base painted `surface` — the colour
 *    of the page — so a grid on a dark page was a flat sheet of same-coloured
 *    rectangles held apart by hairlines.
 * 2. **The price is `PriceTagV4`** (rule 7), which carries the tabular figures
 *    (rule 2), the display face, the step up the type scale, and the announced
 *    `Was …` on a compare-at. Nothing here draws a number.
 * 3. **The watch chip clears the tap floor.** It was a 32 square — a control a
 *    shopper taps repeatedly, drawn below the 44 HIG floor, which is the same
 *    defect §2 records against `QuantityStepper`.
 * 4. **A watched listing is not in danger.** The base painted the filled heart
 *    `danger`; rule 3 reserves that tone for *bad*, and saving something you
 *    like is the opposite. It takes the brand.
 * 5. **The accessible name says the grade in words.** The base announced the
 *    raw slug — "Vintage camera, $125.00, like-new". See
 *    {@link CONDITION_V4_LABEL}.
 * 6. **Loading is a skeleton at the card's own footprint**, not the string
 *    "Loading listing…", which is a sentence where a card should be.
 * 7. **Press feedback is the state layer** (§4.3). `opacity: pressed ? 0.9`
 *    is deleted rather than translated: dimming fades the card's own content,
 *    which is the signal M3 spends `0.38` on to mean *disabled*.
 *
 * Composes `CardV4`, `PriceTagV4`, `ConditionBadgeV4`, `IconV4`, `TextV4` and
 * `SkeletonV4` (rule 7). Renders **nothing** without a title (§4.5).
 */
export declare function ListingCardV4({ title, priceCents, currency, compareAtCents, imageUrl, condition, subtitle, watched, onToggleWatch, onPress, variant, loading, aspect, raised, formatMoney, badge, style, }: ListingCardV4Props): React.ReactElement | null;
//# sourceMappingURL=ListingCardV4.d.ts.map