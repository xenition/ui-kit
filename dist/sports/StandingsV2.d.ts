import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Same public contract as {@link Standings} — a drop-in alternate design. */
export type StandingsV2Props = StandingsProps;
/**
 * Standings, redesigned (v2): a **card-row table**. Each team is a raised row with
 * a rank medallion, crest, name, a form streak of pills, and prominent points — a
 * leading accent bar marks promotion/relegation zones. Bolder than v1's grid.
 * Same props, token-only.
 */
export declare const StandingsV2: React.ForwardRefExoticComponent<StandingsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StandingsV2.d.ts.map