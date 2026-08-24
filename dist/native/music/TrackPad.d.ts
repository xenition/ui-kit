import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PadCell } from './types';
export type TrackPadVariant = 'grid' | 'compact';
export interface TrackPadProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A drum / sample pad grid — a UI shell only, it triggers no audio. Renders
 * `pads` as a wrapped grid of tappable cells; `activePadIds` lights a pad's
 * "playing" state via a border + a filled corner dot (never color alone), and
 * `empty` pads render dimmed and non-triggering. Hitting a live pad fires
 * `onPadPress(pad, index)`. Renders an `EmptyState` when there are no pads.
 * Pad accents come from semantic token slots (position-derived or `pad.color`);
 * no literal colors.
 */
export declare function TrackPad({ pads, columns, variant, activePadIds, label, emptyLabel, onPadPress, style, }: TrackPadProps): React.ReactElement;
//# sourceMappingURL=TrackPad.d.ts.map