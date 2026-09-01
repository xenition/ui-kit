import * as React from 'react';
import type { ReservationStatus, TableReservationRowProps } from './TableReservationRow';
export interface TableReservationRowV4Props extends TableReservationRowProps {
    /** Override the status words. Default `Requested` … `Cancelled`. */
    statusLabels?: Partial<Record<ReservationStatus, string>>;
}
/**
 * **V4 table reservation row** — same props as {@link TableReservationRow}
 * plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **The table number is announced.** The row's name was guest, party,
 *    date/time and status; `tableLabel` — the one thing a host is looking for
 *    when they scan the list — was drawn on screen and pruned out of the tree
 *    by the `button` role above it.
 * 2. **The party glyph stops being a reader stop.** `👥` carried
 *    `accessibilityLabel={"Party of 4"}`, which the row's own name already
 *    says, so a reader heard the party size twice — and on a row that is a
 *    single leaf it was a label competing with the row's.
 * 3. **A neutral badge resolves the same way on both twins.** Native's solid
 *    `neutral` fills with the **border** token — a hairline colour used as a
 *    fill — where web gives it a ramp step. Both take the module's one badge
 *    shape now, which is a soft tint composited into the surface.
 * 4. **Press is a state layer**, not `opacity: 0.9` — the band M3 spends on
 *    disabled.
 * 5. **The text and trailing slots come from the shared row family** — only
 *    those two, because the family's container is transparent and border-less
 *    by design, and this row draws its own frame. The party tile stops being a
 *    `tokens.ramps.neutral[100]` block that does not invert.
 *
 * **Renders nothing without a `name`.**
 */
export declare function TableReservationRowV4({ name, partySize, dateText, timeText, tableLabel, status, statusLabels, onPress, style, }: TableReservationRowV4Props): React.ReactElement | null;
//# sourceMappingURL=TableReservationRowV4.d.ts.map