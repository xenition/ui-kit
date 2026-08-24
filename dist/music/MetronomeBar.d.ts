import * as React from 'react';
export type MetronomeBarVariant = 'dots' | 'bars';
export interface MetronomeBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Beats per bar (default `4`). Clamped to `1`…`16`. */
    beatsPerBar?: number;
    /** The currently sounding beat (1-based); `0`/undefined = none lit. */
    currentBeat?: number;
    /** Whether the transport is running. */
    playing?: boolean;
    /** Optional tempo shown alongside, in BPM. */
    bpm?: number;
    /**
     * - `dots` — a row of beat dots (default).
     * - `bars` — a row of taller bars.
     */
    variant?: MetronomeBarVariant;
    /** Disable the transport toggle. */
    disabled?: boolean;
    /** Fires with the next playing state when the transport toggle is pressed. */
    onToggle?: (playing: boolean) => void;
}
/**
 * A metronome / beat indicator — a UI shell only, it keeps no clock, and the
 * DOM parity of `native/music`'s `MetronomeBar`. Renders `beatsPerBar` beat
 * markers with the downbeat (beat 1) emphasized in size and ring, and lights
 * `currentBeat` via fill **and** scale (never color alone). The optional
 * transport toggle reports through `onToggle`; its state is in the button's
 * `aria-pressed`/label. Token-only styling.
 */
export declare const MetronomeBar: React.ForwardRefExoticComponent<MetronomeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MetronomeBar.d.ts.map