/**
 * Tiny date/time helpers shared across the calendar module. No external deps
 * and no locale libraries — plain JS `Date` math only. All array access is
 * guarded (`?? ''`) so an out-of-range index never throws, and callers pass
 * every `Date` in via props (the module never reads `Date.now()` at import
 * time). A `withAlpha`/`resolveTone` pair keeps every rendered color traceable
 * to a compiled theme token — never a hardcoded literal.
 */
import type { SemanticColors } from '../theme';
import type { EventTone } from './types';
export declare const WEEKDAYS_SHORT: readonly ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export declare const WEEKDAYS_NARROW: readonly ["S", "M", "T", "W", "T", "F", "S"];
export declare const MONTHS_SHORT: readonly ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export declare const MONTHS_LONG: readonly ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
export declare function weekdayLabel(date: Date): string;
/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
export declare function monthLabel(date: Date): string;
/** Full month label, e.g. `August`. Empty string if unresolved. */
export declare function monthLongLabel(date: Date): string;
/** True when two dates fall on the same calendar day. */
export declare function sameDay(a: Date, b: Date): boolean;
/** True when two dates fall in the same calendar month. */
export declare function sameMonth(a: Date, b: Date): boolean;
/** A new date `n` days after `date` (n may be negative). */
export declare function addDays(date: Date, n: number): Date;
/** A new date `n` months after `date`, pinned to the 1st. */
export declare function addMonths(date: Date, n: number): Date;
/**
 * The Sunday that starts the week containing `date` (or a custom `weekStartsOn`
 * 0–6). Time is zeroed so the result is stable for keying.
 */
export declare function startOfWeek(date: Date, weekStartsOn?: number): Date;
/** The seven dates of the week containing `date`. */
export declare function weekDates(date: Date, weekStartsOn?: number): Date[];
/** Minutes elapsed since midnight for `date` (0–1439). */
export declare function minutesSinceMidnight(date: Date): number;
/** Format a `Date` as a 24h `HH:MM` clock label. */
export declare function clockLabel(date: Date): string;
/** Format an hour number (0–23) as an `H AM/PM` axis label. */
export declare function hourLabel(hour: number): string;
/** `HH:MM – HH:MM` (or just the start when there is no end). */
export declare function timeRangeLabel(start: Date, end?: Date): string;
/** 6×7 month grid cells (leading/trailing nulls) for the month of `month`. */
export declare function monthGrid(month: Date, weekStartsOn?: number): (Date | null)[];
/** The weekday header labels reordered for a `weekStartsOn` start day. */
export declare function weekdayHeader(labels?: readonly string[], weekStartsOn?: number): string[];
/** Token-derived translucent tint — takes a theme hex, never invents one. */
export declare function withAlpha(hex: string, alpha: number): string;
/**
 * Map a semantic {@link EventTone} to a `{ base, on }` color pair drawn from the
 * active {@link SemanticColors}. `neutral` falls back to the muted/surface
 * slots. No hex ever originates here — only theme values pass through.
 */
export declare function resolveTone(colors: SemanticColors, tone?: EventTone): {
    base: string;
    on: string;
};
//# sourceMappingURL=format.d.ts.map