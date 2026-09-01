import * as React from 'react';
import type { SpendCategoryRowProps } from './SpendCategoryRow';
/** The colour vocabulary both twins share — see `SavingsGoalCardV4`. */
type FinanceColorV4 = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
export interface SpendCategoryRowV4Props extends SpendCategoryRowProps {
    /** Bar and glyph colour. Narrowed to the web twin's union. Default `'primary'`. */
    color?: FinanceColorV4;
}
/**
 * **V4 spend category row** — same props as {@link SpendCategoryRow}, with
 * `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **The row says the amount.** `accessibilityLabel={category}` on an
 *    `accessible` `Pressable` pruned the share and the figure, so "Groceries,
 *    button" was the whole of it.
 * 2. **The share bar is a `progressbar` with a value**, and a sibling of the
 *    row's activation rather than a child — inside a `button` its value is
 *    presentational and is dropped, which is how a drawn proportion ends up
 *    exposed as nothing at all.
 * 3. **Press is a state layer**, not `opacity: 0.7`, which is the band M3
 *    spends on *disabled*.
 * 4. **The row joins the shared row family** — one height, one 44 leading
 *    slot, a caption in `mutedText` — so it clears 44 with or without its
 *    optional glyph, and the percentage goes through `Intl`.
 */
export declare function SpendCategoryRowV4({ category, amountCents, currency, share, icon, color, onPress, appearance, style, }: SpendCategoryRowV4Props): React.ReactElement;
export {};
//# sourceMappingURL=SpendCategoryRowV4.d.ts.map