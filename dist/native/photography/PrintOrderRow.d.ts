import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MoneyFormatter } from '../commerce/money';
/** Fulfilment state of a print order line. */
export type PrintOrderStatus = 'pending' | 'printing' | 'shipped' | 'delivered';
export interface PrintOrderRowProps {
    /** Product name (e.g. "Fine-art matte print"). */
    product: string;
    /** Print size label (e.g. "16 × 24 in"). */
    size?: string;
    /** Finish / paper (e.g. "Lustre"). */
    finish?: string;
    /** Quantity ordered (default 1, clamped to >= 1 in the display). */
    quantity?: number;
    /** Unit price in integer cents. */
    unitPriceCents: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Fulfilment status (default `pending`). */
    status?: PrintOrderStatus;
    /** Press handler for the row. */
    onPress?: () => void;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single print-order line — product, size/finish/quantity meta, a status
 * `Badge`, and a line total ({@link PriceTag} of `unitPriceCents × quantity`).
 * Quantity is clamped to at least 1 so the total is always guarded. Status is a
 * labelled badge (not color alone). Optional `onPress` exposes the row as a
 * `button`. Token-only colors.
 */
export declare function PrintOrderRow({ product, size, finish, quantity, unitPriceCents, currency, status, onPress, formatMoney, style, }: PrintOrderRowProps): React.ReactElement;
//# sourceMappingURL=PrintOrderRow.d.ts.map