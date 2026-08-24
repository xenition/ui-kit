import * as React from 'react';
import type { MealCardProps } from './MealCard';
/** Drop-in for {@link MealCardProps} — same props, a different design. */
export type MealCardV2Props = MealCardProps;
/**
 * MealCard — **image-hero** design (v2). A tall tinted hero banner (standing in
 * for a dish photo) carries the meal glyph large and centered, with the meal tag
 * top-left and a calories chip top-right; macro chips (P/C/F) overlay the bottom
 * of the hero. The dish name sits below. Elevated surface that lifts on hover.
 * Same props as {@link MealCardProps}; token-only colors.
 */
export declare const MealCardV2: React.ForwardRefExoticComponent<MealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MealCardV2.d.ts.map