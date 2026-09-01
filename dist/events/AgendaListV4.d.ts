import * as React from 'react';
import type { AgendaItemStatus, AgendaListProps } from './AgendaList';
export interface AgendaListV4Props extends AgendaListProps {
    /**
     * The word each status carries. Defaults to `Upcoming` / `Live now` / `Done`.
     * There is a word for every state, not only for `live`.
     */
    statusLabels?: Partial<Record<AgendaItemStatus, string>>;
}
/**
 * **V4 agenda list** — the web twin of the native `AgendaListV4`, same props as
 * {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by an 8px dot's hue and nothing else, and `done` was
 *    painted `bg-border` — a hairline token with no promise of being visible as
 *    a solid dot at all. Every state now carries a **word** as well as a mark,
 *    and the marks come from `AGENDA_TONE`, where only `live` is a status
 *    colour because only `live` is a status.
 * 2. **The row announces the whole entry.** `09:00 Big Talk` was the accessible
 *    name of a row that also drew a subtitle and a state, and a name replaces
 *    the subtree — so the room and the state were unreachable.
 * 3. **Empty is the shared `EmptyStateV4`**, the same component the native twin
 *    composes, rather than two hand-rolled empties that drifted apart.
 * 4. **Loading announces, and draws the shape it is about to be** — the base
 *    put `aria-label` on a role-less `div`, where it is ignored, over two
 *    `bg-neutral-*` bars that invert to near-white plates on a dark page.
 * 5. **A press is a state layer and the row clears 44.** `hover:opacity-80`
 *    dims the row's own content, which is the signal M3 spends on *disabled*.
 */
export declare const AgendaListV4: React.ForwardRefExoticComponent<AgendaListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgendaListV4.d.ts.map