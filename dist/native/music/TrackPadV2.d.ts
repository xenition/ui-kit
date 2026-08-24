import * as React from 'react';
import type { TrackPadProps } from './TrackPad';
/** Same public contract as {@link TrackPad} — a drop-in alternate design. */
export type TrackPadV2Props = TrackPadProps;
/**
 * TrackPad, redesigned (v2): a **big glowing pad grid** on an elevated card.
 * Each cell is a large, tappable square with an oversized glyph; a lit pad
 * (`activePadIds`) grows a soft glow halo, a thick accent ring, a filled corner
 * beacon **and** a "LIVE" caption — the playing state never rides on color
 * alone. Empty slots render dimmed and inert. Pads spring on press and the
 * board fades in on mount. Accents trace to semantic token slots; no literals.
 * Distinct at a glance from v1's flat bordered grid. Same props.
 */
export declare function TrackPadV2({ pads, columns, variant, activePadIds, label, emptyLabel, onPadPress, style, }: TrackPadV2Props): React.ReactElement;
//# sourceMappingURL=TrackPadV2.d.ts.map