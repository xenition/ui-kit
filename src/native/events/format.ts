/**
 * Tiny date/time formatting helpers shared across the events module. No
 * external deps and no locale libraries — just the fixed short labels the
 * event surfaces need (calendar strips, countdowns). Every array access is
 * guarded by the callers via `?? ''` so an out-of-range index never throws.
 */

export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
export function weekdayLabel(date: Date): string {
  return WEEKDAYS_SHORT[date.getDay()] ?? '';
}

/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
export function monthLabel(date: Date): string {
  return MONTHS_SHORT[date.getMonth()] ?? '';
}

/** True when two dates fall on the same calendar day. */
export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target time has passed (all parts clamp to 0). */
  elapsed: boolean;
}

/** Break a millisecond delta into clamped day/hour/minute/second parts. */
export function countdownParts(remainingMs: number): CountdownParts {
  const clamped = Math.max(0, Math.floor(remainingMs / 1000));
  return {
    days: Math.floor(clamped / 86400),
    hours: Math.floor((clamped % 86400) / 3600),
    minutes: Math.floor((clamped % 3600) / 60),
    seconds: clamped % 60,
    elapsed: remainingMs <= 0,
  };
}
