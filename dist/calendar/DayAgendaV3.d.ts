import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV3Props = DayAgendaProps;
/**
 * DayAgenda, redesigned (v3): a **dense schedule list**. Each event is one hairline
 * row — start time, a tone dot, the title, and the location folded in — for a tight
 * day view. The opposite of v2's timeline. Same props, token-only.
 */
export declare const DayAgendaV3: React.ForwardRefExoticComponent<DayAgendaProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DayAgendaV3.d.ts.map