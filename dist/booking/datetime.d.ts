/**
 * Small, dependency-free date helpers shared by the booking components. All
 * "civil day" keys are `YYYY-MM-DD` strings so availability (derived from slot
 * instants in the resource timezone) and calendar cells (civil dates) compare
 * as plain strings.
 */
/** `YYYY-MM-DD` from a civil (local) Date's calendar fields. */
export declare function toDayKey(date: Date): string;
/**
 * `YYYY-MM-DD` for an ISO instant, evaluated in `timeZone` (default: runtime
 * zone). Uses `en-CA` which formats as ISO-order `YYYY-MM-DD`.
 */
export declare function dayKeyInTz(iso: string, timeZone?: string): string;
/** Localized time-of-day for an ISO instant (default `9:00 AM` style). */
export declare function formatTimeInTz(iso: string, timeZone?: string): string;
/** Add `days` to a date, returning a new Date (no mutation). */
export declare function addDays(date: Date, days: number): Date;
/** First day of the month for `date`. */
export declare function startOfMonth(date: Date): Date;
/**
 * The 6×7 (or fewer) grid of civil dates covering the weeks that intersect
 * `month`, starting each week on `weekStartsOn` (0 = Sunday).
 */
export declare function monthMatrix(month: Date, weekStartsOn?: number): Date[][];
/** The 7 civil dates of the week containing `date`. */
export declare function weekRow(date: Date, weekStartsOn?: number): Date[];
//# sourceMappingURL=datetime.d.ts.map