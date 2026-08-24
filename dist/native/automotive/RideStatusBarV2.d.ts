import * as React from 'react';
import type { RideStatusBarProps } from './RideStatusBar';
/**
 * Alternate design (v2) of {@link RideStatusBar} — a drop-in with the **same
 * props**. Where the original is a thin inline stepper, V2 is a *big elevated
 * stepper*: an overall progress meter, large numbered stage circles with labels,
 * and a prominent **status strip** foregrounding the active stage glyph + label +
 * `detail`. Completed/active stages use a ✓ / stage glyph plus a spelled-out
 * label + a11y label, so progress never rests on color. A `cancelled` flag
 * overrides. Token-pure: semantic slots + `withAlpha` tints only.
 */
export type RideStatusBarV2Props = RideStatusBarProps;
export declare function RideStatusBarV2({ stage, detail, cancelled, style }: RideStatusBarV2Props): React.ReactElement;
//# sourceMappingURL=RideStatusBarV2.d.ts.map