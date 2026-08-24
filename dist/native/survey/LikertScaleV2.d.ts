import * as React from 'react';
import type { LikertScaleProps } from './LikertScale';
/** Same Props as {@link LikertScale} — a drop-in alternate design. */
export type LikertScaleV2Props = LikertScaleProps;
/**
 * LikertScale, design V2 — a row of **big labeled pills**. Each agreement point
 * is a tall, rounded-full pill (a faint primary tint at rest, a solid primary
 * fill with a lift when selected) that always prints its ordinal, in place of
 * the original's small circular dots. Anchor labels sit under the extremes.
 * `radiogroup`/`radio` with selection announced (never color-alone); each pill
 * springs on press. Token-pure.
 */
export declare function LikertScaleV2({ points, value, onChange, minLabel, maxLabel, accessibilityLabel, disabled, style, }: LikertScaleV2Props): React.ReactElement;
//# sourceMappingURL=LikertScaleV2.d.ts.map