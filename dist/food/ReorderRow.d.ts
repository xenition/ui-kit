import * as React from 'react';
import type { MoneyFormatter } from '../commerce';
export interface ReorderRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Whole-row activation handler, e.g. open the past order (native `onPress`). */
    onClick?: () => void;
    /** Disable reordering (e.g. restaurant closed) and dim the row. */
    disabled?: boolean;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * activatable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Web parity of
 * the native `ReorderRow`; token-only. When `onClick` is set the root is a
 * keyboard-operable `role="button"` so the nested reorder button still works.
 */
export declare const ReorderRow: React.ForwardRefExoticComponent<ReorderRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReorderRow.d.ts.map