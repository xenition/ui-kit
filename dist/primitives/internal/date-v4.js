"use strict";
/**
 * Civil-date arithmetic for the **V4 picker line**, shared by both platforms.
 *
 * Everything here is pure `Date` math on local midnights — no date library, on
 * either platform. A kit primitive that dragged in `date-fns` or `luxon` would
 * push that choice onto every app that renders a field, which is exactly the
 * kind of implementation question §19 says not to make anyone answer.
 *
 * The unit of exchange is the **civil date key** — `YYYY-MM-DD`. It is what the
 * pickers report through `onChange`, and it is what comparisons are done on,
 * because string comparison of a zero-padded ISO date is the same ordering as
 * date comparison and cannot be knocked off by an hour of DST.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = toDate;
exports.toKey = toKey;
exports.startOfMonth = startOfMonth;
exports.monthGrid = monthGrid;
exports.weekdayLabels = weekdayLabels;
exports.outOfRange = outOfRange;
exports.rangePosition = rangePosition;
/** Parse an ISO `YYYY-MM-DD` (or pass a `Date`) into a local-midnight `Date`. */
function toDate(input) {
    if (!input)
        return null;
    if (input instanceof Date)
        return Number.isNaN(input.getTime()) ? null : input;
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(input);
    if (!m) {
        const d = new Date(input);
        return Number.isNaN(d.getTime()) ? null : d;
    }
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}
/** Civil `YYYY-MM-DD` for a local `Date`. */
function toKey(d) {
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${y}-${mo}-${da}`;
}
/** The first of the month `d` sits in, at local midnight. */
function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}
/**
 * A 6×7 grid of dates covering the month `viewDate` sits in, Sunday-first.
 *
 * Always six rows, never five: a grid that changes height as you page the
 * month makes the panel jump under the finger, and §36.11 asks that controls
 * do not move out from under it.
 */
function monthGrid(viewDate) {
    const first = startOfMonth(viewDate);
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - first.getDay());
    const weeks = [];
    const cursor = new Date(gridStart);
    for (let w = 0; w < 6; w += 1) {
        const row = [];
        for (let i = 0; i < 7; i += 1) {
            row.push(new Date(cursor));
            cursor.setDate(cursor.getDate() + 1);
        }
        weeks.push(row);
    }
    return weeks;
}
/** Seven local dates spanning one week, for building localized weekday labels. */
const WEEKDAY_SEEDS = [
    '2023-01-01', // Sunday
    '2023-01-02',
    '2023-01-03',
    '2023-01-04',
    '2023-01-05',
    '2023-01-06',
    '2023-01-07', // Saturday
];
/**
 * Short weekday labels for a locale, Sunday-first.
 *
 * Built through `Intl` rather than a hardcoded `['Su', 'Mo', …]` so a picker in
 * a French app says "dim." — a calendar in the wrong language is not a familiar
 * interaction (§31), whatever its shape.
 */
function weekdayLabels(locale) {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    return WEEKDAY_SEEDS.map((k) => fmt.format(new Date(`${k}T12:00:00`)));
}
/** `true` when `key` falls outside an inclusive `[min, max]` civil range. */
function outOfRange(key, min, max) {
    const lo = toDate(min ?? null);
    const hi = toDate(max ?? null);
    if (lo && key < toKey(lo))
        return true;
    if (hi && key > toKey(hi))
        return true;
    return false;
}
/**
 * Classify a day against a range.
 *
 * `'only'` is its own answer rather than "start and end at once", because a
 * one-day range must be drawn as a single disc — a start cap butted against an
 * end cap on the same cell renders as a smear.
 */
function rangePosition(key, start, end) {
    if (start && end && start === end)
        return key === start ? 'only' : 'none';
    if (start && !end)
        return key === start ? 'only' : 'none';
    if (!start || !end)
        return 'none';
    if (key === start)
        return 'start';
    if (key === end)
        return 'end';
    if (key > start && key < end)
        return 'middle';
    return 'none';
}
//# sourceMappingURL=date-v4.js.map