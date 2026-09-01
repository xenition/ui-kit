/**
 * Pure layout helpers for the **V4 calendar line**, shared by both twins the
 * way `booking/schedule-v4.ts` is. DOM-free and RN-free: a layout rule that
 * differs between platforms is a bug waiting for a screen size to expose it.
 *
 * Nothing here is exported from the package.
 */
import type { CalendarEvent } from './types';
/** Minutes from midnight, for an instant. */
export declare function minutesOf(date: Date): number;
/** One event's resolved place in the grid, as fractions of the column width. */
export interface PositionedEvent {
    event: CalendarEvent;
    key: string;
    /** Minutes from midnight. */
    startMin: number;
    endMin: number;
    /** 0-based column within its cluster. */
    column: number;
    /** How many columns that cluster was split into. */
    columns: number;
}
/**
 * How long an event with no `end` is assumed to run, in minutes. A calendar
 * has to give a zero-length event *some* height or it is invisible; 30 is the
 * default slot length every scheduling product converges on.
 */
export declare const DEFAULT_EVENT_MINUTES = 30;
/**
 * Lay timed events out in columns, correctly.
 *
 * ## The bug this replaces
 *
 * `TimeGrid` computed, **per event**, the set of events overlapping *that*
 * event, and used its size as the column count:
 *
 * ```ts
 * const overlaps = timed.filter((o) => oStart < endMin && startMin < oEnd);
 * widthPct: 100 / overlaps.length
 * ```
 *
 * That is not merely approximate, it is **inconsistent between events in the
 * same view**. Take A 9:00–10:00, B 9:30–10:30, C 10:00–11:00:
 *
 * - A overlaps {A, B} → 2 columns, width 50%
 * - B overlaps {A, B, C} → 3 columns, width 33%
 * - C overlaps {B, C} → 2 columns, width 50%
 *
 * Three events, three different column grids, in one day. They collide and
 * leave gaps at the same time.
 *
 * ## What this does instead
 *
 * The standard two-pass algorithm every calendar uses:
 *
 * 1. **Cluster.** Walk the events in start order and cut a new cluster
 *    whenever an event starts at or after the furthest end seen so far. Events
 *    in one cluster are transitively connected; events in different clusters
 *    cannot overlap, so each cluster is laid out independently and a busy
 *    morning never narrows a free afternoon.
 * 2. **Pack.** Within a cluster, place each event in the first column whose
 *    last occupant has already ended. The cluster's column count is the number
 *    of columns it needed, and **every member shares it** — which is the part
 *    the base got wrong.
 *
 * Ties are broken by start time then by end time, so the order is stable
 * across renders and two events that start together do not swap columns.
 */
export declare function layoutEvents(events: readonly CalendarEvent[], options?: {
    defaultMinutes?: number;
}): PositionedEvent[];
/**
 * Localized weekday names, narrow or short, rotated to the caller's week
 * start.
 *
 * The module's `WEEKDAYS_SHORT` / `WEEKDAYS_NARROW` are frozen **English**
 * arrays used by four components. A calendar is the first thing a
 * non-English product notices, and `Intl` already knows every locale's
 * answer — `BookingCalendarV4` derives its headers the same way.
 */
export declare function weekdayNames(weekStartsOn: number, options?: {
    locale?: string;
    width?: 'narrow' | 'short' | 'long';
}): string[];
/** A localized month + year title, for a navigator or a grid header. */
export declare function monthTitle(month: Date, options?: {
    locale?: string;
    month?: 'long' | 'short';
    year?: boolean;
}): string;
/** A localized clock label for an hour of the day (0–23). */
export declare function hourTitle(hour: number, locale?: string): string;
//# sourceMappingURL=layout-v4.d.ts.map