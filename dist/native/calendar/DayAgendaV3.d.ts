import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV3Props = DayAgendaProps;
/**
 * DayAgenda, redesigned (v3): a **minimal list** — no cards, no gutter. Each
 * event is a flat row fronted by a colored tone rail; the title leads and the
 * time trails in muted text. When `now` falls on `day` a slim labelled divider
 * separates past from upcoming. Renders empty + loading states. Same props,
 * token-pure.
 */
export declare function DayAgendaV3({ day, events, now, onSelectEvent, selectedEventId, loading, emptyLabel, style, }: DayAgendaV3Props): React.ReactElement;
//# sourceMappingURL=DayAgendaV3.d.ts.map