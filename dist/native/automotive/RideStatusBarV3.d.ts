import * as React from 'react';
import type { RideStatusBarProps } from './RideStatusBar';
/**
 * Alternate design (v3) of {@link RideStatusBar} — a drop-in with the **same
 * props**. The *compact status pill bar*: a leading pill spelling out the active
 * stage glyph + label + `detail`, trailed by a tiny four-dot progress track. Fits
 * a header or list row in one line. A `cancelled` flag renders an explicit
 * cancelled pill. Progress is conveyed by a glyph + spelled-out label + a11y
 * label (never color alone). Token-pure: semantic slots + `withAlpha` only.
 */
export type RideStatusBarV3Props = RideStatusBarProps;
export declare function RideStatusBarV3({ stage, detail, cancelled, style }: RideStatusBarV3Props): React.ReactElement;
//# sourceMappingURL=RideStatusBarV3.d.ts.map