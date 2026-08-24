import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Fires on row press (e.g. edit the line item). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a `SemanticColors` slot — never color alone),
 * and a right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a button only when
 * `onPress` is supplied. No literals.
 */
export declare function MaterialsRow({ name, sku, quantity, unit, unitCents, stock, currency, formatMoney: format, onPress, style, }: MaterialsRowProps): React.ReactElement;
//# sourceMappingURL=MaterialsRow.d.ts.map