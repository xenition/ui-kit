import * as React from 'react';
import { BookingResource, BookingSlot } from './types';
export interface BookingSummaryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'title' | 'resource'> {
    /** The chosen resource (staff member, room, …). */
    resource?: BookingResource;
    /** The chosen time slot. */
    slot?: BookingSlot | null;
    /** IANA timezone for rendering (falls back to `resource.timezone`). */
    timeZone?: string;
    /** Render the date line. Defaults to a localized long date. */
    formatDate?: (iso: string) => string;
    /** Render a time. Defaults to timezone-aware `h:mm a`. */
    formatTime?: (iso: string) => string;
    /** Trailing action slot (e.g. a confirm button). */
    action?: React.ReactNode;
    /** Heading text (default `Your booking`). */
    title?: React.ReactNode;
}
/**
 * Read-only recap of a chosen resource + slot: who/what, the date, the time
 * range, and the timezone. Token-only. Pairs with a `BookingCalendar` +
 * `SlotPicker` flow as the confirmation step.
 */
export declare const BookingSummary: React.ForwardRefExoticComponent<BookingSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingSummary.d.ts.map