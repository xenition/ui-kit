/**
 * The `events` module's own V4 vocabulary (web) — the twin of
 * `native/events/internal/event-v4.ts`.
 *
 * Nothing here is exported from the package.
 */
import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { countdownParts, countdownSentence, dayNumber, monthName, remainingParts, seatParts, weekdayName } from '../schedule-v4';
export { countdownParts, countdownSentence, dayNumber, monthName, remainingParts, seatParts, SKELETON_CLASS, TONE_INK, TONE_ON, weekdayName, };
export type { ToneV4 };
/**
 * An RSVP answer is a **choice, not a status**.
 *
 * `RSVPButton` painted `going → success`, `maybe → warn`, `declined → danger`
 * — the same three slots the module spends on `cancelled` and `Sold out`. A
 * user saying they cannot come is not an error, and "Maybe" is not a warning.
 */
export declare const RSVP_TONE: Record<string, ToneV4>;
/**
 * An agenda item's progress is **not colour alone**.
 *
 * `STATUS_DOT` gave `upcoming`, `live` and `done` three hues and a text
 * counterpart for `live` only, so a finished session and a future one differed
 * by an 8px dot and nothing else. `done` was also painted `bg-border` — a
 * hairline token with no promise of being visible as a solid dot.
 */
export declare const AGENDA_TONE: Record<string, ToneV4>;
/** One badge shape for the whole module. */
export declare const BADGE_V4: {
    readonly variant: "soft";
    readonly size: "sm";
};
/** Dates, times, prices and seat counts that stack in a column. */
export declare const TABULAR_CLASS = "tabular-nums";
/** The ground behind a skeleton — never a ramp step. */
export declare const PLACEHOLDER_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
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
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
//# sourceMappingURL=event-v4.d.ts.map