import * as React from 'react';
import type { TrackPadProps } from './TrackPad';
/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV2Props = TrackPadProps;
/**
 * TrackPad, redesigned (v2): **bold color tiles**. Each pad is a big rounded
 * square tinted by its accent with the glyph over a label; a triggered pad fills
 * solid in its accent with a ring (never color alone — also a bold label). A
 * punchier grid than v1's outlined pads. Same props, token-only.
 */
export declare const TrackPadV2: React.ForwardRefExoticComponent<TrackPadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackPadV2.d.ts.map