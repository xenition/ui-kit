import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SamplePadVariant = 'tile' | 'row';
export interface SamplePadProps {
    /** Sample display name; when omitted the pad reads as an empty slot. */
    name?: string;
    /** Optional sub-label, e.g. `'Vinyl Kick'`, `'0:02'`. */
    detail?: string;
    /** Icon glyph / emoji for the sample. */
    glyph?: string;
    /** Pre-computed peaks for the inline mini-waveform (no audio decoded here). */
    peaks?: number[];
    /** Accent slot; otherwise derived from `index`. */
    color?: keyof import('../theme').SemanticColors;
    /** Position used to derive the accent when `color` is omitted. */
    index?: number;
    /**
     * - `tile` — square pad with glyph + name (default).
     * - `row` — horizontal pad with an inline mini-waveform.
     */
    variant?: SamplePadVariant;
    /** Whether the sample is currently playing (lit + non-color affordance). */
    playing?: boolean;
    /** Whether the sample is still loading (shows a spinner, blocks presses). */
    loading?: boolean;
    disabled?: boolean;
    /** Fires when a loaded pad is triggered, with the sample name (or `''`). */
    onPress?: (name: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single sample trigger pad — a UI shell only, it plays no audio. When
 * `name` is set it shows the sample (glyph + name, an inline mini-`Waveform`
 * in the `row` variant) and fires `onPress(name)` on a hit; when `name` is
 * omitted it renders a dimmed "empty" slot. `playing` lights the pad and adds
 * a non-color dot; `loading` swaps in a `Spinner` and blocks presses. Accent
 * comes from a semantic token slot; no literal colors.
 */
export declare function SamplePad({ name, detail, glyph, peaks, color, index, variant, playing, loading, disabled, onPress, style, }: SamplePadProps): React.ReactElement;
//# sourceMappingURL=SamplePad.d.ts.map