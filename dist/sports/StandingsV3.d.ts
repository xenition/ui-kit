import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Same public contract as {@link Standings} — a drop-in alternate design. */
export type StandingsV3Props = StandingsProps;
/**
 * Standings, redesigned (v3): a **minimal ladder**. Position, crest + team, and
 * points only — a tiny zone dot flags promotion/relegation. The tightest possible
 * table for a sidebar. The opposite of v2's card rows. Same props, token-only.
 */
export declare const StandingsV3: React.ForwardRefExoticComponent<StandingsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StandingsV3.d.ts.map