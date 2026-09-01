import * as React from 'react';
import type { TrackPadProps } from './TrackPad';
/** Drop-in for {@link TrackPadProps} — same props, the V4 "session" design. */
export type TrackPadV4Props = TrackPadProps;
/**
 * TrackPad — **V4** "session" design. The tactile take on a drum / sample pad
 * grid: pads are rounded token tiles carrying their per-cell accent
 * (position-derived or `pad.color`) as a soft tint, and an `activePadIds` pad
 * lights with a stronger accent fill + a heavier accent ring + a filled corner
 * dot + bold label (never color alone). No gradient — performance surfaces stay
 * clean and tactile; ≥44px tap targets. Honors both `variant`s (`grid` /
 * `compact`), the empty-cell state and `onPadPress(pad, index)` behavior
 * identical to {@link TrackPadProps}. Renders an `EmptyState` when there are no
 * pads. Token-only colors via `useXenitionTheme()`.
 */
export declare function TrackPadV4({ pads, columns, variant, activePadIds, label, emptyLabel, onPadPress, style, }: TrackPadV4Props): React.ReactElement;
//# sourceMappingURL=TrackPadV4.d.ts.map