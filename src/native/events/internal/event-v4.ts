/**
 * The `events` module's own V4 vocabulary (native) — the twin of
 * `events/internal/event-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import type { XenitionNativeTheme } from '../../theme';
import { onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import {
  countdownParts,
  countdownSentence,
  dayNumber,
  monthName,
  remainingParts,
  seatParts,
  weekdayName,
} from '../../../events/schedule-v4';

export {
  countdownParts,
  countdownSentence,
  dayNumber,
  monthName,
  onPair,
  remainingParts,
  seatParts,
  skeletonFill,
  toneFill,
  toneInk,
  weekdayName,
};
export type { ToneV4 };

/**
 * An RSVP answer is a **choice, not a status**.
 *
 * `RSVPButton` painted `going → success`, `maybe → warn`, `declined → danger`
 * — the same three slots the module spends on `cancelled` and `Sold out`. A
 * user saying they cannot come is not an error, and "Maybe" is not a warning.
 */
export const RSVP_TONE: Record<string, ToneV4> = {
  going: 'primary',
  maybe: 'neutral',
  declined: 'neutral',
};

/**
 * An agenda item's progress is **not colour alone**.
 *
 * `STATUS_DOT` gave `upcoming`, `live` and `done` three hues and a text
 * counterpart for `live` only, so a finished session and a future one differed
 * by an 8px dot and nothing else. `done` was also painted `bg-border` — a
 * hairline token with no promise of being visible as a solid dot.
 */
export const AGENDA_TONE: Record<string, ToneV4> = {
  upcoming: 'neutral',
  live: 'success',
  done: 'neutral',
};

/** One badge shape for the whole module. */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/** Dates, times, prices and seat counts that stack in a column. */
export const TABULAR = { fontVariant: ['tabular-nums' as const] };

/**
 * The ground behind a skeleton or an unloaded cover.
 *
 * Eight components reached for `tokens.ramps.neutral[100|200]`, and the native
 * ramp is **light-oriented in both schemes** — the theme's own comment says so
 * — so every skeleton in this module was a near-white slab on a dark surface.
 */
export function placeholderGround(theme: XenitionNativeTheme): string {
  return skeletonFill(theme);
}

/**
 * Build the one accessible name an interactive events row or card should
 * carry.
 *
 * Nine of the twelve components put a short label on the interactive root,
 * which **replaces** the subtree — so every date, time, price, seat count,
 * capacity meter, status caption and scarcity badge in the module was
 * unreachable to a screen reader. A buyer was told the price and never that
 * two tickets remained.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
