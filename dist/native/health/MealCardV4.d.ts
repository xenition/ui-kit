import * as React from 'react';
import type { MealCardProps, MealMacros, MealVariant } from './MealCard';
export type { MealVariant, MealMacros };
/** One of the three macronutrients a meal is broken down into. */
export type Macro = keyof MealMacros;
export interface MealCardV4Props extends MealCardProps {
    /** Wording for each macro. Defaults to `Protein` / `Carbs` / `Fat`. */
    macroLabels?: Partial<Record<Macro, string>>;
    /** Format the calorie readout. Default `'420 kcal'`. */
    formatCalories?: (kcal: number) => string;
}
/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels` and
 * `formatCalories`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrate stops being a warning.** The base drew the macro key as
 *    `protein: primary`, `carbs: warn`, `fat: accent` — an amber dot beside
 *    the word "Carbs" on every meal anyone ever logged. A status colour has to
 *    mean status or it means nothing, so a macro is identified by its **shape**
 *    now — a disc, a square, a bar — in neutral ink.
 * 2. **The macro strip is a sibling of the card's activation.** A `Pressable`
 *    is `accessible` by default and flattens its subtree, so on iOS the whole
 *    breakdown was pruned and the card announced only its slot, name and
 *    calories.
 * 3. **The card announces its macros and its time**, which the base computed
 *    and drew but left out of the name that replaces them.
 * 4. **Press is a state layer**, not `opacity: pressed ? 0.85 : 1`, which sits
 *    inside M3's disabled band.
 * 5. **The non-pressable branch is `accessible`**, so its label is no longer
 *    dead on iOS.
 *
 * **Renders nothing without a `name`.**
 */
export declare function MealCardV4({ name, variant, calories, macros, time, macroLabels, formatCalories, onPress, appearance, style, }: MealCardV4Props): React.ReactElement | null;
//# sourceMappingURL=MealCardV4.d.ts.map