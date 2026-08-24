import * as React from 'react';
import { type NPSScaleProps } from './NPSScale';
/** Same Props as {@link NPSScale} — a drop-in alternate design. */
export type NPSScaleV2Props = NPSScaleProps;
/**
 * NPSScale, design V2 — the 0–10 scale as a **grid of numbered cards with bucket
 * coloring baked in**. Every card carries a faint tint of its bucket color
 * (detractor / passive / promoter) at rest and fills solid with a lift when
 * selected, and a labeled legend spells out each band so the meaning is never
 * color-alone. `colorByBucket` drives the palette; otherwise all cards read as
 * primary. `radiogroup`/`radio` with each cell's bucket announced; cards spring
 * on press. Token-pure.
 */
export declare function NPSScaleV2({ value, onChange, minLabel, maxLabel, colorByBucket, accessibilityLabel, disabled, style, }: NPSScaleV2Props): React.ReactElement;
//# sourceMappingURL=NPSScaleV2.d.ts.map