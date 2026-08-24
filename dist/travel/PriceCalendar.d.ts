import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
/** A single day's fare in the price grid. */
export interface PriceDay {
    /** ISO date `YYYY-MM-DD` (used as the key and in the announcement). */
    date: string;
    /** Short day label shown in the cell, e.g. `'Mon 3'`. */
    label: string;
    /** Fare in integer minor units (cents); omit for an unavailable day. */
    cents?: number;
}
export interface PriceCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Days to display, in order. Laid out `columns` per row. */
    days: readonly PriceDay[];
    /** Cells per row (default 7 — a week). */
    columns?: number;
    /** ISO date of the currently selected day. */
    selectedDate?: string;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Fires with the day when an available cell is pressed. */
    onSelectDay?: (day: PriceDay) => void;
}
/**
 * Web parity of the native `PriceCalendar`: a cheapest-day fare grid — each cell
 * shows a day label and its price, and the lowest-priced available day is
 * flagged (★ glyph + announcement, never color-alone). Unavailable days (no
 * `cents`) are disabled. Selection is controlled via `selectedDate`. Token-only
 * colors.
 */
export declare const PriceCalendar: React.ForwardRefExoticComponent<PriceCalendarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceCalendar.d.ts.map