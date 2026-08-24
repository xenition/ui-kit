import * as React from 'react';
export type MealVariant = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export interface MealMacros {
    /** Protein in grams. */
    protein?: number;
    /** Carbohydrates in grams. */
    carbs?: number;
    /** Fat in grams. */
    fat?: number;
}
export interface MealCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Dish / entry name, e.g. "Greek yogurt bowl". */
    name: string;
    /** Which meal slot; drives the icon and tag label. */
    variant: MealVariant;
    /** Total calories. */
    calories?: number;
    /** Macro breakdown in grams. */
    macros?: MealMacros;
    /** Optional time label, e.g. "8:30 AM". */
    time?: string;
    onPress?: () => void;
}
/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Web parity of the native `MealCard`; clickable when `onPress` is set,
 * token-only colors.
 */
export declare const MealCard: React.ForwardRefExoticComponent<MealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MealCard.d.ts.map