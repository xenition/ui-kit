import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BookingResource, BookingSlot } from '../../booking/types';
export interface BookingSummaryProps {
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
    /** Container style override. */
    style?: StyleProp<ViewStyle>;
}
/**
 * Read-only recap of a chosen resource + slot — the native mirror of the web
 * `BookingSummary`. Same `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/
 * `action`/`title` contract. A token-styled card listing who/what, the date,
 * the time range, the slot duration, and the timezone. Pairs with a
 * `BookingCalendar` + `SlotPicker` flow as the confirmation step. Token-only.
 */
export declare function BookingSummary({ resource, slot, timeZone, formatDate, formatTime, action, title, style, }: BookingSummaryProps): React.ReactElement;
//# sourceMappingURL=BookingSummary.d.ts.map