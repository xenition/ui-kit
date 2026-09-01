import * as React from 'react';
import type { StatComparisonProps } from './StatComparison';
/** Drop-in for {@link StatComparisonProps} — same props, the V4 "broadcast" design. */
export type StatComparisonV4Props = StatComparisonProps;
/**
 * StatComparison — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a head-to-head: an elevated card of center-split bars, one
 * row per metric, home filling left in the `primary` accent and away filling
 * right in the `accent` token. Big value numerals flank each row and the leading
 * side reads bolder in `primary`, so ranking survives without relying on color.
 * Same props/behavior as {@link StatComparisonProps}; all colors from `--xen-*`
 * token classes (no literals). Empty state built in. 8-pt spacing, one accent.
 */
export declare const StatComparisonV4: React.ForwardRefExoticComponent<StatComparisonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatComparisonV4.d.ts.map