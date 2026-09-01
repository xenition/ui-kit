/**
 * Dates, counts and countdowns — **pure, and shared by both twins**, the way
 * `calendar/layout-v4.ts` and `crypto/amount-v4.ts` are. The native twin
 * imports it as `../../events/schedule-v4`.
 *
 * Nothing here is exported from the package.
 */
/**
 * Weekday and month names, through `Intl`.
 *
 * `events/format.ts` holds `WEEKDAYS_SHORT = ['Sun','Mon',…]` and
 * `MONTHS_SHORT = ['Jan',…]` as inline English arrays, duplicated verbatim in
 * both twins. `CalendarStrip` is therefore English-only and always
 * Sunday-first, whatever locale the app is in.
 */
export declare function weekdayName(date: Date, locale?: string, width?: 'short' | 'narrow'): string;
export declare function monthName(date: Date, locale?: string, width?: 'short' | 'long'): string;
/** A day's number, in the locale's own digits. */
export declare function dayNumber(date: Date, locale?: string): string;
/** The parts of a countdown, and whether it has already run out. */
export interface CountdownParts {
    days: number;
    hours: number;
    minutes: number;
    elapsed: boolean;
    /** False when the caller gave neither a target nor a remaining duration. */
    known: boolean;
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
export declare function countdownParts(remainingMs: number | undefined): CountdownParts;
/**
 * The spoken form of a countdown, pluralised.
 *
 * The base announced "1 days 1 hours 1 minutes", and did it on a role-less
 * element where the label was ignored anyway.
 */
export declare function countdownSentence(parts: CountdownParts, words?: {
    day?: string;
    days?: string;
    hour?: string;
    hours?: string;
    minute?: string;
    minutes?: string;
}): string;
/**
 * Seats taken, as a fraction and a clamped pair.
 *
 * `SessionCard` clamped the *bar* and then printed the raw number, so
 * `seatsTaken: -5` drew an empty meter beside the text "−5 / 100 seats taken".
 * `TicketTypeRow` had the mirror: `remaining === 0` is a strict test, so
 * `remaining: -3` was neither sold out nor low stock — a row with negative
 * inventory rendered as normal and purchasable.
 */
export declare function seatParts(taken: number | undefined, capacity: number | undefined): {
    taken: number;
    capacity: number;
    ratio: number;
    full: boolean;
} | undefined;
/** Remaining inventory, with negatives treated as sold out rather than ignored. */
export declare function remainingParts(remaining: number | undefined, soldOut: boolean | undefined, lowStockAt: number): {
    remaining: number | undefined;
    soldOut: boolean;
    lowStock: boolean;
};
//# sourceMappingURL=schedule-v4.d.ts.map