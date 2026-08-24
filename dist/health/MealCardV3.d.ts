import * as React from 'react';
import type { MealCardProps } from './MealCard';
/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV3Props = MealCardProps;
/**
 * MealCard — **dense macro-bar line** design (v3). A tight two-row entry: glyph,
 * dish name, and calories value-first on the top line; a single stacked
 * proportional macro bar (protein / carbs / fat, by grams) with `Ng` counts
 * beneath. Borderless and compact — ideal for long food logs. Same props as
 * {@link MealCardProps}; token-only colors.
 */
export declare const MealCardV3: React.ForwardRefExoticComponent<MealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MealCardV3.d.ts.map