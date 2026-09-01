import * as React from 'react';
import type { TipSelectorProps } from './TipSelector';
export interface TipSelectorV4Props extends TipSelectorProps {
    /** The "no tip" option's label. Default `'No tip'`. */
    noTipLabel?: string;
    /**
     * The option selected on first render when `selectedPercent` is not given.
     * Default `null` — "no tip", which is where the base always sat.
     *
     * This is what makes the control usable uncontrolled: pass
     * `selectedPercent` to drive it from outside, or leave it off and let the
     * component hold the choice.
     */
    defaultSelectedPercent?: number | null;
}
/**
 * **V4 tip selector** — same props as {@link TipSelector} plus `noTipLabel`
 * and `defaultSelectedPercent`.
 *
 * ## Four changes
 *
 * 1. **It works uncontrolled.** `selectedPercent` was optional, the component
 *    held no state, and `selected` was recomputed from props on every render —
 *    so dropped in the way its own barrel documents it rendered "No tip"
 *    filled and `checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. `defaultSelectedPercent` gives the choice
 *    somewhere to live; passing `selectedPercent` still drives it from outside.
 * 2. **An option clears 44.** They were about 34 tall.
 * 3. **The computed amount is tabular**, so four options in a row have their
 *    figures on one grid instead of four.
 * 4. **Press is a state layer.** `opacity: 0.85` on press put a live control
 *    inside the band M3 spends on *disabled*, so tapping a tip option made it
 *    look unavailable for as long as the finger was down.
 */
export declare function TipSelectorV4({ percents, selectedPercent, defaultSelectedPercent, onSelect, subtotalCents, currency, title, allowNone, noTipLabel, formatMoney, style, }: TipSelectorV4Props): React.ReactElement;
//# sourceMappingURL=TipSelectorV4.d.ts.map