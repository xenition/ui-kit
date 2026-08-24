import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV2Props = DayAgendaProps;
/**
 * DayAgenda, redesigned (v2): a **timeline** with a fixed time gutter and a
 * continuous rule down the left. Each event is a tinted card pinned beside its
 * start time, with a node on the rule; when `now` falls on `day` a labelled
 * marker crosses the timeline. Renders empty + loading states. Same props,
 * token-pure.
 */
export declare function DayAgendaV2({ day, events, now, onSelectEvent, selectedEventId, loading, emptyLabel, style, }: DayAgendaV2Props): React.ReactElement;
//# sourceMappingURL=DayAgendaV2.d.ts.map