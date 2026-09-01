import * as React from 'react';
import type { SavingsGoalCardProps } from './SavingsGoalCard';
/**
 * The colour vocabulary both twins share for a meter.
 *
 * The native base took `keyof SemanticColors` — the whole palette, `border`
 * and `onPrimary` included — while the web base took a six-name union, so the
 * same prop meant two different things on the two platforms. V4 narrows native
 * to the web's union, which every existing caller already satisfies.
 */
type FinanceColorV4 = 'primary' | 'accent' | 'success' | 'warn' | 'danger' | 'muted';
export interface SavingsGoalCardV4Props extends SavingsGoalCardProps {
    /** Caption for the amount saved beyond the target. Default `'saved over goal'`. */
    overLabel?: string;
    /** Ring colour. Narrowed to the web twin's union. Default `'success'`. */
    color?: FinanceColorV4;
}
/**
 * **V4 savings goal card** — same props as {@link SavingsGoalCard} plus
 * `overLabel`, and with `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **Beating the goal is visible.** `Math.max(target - saved, 0)` floored
 *    the overshoot, so $12,000 against a $10,000 goal read *identically* to
 *    landing exactly on target — "$0.00 to go" in both cases. The surplus now
 *    prints as a signed amount with its own caption.
 * 2. **The ring is a `progressbar`.** It was an `image` on both twins, so the
 *    one number the card exists to show was drawn and never exposed. The
 *    clamped ratio is the value; the true percent is in the name.
 * 3. **The percentage and the breakdown go through `Intl`** and are tabular,
 *    so a column of goal cards lines up and a de-DE app does not show a
 *    localised amount beside a hard-coded decimal point.
 * 4. **The captions are `mutedText`**, and the card is one announced object
 *    rather than five loose text nodes a reader walks one at a time.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export declare function SavingsGoalCardV4({ title, savedCents, targetCents, currency, deadline, color, formatMoney: format, overLabel, appearance, style, }: SavingsGoalCardV4Props): React.ReactElement | null;
export {};
//# sourceMappingURL=SavingsGoalCardV4.d.ts.map