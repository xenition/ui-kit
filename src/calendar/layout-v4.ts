/**
 * Pure layout helpers for the **V4 calendar line**, shared by both twins the
 * way `booking/schedule-v4.ts` is. DOM-free and RN-free: a layout rule that
 * differs between platforms is a bug waiting for a screen size to expose it.
 *
 * Nothing here is exported from the package.
 */

import type { CalendarEvent } from './types';

/** Minutes from midnight, for an instant. */
export function minutesOf(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/** One event's resolved place in the grid, as fractions of the column width. */
export interface PositionedEvent {
  event: CalendarEvent;
  key: string;
  /** Minutes from midnight. */
  startMin: number;
  endMin: number;
  /** 0-based column within its cluster. */
  column: number;
  /** How many columns that cluster was split into. */
  columns: number;
}

/**
 * How long an event with no `end` is assumed to run, in minutes. A calendar
 * has to give a zero-length event *some* height or it is invisible; 30 is the
 * default slot length every scheduling product converges on.
 */
export const DEFAULT_EVENT_MINUTES = 30;

/**
 * Lay timed events out in columns, correctly.
 *
 * ## The bug this replaces
 *
 * `TimeGrid` computed, **per event**, the set of events overlapping *that*
 * event, and used its size as the column count:
 *
 * ```ts
 * const overlaps = timed.filter((o) => oStart < endMin && startMin < oEnd);
 * widthPct: 100 / overlaps.length
 * ```
 *
 * That is not merely approximate, it is **inconsistent between events in the
 * same view**. Take A 9:00–10:00, B 9:30–10:30, C 10:00–11:00:
 *
 * - A overlaps {A, B} → 2 columns, width 50%
 * - B overlaps {A, B, C} → 3 columns, width 33%
 * - C overlaps {B, C} → 2 columns, width 50%
 *
 * Three events, three different column grids, in one day. They collide and
 * leave gaps at the same time.
 *
 * ## What this does instead
 *
 * The standard two-pass algorithm every calendar uses:
 *
 * 1. **Cluster.** Walk the events in start order and cut a new cluster
 *    whenever an event starts at or after the furthest end seen so far. Events
 *    in one cluster are transitively connected; events in different clusters
 *    cannot overlap, so each cluster is laid out independently and a busy
 *    morning never narrows a free afternoon.
 * 2. **Pack.** Within a cluster, place each event in the first column whose
 *    last occupant has already ended. The cluster's column count is the number
 *    of columns it needed, and **every member shares it** — which is the part
 *    the base got wrong.
 *
 * Ties are broken by start time then by end time, so the order is stable
 * across renders and two events that start together do not swap columns.
 */
export function layoutEvents(
  events: readonly CalendarEvent[],
  options: { defaultMinutes?: number } = {}
): PositionedEvent[] {
  const fallback = options.defaultMinutes ?? DEFAULT_EVENT_MINUTES;

  const spans = events.map((event, index) => {
    const startMin = minutesOf(event.start);
    const endMin = event.end ? minutesOf(event.end) : startMin + fallback;
    return {
      event,
      key: event.id || String(index),
      startMin,
      // An event that ends before it starts (a bad payload, or one crossing
      // midnight) still needs a positive height, or it vanishes silently.
      endMin: Math.max(endMin, startMin + 1),
      index,
    };
  });

  spans.sort(
    (a, b) => a.startMin - b.startMin || a.endMin - b.endMin || a.index - b.index
  );

  const out: PositionedEvent[] = [];
  let cluster: typeof spans = [];
  let clusterEnd = -Infinity;

  /** Pack one cluster into columns and push its members out. */
  const flush = (): void => {
    if (cluster.length === 0) return;
    // `columnEnds[i]` is the minute the last event in column `i` finishes.
    const columnEnds: number[] = [];
    const placed = cluster.map((span) => {
      let column = columnEnds.findIndex((end) => end <= span.startMin);
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(span.endMin);
      } else {
        columnEnds[column] = span.endMin;
      }
      return { span, column };
    });
    // Every member of the cluster shares the cluster's column count.
    const columns = Math.max(1, columnEnds.length);
    for (const { span, column } of placed) {
      out.push({
        event: span.event,
        key: span.key,
        startMin: span.startMin,
        endMin: span.endMin,
        column,
        columns,
      });
    }
    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const span of spans) {
    // A new cluster starts where nothing before it is still running.
    if (span.startMin >= clusterEnd) flush();
    cluster.push(span);
    clusterEnd = Math.max(clusterEnd, span.endMin);
  }
  flush();

  return out;
}

/**
 * Localized weekday names, narrow or short, rotated to the caller's week
 * start.
 *
 * The module's `WEEKDAYS_SHORT` / `WEEKDAYS_NARROW` are frozen **English**
 * arrays used by four components. A calendar is the first thing a
 * non-English product notices, and `Intl` already knows every locale's
 * answer — `BookingCalendarV4` derives its headers the same way.
 */
export function weekdayNames(
  weekStartsOn: number,
  options: { locale?: string; width?: 'narrow' | 'short' | 'long' } = {}
): string[] {
  const fmt = new Intl.DateTimeFormat(options.locale, {
    weekday: options.width ?? 'short',
  });
  // 2023-01-01 was a Sunday, so index 0 is Sunday in every locale.
  const names = Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(Date.UTC(2023, 0, 1 + i, 12)))
  );
  const start = ((weekStartsOn % 7) + 7) % 7;
  return [...names.slice(start), ...names.slice(0, start)];
}

/** A localized month + year title, for a navigator or a grid header. */
export function monthTitle(
  month: Date,
  options: { locale?: string; month?: 'long' | 'short'; year?: boolean } = {}
): string {
  return new Intl.DateTimeFormat(options.locale, {
    month: options.month ?? 'long',
    year: options.year === false ? undefined : 'numeric',
  }).format(month);
}

/** A localized clock label for an hour of the day (0–23). */
export function hourTitle(hour: number, locale?: string): string {
  const d = new Date(2023, 0, 1, Math.max(0, Math.min(23, hour)), 0);
  return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(d);
}
