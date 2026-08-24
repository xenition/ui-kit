import * as React from 'react';
/** The kind of itinerary event — drives the leading glyph. */
export type ItineraryKind = 'flight' | 'hotel' | 'activity' | 'transfer' | 'meal';
/** Progress state of the event, announced and tinted from a token slot. */
export type ItineraryStatus = 'upcoming' | 'active' | 'done';
export interface ItineraryItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Event kind (selects a default glyph). */
    kind?: ItineraryKind;
    /** Override the leading glyph/emoji. */
    glyph?: string;
    /** Pre-formatted time or time range (e.g. `'09:30'` or `'09:30 – 11:00'`). */
    time?: string;
    /** Primary label. */
    title: string;
    /** Secondary detail line. */
    subtitle?: string;
    /** Progress state. */
    status?: ItineraryStatus;
    /** Draw the connecting timeline rail below the node (false on the last row). */
    showConnector?: boolean;
    /** Fires when the row is activated. */
    onClick?: () => void;
}
/**
 * Web parity of the native `ItineraryItem`: one entry in a day-by-day trip
 * timeline — a leading kind glyph on a token rail, a time, a title, and an
 * optional detail line. `status` tints the node and is also announced (never
 * color-alone). Set `showConnector={false}` on the final row. Token-only colors.
 */
export declare const ItineraryItem: React.ForwardRefExoticComponent<ItineraryItemProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ItineraryItem.d.ts.map