import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** Stock state — text + glyph + color (never color-alone). */
export type MaterialStock = 'in-stock' | 'low' | 'back-ordered';
export interface MaterialsRowProps {
    /** Part / material name (e.g. "3/4in copper elbow"). */
    name: string;
    /** SKU / part number shown as a meta line. */
    sku?: string;
    /** Quantity used / requested. */
    quantity: number;
    /** Unit of measure (e.g. "ea", "ft", "box"). Default `ea`. */
    unit?: string;
    /** Unit price in integer **cents**. */
    unitCents: number;
    /** Stock availability — text + glyph + color. */
    stock?: MaterialStock;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Fires on row click (e.g. edit the line item). */
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a semantic token — never color alone), and a
 * right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a `role="button"` surface
 * only when `onClick` is supplied. No literals.
 */
export declare const MaterialsRow: React.ForwardRefExoticComponent<MaterialsRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MaterialsRow.d.ts.map