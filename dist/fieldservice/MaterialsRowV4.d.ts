import * as React from 'react';
import type { MaterialsRowProps, MaterialStock } from './MaterialsRow';
export interface MaterialsRowV4Props extends MaterialsRowProps {
    /** Leading glyph for the material disc. Default `'📦'`. */
    glyph?: string;
    /** Override the stock words — three English phrases lived inside. */
    stockLabels?: Partial<Record<MaterialStock, string>>;
}
/**
 * **V4 materials row** — the web twin of the native `MaterialsRowV4`, same
 * props as {@link MaterialsRow} plus `glyph` and `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** On a parts list "back-ordered" is the
 *    single field that changes what the technician does next — and it was the
 *    single field the row's `` `${name}, ${qty} ${unit}, ${total}` `` name
 *    omitted. The SKU joins the name too.
 * 2. **It takes the `glyph` every sibling row has.** The box emoji was
 *    hard-coded, so a materials list could not distinguish a fitting from a
 *    length of pipe the way the equipment register distinguishes its assets.
 * 3. **Money is tabular**, so a column of extended totals lines up on the
 *    decimal instead of drifting with the digits.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the disc no longer announces "Material" ahead of
 *    the part's own name.
 */
export declare const MaterialsRowV4: React.ForwardRefExoticComponent<MaterialsRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MaterialsRowV4.d.ts.map