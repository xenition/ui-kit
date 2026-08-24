import * as React from 'react';
import type { DayAgendaProps } from './DayAgenda';
/** Same public contract as {@link DayAgenda} — a drop-in alternate design. */
export type DayAgendaV2Props = DayAgendaProps;
/**
 * DayAgenda, redesigned (v2): a **timeline agenda**. Each event sits to the right of
 * a time gutter with a tone-colored node and a connector rail; the event card shows
 * title + location, and the selected row is ringed. Distinct from v1. Same props,
 * token-only.
 */
export declare const DayAgendaV2: React.ForwardRefExoticComponent<DayAgendaProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DayAgendaV2.d.ts.map