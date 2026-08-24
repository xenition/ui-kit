"use strict";
/**
 * Tiny date/time helpers shared across the calendar module. No external deps
 * and no locale libraries — plain JS `Date` math only. All array access is
 * guarded (`?? ''`) so an out-of-range index never throws, and callers pass
 * every `Date` in via props (the module never reads `Date.now()` at import
 * time). A `withAlpha`/`resolveTone` pair keeps every rendered color traceable
 * to a compiled theme token — never a hardcoded literal.
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
exports.withAlpha = withAlpha;
exports.resolveTone = resolveTone;
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
/** Token-derived translucent tint — takes a theme hex, never invents one. */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Map a semantic {@link EventTone} to a `{ base, on }` color pair drawn from the
 * active {@link SemanticColors}. `neutral` falls back to the muted/surface
 * slots. No hex ever originates here — only theme values pass through.
 */
function resolveTone(colors, tone = 'primary') {
    switch (tone) {
        case 'accent':
            return { base: colors.accent, on: colors.onAccent };
        case 'success':
            return { base: colors.success, on: colors.onSuccess };
        case 'warn':
            return { base: colors.warn, on: colors.onWarn };
        case 'danger':
            return { base: colors.danger, on: colors.onDanger };
        case 'neutral':
            return { base: colors.muted, on: colors.surface };
        case 'primary':
        default:
            return { base: colors.primary, on: colors.onPrimary };
    }
}
//# sourceMappingURL=format.js.map