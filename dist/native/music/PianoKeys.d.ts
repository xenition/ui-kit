import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PianoKeysVariant = 'full' | 'compact';
export interface PianoKeysProps {
    /** Lowest octave number (default `4`). */
    startOctave?: number;
    /** How many octaves to render (default `1`). Clamped to `>= 1`. */
    octaves?: number;
    /** Note names currently held down, e.g. `['C4','E4','G4']` (playing state). */
    highlightedNotes?: string[];
    /**
     * - `full` — labelled white keys + overlaid black keys (default).
     * - `compact` — shorter keys, no labels.
     */
    variant?: PianoKeysVariant;
    /** Show the note name on each white key (default true in `full`). */
    showLabels?: boolean;
    disabled?: boolean;
    /** Fires with the note name (e.g. `'C#4'`) when a key is pressed. */
    onKeyPress?: (note: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An on-screen keyboard — one or more octaves of piano keys, a UI shell only
 * (it makes no sound). White keys lay out in a row with the black keys
 * overlaid at the correct positions; `highlightedNotes` lights held keys via a
 * tint **and** a filled marker (never color alone) plus the a11y `selected`
 * state. Pressing a key fires `onKeyPress(note)` with a name like `'C#4'`.
 * Token-only styling.
 */
export declare function PianoKeys({ startOctave, octaves, highlightedNotes, variant, showLabels, disabled, onKeyPress, style, }: PianoKeysProps): React.ReactElement;
//# sourceMappingURL=PianoKeys.d.ts.map