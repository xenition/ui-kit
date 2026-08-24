"use strict";
/**
 * Small, dependency-free date helpers shared by the booking components. All
 * "civil day" keys are `YYYY-MM-DD` strings so availability (derived from slot
 * instants in the resource timezone) and calendar cells (civil dates) compare
 * as plain strings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDayKey = toDayKey;
exports.dayKeyInTz = dayKeyInTz;
exports.formatTimeInTz = formatTimeInTz;
exports.addDays = addDays;
exports.startOfMonth = startOfMonth;
exports.monthMatrix = monthMatrix;
exports.weekRow = weekRow;
const pad = (n) => String(n).padStart(2, '0');
/** `YYYY-MM-DD` from a civil (local) Date's calendar fields. */
function toDayKey(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
/**
 * `YYYY-MM-DD` for an ISO instant, evaluated in `timeZone` (default: runtime
 * zone). Uses `en-CA` which formats as ISO-order `YYYY-MM-DD`.
 */
function dayKeyInTz(iso, timeZone) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '';
    return new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(d);
}
/** Localized time-of-day for an ISO instant (default `9:00 AM` style). */
function formatTimeInTz(iso, timeZone) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '';
    return new Intl.DateTimeFormat(undefined, {
        timeZone,
        hour: 'numeric',
        minute: '2-digit',
    }).format(d);
}
/** Add `days` to a date, returning a new Date (no mutation). */
function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}
/** First day of the month for `date`. */
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
/**
 * The 6×7 (or fewer) grid of civil dates covering the weeks that intersect
 * `month`, starting each week on `weekStartsOn` (0 = Sunday).
 */
function monthMatrix(month, weekStartsOn = 0) {
    const first = startOfMonth(month);
    const offset = (first.getDay() - weekStartsOn + 7) % 7;
    const gridStart = addDays(first, -offset);
    const weeks = [];
    for (let w = 0; w < 6; w += 1) {
        const row = [];
        for (let d = 0; d < 7; d += 1) {
            row.push(addDays(gridStart, w * 7 + d));
        }
        weeks.push(row);
    }
    return weeks;
}
/** The 7 civil dates of the week containing `date`. */
function weekRow(date, weekStartsOn = 0) {
    const offset = (date.getDay() - weekStartsOn + 7) % 7;
    const start = addDays(date, -offset);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
//# sourceMappingURL=datetime.js.map