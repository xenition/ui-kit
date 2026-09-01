import * as React from 'react';
import type { DishCardProps } from './DishCard';
export interface DishCardV4Props extends DishCardProps {
    /** Announced while the skeleton is up. Default `'Loading dish'`. */
    loadingLabel?: string;
}
/**
 * **V4 dish card** — same props as {@link DishCard} plus `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The card says what is in the food.** The base put
 *    `accessibilityLabel={name}` on a `Pressable`, which is `accessible` by
 *    default and therefore a leaf on iOS — so a screen-reader user browsing a
 *    menu heard exactly one thing per dish: its name. Not the price, not the
 *    rating, and **not the allergen and dietary badges** the component's own
 *    prop doc exists to carry. Someone with a coeliac or a nut allergy got a
 *    bare list of dish names beside a sighted view showing every marker. The
 *    name now carries the price, the rating and the sold-out state through
 *    `spokenLine`, and the **badges are lifted out of the activation** so each
 *    one's own text is read. `badges` is an opaque `ReactNode` — there is no
 *    honest way to turn an arbitrary element into a string, and a consumer's
 *    own halal chip must not be the one marker that goes missing.
 * 2. **The Add button and the badges are siblings of the card's activation**,
 *    not descendants of it. Nested inside the `accessible` `Pressable` they
 *    did not exist for VoiceOver at all: the dish could be opened and never
 *    added, and the markers were suppressed wholesale.
 * 3. **`soldOut` actually blocks the card.** The base set
 *    `accessibilityState={{ disabled: true }}` and passed `onPress` through
 *    unguarded, so the same user who could not hear that a dish contains
 *    gluten could also add a sold-out one to their cart.
 * 4. **The sold-out dimming and the press treatment stop fighting.** Both were
 *    `opacity` on the same node, so a pressed sold-out card got *brighter*.
 *    Press is a state layer now; the dim is M3's disabled band and it is spent
 *    on the photo, leaving the "Sold out" word at full strength — dimming the
 *    explanation of why a dish is unavailable is the one thing it must not do.
 * 5. **The skeleton survives dark mode.** It was `tokens.ramps.neutral[200]`,
 *    and the native ramps keep their light orientation in both schemes, so a
 *    loading dish was two near-white slabs on a dark page.
 * 6. **Badges are identity, not status** — see `NutritionBadgeV4`.
 *
 * **Renders nothing without a `name`.**
 */
export declare function DishCardV4({ name, description, priceCents, currency, imageUrl, rating, badges, variant, soldOut, loading, onPress, onAdd, addLabel, soldOutLabel, loadingLabel, formatMoney, style, }: DishCardV4Props): React.ReactElement | null;
//# sourceMappingURL=DishCardV4.d.ts.map