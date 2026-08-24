import * as React from 'react';
import type { RideStatusBarProps } from './RideStatusBar';
/** Same public contract as {@link RideStatusBar} — a drop-in alternate design. */
export type RideStatusBarV3Props = RideStatusBarProps;
/**
 * RideStatusBar, redesigned (v3): a **compact status line**. The current stage's
 * glyph + label and the detail sit inline, with a tiny progress-dot strip on the
 * right showing position in the lifecycle. The opposite of v2's stepper. Same
 * props, token-only.
 */
export declare const RideStatusBarV3: React.ForwardRefExoticComponent<RideStatusBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RideStatusBarV3.d.ts.map