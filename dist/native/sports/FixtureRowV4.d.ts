import * as React from 'react';
import type { FixtureRowProps } from './FixtureRow';
/** Drop-in for {@link FixtureRowProps} — same props, the V4 "broadcast" design. */
export type FixtureRowV4Props = FixtureRowProps;
/**
 * FixtureRow — **V4** "broadcast" design. The matchday take on a fixture line:
 * a clean, elevated row with teams flanking a bold center scoreline / kickoff,
 * and a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone). One accent: `primary`. Same props/behavior as
 * {@link FixtureRowProps} (drop-in); token-only colors via `useXenitionTheme()`.
 * Tappable via `onPress`.
 */
export declare function FixtureRowV4({ home, away, homeCrest, awayCrest, homeScore, awayScore, kickoffLabel, minute, meta, status, highlighted, onPress, style, }: FixtureRowV4Props): React.ReactElement;
//# sourceMappingURL=FixtureRowV4.d.ts.map