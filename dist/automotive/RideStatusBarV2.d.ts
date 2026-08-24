import * as React from 'react';
import type { RideStatusBarProps } from './RideStatusBar';
/** Same public contract as {@link RideStatusBar} — a drop-in alternate design. */
export type RideStatusBarV2Props = RideStatusBarProps;
/**
 * RideStatusBar, redesigned (v2): a **big horizontal stepper**. Each stage is a
 * node with a connector; reached nodes fill primary, the active one is ringed, and
 * a detail line sits beneath — a prominent trip tracker. Distinct from v1. Same
 * props, token-only.
 */
export declare const RideStatusBarV2: React.ForwardRefExoticComponent<RideStatusBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideStatusBarV2.d.ts.map