"use strict";
/**
 * Tiny date/time helpers shared across the web calendar module — a dep-free
 * port of `native/calendar/format.ts`. No external deps and no locale libraries:
 * plain JS `Date` math only. All array access is guarded (`?? ''`) so an
 * out-of-range index never throws, and callers pass every `Date` in via props
 * (the module never reads `Date.now()` at import time).
 *
 * The native `withAlpha`/`resolveTone` helpers (which produced runtime hex from
 * the compiled theme) are replaced on web by {@link toneClasses}, which maps a
 * semantic {@link EventTone} to `--xen-*`-bound Tailwind utility classes — so
 * every rendered color still traces to a token, never a literal.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTHS_LONG = exports.MONTHS_SHORT = exports.WEEKDAYS_NARROW = exports.WEEKDAYS_SHORT = void 0;
exports.weekdayLabel = weekdayLabel;
exports.monthLabel = monthLabel;
exports.monthLongLabel = monthLongLabel;
exports.sameDay = sameDay;
exports.sameMonth = sameMonth;
exports.addDays = addDays;
exports.addMonths = addMonths;
exports.startOfWeek = startOfWeek;
exports.weekDates = weekDates;
exports.minutesSinceMidnight = minutesSinceMidnight;
exports.clockLabel = clockLabel;
exports.hourLabel = hourLabel;
exports.timeRangeLabel = timeRangeLabel;
exports.monthGrid = monthGrid;
exports.weekdayHeader = weekdayHeader;
exports.toneClasses = toneClasses;
exports.WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
exports.WEEKDAYS_NARROW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
exports.MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
exports.MONTHS_LONG = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
function weekdayLabel(date) {
    return exports.WEEKDAYS_SHORT[date.getDay()] ?? '';
}
/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
function monthLabel(date) {
    return exports.MONTHS_SHORT[date.getMonth()] ?? '';
}
/** Full month label, e.g. `August`. Empty string if unresolved. */
function monthLongLabel(date) {
    return exports.MONTHS_LONG[date.getMonth()] ?? '';
}
/** True when two dates fall on the same calendar day. */
function sameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
/** True when two dates fall in the same calendar month. */
function sameMonth(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
/** A new date `n` days after `date` (n may be negative). */
function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}
/** A new date `n` months after `date`, pinned to the 1st. */
function addMonths(date, n) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
/**
 * The Sunday that starts the week containing `date` (or a custom `weekStartsOn`
 * 0–6). Time is zeroed so the result is stable for keying.
 */
function startOfWeek(date, weekStartsOn = 0) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diff = (d.getDay() - weekStartsOn + 7) % 7;
    d.setDate(d.getDate() - diff);
    return d;
}
/** The seven dates of the week containing `date`. */
function weekDates(date, weekStartsOn = 0) {
    const start = startOfWeek(date, weekStartsOn);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
/** Minutes elapsed since midnight for `date` (0–1439). */
function minutesSinceMidnight(date) {
    return date.getHours() * 60 + date.getMinutes();
}
/** Format a `Date` as a 24h `HH:MM` clock label. */
function clockLabel(date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}
/** Format an hour number (0–23) as an `H AM/PM` axis label. */
function hourLabel(hour) {
    const h = ((hour % 24) + 24) % 24;
    if (h === 0)
        return '12 AM';
    if (h === 12)
        return '12 PM';
    return h < 12 ? `${h} AM` : `${h - 12} PM`;
}
/** `HH:MM – HH:MM` (or just the start when there is no end). */
function timeRangeLabel(start, end) {
    return end ? `${clockLabel(start)} – ${clockLabel(end)}` : clockLabel(start);
}
/** 6×7 month grid cells (leading/trailing nulls) for the month of `month`. */
function monthGrid(month, weekStartsOn = 0) {
    const year = month.getFullYear();
    const mi = month.getMonth();
    const firstWeekday = (new Date(year, mi, 1).getDay() - weekStartsOn + 7) % 7;
    const daysInMonth = new Date(year, mi + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1)
        cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1)
        cells.push(new Date(year, mi, d));
    while (cells.length % 7 !== 0)
        cells.push(null);
    return cells;
}
/** The weekday header labels reordered for a `weekStartsOn` start day. */
function weekdayHeader(labels = exports.WEEKDAYS_SHORT, weekStartsOn = 0) {
    return Array.from({ length: 7 }, (_, i) => labels[(i + weekStartsOn) % 7] ?? '');
}
const TONE_CLASSES = {
    primary: {
        solidBg: 'bg-primary',
        solidText: 'text-on-primary',
        accentBg: 'bg-primary',
        accentText: 'text-primary',
        accentBorder: 'border-primary',
    },
    accent: {
        solidBg: 'bg-accent',
        solidText: 'text-on-accent',
        accentBg: 'bg-accent',
        accentText: 'text-accent',
        accentBorder: 'border-accent',
    },
    success: {
        solidBg: 'bg-success',
        solidText: 'text-on-success',
        accentBg: 'bg-success',
        accentText: 'text-success',
        accentBorder: 'border-success',
    },
    warn: {
        solidBg: 'bg-warn',
        solidText: 'text-on-warn',
        accentBg: 'bg-warn',
        accentText: 'text-warn',
        accentBorder: 'border-warn',
    },
    danger: {
        solidBg: 'bg-danger',
        solidText: 'text-on-danger',
        accentBg: 'bg-danger',
        accentText: 'text-danger',
        accentBorder: 'border-danger',
    },
    neutral: {
        solidBg: 'bg-muted',
        solidText: 'text-surface',
        accentBg: 'bg-muted',
        accentText: 'text-muted',
        accentBorder: 'border-border',
    },
};
/**
 * Map a semantic {@link EventTone} to its `--xen-*`-bound utility classes. The
 * web analog of the native `resolveTone` — but every value is a token class
 * (`bg-primary`, `text-on-success`, …), so no hex ever originates here.
 */
function toneClasses(tone = 'primary') {
    return TONE_CLASSES[tone] ?? TONE_CLASSES.primary;
}
//# sourceMappingURL=format.js.map