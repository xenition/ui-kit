/**
 * Tiny date/time formatting helpers shared across the events module. No
 * external deps and no locale libraries — just the fixed short labels the
 * event surfaces need (calendar strips, countdowns). Every array access is
 * guarded by the callers via `?? ''` so an out-of-range index never throws.
 */
export declare const WEEKDAYS_SHORT: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export declare const MONTHS_SHORT: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
export declare function weekdayLabel(date: Date): string;
/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
export declare function monthLabel(date: Date): string;
/** True when two dates fall on the same calendar day. */
export declare function sameDay(a: Date, b: Date): boolean;
export interface CountdownParts {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    /** True once the target time has passed (all parts clamp to 0). */
    elapsed: boolean;
}
/** Break a millisecond delta into clamped day/hour/minute/second parts. */
export declare function countdownParts(remainingMs: number): CountdownParts;
//# sourceMappingURL=format.d.ts.map