import * as React from 'react';
import type { ReservationStatus, TableReservationRowProps } from './TableReservationRow';
export interface TableReservationRowV4Props extends TableReservationRowProps {
    /** Override the status words — five English strings lived inside the file. */
    statusLabels?: Partial<Record<ReservationStatus, string>>;
}
/**
 * **V4 table reservation row** — the web twin of the native
 * `TableReservationRowV4`, same props as {@link TableReservationRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The table number joins the row's name.** `aria-label` carried the
 *    guest, the party size, the date/time and the status on a `role="button"`
 *    root — children-presentational — so `tableLabel`, the one fact a host
 *    walking the floor needs, was rendered and pruned.
 * 2. **The party glyph stops being a reader stop.** `Icon aria-label="Party of
 *    4"` made the 👥 its own focusable-adjacent announcement, repeating what
 *    the row's own name already says. It is decorative now, and the words are
 *    in the name.
 * 3. **The words are props.** Five English status strings were compiled into
 *    the component with no way past them.
 * 4. **A real button on the card tokens.** The `div` + `role="button"` +
 *    hand-rolled Enter/Space handler is a `<button>`; `hover:opacity-90` — M3's
 *    *disabled* signal, spent on hover — is the state layer; `primary-300` is
 *    the `ring` token; and the party chip's `bg-neutral-100`, a ramp step that
 *    inverts under `[data-theme="dark"]`, is a hairline on the card.
 */
export declare const TableReservationRowV4: React.ForwardRefExoticComponent<TableReservationRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TableReservationRowV4.d.ts.map