import * as React from 'react';
import type { GasFeeRowProps, GasSpeed } from './GasFeeRow';
export interface GasFeeRowV4Props extends GasFeeRowProps {
    /** Wording for the three tiers. Defaults `Slow` / `Average` / `Fast`. */
    speedLabels?: Partial<Record<GasSpeed, string>>;
}
/**
 * **V4 gas-fee tier** — same props as {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **The radio announces whether it is chosen.** The base set
 *    `accessibilityState={{ selected }}`, and a radio's state key is
 *    `checked` — so all three tiers announced identically and a screen-reader
 *    user could not tell which fee they were about to pay.
 * 2. **The name carries the numbers.** `"Average gas"` was the whole
 *    announcement: the gwei price, the ETA and the fiat cost — the only things
 *    that distinguish one tier from another — were never spoken. The row is
 *    now one name built from all four.
 * 3. **A press is a state layer.** `opacity: pressed ? 0.8 : 1` faded the
 *    row's own content toward M3's disabled band; the layer tints the
 *    container and leaves the label at full strength.
 * 4. **The tier stops borrowing status colour**, the selected ground comes
 *    from `selected`/`onSelected` rather than a raw ramp step, and the row
 *    sits on the shared row metrics so a fee list and a settings list are one
 *    family.
 */
export declare function GasFeeRowV4({ speed, gwei, costCents, currency, eta, selected, speedLabels, onSelect, style, }: GasFeeRowV4Props): React.ReactElement;
//# sourceMappingURL=GasFeeRowV4.d.ts.map