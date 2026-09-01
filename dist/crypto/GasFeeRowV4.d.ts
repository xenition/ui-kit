import * as React from 'react';
import type { GasFeeRowProps, GasSpeed } from './GasFeeRow';
export interface GasFeeRowV4Props extends GasFeeRowProps {
    /** Override the tier words. Defaults `'Slow'`, `'Average'`, `'Fast'`. */
    speedLabels?: Partial<Record<GasSpeed, string>>;
}
/**
 * **V4 gas-fee tier** — the web twin of the native `GasFeeRowV4`, same props as
 * {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **It is a real radio.** The base was a `div` carrying `role="radio"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler — three
 *    approximations of a control the platform already ships, and one that
 *    never joined a radio group. The input is a real `<input type="radio">`
 *    covering the row, so checked state, activation and focus come from the
 *    browser.
 * 2. **The tier announces its numbers.** `aria-label="Average gas"` replaced
 *    the subtree, so the gwei price, the ETA and the fiat cost — the only
 *    things that distinguish one tier from another — were never spoken. Beyond
 *    Slow / Average / Fast, every tier announced identically.
 * 3. **Selected is a token, not a ramp step.** `bg-primary-50` is a
 *    light-oriented step that paints a pale plate onto a dark page;
 *    `--xen-selected` is the compiler's slot for exactly this, and it ships
 *    with `--xen-on-selected` so the copy on it keeps a contrast pair.
 * 4. **The row clears 44, and hover and press are a state layer** rather than
 *    a `cursor-pointer` and nothing else.
 */
export declare const GasFeeRowV4: React.ForwardRefExoticComponent<GasFeeRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GasFeeRowV4.d.ts.map