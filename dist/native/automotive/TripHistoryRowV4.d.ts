import * as React from 'react';
import type { TripHistoryEmptyProps, TripHistoryRowProps, TripOutcome } from './TripHistoryRow';
export interface TripHistoryRowV4Props extends TripHistoryRowProps {
    /** Override the outcome words — three English phrases lived inside. */
    outcomeLabels?: Partial<Record<TripOutcome, string>>;
    /** Separator between the two endpoints. Default `'→'`. */
    routeSeparator?: string;
    /** Draw the separator under the row. Default `true`; pass `false` on the last. */
    last?: boolean;
}
export interface TripHistoryEmptyV4Props extends TripHistoryEmptyProps {
    /** Glyph above the message. Default `'🚗'`. */
    glyph?: string;
}
/**
 * **V4 trip history row** — same props as {@link TripHistoryRow} plus
 * `outcomeLabels`, `routeSeparator` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line** (`dashboard/internal/row-v4`),
 *    so its height, padding, press fill and separator inset are the decisions
 *    every other row in the kit makes rather than this component's own.
 * 2. **The fare is tabular.** A trip history is a column of money and the base
 *    left it proportional, so there was no edge to scan down.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two loose labels either side of an arrow glyph
 *    that is announced as "rightwards arrow".
 * 4. **The rating carries its number**, via `RatingV4 showValue`.
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
export declare function TripHistoryRowV4({ from, to, dateLabel, fareCents, currency, outcome, rating, variant, outcomeLabels, routeSeparator, last, onPress, style, }: TripHistoryRowV4Props): React.ReactElement | null;
/**
 * **V4 empty trip history** — same props as {@link TripHistoryEmpty} plus
 * `glyph`.
 *
 * The base centred a title and a message in muted text. V4 gives it the glyph
 * the rest of the kit's empty states carry, and moves the message to
 * `mutedText` — the slot with a contrast promise, on the only copy the screen
 * has.
 */
export declare function TripHistoryEmptyV4({ title, message, glyph, style, }: TripHistoryEmptyV4Props): React.ReactElement;
//# sourceMappingURL=TripHistoryRowV4.d.ts.map