import * as React from 'react';
import { type MoneyFormatter } from '../commerce/money';
/** A priced line in the trip cost breakdown. */
export interface TripLineItem {
    /** Label, e.g. `'Flights'`. */
    label: string;
    /** Amount in integer minor units (cents). Negative renders as a discount. */
    cents: number;
}
export interface TripSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Trip/destination headline. */
    destination: string;
    /** Pre-formatted date range, e.g. `'Sep 3 – Sep 10'`. */
    dates?: string;
    /** Number of travelers. */
    travelers?: number;
    /** Itemized costs; summed into the total when `totalCents` is omitted. */
    items?: readonly TripLineItem[];
    /** Explicit grand total in cents (overrides the derived sum). */
    totalCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
    /** Heading text (default `Trip summary`). */
    title?: React.ReactNode;
    /** Trailing action slot (e.g. a checkout button). */
    action?: React.ReactNode;
}
/**
 * Web parity of the native `TripSummary`: a read-only recap of a trip —
 * destination, dates, traveler count, an itemized cost breakdown, and a grand
 * total. When `totalCents` is omitted the total is summed from `items` (guarded
 * against an empty list). Money is integer cents formatted through
 * {@link formatMoney}. Token-only colors.
 */
export declare const TripSummary: React.ForwardRefExoticComponent<TripSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripSummary.d.ts.map