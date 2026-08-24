import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type MetronomeBarVariant = 'dots' | 'bars';
export interface MetronomeBarProps {
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
    disabled?: boolean;
    /** Fires with the next playing state when the transport toggle is pressed. */
    onToggle?: (playing: boolean) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A metronome / beat indicator — a UI shell only, it keeps no clock. Renders
 * `beatsPerBar` beat markers with the downbeat (beat 1) emphasized in size and
 * ring, and lights `currentBeat` via fill **and** scale (never color alone).
 * The optional transport toggle reports through `onToggle`; its state is in
 * the a11y `selected`/label. Token-only styling.
 */
export declare function MetronomeBar({ beatsPerBar, currentBeat, playing, bpm, variant, disabled, onToggle, style, }: MetronomeBarProps): React.ReactElement;
//# sourceMappingURL=MetronomeBar.d.ts.map