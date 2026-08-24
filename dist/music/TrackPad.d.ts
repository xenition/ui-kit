import * as React from 'react';
import { type PadCell } from './types';
export type TrackPadVariant = 'grid' | 'compact';
export interface TrackPadProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The pads to render (drum / sample cells). */
    pads: PadCell[];
    /** Grid columns (default `4`). Clamped to `>= 1`. */
    columns?: number;
    /**
     * - `grid` — square, labelled pads with a glyph (default).
     * - `compact` — shorter pads for a tight strip.
     */
    variant?: TrackPadVariant;
    /** Ids of pads currently triggered/lit (playing state). */
    activePadIds?: string[];
    /** Optional header label above the grid. */
    label?: string;
    /** Message shown when there are no pads. */
    emptyLabel?: string;
    /** Fires when a (non-empty) pad is hit, with the pad and its index. */
    onPadPress?: (pad: PadCell, index: number) => void;
}
/**
 * A drum / sample pad grid — a UI shell only, it triggers no audio. The DOM
 * parity of `native/music`'s `TrackPad`: renders `pads` as a wrapped grid of
 * real `<button>` cells; `activePadIds` lights a pad's "playing" state via a
 * heavier border + a filled corner dot + bold label (never color alone), and
 * `empty` pads render dimmed and non-triggering. Hitting a live pad fires
 * `onPadPress(pad, index)`. Renders an `EmptyState` when there are no pads. Pad
 * accents come from semantic token classes (position-derived or `pad.color`);
 * no literal colors.
 */
export declare const TrackPad: React.ForwardRefExoticComponent<TrackPadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TrackPad.d.ts.map