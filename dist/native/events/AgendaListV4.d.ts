import * as React from 'react';
import type { AgendaItemStatus, AgendaListProps } from './AgendaList';
export interface AgendaListV4Props extends AgendaListProps {
    /**
     * The word each status is announced and printed with. Default
     * `'Upcoming'` / `'Live now'` / `'Done'`.
     */
    statusLabels?: Partial<Record<AgendaItemStatus, string>>;
}
/**
 * **V4 agenda list** — same props as {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by the hue of an 8px dot and nothing else, and `done` was
 *    painted `colors.border` — a hairline token with no promise of being
 *    visible as a solid dot at all. Every state now carries a **word** beside
 *    the dot, and the dot's tone comes from `AGENDA_TONE`, where an agenda's
 *    progress stops borrowing the module's status palette.
 * 2. **A row announces what it shows.** The base spoke `"09:00 Coffee"` from
 *    the interactive root, which replaces the subtree — so the room, the track
 *    and the live marker were unreachable. The row is one comma-joined name.
 * 3. **The empty state is the shared one**, with a heading rather than a lone
 *    grey line centred in a box.
 * 4. **The loading region actually announces.** `accessibilityLabel` sat on a
 *    plain `View`, which names nothing on either platform; its ghost bars were
 *    also `tokens.ramps.neutral[100|200]`, and the native ramp keeps its light
 *    orientation in both schemes — so a dark-mode agenda loaded as two
 *    near-white slabs.
 * 5. **A press is a state layer and the row clears 44**, where the base dimmed
 *    the whole row to `opacity: 0.7` — inside M3's disabled band — on a target
 *    whose height was whatever the text happened to need.
 */
export declare function AgendaListV4({ items, onSelectItem, emptyLabel, statusLabels, loading, style, }: AgendaListV4Props): React.ReactElement;
//# sourceMappingURL=AgendaListV4.d.ts.map