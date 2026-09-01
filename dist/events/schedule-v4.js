"use strict";
/**
 * Dates, counts and countdowns — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `crypto/amount-v4.ts` are. The native twin
 * imports it as `../../events/schedule-v4`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekdayName = weekdayName;
exports.monthName = monthName;
exports.dayNumber = dayNumber;
exports.countdownParts = countdownParts;
exports.countdownSentence = countdownSentence;
exports.seatParts = seatParts;
exports.remainingParts = remainingParts;
/**
 * Weekday and month names, through `Intl`.
 *
 * `events/format.ts` holds `WEEKDAYS_SHORT = ['Sun','Mon',…]` and
 * `MONTHS_SHORT = ['Jan',…]` as inline English arrays, duplicated verbatim in
 * both twins. `CalendarStrip` is therefore English-only and always
 * Sunday-first, whatever locale the app is in.
 */
function weekdayName(date, locale, width = 'short') {
    return new Intl.DateTimeFormat(locale, { weekday: width }).format(date);
}
function monthName(date, locale, width = 'short') {
    return new Intl.DateTimeFormat(locale, { month: width }).format(date);
}
/** A day's number, in the locale's own digits. */
function dayNumber(date, locale) {
    return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
}
/**
 * Split a remaining duration.
 *
 * ## Two bugs this replaces
 *
 * `CountdownBadge` fell through to `ms = 0` when given **neither**
 * `remainingMs` nor `target`, and `countdownParts(0)` reports `elapsed: true`
 * — so a badge with nothing to count down to confidently announced that the
 * event had already started. `known` separates "it has started" from "nobody
 * told me when it starts".
 *
 * It also read `new Date()` inside render whenever `now` was omitted, which
 * makes render impure and freezes the value until something else re-renders.
 * `now` stays optional for parity, but the caller is handed a real answer
 * about whether it was supplied.
 */
function countdownParts(remainingMs) {
    if (remainingMs == null || !Number.isFinite(remainingMs)) {
        return { days: 0, hours: 0, minutes: 0, elapsed: false, known: false };
    }
    const ms = Math.max(0, remainingMs);
    const totalMinutes = Math.floor(ms / 60000);
    return {
        days: Math.floor(totalMinutes / 1440),
        hours: Math.floor((totalMinutes % 1440) / 60),
        minutes: totalMinutes % 60,
        elapsed: remainingMs <= 0,
        known: true,
    };
}
/**
 * The spoken form of a countdown, pluralised.
 *
 * The base announced "1 days 1 hours 1 minutes", and did it on a role-less
 * element where the label was ignored anyway.
 */
function countdownSentence(parts, words = {}) {
    const unit = (value, one, many) => `${value} ${value === 1 ? one : many}`;
    return [
        unit(parts.days, words.day ?? 'day', words.days ?? 'days'),
        unit(parts.hours, words.hour ?? 'hour', words.hours ?? 'hours'),
        unit(parts.minutes, words.minute ?? 'minute', words.minutes ?? 'minutes'),
    ].join(' ');
}
/**
 * Seats taken, as a fraction and a clamped pair.
 *
 * `SessionCard` clamped the *bar* and then printed the raw number, so
 * `seatsTaken: -5` drew an empty meter beside the text "−5 / 100 seats taken".
 * `TicketTypeRow` had the mirror: `remaining === 0` is a strict test, so
 * `remaining: -3` was neither sold out nor low stock — a row with negative
 * inventory rendered as normal and purchasable.
 */
function seatParts(taken, capacity) {
    if (typeof taken !== 'number' || typeof capacity !== 'number')
        return undefined;
    if (!Number.isFinite(taken) || !Number.isFinite(capacity) || capacity <= 0)
        return undefined;
    const safeTaken = Math.min(Math.max(0, Math.round(taken)), Math.round(capacity));
    const safeCapacity = Math.round(capacity);
    return {
        taken: safeTaken,
        capacity: safeCapacity,
        ratio: safeTaken / safeCapacity,
        full: safeTaken >= safeCapacity,
    };
}
/** Remaining inventory, with negatives treated as sold out rather than ignored. */
function remainingParts(remaining, soldOut, lowStockAt) {
    if (soldOut === true)
        return { remaining: undefined, soldOut: true, lowStock: false };
    if (typeof remaining !== 'number' || !Number.isFinite(remaining)) {
        return { remaining: undefined, soldOut: false, lowStock: false };
    }
    const safe = Math.round(remaining);
    if (safe <= 0)
        return { remaining: 0, soldOut: true, lowStock: false };
    return { remaining: safe, soldOut: false, lowStock: safe <= lowStockAt };
}
//# sourceMappingURL=schedule-v4.js.map