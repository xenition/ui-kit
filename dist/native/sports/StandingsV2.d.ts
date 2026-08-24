import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Drop-in replacement for {@link StandingsProps} — identical shape. */
export type StandingsV2Props = StandingsProps;
/**
 * Standings, design variant 2 — a **styled table** with a rounded elevated
 * frame, zebra rows, a leading zone accent bar (promotion / relegation, always
 * reinforced by an a11y label so meaning never rests on color), and inline
 * form dots on each row. `zones` paint the accent bar; `activeId` tints a row;
 * `variant="compact"` trims to Played + Points. Same props as `Standings`;
 * empty + loading states built in. Token-pure (`shadow`, `withAlpha`).
 */
export declare function StandingsV2({ rows, variant, showForm, zones, activeId, loadingRows, onSelectTeam, emptyLabel, style, }: StandingsV2Props): React.ReactElement;
//# sourceMappingURL=StandingsV2.d.ts.map