import * as React from 'react';
export type WaveformEditorVariant = 'full' | 'mini';
export interface WaveformEditorProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Normalized peak magnitudes in `[0, 1]`, one per bar. This is a UI shell —
     * peaks are pre-computed by the app; no audio is decoded here.
     */
    peaks?: number[];
    /** Playhead position as a ratio in `[0, 1]`. */
    progress?: number;
    /** Optional selected region `[startRatio, endRatio]` (both in `[0, 1]`). */
    selection?: [number, number];
    /**
     * - `full` — taller bars with a scrubber row (default).
     * - `mini` — short inline strip (e.g. a clip thumbnail).
     */
    variant?: WaveformEditorVariant;
    /** Show a loading spinner in place of the bars. */
    loading?: boolean;
    /** Message shown when there are no peaks and not loading. */
    emptyLabel?: string;
    /** Number of bars drawn when `peaks` is omitted (placeholder). Default 48. */
    placeholderBars?: number;
    /** Fires with a `[0,1]` ratio when a bar is tapped (seek intent). */
    onSeek?: (ratio: number) => void;
}
/**
 * A waveform editor — a **token-bar placeholder**, not a real renderer, and the
 * DOM parity of `native/music`'s `WaveformEditor`. It draws `peaks` (or a
 * deterministic placeholder when omitted) as a row of token-colored bars,
 * overlays a playhead at `progress`, and tints an optional `selection` region.
 * Tapping a bar fires `onSeek` with the `[0,1]` position. Shows a `Spinner`
 * while `loading` and an `EmptyState` when there is nothing to show. No audio is
 * decoded; token-only styling.
 */
export declare const WaveformEditor: React.ForwardRefExoticComponent<WaveformEditorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WaveformEditor.d.ts.map