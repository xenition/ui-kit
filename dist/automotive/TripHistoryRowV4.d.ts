import * as React from 'react';
import type { TripHistoryEmptyProps, TripHistoryRowProps, TripOutcome } from './TripHistoryRow';
export interface TripHistoryRowV4Props extends TripHistoryRowProps {
    /** Override the outcome words — three English phrases lived inside. */
    outcomeLabels?: Partial<Record<TripOutcome, string>>;
    /** Separator between the two endpoints. Default `'→'`. */
    routeSeparator?: string;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
export interface TripHistoryEmptyV4Props extends TripHistoryEmptyProps {
    /** Glyph above the message. Default `'🚗'`. */
    glyph?: string;
}
/**
 * **V4 trip history row** — the web twin of the native `TripHistoryRowV4`,
 * same props as {@link TripHistoryRow} plus `outcomeLabels`, `routeSeparator`
 * and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the kit's decisions rather than its own.
 * 2. **The fare is tabular** — a trip history is a column of money and the
 *    base left it proportional.
 * 3. **The route reads as one string to a screen reader** — "Bank St to
 *    Airport" — rather than two labels either side of an arrow announced as
 *    "rightwards arrow".
 * 4. **The rating carries its number.**
 *
 * **Renders nothing without both endpoints** (§4.5).
 */
export declare const TripHistoryRowV4: React.ForwardRefExoticComponent<TripHistoryRowV4Props & React.RefAttributes<HTMLDivElement>>;
/**
 * **V4 empty trip history** — the web twin of the native
 * `TripHistoryEmptyV4`, same props as {@link TripHistoryEmpty} plus `glyph`.
 *
 * The base centred a title and a message in `text-muted`. V4 gives it the
 * glyph the rest of the kit's empty states carry and moves the message to
 * `muted-text` — the slot with a contrast promise, on the only copy the
 * screen has.
 */
export declare const TripHistoryEmptyV4: React.ForwardRefExoticComponent<TripHistoryEmptyV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TripHistoryRowV4.d.ts.map