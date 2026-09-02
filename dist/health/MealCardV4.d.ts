import * as React from 'react';
import type { MealCardProps, MealMacros } from './MealCard';
import { type Appearance } from './internal/tone-v4';
/** The three macronutrients a logged meal breaks down into. */
export type Macro = keyof MealMacros;
export interface MealCardV4Props extends MealCardProps {
    /** Override the three macro words. */
    macroLabels?: Partial<Record<Macro, string>>;
    /** Render the calorie figure. Default `'420 kcal'`. */
    formatCalories?: (kcal: number) => string;
    /** Surface preset, matching the native twin. Default `'classic'`. */
    appearance?: Appearance;
}
/**
 * **V4 meal card** — same props as {@link MealCard} plus `macroLabels`,
 * `formatCalories` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **Carbohydrates stopped being a warning.** The macro strip painted carbs
 *    `warn` and `MealCardV2` painted breakfast `warn` — a status colour spent
 *    on *identity*, so a perfectly ordinary bowl of oats drew in the same hue
 *    the kit uses to say something is wrong. The three macros are told apart by
 *    shape and by their own word instead, and the status vocabulary is left
 *    free to mean status.
 * 2. **The calories and the macros were pruned from the reader.** The whole
 *    card was one `role="button"` whose `aria-label` named the meal and the
 *    dish and nothing else — and a button's name *replaces* its contents, so
 *    "420 kcal, Protein 30g, Carbs 45g, Fat 12g" reached nobody. The card is a
 *    plain container now, the activation wraps the dish, and the breakdown sits
 *    beside it where it can still be read.
 * 3. **The activation is a real `<button>` that clears 44.** `div` +
 *    `role="button"` + `tabIndex` + a hand-written Enter/Space handler is three
 *    approximations of a button.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is M3's *disabled* signal at close to the same strength.
 * 5. **"kcal" and the three macro words are props**, where a localised app
 *    previously had to fork the component to translate them.
 */
export declare const MealCardV4: React.ForwardRefExoticComponent<MealCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MealCardV4.d.ts.map