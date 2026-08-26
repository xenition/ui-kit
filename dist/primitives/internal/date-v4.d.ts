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
/** Parse an ISO `YYYY-MM-DD` (or pass a `Date`) into a local-midnight `Date`. */
export declare function toDate(input: string | Date | null | undefined): Date | null;
/** Civil `YYYY-MM-DD` for a local `Date`. */
export declare function toKey(d: Date): string;
/** The first of the month `d` sits in, at local midnight. */
export declare function startOfMonth(d: Date): Date;
/**
 * A 6×7 grid of dates covering the month `viewDate` sits in, Sunday-first.
 *
 * Always six rows, never five: a grid that changes height as you page the
 * month makes the panel jump under the finger, and §36.11 asks that controls
 * do not move out from under it.
 */
export declare function monthGrid(viewDate: Date): Date[][];
/**
 * Short weekday labels for a locale, Sunday-first.
 *
 * Built through `Intl` rather than a hardcoded `['Su', 'Mo', …]` so a picker in
 * a French app says "dim." — a calendar in the wrong language is not a familiar
 * interaction (§31), whatever its shape.
 */
export declare function weekdayLabels(locale?: string): string[];
/** `true` when `key` falls outside an inclusive `[min, max]` civil range. */
export declare function outOfRange(key: string, min: string | Date | null | undefined, max: string | Date | null | undefined): boolean;
/** Where a day sits relative to a `[start, end]` civil range. */
export type RangePosition = 'none' | 'start' | 'middle' | 'end' | 'only';
/**
 * Classify a day against a range.
 *
 * `'only'` is its own answer rather than "start and end at once", because a
 * one-day range must be drawn as a single disc — a start cap butted against an
 * end cap on the same cell renders as a smear.
 */
export declare function rangePosition(key: string, start: string | null, end: string | null): RangePosition;
//# sourceMappingURL=date-v4.d.ts.map