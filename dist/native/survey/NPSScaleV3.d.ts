import * as React from 'react';
import { type NPSScaleProps } from './NPSScale';
/** Same Props as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV3Props = NPSScaleProps;
/**
 * NPSScale, design V3 — the 0–10 scale as a **slider-style horizontal track**.
 * Eleven tick cells sit on one continuous rail; the rail fills with the primary
 * token up to the selected score and drops a thumb on it, so the answer reads as
 * a position on a line rather than a grid of buttons. A readout above names the
 * current score and its bucket (detractor / passive / promoter), so meaning is
 * never color-alone. `radiogroup`/`radio` with each tick announced; tapping a
 * tick selects it. Token-pure.
 */
export declare function NPSScaleV3({ value, onChange, minLabel, maxLabel, colorByBucket, accessibilityLabel, disabled, style, }: NPSScaleV3Props): React.ReactElement;
//# sourceMappingURL=NPSScaleV3.d.ts.map