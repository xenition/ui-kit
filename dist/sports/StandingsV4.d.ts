import * as React from 'react';
import type { StandingsProps } from './Standings';
/** Drop-in for {@link StandingsProps} — same props, the V4 "broadcast" design. */
export type StandingsV4Props = StandingsProps;
/**
 * Standings — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a league table: an elevated `<table>` with bold rank numerals,
 * emphasized points, and soft-primary-tinted rows for the leading position and any
 * zoned band — meaning still carried by the leading accent bar + a11y label, never
 * color alone. Rows stay selectable and keyboard-activated. Same props/behavior as
 * {@link StandingsProps}; all colors from `--xen-*` token classes (no literals).
 */
export declare const StandingsV4: React.ForwardRefExoticComponent<StandingsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StandingsV4.d.ts.map