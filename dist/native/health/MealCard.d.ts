import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export type MealVariant = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export interface MealMacros {
    /** Protein in grams. */
    protein?: number;
    /** Carbohydrates in grams. */
    carbs?: number;
    /** Fat in grams. */
    fat?: number;
}
export interface MealCardProps {
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
    /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A logged-meal card: meal-slot icon + tag, dish name, calories, and a
 * color-coded protein / carbs / fat macro strip. Macros with no value are
 * omitted. Pressable when `onPress` is set. `appearance` selects the surface
 * treatment (classic by default). Token-only colors.
 */
export declare function MealCard({ name, variant, calories, macros, time, onPress, appearance, style, }: MealCardProps): React.ReactElement;
//# sourceMappingURL=MealCard.d.ts.map