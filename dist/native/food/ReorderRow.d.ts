import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type MoneyFormatter } from '../commerce';
export interface ReorderRowProps {
    /** Restaurant or order title. */
    title: string;
    /** One-line items summary (e.g. "2× Pad Thai, 1× Spring rolls"). */
    itemsSummary?: string;
    /** When the order was placed (e.g. "Aug 12"). */
    dateText?: string;
    /** Order total in integer cents. */
    totalCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Thumbnail image URL. */
    imageUrl?: string;
    /** Reorder handler; renders the reorder button when provided. */
    onReorder?: () => void;
    /** Reorder button label (default `Reorder`). */
    reorderLabel?: string;
    /** Press handler for the whole row (e.g. open the past order). */
    onPress?: () => void;
    /** Disable reordering (e.g. restaurant closed) and dim the row. */
    disabled?: boolean;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    style?: StyleProp<ViewStyle>;
}
/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * pressable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Token-only.
 */
export declare function ReorderRow({ title, itemsSummary, dateText, totalCents, currency, imageUrl, onReorder, reorderLabel, onPress, disabled, formatMoney, style, }: ReorderRowProps): React.ReactElement;
//# sourceMappingURL=ReorderRow.d.ts.map