import * as React from 'react';
import type { NutritionBadgeProps } from './NutritionBadge';
export interface NutritionBadgeV4Props extends NutritionBadgeProps {
    /**
     * The figure a measured attribute carries — `'420'` for `calories`.
     *
     * The preset ships `calories` with the word "Calories" and nothing else, so
     * the number and its unit both had to be typed into `label` by hand and
     * nothing enforced that either arrived.
     */
    value?: string;
    /** The figure's unit. Defaults to `'cal'` for `calories`, otherwise none. */
    unit?: string;
}
/**
 * **V4 nutrition badge** — the web twin of the native `NutritionBadgeV4`, same
 * props as {@link NutritionBadge} plus `value` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A dietary marker is identity, not status.** The preset typed
 *    `vegetarian` and `vegan` as `success`, `spicy` as `danger` and `popular`
 *    as `warn` — so a menu row of dietary markers read as a row of alerts, and
 *    a genuine status badge standing beside them became indistinguishable from
 *    a lettuce leaf. `DIET_TONE` settles it: everything dietary is `neutral`,
 *    `spicy` keeps a warm tone as `accent` because heat is the one case where
 *    the colour conventionally carries meaning, and `popular`/`new` are
 *    `primary` because they are the menu's own emphasis.
 * 2. **`calories` can carry its figure.** `value` and `unit` render as
 *    `420 cal` — tabular, so a column of them lines up — instead of leaving
 *    the caller to hand-assemble the string into `label` and hoping.
 * 3. **It takes the module's one badge shape.** `BADGE_V4` — `soft`, `sm` —
 *    so a dietary marker, a delivery estimate pill and a reservation status
 *    are visibly one family, and `BadgeV4`'s soft tint is an opaque
 *    `color-mix` rather than the base's neutral ramp step.
 * 4. **The glyph is hidden from the reader.** It was an `Icon` beside the word
 *    it duplicates, which is a second stop announcing the same thing.
 */
export declare const NutritionBadgeV4: React.ForwardRefExoticComponent<NutritionBadgeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=NutritionBadgeV4.d.ts.map