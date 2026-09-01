/**
 * Pure scheduling helpers for the **V4 booking line**, shared by both twins the
 * way `datetime.ts` already is. DOM-free and RN-free on purpose: a date rule
 * that differs between platforms is a bug waiting for a timezone to expose it.
 *
 * Nothing here is exported from the package.
 */
import type { BookingSlot } from './types';
/**
 * The part of the day a slot falls in.
 *
 * Why this exists: a busy day is thirty slot chips in one undifferentiated
 * wall, and a user looking for "something after work" has to read all thirty.
 * Three buckets is the split every booking product converges on, and it is the
 * smallest one that answers that question.
 */
export type SlotPeriod = 'morning' | 'afternoon' | 'evening';
/** Where each bucket starts, in local hours of the slot's own timezone. */
export declare const PERIOD_START: Record<SlotPeriod, number>;
/** Default English labels. Every V4 that shows them takes an override prop. */
export declare const PERIOD_LABEL: Record<SlotPeriod, string>;
/** The order buckets are shown in. */
export declare const PERIOD_ORDER: readonly SlotPeriod[];
/**
 * The hour of an ISO instant **in a given timezone**.
 *
 * `new Date(iso).getHours()` is the device's hour, not the booking's, so a
 * 9am appointment in Lisbon buckets as "evening" for a user in Tokyo. This
 * asks `Intl` for the hour in the timezone the slot is actually offered in,
 * which is the same thing `dayKeyInTz` does for the date.
 */
export declare function hourInTz(iso: string, timeZone?: string): number;
/** Which bucket a slot falls in, in its own timezone. */
export declare function slotPeriod(iso: string, timeZone?: string): SlotPeriod;
/** One bucket of slots, in the order they occur. */
export interface SlotGroup {
    period: SlotPeriod;
    slots: BookingSlot[];
}
/**
 * Bucket slots into morning / afternoon / evening, dropping empty buckets.
 *
 * Order is preserved within a bucket — the caller's order is the schedule's
 * order, and re-sorting it here would silently disagree with a host that had
 * already sorted by something else (price, resource, preference).
 */
export declare function groupSlotsByPeriod(slots: readonly BookingSlot[], timeZone?: string): SlotGroup[];
/**
 * Is `date` today, in `timeZone`?
 *
 * A calendar that cannot mark today makes the user do the arithmetic, and the
 * comparison has to happen in the booking's timezone rather than the device's
 * for the same reason {@link hourInTz} does.
 */
export declare function isToday(date: Date, timeZone?: string): boolean;
//# sourceMappingURL=schedule-v4.d.ts.map