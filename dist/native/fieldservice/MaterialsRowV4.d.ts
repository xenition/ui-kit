import * as React from 'react';
import type { MaterialStock, MaterialsRowProps } from './MaterialsRow';
export interface MaterialsRowV4Props extends MaterialsRowProps {
    /** Leading glyph for the material disc, as every sibling row already has. Default `'📦'`. */
    glyph?: string;
    /** Override the three stock names — they lived inside the component. */
    stockLabels?: Partial<Record<MaterialStock, string>>;
}
/**
 * **V4 materials row** — same props as {@link MaterialsRow} plus `glyph` and
 * `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** The row's name was
 *    `"${name}, ${qty} ${unit}, ${total}"`, which replaces the subtree — and
 *    on a parts list "back-ordered" is the single field that changes what the
 *    technician does next. It was the one field the label left out.
 * 2. **It takes a `glyph`**, like every sibling row in the module; the box
 *    emoji was hard-coded, and its disc was labelled "Material", which made a
 *    decorative mark a reader stop.
 * 3. **The row is a row from the shared row line**, clearing 44, with a press
 *    that is a state layer instead of `opacity: 0.7`.
 * 4. **The money column is tabular**, so a parts list's totals line up
 *    digit-for-digit down the page instead of drifting.
 *
 * **Renders nothing without a `name`.**
 */
export declare function MaterialsRowV4({ name, sku, quantity, unit, unitCents, stock, currency, formatMoney, glyph, stockLabels, onPress, style, }: MaterialsRowV4Props): React.ReactElement | null;
//# sourceMappingURL=MaterialsRowV4.d.ts.map