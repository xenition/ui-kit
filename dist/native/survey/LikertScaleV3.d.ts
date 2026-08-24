import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Same Props as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV3Props = LikertScaleProps;
/**
 * LikertScale, design V3 — a **compact segmented bar**. The points are joined
 * edge-to-edge in one bordered track (hairline dividers between, no gaps),
 * reading as a single control rather than the original's separate dots. The
 * selected segment fills with the primary token; anchor labels sit beneath the
 * extremes. `radiogroup`/`radio` with selection announced (never color-alone).
 * Low-profile for dense forms. Token-pure.
 */
export declare function LikertScaleV3({ points, value, onChange, minLabel, maxLabel, accessibilityLabel, disabled, style, }: LikertScaleV3Props): React.ReactElement;
//# sourceMappingURL=LikertScaleV3.d.ts.map