import * as React from 'react';
import { type FinanceColor } from './internal/Meter';
export interface SpendCategoryRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Token color slot for the glyph + bar (default `primary`). */
    color?: FinanceColor;
    /** Fires on row click — makes the row a keyboard-operable button. */
    onClick?: () => void;
}
/**
 * A spend-by-category row: tinted glyph, category name over a share bar, and a
 * right-aligned amount + percentage. `share` is a `0–1` fraction (guarded and
 * clamped) that sizes the {@link Meter} and prints as a whole-percent chip; the
 * amount is neutral-toned integer cents. Fully token-bound. Web parity of the
 * native `SpendCategoryRow`.
 */
export declare const SpendCategoryRow: React.ForwardRefExoticComponent<SpendCategoryRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpendCategoryRow.d.ts.map