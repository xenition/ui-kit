"use strict";
/**
 * Pure scheduling helpers for the **V4 booking line**, shared by both twins the
 * way `datetime.ts` already is. DOM-free and RN-free on purpose: a date rule
 * that differs between platforms is a bug waiting for a timezone to expose it.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERIOD_ORDER = exports.PERIOD_LABEL = exports.PERIOD_START = void 0;
exports.hourInTz = hourInTz;
exports.slotPeriod = slotPeriod;
exports.groupSlotsByPeriod = groupSlotsByPeriod;
exports.isToday = isToday;
const datetime_1 = require("./datetime");
/** Where each bucket starts, in local hours of the slot's own timezone. */
exports.PERIOD_START = {
    morning: 0,
    afternoon: 12,
    evening: 17,
};
/** Default English labels. Every V4 that shows them takes an override prop. */
exports.PERIOD_LABEL = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
};
/** The order buckets are shown in. */
exports.PERIOD_ORDER = ['morning', 'afternoon', 'evening'];
/**
 * The hour of an ISO instant **in a given timezone**.
 *
 * `new Date(iso).getHours()` is the device's hour, not the booking's, so a
 * 9am appointment in Lisbon buckets as "evening" for a user in Tokyo. This
 * asks `Intl` for the hour in the timezone the slot is actually offered in,
 * which is the same thing `dayKeyInTz` does for the date.
 */
function hourInTz(iso, timeZone) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime()))
        return 0;
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
function slotPeriod(iso, timeZone) {
    const hour = hourInTz(iso, timeZone);
    if (hour >= exports.PERIOD_START.evening)
        return 'evening';
    if (hour >= exports.PERIOD_START.afternoon)
        return 'afternoon';
    return 'morning';
}
/**
 * Bucket slots into morning / afternoon / evening, dropping empty buckets.
 *
 * Order is preserved within a bucket — the caller's order is the schedule's
 * order, and re-sorting it here would silently disagree with a host that had
 * already sorted by something else (price, resource, preference).
 */
function groupSlotsByPeriod(slots, timeZone) {
    const buckets = new Map();
    for (const slot of slots) {
        const period = slotPeriod(slot.startsAt, timeZone);
        const bucket = buckets.get(period);
        if (bucket)
            bucket.push(slot);
        else
            buckets.set(period, [slot]);
    }
    return exports.PERIOD_ORDER.filter((p) => buckets.has(p)).map((period) => ({
        period,
        slots: buckets.get(period),
    }));
}
/**
 * Is `date` today, in `timeZone`?
 *
 * A calendar that cannot mark today makes the user do the arithmetic, and the
 * comparison has to happen in the booking's timezone rather than the device's
 * for the same reason {@link hourInTz} does.
 */
function isToday(date, timeZone) {
    return (0, datetime_1.toDayKey)(date) === (0, datetime_1.dayKeyInTz)(new Date().toISOString(), timeZone);
}
//# sourceMappingURL=schedule-v4.js.map