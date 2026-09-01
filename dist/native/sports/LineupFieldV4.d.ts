import * as React from 'react';
import type { LineupFieldProps, LineupPlayer } from './LineupField';
/** Drop-in for {@link LineupFieldProps} — same props, the V4 "broadcast" design. */
export type LineupFieldV4Props = LineupFieldProps;
/**
 * LineupField — **V4** "broadcast" design. The starting XI as a matchday
 * graphic: the pitch is a soft, token-derived tinted surface (a `success` wash —
 * the grass token, never a literal green) carrying a halfway line + center
 * circle, and player tokens sit on it as bold **primary** (home) / accent (away)
 * dots with shirt number + name so a token is legible without color. Formation
 * caption and per-player tap are preserved. Same props/behavior as
 * {@link LineupFieldProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function LineupFieldV4({ players, formation, height, onSelectPlayer, emptyLabel, style, }: LineupFieldV4Props): React.ReactElement;
export type { LineupPlayer };
//# sourceMappingURL=LineupFieldV4.d.ts.map