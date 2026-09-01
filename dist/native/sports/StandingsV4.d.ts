import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Drop-in for {@link StandingsProps} — same props, the V4 "broadcast" design. */
export type StandingsV4Props = StandingsProps;
/**
 * Standings — **V4** "broadcast" design. The matchday take on a league table,
 * built from `View`/`Text` (RN has no `<table>`): an elevated card with bold rank
 * numerals, emphasized points, and soft-primary-tinted rows for the leading
 * position and the active team — meaning still carried by the leading accent bar +
 * a11y label, never color alone. Rows stay tappable (`onSelectTeam`). Same
 * props/behavior as {@link StandingsProps}; token-only colors via
 * `useXenitionTheme()`. `compact` trims to Played + Points for narrow layouts.
 */
export declare function StandingsV4({ rows, variant, showForm, zones, activeId, loadingRows, onSelectTeam, emptyLabel, style, }: StandingsV4Props): React.ReactElement;
//# sourceMappingURL=StandingsV4.d.ts.map