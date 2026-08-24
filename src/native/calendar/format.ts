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

export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const WEEKDAYS_NARROW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;
export const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

/** Short weekday label for a date, e.g. `Mon`. Empty string if unresolved. */
export function weekdayLabel(date: Date): string {
  return WEEKDAYS_SHORT[date.getDay()] ?? '';
}

/** Short month label for a date, e.g. `Aug`. Empty string if unresolved. */
export function monthLabel(date: Date): string {
  return MONTHS_SHORT[date.getMonth()] ?? '';
}

/** Full month label, e.g. `August`. Empty string if unresolved. */
export function monthLongLabel(date: Date): string {
  return MONTHS_LONG[date.getMonth()] ?? '';
}

/** True when two dates fall on the same calendar day. */
export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** True when two dates fall in the same calendar month. */
export function sameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** A new date `n` days after `date` (n may be negative). */
export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** A new date `n` months after `date`, pinned to the 1st. */
export function addMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

/**
 * The Sunday that starts the week containing `date` (or a custom `weekStartsOn`
 * 0–6). Time is zeroed so the result is stable for keying.
 */
export function startOfWeek(date: Date, weekStartsOn = 0): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = (d.getDay() - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d;
}

/** The seven dates of the week containing `date`. */
export function weekDates(date: Date, weekStartsOn = 0): Date[] {
  const start = startOfWeek(date, weekStartsOn);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** Minutes elapsed since midnight for `date` (0–1439). */
export function minutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/** Format a `Date` as a 24h `HH:MM` clock label. */
export function clockLabel(date: Date): string {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/** Format an hour number (0–23) as an `H AM/PM` axis label. */
export function hourLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  if (h === 0) return '12 AM';
  if (h === 12) return '12 PM';
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
}

/** `HH:MM – HH:MM` (or just the start when there is no end). */
export function timeRangeLabel(start: Date, end?: Date): string {
  return end ? `${clockLabel(start)} – ${clockLabel(end)}` : clockLabel(start);
}

/** 6×7 month grid cells (leading/trailing nulls) for the month of `month`. */
export function monthGrid(month: Date, weekStartsOn = 0): (Date | null)[] {
  const year = month.getFullYear();
  const mi = month.getMonth();
  const firstWeekday = (new Date(year, mi, 1).getDay() - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(year, mi + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(year, mi, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/** The weekday header labels reordered for a `weekStartsOn` start day. */
export function weekdayHeader(
  labels: readonly string[] = WEEKDAYS_SHORT,
  weekStartsOn = 0
): string[] {
  return Array.from({ length: 7 }, (_, i) => labels[(i + weekStartsOn) % 7] ?? '');
}

/** Token-derived translucent tint — takes a theme hex, never invents one. */
export function withAlpha(hex: string, alpha: number): string {
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
export function resolveTone(
  colors: SemanticColors,
  tone: EventTone = 'primary'
): { base: string; on: string } {
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
