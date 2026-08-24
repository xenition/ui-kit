"use strict";
/**
 * Tiny date/time formatting helpers shared across the events module. No
 * external deps and no locale libraries — just the fixed short labels the
 * event surfaces need (calendar strips, countdowns). Every array access is
 * guarded by the callers via `?? ''` so an out-of-range index never throws.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTHS_SHORT = exports.WEEKDAYS_SHORT = void 0;
exports.weekdayLabel = weekdayLabel;
exports.monthLabel = monthLabel;
exports.sameDay = sameDay;
exports.countdownParts = countdownParts;
exports.WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
exports.MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
function weekdayLabel(date) {
    return exports.WEEKDAYS_SHORT[date.getDay()] ?? '';
}
/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
function monthLabel(date) {
    return exports.MONTHS_SHORT[date.getMonth()] ?? '';
}
/** True when two dates fall on the same calendar day. */
function sameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
/** Break a millisecond delta into clamped day/hour/minute/second parts. */
function countdownParts(remainingMs) {
    const clamped = Math.max(0, Math.floor(remainingMs / 1000));
    return {
        days: Math.floor(clamped / 86400),
        hours: Math.floor((clamped % 86400) / 3600),
        minutes: Math.floor((clamped % 3600) / 60),
        seconds: clamped % 60,
        elapsed: remainingMs <= 0,
    };
}
//# sourceMappingURL=format.js.map