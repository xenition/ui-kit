import * as React from 'react';
import type { TrackPadProps } from './TrackPad';
/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV3Props = TrackPadProps;
/**
 * TrackPad, redesigned (v3): a **compact pad strip**. Small square pads wrap in a
 * tight grid with the label beneath each; a triggered pad shows a filled accent
 * dot and a bold label (never color alone). The minimal counterpart to v2's bold
 * tiles. Same props, token-only.
 */
export declare const TrackPadV3: React.ForwardRefExoticComponent<TrackPadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackPadV3.d.ts.map