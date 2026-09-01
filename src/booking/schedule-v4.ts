/**
 * Pure scheduling helpers for the **V4 booking line**, shared by both twins the
 * way `datetime.ts` already is. DOM-free and RN-free on purpose: a date rule
 * that differs between platforms is a bug waiting for a timezone to expose it.
 *
 * Nothing here is exported from the package.
 */

import { dayKeyInTz, toDayKey } from './datetime';
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
export const PERIOD_START: Record<SlotPeriod, number> = {
  morning: 0,
  afternoon: 12,
  evening: 17,
};

/** Default English labels. Every V4 that shows them takes an override prop. */
export const PERIOD_LABEL: Record<SlotPeriod, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
};

/** The order buckets are shown in. */
export const PERIOD_ORDER: readonly SlotPeriod[] = ['morning', 'afternoon', 'evening'];

/**
 * The hour of an ISO instant **in a given timezone**.
 *
 * `new Date(iso).getHours()` is the device's hour, not the booking's, so a
 * 9am appointment in Lisbon buckets as "evening" for a user in Tokyo. This
 * asks `Intl` for the hour in the timezone the slot is actually offered in,
 * which is the same thing `dayKeyInTz` does for the date.
 */
export function hourInTz(iso: string, timeZone?: string): number {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 0;
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    hour12: false,
  }).format(date);
  const parsed = Number.parseInt(hour, 10);
  // `hour12: false` yields "24" for midnight in some ICU versions.
  return Number.isFinite(parsed) ? parsed % 24 : 0;
}

/** Which bucket a slot falls in, in its own timezone. */
export function slotPeriod(iso: string, timeZone?: string): SlotPeriod {
  const hour = hourInTz(iso, timeZone);
  if (hour >= PERIOD_START.evening) return 'evening';
  if (hour >= PERIOD_START.afternoon) return 'afternoon';
  return 'morning';
}

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
export function groupSlotsByPeriod(
  slots: readonly BookingSlot[],
  timeZone?: string
): SlotGroup[] {
  const buckets = new Map<SlotPeriod, BookingSlot[]>();
  for (const slot of slots) {
    const period = slotPeriod(slot.startsAt, timeZone);
    const bucket = buckets.get(period);
    if (bucket) bucket.push(slot);
    else buckets.set(period, [slot]);
  }
  return PERIOD_ORDER.filter((p) => buckets.has(p)).map((period) => ({
    period,
    slots: buckets.get(period) as BookingSlot[],
  }));
}

/**
 * Is `date` today, in `timeZone`?
 *
 * A calendar that cannot mark today makes the user do the arithmetic, and the
 * comparison has to happen in the booking's timezone rather than the device's
 * for the same reason {@link hourInTz} does.
 */
export function isToday(date: Date, timeZone?: string): boolean {
  return toDayKey(date) === dayKeyInTz(new Date().toISOString(), timeZone);
}
