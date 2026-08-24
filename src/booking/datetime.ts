/**
 * Small, dependency-free date helpers shared by the booking components. All
 * "civil day" keys are `YYYY-MM-DD` strings so availability (derived from slot
 * instants in the resource timezone) and calendar cells (civil dates) compare
 * as plain strings.
 */

const pad = (n: number): string => String(n).padStart(2, '0');

/** `YYYY-MM-DD` from a civil (local) Date's calendar fields. */
export function toDayKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * `YYYY-MM-DD` for an ISO instant, evaluated in `timeZone` (default: runtime
 * zone). Uses `en-CA` which formats as ISO-order `YYYY-MM-DD`.
 */
export function dayKeyInTz(iso: string, timeZone?: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

/** Localized time-of-day for an ISO instant (default `9:00 AM` style). */
export function formatTimeInTz(iso: string, timeZone?: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

/** Add `days` to a date, returning a new Date (no mutation). */
export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** First day of the month for `date`. */
export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * The 6×7 (or fewer) grid of civil dates covering the weeks that intersect
 * `month`, starting each week on `weekStartsOn` (0 = Sunday).
 */
export function monthMatrix(month: Date, weekStartsOn = 0): Date[][] {
  const first = startOfMonth(month);
  const offset = (first.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(first, -offset);
  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w += 1) {
    const row: Date[] = [];
    for (let d = 0; d < 7; d += 1) {
      row.push(addDays(gridStart, w * 7 + d));
    }
    weeks.push(row);
  }
  return weeks;
}

/** The 7 civil dates of the week containing `date`. */
export function weekRow(date: Date, weekStartsOn = 0): Date[] {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  const start = addDays(date, -offset);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}
