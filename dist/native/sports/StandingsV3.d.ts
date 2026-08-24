import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Drop-in replacement for {@link StandingsProps} — identical shape. */
export type StandingsV3Props = StandingsProps;
/**
 * Standings, design variant 3 — a **compact ranked list** (not a grid). Each
 * item leads with a large position number, then crest + team + a Played caption,
 * and trails with the points total and a position-delta arrow derived from the
 * newest form result (up / down / holding), announced in words so it never reads
 * by color alone. Zones show a leading accent stripe + a11y label. Same props as
 * `Standings`; empty + loading built in. Token-pure (`withAlpha`).
 */
export declare function StandingsV3({ rows, showForm, zones, activeId, loadingRows, onSelectTeam, emptyLabel, style, }: StandingsV3Props): React.ReactElement;
//# sourceMappingURL=StandingsV3.d.ts.map