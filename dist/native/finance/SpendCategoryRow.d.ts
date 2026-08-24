import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
import { type Appearance } from '../primitives/internal/appearance';
export interface SpendCategoryRowProps {
    /** Category name (e.g. "Groceries"). */
    category: string;
    /** Amount spent in this category, in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Share of total spend, `0`–`1`; drives the inline bar width and the `%` chip. */
    share?: number;
    /** Leading glyph/emoji (e.g. `'🛒'`). */
    icon?: string;
    /** Theme color slot for the glyph + bar (default `primary`). */
    color?: keyof SemanticColors;
    /** Fires on row press. */
    onPress?: () => void;
    /**
     * Surface treatment (visual-diversity preset). Defaults to `classic` — the
     * historical borderless row, so this is opt-in only.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link MiniBar} and prints as a whole-percent chip;
 * the amount is neutral-toned integer cents. Fully token-bound.
 */
export declare function SpendCategoryRow({ category, amountCents, currency, share, icon, color, onPress, appearance, style, }: SpendCategoryRowProps): React.ReactElement;
//# sourceMappingURL=SpendCategoryRow.d.ts.map