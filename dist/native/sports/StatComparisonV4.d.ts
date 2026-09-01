import * as React from 'react';
import type { StatComparisonProps } from './StatComparison';
/** Drop-in for {@link StatComparisonProps} — same props, the V4 "broadcast" design. */
export type StatComparisonV4Props = StatComparisonProps;
/**
 * StatComparison — **V4** "broadcast" design. The matchday take on a head-to-head:
 * an elevated card of center-split bars, one row per metric, home filling left in
 * the `primary` accent and away filling right in the `accent` token. Big value
 * numerals flank each row and the leading side reads bolder in `primary`, so
 * ranking survives without relying on color. Same props/behavior as
 * {@link StatComparisonProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Empty state built in. 8-pt spacing, one accent.
 */
export declare function StatComparisonV4({ homeLabel, awayLabel, rows, homeCrest, awayCrest, emptyLabel, style, }: StatComparisonV4Props): React.ReactElement;
//# sourceMappingURL=StatComparisonV4.d.ts.map